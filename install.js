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
          "pip install -U xformers torch==2.5.1 torchvision --index-url https://download.pytorch.org/whl/cu124",
          "pip install -r ../requirements.txt",
          "pip install huggingface_hub hf_transfer",
          "pip install -U setuptools wheel ninja",
          "pip install https://github.com/woct0rdho/triton-windows/releases/download/v3.1.0-windows.post5/triton-3.1.0-cp310-cp310-win_amd64.whl"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",                 
        message: [
          "pip install git+https://github.com/JeffreyXiang/diffoctreerast.git",
          "pip install git+https://github.com/sdbds/diff-gaussian-rasterization"
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
