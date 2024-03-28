#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <time.h>

#define SERVER_PORT 12000
#define BUFFER_SIZE 1024
#define PACKET_LOSS_RATE 0.3

int main() {
    int sockfd;
    struct sockaddr_in server_addr, client_addr;
    char buffer[BUFFER_SIZE];
    socklen_t client_addr_len;
    ssize_t message_len;

    // Seed the random number generator
    srand(time(NULL));

    // Create a UDP socket
    sockfd = socket(AF_INET, SOCK_DGRAM, 0);
    if (sockfd < 0) {
        perror("Error creating socket");
        return 1;
    }

    // Zero out the structure
    memset(&server_addr, 0, sizeof(server_addr));

    // Server address configuration
    server_addr.sin_family = AF_INET;
    server_addr.sin_addr.s_addr = htonl(INADDR_ANY); // Listen on all network interfaces
    server_addr.sin_port = htons(SERVER_PORT);

    // Bind the socket to the server address
    if (bind(sockfd, (struct sockaddr *)&server_addr, sizeof(server_addr)) < 0) {
        perror("Bind failed");
        close(sockfd);
        return 1;
    }

    printf("UDP server listening on port %d\n", SERVER_PORT);

    while (1) {
        client_addr_len = sizeof(client_addr);
        // Receive message from client
        message_len = recvfrom(sockfd, buffer, BUFFER_SIZE, 0, (struct sockaddr *)&client_addr, &client_addr_len);
        if (message_len < 0) {
            perror("Error receiving message");
            continue;
        }

        buffer[message_len] = '\0'; // Null-terminate the received data
        printf("Received from %s: %s\n", inet_ntoa(client_addr.sin_addr), buffer);

        // Simulate packet loss
        if ((float)rand() / RAND_MAX < PACKET_LOSS_RATE) {
            printf("Simulating packet loss\n");
            continue; // Skip sending PONG message
        }

        // Send PONG message back to client
        strcpy(buffer, "PONG");
        if (sendto(sockfd, buffer, strlen(buffer), 0, (struct sockaddr *)&client_addr, client_addr_len) < 0) {
            perror("Error sending message");
            continue;
        }
    }

    // Close the socket (unreachable code as is)
    close(sockfd);
    return 0;
}
