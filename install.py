import subprocess
import sys
import pkg_resources

# List of installation commands
install_commands = [
    "pip install --upgrade setuptools wheel",
    "pip install pillow imageio imageio-ffmpeg tqdm easydict opencv-python-headless scipy rembg onnxruntime trimesh xatlas pyvista pymeshfix igraph transformers",
    "pip install git+https://github.com/EasternJournalist/utils3d.git@9a4eb15e4021b67b12c460c7057d642626897ec8",
    "pip install gradio gradio_litmodel3d==0.0.1",
    "pip install torch==2.5.1 torchvision==0.20.1 xformers --index-url https://download.pytorch.org/whl/cu124",
    "pip install https://github.com/bdashore3/flash-attention/releases/download/v2.7.1.post1/flash_attn-2.7.1.post1+cu124torch2.5.1cxx11abiFALSE-cp310-cp310-win_amd64.whl",
    "pip install https://github.com/woct0rdho/triton-windows/releases/download/v3.1.0-windows.post5/triton-3.1.0-cp310-cp310-win_amd64.whl",
    "pip install kaolin -f https://nvidia-kaolin.s3.us-east-2.amazonaws.com/torch-2.5.1_cu124.html",
    "pip install https://github.com/iiiytn1k/sd-webui-some-stuff/releases/download/diffoctreerast/nvdiffrast-0.3.3-py3-none-any.whl",
    "pip install https://github.com/iiiytn1k/sd-webui-some-stuff/releases/download/diffoctreerast/diffoctreerast-0.0.0-cp310-cp310-win_amd64.whl",
    "pip install https://github.com/iiiytn1k/sd-webui-some-stuff/releases/download/diffoctreerast/diff_gaussian_rasterization-0.0.0-cp310-cp310-win_amd64.whl",
    "pip install https://github.com/iiiytn1k/sd-webui-some-stuff/releases/download/diffoctreerast/vox2seq-0.0.0-cp310-cp310-win_amd64.whl",
    "pip install spconv-cu120"
]

def check_and_install():
    installation_results = []

    # Run installation commands
    for command in install_commands:
        try:
            print(f"Starting installation for: {command}")
            subprocess.run(command, shell=True, check=True)
            print(f"Successfully executed: {command}")
            installation_results.append((command, True, None))
        except subprocess.CalledProcessError as e:
            print(f"Error occurred while executing: {command}\n{e}")
            installation_results.append((command, False, str(e)))

    # Verify installed packages
    print("\nVerifying package installations...")
    verification_results = []
    for command in install_commands:
        package_name = command.split()[2] if "install" in command else "Unknown"
        try:
            if package_name != "Unknown":
                pkg_resources.require(package_name)
                verification_results.append((package_name, "✔", None))
            else:
                verification_results.append((package_name, "?", "Cannot verify package name"))
        except pkg_resources.DistributionNotFound as e:
            verification_results.append((package_name, "✘", "Not installed"))
        except Exception as e:
            verification_results.append((package_name, "✘", str(e)))

    # Print results
    print("\nInstallation Results:")
    for result in installation_results:
        status = "✔" if result[1] else "✘"
        print(f"Command: {result[0]} | Status: {status} | Error: {result[2]}")

    print("\nVerification Results:")
    for result in verification_results:
        print(f"Package: {result[0]} | Status: {result[1]} | Details: {result[2]}")

if __name__ == "__main__":
    print("Starting package installation process...")
    check_and_install()
    print("Package installation process completed.")
