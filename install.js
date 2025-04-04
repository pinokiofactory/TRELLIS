module.exports = {
  run: [
    // Edit this step to customize the git repository to use
    {
      method: "shell.run",
      params: {
        message: [
          "git clone --recurse-submodules https://github.com/microsoft/TRELLIS.git app",
        ]
      }
    },
    // Delete this step if your project does not use torch
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",                // Edit this to customize the venv folder path
          path: "app",                // Edit this to customize the path to start the shell from
          xformers: true   // uncomment this line if your project requires xformers
        }
      }
    },
    // Edit this step with your custom install commands
    {
      method: "shell.run",
      params: {
        env: {
          "UV_DEFAULT_INDEX": "https://pypi.org/simple",
          "UV_INDEX": "https://download.pytorch.org/whl/cu124",
          // "UV_FIND_LINKS": "https://nvidia-kaolin.s3.us-east-2.amazonaws.com/torch-2.5.1_cu124.html",
          "UV_INDEX_STRATEGY": "unsafe-best-match",
          "UV_NO_BUILD_ISOLATION": 1,
          "USE_NINJA": 0,
          "DISTUTILS_USE_SDK": 1
        },
        venv: "env",                // Edit this to customize the venv folder path
        path: "app",                // Edit this to customize the path to start the shell from
        build: true,
        message: [
          "uv pip install wheel open3d",
          "uv pip install -r ../requirements-uv.txt"
        ]
      }
    }
    // {
    //   method: "fs.link",
    //   params: {
    //     venv: "app/env"
    //   }
    // }
  ]
}
