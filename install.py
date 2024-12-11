import subprocess
import sys
import pkg_resources
import re
import os

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

# Mapping of custom commands to package names
custom_package_map = {
    "https://github.com/bdashore3/flash-attention/releases/download/v2.7.1.post1/flash_attn-2.7.1.post1+cu124torch2.5.1cxx11abiFALSE-cp310-cp310-win_amd64.whl": "flash_attn",
    "https://github.com/woct0rdho/triton-windows/releases/download/v3.1.0-windows.post5/triton-3.1.0-cp310-cp310-win_amd64.whl": "triton",
    "https://github.com/iiiytn1k/sd-webui-some-stuff/releases/download/diffoctreerast/nvdiffrast-0.3.3-py3-none-any.whl": "nvdiffrast",
    "https://github.com/iiiytn1k/sd-webui-some-stuff/releases/download/diffoctreerast/diffoctreerast-0.0.0-cp310-cp310-win_amd64.whl": "diffoctreerast",
    "https://github.com/iiiytn1k/sd-webui-some-stuff/releases/download/diffoctreerast/diff_gaussian_rasterization-0.0.0-cp310-cp310-win_amd64.whl": "diff_gaussian_rasterization",
    "https://github.com/iiiytn1k/sd-webui-some-stuff/releases/download/diffoctreerast/vox2seq-0.0.0-cp310-cp310-win_amd64.whl": "vox2seq",
    "git+https://github.com/EasternJournalist/utils3d.git@9a4eb15e4021b67b12c460c7057d642626897ec8": "utils3d"
}

def extract_package_name(command):
    """
    Extracts the package name from a pip command with improved logic.
    
    Args:
        command (str): The pip installation command
    
    Returns:
        str: Extracted package name or None if it cannot be determined
    """
    # First check custom mapping
    if command in custom_package_map:
        return custom_package_map[command]
    
    # Remove --index-url and other flags
    command = re.sub(r'--\w+\s+[^\s]+', '', command)
    
    # Handle wheel files
    if command.endswith('.whl'):
        filename = os.path.basename(command)
        match = re.match(r'([^-]+)', filename)
        if match:
            return match.group(1)
    
    # Handle git+ repositories
    if command.startswith('pip install git+'):
        match = re.search(r'github\.com/([^/]+/[^/]+)', command)
        if match:
            return match.group(1).split('/')[-1]
    
    # Handle standard pip install commands
    match = re.search(r'pip install\s+([^\s=]+)(?:==\d+\.\d+\.\d+)?', command)
    if match:
        return match.group(1)
    
    # Fallback
    return None


def verify_package_installed(package_name):
    """
    Verify if a package is installed using pkg_resources or check for Git-based installation.
    
    Args:
        package_name (str): The name of the package to verify.
    
    Returns:
        tuple: (bool, str) where bool indicates if installed, and str is version or error message.
    """
    # Special handling for Git-based packages (checking the directory)
    if package_name == "utils3d":
        # Check if the utils3d package is installed from the correct commit hash
        package_path = os.path.join(sys.prefix, "lib", "site-packages", "utils3d")
        if os.path.exists(package_path):
            try:
                # Check for the presence of a commit hash file or verify it from the repository
                git_info_path = os.path.join(package_path, ".git", "HEAD")  # Look for .git/HEAD to confirm it's a Git install
                if os.path.exists(git_info_path):
                    with open(git_info_path, 'r') as f:
                        head_info = f.read().strip()
                    if 'ref: refs/heads' in head_info:
                        return True, f"Installed from Git commit {package_name.split('@')[-1]}"
                    else:
                        return True, "Installed (Git-based package without specific commit)"
                else:
                    return False, "Not installed (Git-based package without Git information)"
            except Exception as e:
                return False, str(e)
        else:
            return False, "Not installed (Git-based package not found)"
    
    # Fallback to regular package checking for non-Git packages
    try:
        dist = pkg_resources.get_distribution(package_name)
        return True, f"Version: {dist.version}"
    except pkg_resources.DistributionNotFound:
        return False, "Not installed"
    except Exception as e:
        return False, str(e)



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

    # Map installed packages with their command-extracted names
    for command in install_commands:
        package_name = extract_package_name(command)
        try:
            if package_name:
                is_installed, details = verify_package_installed(package_name)
                status = "✔" if is_installed else "✘"
                verification_results.append((package_name, status, details))
            else:
                verification_results.append((command, "?", "Cannot determine package name, verify manually"))
        except Exception as e:
            verification_results.append((package_name or command, "✘", str(e)))

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
