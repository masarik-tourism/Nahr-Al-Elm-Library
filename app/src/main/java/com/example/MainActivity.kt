package com.example

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import android.net.Uri
import android.os.Bundle
import android.view.ViewGroup
import android.webkit.JavascriptInterface
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.AndroidView
import com.example.ui.theme.BrandNavy
import com.example.ui.theme.MyApplicationTheme

class MainActivity : ComponentActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    enableEdgeToEdge()
    setContent {
      MyApplicationTheme {
        Scaffold(
          modifier = Modifier
            .fillMaxSize()
            .statusBarsPadding()
        ) { _ ->
          NativeWebShellScreen(
            modifier = Modifier.fillMaxSize()
          )
        }
      }
    }
  }
}

/**
 * Native Android APK Shell Wrapper for Nahr Al-Elm Library (مكتبة نهر العلم).
 * Embeds the PWA/Web interface, supports native file choosing for PDF page counting,
 * provides native share sheet integration, and intercepts WhatsApp/Tel deep links.
 */
@SuppressLint("SetJavaScriptEnabled")
@Composable
fun NativeWebShellScreen(modifier: Modifier = Modifier) {
  val context = LocalContext.current
  var webViewInstance by remember { mutableStateOf<WebView?>(null) }
  var canGoBack by remember { mutableStateOf(false) }
  var pageProgress by remember { mutableFloatStateOf(1f) }
  var isLoading by remember { mutableStateOf(false) }
  var filePathCallback by remember { mutableStateOf<ValueCallback<Array<Uri>>?>(null) }

  // Native Android file picker for <input type="file"> (PDF.js document selection)
  val filePickerLauncher = rememberLauncherForActivityResult(
    contract = ActivityResultContracts.OpenDocument()
  ) { uri: Uri? ->
    val results = if (uri != null) arrayOf(uri) else null
    filePathCallback?.onReceiveValue(results)
    filePathCallback = null
  }

  // Intercept system back gestures to navigate WebView history if possible
  BackHandler(enabled = canGoBack) {
    if (webViewInstance?.canGoBack() == true) {
      webViewInstance?.goBack()
    }
  }

  Box(
    modifier = modifier
      .fillMaxSize()
      .background(BrandNavy)
  ) {
    AndroidView(
      factory = { ctx ->
        WebView(ctx).apply {
          layoutParams = ViewGroup.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.MATCH_PARENT
          )

          settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            databaseEnabled = true
            allowFileAccess = true
            allowContentAccess = true
            useWideViewPort = true
            loadWithOverviewMode = true
            cacheMode = WebSettings.LOAD_DEFAULT
            mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
            val defaultUa = userAgentString
            userAgentString = "$defaultUa NahrAlElmNativeApp/2.0 (Android Native APK Shell)"
          }

          // Inject JavaScript interface
          addJavascriptInterface(AndroidNativeBridge(ctx), "AndroidApp")

          webChromeClient = object : WebChromeClient() {
            override fun onProgressChanged(view: WebView?, newProgress: Int) {
              super.onProgressChanged(view, newProgress)
              pageProgress = newProgress / 100f
              isLoading = newProgress < 100
            }

            override fun onShowFileChooser(
              webView: WebView?,
              callback: ValueCallback<Array<Uri>>?,
              fileChooserParams: FileChooserParams?
            ): Boolean {
              filePathCallback?.onReceiveValue(null)
              filePathCallback = callback
              return try {
                filePickerLauncher.launch(
                  arrayOf(
                    "application/pdf",
                    "image/*",
                    "application/msword",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  )
                )
                true
              } catch (_: Exception) {
                filePathCallback = null
                Toast.makeText(ctx, "تعذر فتح مدير الملفات", Toast.LENGTH_SHORT).show()
                false
              }
            }
          }

          webViewClient = object : WebViewClient() {
            override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
              super.onPageStarted(view, url, favicon)
              canGoBack = view?.canGoBack() == true
              isLoading = true
              view?.evaluateJavascript(
                "window.isNativeApp = true;",
                null
              )
            }

            override fun onPageFinished(view: WebView?, url: String?) {
              super.onPageFinished(view, url)
              canGoBack = view?.canGoBack() == true
              isLoading = false
              view?.evaluateJavascript(
                "window.isNativeApp = true;",
                null
              )
            }

            override fun shouldOverrideUrlLoading(
              view: WebView?,
              request: WebResourceRequest?
            ): Boolean {
              val url = request?.url?.toString() ?: return false
              return handleCustomUrlIntents(ctx, url)
            }

            @Deprecated("Deprecated in Java")
            override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
              val targetUrl = url ?: return false
              return handleCustomUrlIntents(ctx, targetUrl)
            }

            override fun onReceivedError(
              view: WebView?,
              request: WebResourceRequest?,
              error: WebResourceError?
            ) {
              super.onReceivedError(view, request, error)
              if (request?.isForMainFrame == true && request.url.scheme != "file") {
                view?.loadUrl("file:///android_asset/index.html")
              }
            }
          }

          // Load local bundled asset for instant startup with offline & Firebase live sync
          loadUrl("file:///android_asset/index.html")
          webViewInstance = this
        }
      },
      update = {
        webViewInstance = it
        canGoBack = it.canGoBack()
      },
      modifier = Modifier.fillMaxSize()
    )

    // Sleek Top Loading Progress Indicator
    if (isLoading && pageProgress < 1f) {
      LinearProgressIndicator(
        progress = { pageProgress },
        modifier = Modifier
          .fillMaxWidth()
          .height(3.dp)
          .align(Alignment.TopCenter),
        color = Color(0xFF10B981),
        trackColor = Color(0x330A2540)
      )
    }
  }
}

