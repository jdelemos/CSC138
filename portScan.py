import sys
import socket



# Port Scanner
# This script implements a network port scanner for both TCP and UDP protocols.
# The scanner reports the status of services and their associated ports within a specified range.

# Invocation format:
# portScan <hostname> <protocol> <portlow> <porthigh>
# Where:
#   <hostname> - Host name of the machine to run the port scanner on (e.g., ecs-coding2.csus.edu).
#   <protocol> - Protocol to use for scanning, limited to "TCP" or "UDP".
#   <portlow> - Lower bound of the port range to scan, inclusively.
#   <porthigh> - Upper bound of the port range to scan, inclusively.

# The scanner connects to each port within the specified range using the specified protocol
# to determine if the port is open. An open port is indicated by a successful connection attempt.

# For TCP scans, it's important to avoid "half-open" scans. Always close the socket after checking the port status
# to prevent network failures and availability issues.

# The scanner attempts to identify and report the name of the service running on each open port.
# If the service name cannot be determined, it reports "svc name unavail".

# Reference for service names and port numbers: https://www.iana.org/assignments/port-numbers
# Use the socket.getservbyport(port, protocol.lower()) method to identify the service name for a port.

# Use the socket.connect_ex() method for TCP scanning to check port status.
# Documentation for connect_ex(): https://docs.python.org/3/library/socket.html

# Start of the script:
# Define main function and command-line argument parsing logic here.

# Define the port scanning function, incorporating the instructions above.

# Ensure proper usage and error handling throughout the script.

# End of the script: call the main function if the script is run directly.
def portscan(hostname, protocol, portLow, porthigh):
    # Loop through port range
    for port in range(portLow, portHigh + 1):
        # Create socket object
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

        # Set timeout to 1 second
        s.settimeout(1)

        # Check if port is open
        result = s.connect_ex((hostname, port))

        # If port is open
        if result == 0:
            try:
                # Get service name
                service = socket.getservbyport(port, protocol.lower())
            except:
                service = "svc name unavail"
            print(f"Port {port} is open. Service: {service}")
        # Close socket
        s.close()

def main():
    # Check for correct number of arguments
    if len(sys.argv) != 5:
        print("Usage: python portScan.py <hostname> <protocol> <portLow> <porthigh>")
        sys.exit(1)

    # Parse arguments
    hostname = sys.argv[1]
    protocol = sys.argv[2]
    portLow = int(sys.argv[3])
    portHigh = int(sys.argv[4])

    # Check for valid hostname
    try:
        socket.gethostbyname(hostname)
    except socket.gaierror:
        print("Invalid hostname")
        sys.exit(1)

    # Check for valid protocol but convert to lowercase
    if protocol.lower() != "tcp" and protocol.lower() != "udp":
        print("Invalid protocol. Please use TCP or UDP")
        sys.exit(1)


    # Check for valid port range
    if portLow < 0 or portLow > 65535 or portHigh < 0 or portHigh > 65535 or portLow > portHigh:
        print("Invalid port range. Please use ports 0 - 65535")
        sys.exit(1)

    # Call portScan
    portscan(hostname, protocol, portLow, portHigh)

if __name__ == "__main__":
    main()