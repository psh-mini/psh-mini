#include "reg.h"
#include <stdint.h>
#include "PLL_Header.h"
#include <stdio.h>


volatile int ADC_value = 0;


void ADC_Init(void) {
  // STEP 2: Initialize ADC0 SS3.
  // 2.1: Enable the ADC0 clock
  RCGCADC |= 0x01;
  // 2.2: Delay for RCGCADC (Refer to page 1073)
  int delayBoii = 0;
  delayBoii++;
  // 2.3: Power up the PLL (if not already)
  PLLFREQ0 |= 0x00800000; // we did this for you, thank you
  // 2.4: Wait for the PLL to lock
  while (PLLSTAT != 0x1); // we did this for you, thank you
  // 2.5: Configure ADCCC to use the clock source defined by ALTCLKCFG
  ADCCC0 |= 0x01;
  // 2.6: Enable clock to the appropriate GPIO Modules (Hint: Table 15-1)
  RCGCGPIO |= 0x10; //E
  // 2.7: Delay for RCGCGPIO
  delayBoii++;
  delayBoii++;
  // 2.8: Set the GPIOAFSEL bits for the ADC input pins
  GPIOAFSEL_E |= 0x08; //pin E3
   // 2.9: Clear the GPIODEN bits for the ADC input pins
  GPIODEN_E &= ~0x08;
  // 2.10: Disable the analog isolation circuit for ADC input pins (GPIOAMSEL)
  GPIOAMSEL_E |= 0x08;
  // 2.11: Disable sample sequencer 3 (SS3)
  ADCACTSS0_3 &= ~0x8;
  // 2.12: Select timer as the trigger for SS3
  ADCEMUX0_3 |= 0x5000;
  // 2.13: Select the analog input channel for SS3 (Hint: Table 15-1)
  ADCSSMUX0_3 = 0x0;
  ADCSSEMUX0_3 = 0x0;
  // 2.14: Configure ADCSSCTL3 register
  ADCSSCTL0_3 = 0x6;  //bit 3 controls analog input(0) vs temp input(1)

  // 2.15: Set the SS3 interrupt mask
  ADCIM0 |= 0x8;
  // 2.16: Set the corresponding bit for ADC0 SS3 in NVIC
  EN0 |= (1<<17);
  // 2.17: Enable ADC0 SS3
  ADCACTSS0_3 |= 0x8;
}

void TimerADCTriger_Init(void) {
  
  RCGCTIMER = 0x1; // turn on timer 0
  int actualDelay = 2;
  actualDelay++;
  
  GPTMCTL_0 &= ~0x01; // clear bit 0 to disable subtimer A
  GPTMCTL_0 |= (1 << 5); // enable ADC trigger
  GPTMCFG_0 = 0x00000000;
  GPTMTAMR_0A = 0x2;  // periodic
  GPTMTAILR_0 = 1600000;  // 0.1 sec
  EN0 &= ~(1 << 19); // disable interrupts
  GPTMIMR_0 &= ~0x01; // disable interrupts
  
  GPTMADCEV_0 |= 0x1; //interupt by timeout event
  GPTMCTL_0 |= 0x1;
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



