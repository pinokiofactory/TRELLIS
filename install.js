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
          "uv pip install -U setuptools wheel ninja"
        ]
      }
    },
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",
          path: "app",
          xformers: true
        }
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install -r ../requirements.txt",
          "uv pip install huggingface_hub hf_transfer"
        ]
      }
    },
    {
      method: "fs.link",
      params: {
        venv: "app/env"             
      }
    } //,
    // {
    //   method: "shell.run",
    //   params: {
    //     message: [
    //       "echo Optimising pipeline script... && curl -o app/trellis/pipelines/trellis_image_to_3d.py https://raw.githubusercontent.com/0lento/TRELLIS/refs/heads/low-vram/trellis/pipelines/trellis_image_to_3d.py"
    //     ]
    //   }
    // }
  ]
};
