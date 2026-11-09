package com.example

import org.junit.Assert.assertEquals
import org.junit.Test

class ExampleRobolectricTest {

  @Test
  fun testAppConfiguration() {
    val storeName = "مكتبة نهر العلم"
    val manager = "إدارة أ/ إيهاب"
    val hotline = "01002968331"
    
    assertEquals("مكتبة نهر العلم", storeName)
    assertEquals("إدارة أ/ إيهاب", manager)
    assertEquals("01002968331", hotline)
  }
}
