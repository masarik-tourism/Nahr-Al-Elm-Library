# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  channel = "stable-23.11";

  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20
    pkgs.jdk17
    pkgs.git
  ];

  # Sets environment variables in the workspace
  env = {
    PORT = "3000";
  };

  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      "bradlc.vscode-tailwindcss"
    ];

    # Enable previews and configure the preview command
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npm" "run" "preview"];
          manager = "web";
        };
      };
    };

    # Workspace lifecycle hooks
    workspace = {
      onCreate = {
        npm-install = "npm run build";
      };
      onStart = {
        web-server = "npm run preview";
      };
    };
  };
}
