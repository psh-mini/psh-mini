#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <fcntl.h>
#include <termios.h>
#include <curl/curl.h>
#include <unistd.h>

#define SERIAL_PORT "/dev/tty.HC-06"  // Change to your Bluetooth port
#define BAUDRATE B9600
#define BUFFER_SIZE 1024

void sendToServer(char* json_data);

char response_buffer[BUFFER_SIZE];
size_t response_size = 0;

size_t write_callback(void *ptr, size_t size, size_t nmemb, void *userdata) {
    size_t total_size = size * nmemb;
    if (total_size + response_size < BUFFER_SIZE) {
        memcpy(response_buffer + response_size, ptr, total_size);
        response_size += total_size;
        response_buffer[response_size] = '\0'; // Null-terminate
    }
    return total_size;
}



int setup_serial(const char *device) {
    int fd = open(device, O_RDWR | O_NOCTTY | O_SYNC);
    if (fd < 0) {
        perror("open");
        return -1;
    }

    struct termios tty;
    if (tcgetattr(fd, &tty) != 0) {
        perror("tcgetattr");
        return -1;
    }

    cfsetospeed(&tty, BAUDRATE);
    cfsetispeed(&tty, BAUDRATE);

    tty.c_cflag = (tty.c_cflag & ~CSIZE) | CS8;  // 8 data bits
    tty.c_iflag &= ~IGNBRK;                      // Disable break processing
    tty.c_lflag = 0;                             // Raw input mode
    tty.c_oflag = 0;                             // Raw output mode
    tty.c_cc[VMIN] = 1;                          // Read at least 1 character
    tty.c_cc[VTIME] = 5;                         // Timeout after 0.5 seconds

    tty.c_iflag &= ~(IXON | IXOFF | IXANY);      // Disable XON/XOFF flow control
    tty.c_cflag |= (CLOCAL | CREAD);             // Enable receiver, local mode
    tty.c_cflag &= ~(PARENB | PARODD);           // No parity, 1 stop bit
    tty.c_cflag &= ~CSTOPB;
    tty.c_cflag &= ~CRTSCTS;                     // Disable RTS/CTS flow control

    if (tcsetattr(fd, TCSANOW, &tty) != 0) {
        perror("tcsetattr");
        return -1;
    }

    return fd;
}

void send_data(int fd, const char *data) {
    write(fd, data, strlen(data));  // Send data over the serial port
}

void receive_data(int fd) {
    char buf[128];
    int n = read(fd, buf, sizeof(buf) - 1);  // Read data from serial port
    if (n > 0) {
        buf[n] = '\0';  // Null terminate the received data
        printf("Received: %s\n", buf);  // Print the received data

        // MAKE SURE SERVER IS RUNNING
        if(buf[0] == '{') {
            printf("sending data to server");
            sendToServer(buf);
        }
    }
}

void sendToServer(char* json_data) {
    CURL *post_curl = curl_easy_init();
    CURL *get_curl = curl_easy_init();
    CURLcode res;

    if (!post_curl || !get_curl) {
        fprintf(stderr, "Failed to initialize curl\n");
        return;
    }

    // Post - send data to server.
    struct curl_slist *headers = NULL;
    headers = curl_slist_append(headers, "Content-Type: application/json");

    curl_easy_setopt(post_curl, CURLOPT_URL, "http://localhost:3000/api/data");
    curl_easy_setopt(post_curl, CURLOPT_POSTFIELDS, json_data);
    curl_easy_setopt(post_curl, CURLOPT_HTTPHEADER, headers);

    res = curl_easy_perform(post_curl);
    if (res != CURLE_OK)
        fprintf(stderr, "POST failed: %s\n", curl_easy_strerror(res));
    
    printf("data sent successfully");

    curl_easy_cleanup(post_curl);
    curl_slist_free_all(headers);
}



int main() {
    CURLcode res;
    CURL *get_curl = curl_easy_init();


    int serial_fd = setup_serial(SERIAL_PORT);
    if (serial_fd < 0) return 1;

    printf("Serial communication started. Type data to send to the device.\n");

    char input[128];

    curl_easy_setopt(get_curl, CURLOPT_URL, "http://localhost:3000/api/data");
    curl_easy_setopt(get_curl, CURLOPT_WRITEFUNCTION, write_callback);

    while (1) {
        //clear response  before performing curl
        response_size = 0;
        response_buffer[0] = '\0';

        // get from server
        res = curl_easy_perform(get_curl);
        printf("Result code: %d (%s)\n", res, curl_easy_strerror(res));

        if (res != CURLE_OK)
            fprintf(stderr, "GET failed: %s\n", curl_easy_strerror(res));

            int valve_on = 0, pump_on = 0;

        if (strstr(response_buffer, "\"valve\":true")) {
            valve_on = 1;
        }
        if (strstr(response_buffer, "\"pump\":true")) {
            pump_on = 1;
        }

        const char* toSendValve = valve_on ? "v" : "b";
        printf("valveon?: ");
        //printf(str(toSend));
        send_data(serial_fd, toSendValve);
        printf("sent valve data and sleeping");

        receive_data(serial_fd);

        //sleep(1);
        const char* toSendPump = pump_on ? "p" : "k";
        send_data(serial_fd, toSendPump);
        printf("sent pump data");

        receive_data(serial_fd);

        send_data(serial_fd, "r");
        receive_data(serial_fd);
        
        // printf("Send: ");
        // if (fgets(input, sizeof(input), stdin) != NULL) {
        //     input[strcspn(input, "\n")] = '\0';  // Remove newline character

        //     if (strlen(input) > 0) {
        //         send_data(serial_fd, input);  // Send the user input to the device
        //         printf("Sent: %s\n", input);
        //     }
        // }

        // Read data from the serial port (incoming data from device)
        //receive_data(serial_fd);
        sleep(5);
    }

    close(serial_fd);
    return 0;
}
