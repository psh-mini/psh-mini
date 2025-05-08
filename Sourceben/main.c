// main.c

#include <stdint.h>
#include <stdio.h>
#include "inits.h"
#include "reg.h"

uint32_t ADC_value;
const int task = 1;  // 0 for task1a, 1 for task2b

int main(void) {
  // Select system clock frequency preset
  enum frequency freq = PRESET2; // 60 MHz
  PLL_Init(freq);        // Set system clock frequency to 60 MHz
  LED_Init();            // Initialize the 4 onboard LEDs (GPIO)
  ADCReadPot_Init();     // Initialize ADC0 to read from the potentiometer
  TimerADCTriger_Init(); // Initialize Timer0A to trigger ADC0
  GPIO_init();           // Initialize on board switches
  float resistance, temp;
  while(1) {
    if (!task) {  // task1a
      // STEP 5: Change the pattern of LEDs based on the resistance.
      // 5.1: Convert ADC_value to resistance in kilo-ohm
      resistance = ADC_value / 4095.0 * 10;
      // 5.2: Change the pattern of LEDs based on the resistance
      if (resistance < 2.5) {
        GPIODATA_F = 0x0;
        GPIODATA_N = 0x2;
      } else if (resistance < 5.0) {
        GPIODATA_F = 0x0;
        GPIODATA_N = 0x3;
      } else if (resistance < 7.5) {
        GPIODATA_F = 0x10;
        GPIODATA_N = 0x3;
      } else {
        GPIODATA_F = 0x11;
        GPIODATA_N = 0x3;
      }
    } else {  // task1b
      temp = 147.5 - ((75 * (VREFP - VREFN) * ADC_value) / 4096.0);
      printf("%f\n", temp);
    }
  }
    
  return 0;
}

// ADC interrupt
#pragma call_graph_root = "interrupt"
__weak void ADC0SS3_Handler(void) {
  // STEP 4: Implement the ADC ISR.
  // 4.1: Clear the ADC0 interrupt flag
  ADCISC_0 |= 0x8;
  // 4.2: Save the ADC value to global variable ADC_value
  ADC_value = ADCSSFIFO3_0;
}

// GPIO interrupt to change clock frequency
#pragma call_graph_root = "interrupt"
__weak void SW_Handler(void) {
  if (GPIORIS_J & 0x01) {  // switch 1 was pressed
    enum frequency freq2 = PRESET3; // 12 MHz
    PLL_Init(freq2);        
  } else if (GPIORIS_J & 0x02) {  // switch 2 was pressed
    enum frequency freq2 = PRESET1; // 120 MHz
    PLL_Init(freq2);  
  }
  GPIOICR_J |= 0x3; // clear flag
}
