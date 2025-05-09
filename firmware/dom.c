#include <stdio.h>
#include <string.h>
#include <curl/curl.h>
#include <windows.h>

int main(void) {
    CURL *curl;
    CURLcode res;

    HANDLE hSerial;
    DCB dcbSerialParams = {0};
    COMMTIMEOUTS timeouts = {0};
    char buffer[128];
    DWORD bytesRead;
    float current, flowrate;
    char json_data[128];

    // Open COM3
    hSerial = CreateFile("\\\\.\\COM3", GENERIC_READ | GENERIC_WRITE, 0, NULL,
                         OPEN_EXISTING, 0, NULL);
    if (hSerial == INVALID_HANDLE_VALUE) {
        perror("Error opening COM3");
        return 1;
    }

    // Set device parameters (baud rate, etc.)
    dcbSerialParams.DCBlength = sizeof(dcbSerialParams);
    GetCommState(hSerial, &dcbSerialParams);
    dcbSerialParams.BaudRate = CBR_115200;
    dcbSerialParams.ByteSize = 8;
    dcbSerialParams.StopBits = ONESTOPBIT;
    dcbSerialParams.Parity   = NOPARITY;
    SetCommState(hSerial, &dcbSerialParams);

    // Set timeouts
    timeouts.ReadIntervalTimeout         = 50;
    timeouts.ReadTotalTimeoutConstant   = 50;
    timeouts.ReadTotalTimeoutMultiplier = 10;
    SetCommTimeouts(hSerial, &timeouts);

    // Read a line
    DWORD totalRead = 0;
    do {
        ReadFile(hSerial, buffer + totalRead, 1, &bytesRead, NULL);
        if (bytesRead == 0) break;
        totalRead += bytesRead;
    } while (buffer[totalRead - 1] != '\n' && totalRead < sizeof(buffer) - 1);

    buffer[totalRead] = '\0';

    sscanf(buffer, "%f %f", &current, &flowrate);
    snprintf(json_data, sizeof(json_data),
             "{\"current\": %.2f, \"flowrate\": %.2f}", current, flowrate);

    CloseHandle(hSerial);

   // const char *json_data = "{\"current\": 72.5, \"flowrate\": 12.3}";

    curl_global_init(CURL_GLOBAL_ALL);
    curl = curl_easy_init();
    if(curl) {
        struct curl_slist *headers = NULL;
        headers = curl_slist_append(headers, "Content-Type: application/json");

        curl_easy_setopt(curl, CURLOPT_URL, "http://localhost:3000/api/data");
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, json_data);
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);

        res = curl_easy_perform(curl);
        if(res != CURLE_OK)
            fprintf(stderr, "curl failed: %s\n", curl_easy_strerror(res));

        curl_easy_cleanup(curl);
        curl_slist_free_all(headers);
    }

    curl_global_cleanup();
    return 0;
}