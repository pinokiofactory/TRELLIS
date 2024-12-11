module.exports = {
  run: [
    {
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "python -m pip install --upgrade pip",
          "pip install --upgrade setuptools wheel"
        ]
      }
    },
    // windows nvidia
    {
      "when": "{{platform === 'win32' && gpu === 'nvidia'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "pip install torch==2.5.1 torchvision==0.20.1 {{args && args.xformers ? 'xformers' : ''}}  --index-url https://download.pytorch.org/whl/cu124",
          "pip install https://github.com/bdashore3/flash-attention/releases/download/v2.7.1.post1/flash_attn-2.7.1.post1+cu124torch2.5.1cxx11abiFALSE-cp310-cp310-win_amd64.whl",
          "pip install https://github.com/woct0rdho/triton-windows/releases/download/v3.1.0-windows.post5/triton-3.1.0-cp310-cp310-win_amd64.whl",
          "pip install kaolin -f https://nvidia-kaolin.s3.us-east-2.amazonaws.com/torch-2.5.1_cu124.html",
          "pip install https://github.com/iiiytn1k/sd-webui-some-stuff/releases/download/diffoctreerast/nvdiffrast-0.3.3-py3-none-any.whl", //   "pip install git+https://github.com/NVlabs/nvdiffrast.git",
          "pip install https://github.com/iiiytn1k/sd-webui-some-stuff/releases/download/diffoctreerast/diffoctreerast-0.0.0-cp310-cp310-win_amd64.whl", //   "pip install git+https://github.com/JeffreyXiang/diffoctreerast.git",
          "pip install https://github.com/iiiytn1k/sd-webui-some-stuff/releases/download/diffoctreerast/diff_gaussian_rasterization-0.0.0-cp310-cp310-win_amd64.whl", //   "pip install git+https://github.com/autonomousvision/mip-splatting.git#subdirectory=submodules/diff-gaussian-rasterization",
          "pip install https://github.com/iiiytn1k/sd-webui-some-stuff/releases/download/diffoctreerast/vox2seq-0.0.0-cp310-cp310-win_amd64.whl", //   "pip install -e extensions/vox2seq/",
          "pip install spconv-cu120"
        ]
      }
    },
    // linux nvidia
    {
      "when": "{{platform === 'linux' && gpu === 'nvidia'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "pip install torch==2.5.1 torchvision==0.20.1 {{args && args.xformers ? 'xformers' : ''}}  --index-url https://download.pytorch.org/whl/cu124",
          "pip install https://github.com/Dao-AILab/flash-attention/releases/download/v2.7.2.post1/flash_attn-2.7.2.post1+cu12torch2.5cxx11abiFALSE-cp310-cp310-linux_x86_64.whl",
          "pip install kaolin -f https://nvidia-kaolin.s3.us-east-2.amazonaws.com/torch-2.5.1_cu124.html",
          "pip install git+https://github.com/NVlabs/nvdiffrast.git",
          "pip install git+https://github.com/JeffreyXiang/diffoctreerast.git",
          "pip install git+https://github.com/autonomousvision/mip-splatting.git#subdirectory=submodules/diff-gaussian-rasterization",
          "pip install -e extensions/vox2seq/",
          "pip install spconv-cu120"
        ]
      }
    },
    // linux rocm (amd)
    {
      "when": "{{platform === 'linux' && gpu === 'amd'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "pip install torch==2.4.1 torchvision==0.19.1 {{args && args.xformers ? 'xformers' : ''}} --index-url https://download.pytorch.org/whl/rocm6.1",
          "pip install https://github.com/ROCm/flash-attention/releases/download/v2.6.3-cktile/flash_attn-2.6.3+cu118torch2.4cxx11abiFALSE-cp310-cp310-linux_x86_64.whl",
          "pip install spconv"
        ]
      }
    }
  ]
}
