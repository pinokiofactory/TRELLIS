module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        venv: "env",
        env: {
          "ATTN_BACKEND": "xformers",
          "SPCONV_ALGO": "native",
          "TORCH_CUDA_ARCH_LIST": "50;60;61;70;75;80;86;89;90"
        },                   
        path: "app",                
        message: [
          "python -c \"import torch; print(\\\";\\\".join([arch.replace(\\\"sm_\\\", \\\"\\\") for arch in torch.cuda.get_arch_list()]))\"", //Probably can remove in future, just here so I can visualize
          "python app.py",
        ],
        on: [{
          // The regular expression pattern to monitor.
          // When this pattern occurs in the shell terminal, the shell will return,
          // and the script will go onto the next step.
          "event": "/http:\/\/[0-9.:]+/",   

          // "done": true will move to the next step while keeping the shell alive.
          // "kill": true will move to the next step after killing the shell.
          "done": true
        }]
      }
    },
    {
      // This step sets the local variable 'url'.
      // This local variable will be used in pinokio.js to display the "Open WebUI" tab when the value is set.
      method: "local.set",
      params: {
        // the input.event is the regular expression match object from the previous step
        url: "{{input.event[0]}}"
      }
    }
  ]
}
