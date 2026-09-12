import os
import shutil
import zipfile
import subprocess


PACKAGES = {
    "api": {
        "directory": "lambda-api-package",
        "archive": "lambda-api-deployment.zip",
        "requirements": "requirements-api.txt",
        "files": ["main.py", "db.py", "lambda_handler.py"],
    },
    "db-setup": {
        "directory": "lambda-db-setup-package",
        "archive": "lambda-db-setup-deployment.zip",
        "requirements": "requirements-db-setup.txt",
        "files": ["seed_db.py", "seed_data.py"],
    },
}


def build_package(name, config):
    package_directory = config["directory"]
    archive = config["archive"]

    if os.path.exists(package_directory):
        shutil.rmtree(package_directory)
    if os.path.exists(archive):
        os.remove(archive)

    os.makedirs(package_directory)

    print(f"Installing {name} dependencies for Lambda runtime...")
    subprocess.run(
        [
            "docker",
            "run",
            "--rm",
            "-v",
            f"{os.getcwd()}:/var/task",
            "--platform",
            "linux/amd64",
            "--entrypoint",
            "",
            "public.ecr.aws/lambda/python:3.12",
            "/bin/sh",
            "-c",
            (
                "pip install --no-cache-dir --no-compile "
                f"--target /var/task/{package_directory} "
                f"-r /var/task/{config['requirements']} "
                "--platform manylinux2014_aarch64 --implementation cp "
                "--python-version 3.12 --only-binary=:all: --upgrade"
            ),
        ],
        check=True,
    )

    print(f"Copying {name} application files...")
    for file in config["files"]:
        if os.path.exists(file):
            shutil.copy2(file, f"{package_directory}/")

    print(f"Creating {archive}...")
    with zipfile.ZipFile(archive, "w", zipfile.ZIP_DEFLATED) as zipf:
        for root, _, files in os.walk(package_directory):
            for file in files:
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, package_directory)
                zipf.write(file_path, arcname)

    size_mb = os.path.getsize(archive) / (1024 * 1024)
    print(f"✓ Created {archive} ({size_mb:.2f} MB)")


def main():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    print("Creating Lambda deployment packages...")
    for name, config in PACKAGES.items():
        build_package(name, config)


if __name__ == "__main__":
    main()
