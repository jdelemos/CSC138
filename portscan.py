# Script Name: PortScanner.py
# Author: Jonathon Delemos
# Course: CSC 138 - 04
# Date: 04/04/2024
# Description: This script performs a port scan on a given hostname within a specified range of ports and protocol.
# It aims to identify open ports and tries to resolve the service name running on those ports.

import socket
import sys

# Function to create a DNS query packet for UDP port scanning.
def create_dns_query_packet(domain_name):
    """
    Constructs a DNS query packet for a given domain name.

    :param domain_name: The domain name to query about.
    :return: A bytes object representing the DNS query packet.
    """
    dns_query_header = b'\x00\x00\x01\x00\x00\x01\x00\x00\x00\x00\x00\x00'  # Standard DNS query header
    dns_query_body = b''
    for part in domain_name.split('.'):
        dns_query_body += bytes([len(part)]) + part.encode()
    dns_query_body += b'\x00\x00\x01\x00\x01'  # Standard DNS query footer
    return dns_query_header + dns_query_body

# Function to send a UDP query and check if the port is open.
def check_udp_port(socket_obj, target, port, query_packet):
    """
    Sends a UDP query to a specified port and checks if it's open.

    :param socket_obj: The socket object used for communication.
    :param target: The target hostname or IP address.
    :param port: The target port number.
    :param query_packet: The query packet to be sent.
    :return: True if the port is open, False otherwise.
    """
    try:
        socket_obj.sendto(query_packet, (target, port))
        socket_obj.recvfrom(1024)  # Waiting for any kind of reply
        return True
    except socket.timeout:  # No reply received
        return False
    except Exception as e:  # Any other exception
        return False

# Main function for scanning ports on the specified host and protocol.
def scan_ports(target_host, protocol, start_port, end_port):
    """
    Scans a range of ports on a given host for a specified protocol.

    :param target_host: The target hostname or IP address to scan.
    :param protocol: The protocol to use for scanning ("tcp" or "udp").
    :param start_port: The starting port number of the scan range.
    :param end_port: The ending port number of the scan range.
    """
    socket_type = socket.SOCK_STREAM if protocol == "tcp" else socket.SOCK_DGRAM

    for port in range(start_port, end_port + 1):
        with socket.socket(socket.AF_INET, socket_type) as sock:
            sock.settimeout(1)
            if protocol == "udp":
                if port == 53:  # Special handling for DNS query
                    dns_query = create_dns_query_packet(target_host)
                    port_open = check_udp_port(sock, target_host, port, dns_query)
                else:
                    port_open = check_udp_port(sock, target_host, port, b'\x00')
            else:  # TCP scan
                connection_result = sock.connect_ex((target_host, port))
                port_open = connection_result == 0

            if port_open:
                try:
                    service_name = socket.getservbyport(port, protocol)
                    print(f"Port {port} open: {service_name}")
                except OSError:
                    print(f"Port {port} open: Service name unavailable")
            else:
                print(f"Port {port} closed: Service name unavailable")

# Entry point of the script
if __name__ == "__main__":
    if len(sys.argv) != 5:
        print("usage: python3 portscanner.py <hostname> <protocol> <start_port> <end_port>")
        sys.exit(1)

    hostname = sys.argv[1]
    scan_protocol = sys.argv[2].lower()
    low_port = int(sys.argv[3])
    high_port = int(sys.argv[4])
    
    print(f"scanning host={hostname}, protocol={scan_protocol}, ports: {low_port} -> {high_port}")
    
    # Validate input parameters
    try:
        resolved_host = socket.gethostbyname(hostname)
    except socket.gaierror:
        print(f"error: host '{hostname}' does not exist.")
        sys.exit(1)

    if scan_protocol not in ["tcp", "udp"]:
        print(f"error: invalid protocol '{scan_protocol}'. use 'tcp' or 'udp'.")
        sys.exit(1)

    if not (0 <= low_port <= 65535) or not (0 <= high_port <= 65535) or low_port > high_port:
        print("Error: Invalid port range. Please specify ports between 0 and 65535.")
        sys.exit(1)

    # Start scanning
    scan_ports(hostname, scan_protocol, low_port, high_port)
