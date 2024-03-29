# Stat.ly

This is a Full Stack Application to visualize NBA Stats.

The stack includes a Flask App in the backend and a frontend built with NextJS, TypeScript, and TailwindCSS.

## Prerequisites

Before you start, ensure you have administrative access to your system to install the required software.

### Installing Python

This application requires Python to be installed on your system. If you do not have Python installed, follow the steps below for your operating system.

For Windows:

1. Download the latest Python installer from https://www.python.org/downloads/windows/.
2. Run the installer. Ensure you check the option that says "Add Python X.X to PATH" before clicking on Install Now.
3. After installation, open Command Prompt and type python --version to verify the installation.

For macOS:

1. You can install Python using Homebrew (a package manager for macOS). If you don't have Homebrew installed, open Terminal and run:
   `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

2. Then, install Python by running:
   `brew install python`

3. Verify the installation by typing `python3 --version` in the Terminal.

For Linux (Debian/Ubuntu):

1. Open Terminal and update the package list:
   `sudo apt update`

2. Install Python by running:
   `sudo apt install python3 python3-pip`

3. Verify the installation with `python3 --version`.

### Installing pip

pip is a package manager for Python packages. If you've followed the Python installation steps above, pip should have been installed automatically.

To verify pip installation, type pip --version (Windows) or pip3 --version (macOS/Linux) in your terminal or command prompt. If pip is not installed, please refer to the Python installation guide again or visit https://pip.pypa.io/en/stable/installation/ for detailed instructions.

## Setup

1. Clone the Monorepo

- `git clone <REPOSITORY_URL>`

### Start API

1. Navigate to the App Directory

- `cd stat.ly/api`

2. Create a Virtual Environment (Recommended, but optional)

- `python3 -m venv venv  # On macOS/Linux`

- `python -m venv venv  # On Windows`

3. Activate the Virtual Environment

- `source venv/bin/activate  # On macOS/Linux`

- `.\venv\Scripts\activate  # On Windows`

4. Set the Flask app and environment variables:

- `export FLASK_APP=app.py  # On macOS/Linux`
- `export FLASK_ENV=development  # On macOS/Linux`

OR

- `set FLASK_ENV=app.py  # On Windows`
- `set FLASK_ENV=development  # On Windows`

5. Run the Flask app:

- `flask run`

### Start Frontend

1. Navigate to the Frontend directory

- `cd ../frontend`

2. Install dependencies:

- `npm install`

3. Run the Frontend App:

- `npm run dev`

### Run the App in Browser

1. Go to http://localhost:3000
