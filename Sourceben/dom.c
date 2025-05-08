#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <curl/curl.h>

size_t write_callback(void *ptr, size_t size, size_t nmemb, void *userdata) {
    printf("Received binary JSON: %.*s\n", (int)(size * nmemb), (char *)ptr);
    return size * nmemb;
}

int main() {
    CURL *post_curl = curl_easy_init();
    CURL *get_curl = curl_easy_init();
    CURLcode res;

    const char *json_data = "{\"current\": 72.5, \"flowrate\": 12.3}";

    if (!post_curl || !get_curl) {
        fprintf(stderr, "Failed to initialize curl\n");
        return 1;
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

    curl_easy_cleanup(post_curl);
    curl_slist_free_all(headers);

    // GET loop for client comms
    curl_easy_setopt(get_curl, CURLOPT_URL, "http://localhost:3000/api/data");
    curl_easy_setopt(get_curl, CURLOPT_WRITEFUNCTION, write_callback);

    while (1) {
        res = curl_easy_perform(get_curl);
        if (res != CURLE_OK)
            fprintf(stderr, "GET failed: %s\n", curl_easy_strerror(res));

        sleep(1);
    }

    curl_easy_cleanup(get_curl);
    return 0;
}
