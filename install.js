module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          "conda install -y conda-forge::ninja",
        ]
      }
    },
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
        message: "python ../install.py"
      }
    },
    {
      method: "log",
      params: {
        raw: "Setup process completed successfully!"
      }
    }
  ]
}
