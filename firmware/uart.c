// set up uart for comm / mc and computer

#include <stdint.h>
#include "inits.h"
#include "reg.h"
#include <stdio.h>
#include <string.h>

// PA0 Rx, PA1 Tx
void uartInit() {
  RCGCUART |= 0x01;
  RCGCGPIO |= 0x01;
  
  int wait = 0;
  wait++;
  
  GPIOAFSEL_A |= 0x03;
  GPIODEN_A |= 0x03;
  GPIOPCTL_A |= 0x011;
  
  UARTCTL_0 &= ~0x01;
  UARTIBRD_0 = 104; 
  UARTFBRD_0 = 11;
  
  UARTLCRH_0 = 0x060;
  UARTCC_0 = 0x01;
  
  UARTCTL_0 |= 0x301;
  
}

// UART2: PA7 Tx, PA6 Rx
void bluetoothUartInit() {
  RCGCUART |= (1 << 2);
  RCGCGPIO |= 0x01;
  
  int wait = 0;
  wait++;
  
  GPIOAFSEL_A |= ((1 << 6) | (1 << 7));
  GPIODEN_A |= ((1 << 6) | (1 << 7));
  GPIOPCTL_A |= ((1 << 24) | (1 << 28));
  
  UARTCTL_2 &= ~0x01;
  UARTIBRD_2 = 104; 
  UARTFBRD_2 = 11;
  
  UARTLCRH_2 = 0x060;
  UARTCC_2 = 0x01;
  
  UARTCTL_2 |= 0x301;
  
}

void bluetoothSendChar(char c) {
    // Wait until the UART is ready to transmit
    while (UARTFR_2 & (1 << 5)); // TXFF (Transmit FIFO Full)
    UARTDR_2 = c;
}

void bluetoothSendString(const char* str) {
    while (*str) {
        bluetoothSendChar(*str++);
    }
}

char bluetoothGetChar() {
  while (UARTFR_2 & 0x10);
  printf("%c", (char)UARTDR_2);
  return UARTDR_2;
}

void proccessRequest(char c) {
  if (c == 'l') {
    GPIODATA_F = ~GPIODATA_F;
    bluetoothSendString("Led flipped\n");
  } else if (c == 'p') {
    GPIODATA_L2 = 0xFF;
    pumpOn();
    bluetoothSendString("pump on\n");
  } else if (c == 'k') {
    GPIODATA_L2 = 0x00;
    pumpOff();
    bluetoothSendString("pump off\n");
  } else if (c == 'v') {
    valveOpen();
    bluetoothSendString("valve open\n");
  } else if (c == 'b') {
    valveClose();
    bluetoothSendString("valve closed\n");
  } else if (c == 'r') {
    sendData();
  } else {
    bluetoothSendString("Unknown command\n");
  }
}

void uartSendChar(char c) {
    // Wait until the UART is ready to transmit
    while (UARTFR_0 & (1 << 5)); // TXFF (Transmit FIFO Full)
    UARTDR_0 = c;
}

void uartSendString(const char* str) {
    while (*str) {
        uartSendChar(*str++);
    }
}