/**
 * Handle custom URL schemes:
 * - WhatsApp deep links (wa.me, whatsapp://) -> Launches WhatsApp or falls back to browser
 * - Telephone calls (tel:) -> Launches Phone Dialer
 * - Email (mailto:) -> Launches Email App
 */
private fun handleCustomUrlIntents(context: Context, url: String): Boolean {
  return try {
    when {
      url.contains("wa.me") || url.startsWith("whatsapp://") -> {
        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url)).apply {
          flags = Intent.FLAG_ACTIVITY_NEW_TASK
        }
        try {
          context.startActivity(intent)
        } catch (_: Exception) {
          val webIntent = Intent(Intent.ACTION_VIEW, Uri.parse(url)).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK
          }
          context.startActivity(webIntent)
        }
        true
      }

      url.startsWith("tel:") -> {
        val dialIntent = Intent(Intent.ACTION_DIAL, Uri.parse(url)).apply {
          flags = Intent.FLAG_ACTIVITY_NEW_TASK
        }
        context.startActivity(dialIntent)
        true
      }

      url.startsWith("mailto:") -> {
        val mailIntent = Intent(Intent.ACTION_SENDTO, Uri.parse(url)).apply {
          flags = Intent.FLAG_ACTIVITY_NEW_TASK
        }
        context.startActivity(mailIntent)
        true
      }

      url.startsWith("file:///android_asset/") || url.startsWith("https://nahralelm-library.com") -> {
        false
      }

      url.startsWith("http://") || url.startsWith("https://") -> {
        false
      }

      else -> false
    }
  } catch (_: Exception) {
    Toast.makeText(context, "تعذر فتح الرابط الخارجي", Toast.LENGTH_SHORT).show()
    false
  }
}

/**
 * JavaScript Bridge exposed to window.AndroidApp
 */
class AndroidNativeBridge(private val context: Context) {

  @JavascriptInterface
  fun isNativeApp(): Boolean = true

  @JavascriptInterface
  fun getAppVersion(): String = "2.0.0"

  @JavascriptInterface
  fun showToast(message: String) {
    Toast.makeText(context, message, Toast.LENGTH_SHORT).show()
  }

  @JavascriptInterface
  fun shareLibraryLink(title: String, text: String, url: String) {
    try {
      val shareIntent = Intent(Intent.ACTION_SEND).apply {
        type = "text/plain"
        putExtra(Intent.EXTRA_SUBJECT, title)
        putExtra(Intent.EXTRA_TEXT, "$text\n$url")
      }
      val chooser = Intent.createChooser(shareIntent, title).apply {
        flags = Intent.FLAG_ACTIVITY_NEW_TASK
      }
      context.startActivity(chooser)
    } catch (_: Exception) {
      Toast.makeText(context, "تعذر فتح نافذة المشاركة", Toast.LENGTH_SHORT).show()
    }
  }

  @JavascriptInterface
  fun openWhatsApp(message: String) {
    try {
      val url = "https://wa.me/201002968331?text=" + Uri.encode(message)
      val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url)).apply {
        flags = Intent.FLAG_ACTIVITY_NEW_TASK
      }
      context.startActivity(intent)
    } catch (_: Exception) {
      Toast.makeText(context, "تطبيق الواتساب غير مثبت على الجهاز", Toast.LENGTH_SHORT).show()
    }
  }

  @JavascriptInterface
  fun dialPhone(phoneNumber: String) {
    try {
      val intent = Intent(Intent.ACTION_DIAL, Uri.parse("tel:$phoneNumber")).apply {
        flags = Intent.FLAG_ACTIVITY_NEW_TASK
      }
      context.startActivity(intent)
    } catch (_: Exception) {
      Toast.makeText(context, "تعذر فتح لوحة الاتصال", Toast.LENGTH_SHORT).show()
    }
  }
}
