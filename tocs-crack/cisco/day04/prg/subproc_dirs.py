import subprocess

# Use subprocess to execute the 'dir' command
result = subprocess.run(['dir'], shell=True, capture_output=True, text=True)

# Check if the command executed successfully
if result.returncode == 0:
    # Print the output of the 'dir' command
    print(result.stdout)
else:
    print(f"Error occurred: {result.stderr}")
