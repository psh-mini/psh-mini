// main.c

#include <stdint.h>
#include <stdio.h>
#include "inits.h"
#include "reg.h"


int main(void) {
  
  enum frequency freq = PRESET4; // 20 MHz
  PLL_Init(freq);        // Set system clock frequency to 60 MHz
  LED_Init();       
  ADC_Init();  
  timerInit();
  TimerADCTriger_Init(); 
  GPIO_init();          
  bluetoothUartInit();
  //GPTMCTL_0 |= 0x01; // start tim0

  while(1) { 
    
    char c = bluetoothGetChar();
    proccessRequest(c);
    //bluetoothSendChar(c); 
  }

  return 0;
}

