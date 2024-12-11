module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          "git clone --recurse-submodules https://github.com/microsoft/TRELLIS.git app",
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install -U xformers torch==2.5.1 torchvision --index-url https://download.pytorch.org/whl/cu124",
          "uv pip install -r ../requirements.txt",
          "uv pip install huggingface_hub hf_transfer",
          "uv pip install -U setuptools wheel ninja",
          "uv pip install https://github.com/woct0rdho/triton-windows/releases/download/v3.1.0-windows.post5/triton-3.1.0-cp310-cp310-win_amd64.whl"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",                 
        message: [
          "uv pip install git+https://github.com/JeffreyXiang/diffoctreerast.git --no-build-isolation",
          "uv pip install git+https://github.com/sdbds/diff-gaussian-rasterization --no-build-isolation"
        ]
      }
    },
    {
      method: "fs.link",
      params: {
        venv: "app/env"             
      }
    }
  ]
};
