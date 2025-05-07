/**
 * EE/CSE 474: Lab3 drivers starter code
 */

#include "PLL_Header.h"
#include "inits.h"

// STEP 0a: Include your living header file here
// YOUR CUSTOM HEADER FILE HERE
#include "reg.h"
const int task1 = 1;  // 0 for task1a, 1 for task2b

int PLL_Init(enum frequency freq) {
    // Do NOT modify this function.
    MOSCCTL &= ~(0x4);                      // Power up MOSC
    MOSCCTL &= ~(0x8);                      // Enable MOSC
    while ((RIS & 0x100) == 0) {};          // Wait for MOSC to be ready
    RSCLKCFG |= (0x3 << 20);                // Select MOSC as system clock source
    RSCLKCFG |= (0x3 << 24);                // Select MOSC as PLL clock source

    PLLFREQ0 |= 0x60;                       // Set MINT field
    PLLFREQ1 |= 0x4;                        // Set N field

    MEMTIM0 &= ~((0xF << 22) | (0xF << 6));     // Reset FBCHT and EBCHT
    MEMTIM0 &= ~((0xF << 16) | (0xF << 0));     // Reset EWS and FWS
    MEMTIM0 &= ~((0x1 << 21) | (0x1 << 5));     // Reset FBCE and EBCE

    RSCLKCFG &= ~(0x1 << 28);                   // Temporarilly bypass PLL

    switch (freq) {
        case 120:
            MEMTIM0 |= (0x6 << 22) | (0x6 << 6);    // Set FBCHT and EBCHT
            MEMTIM0 |= (0x5 << 16) | (0x5 << 0);    // Set EWS and FWS
            RSCLKCFG |= 0x3;                        // Set PSYSDIV to use 120 MHZ clock
            RSCLKCFG &= ~0x3FC;                     // Update PSYSDIV field
            break;
        case 60:
            MEMTIM0 |= (0x3 << 22) | (0x3 << 6);    // Set FBCHT and EBCHT
            MEMTIM0 |= (0x2 << 16) | (0x2 << 0);    // Set EWS and FWS
            RSCLKCFG |= 0x7;                        // Set PSYSDIV to use 60 MHZ clock
            RSCLKCFG &= ~0x3F8;                     // Update PSYSDIV field
            break;
        case 12:
            MEMTIM0 |= (0x1 << 21) | (0x1 << 5);    // Set FBCE and EBCE
            RSCLKCFG |= 0x27;                       // Set PSYSDIV to use 12 MHZ clock
            RSCLKCFG &= ~0x3D8;                     // Update PSYSDIV field
            break;
        default:
            return -1;
    }

    RSCLKCFG |= (0x1 << 30);                // Enable new PLL settings
    PLLFREQ0 |= (0x1 << 23);                // Power up PLL
    while ((PLLSTAT & 0x1) == 0) {};        // Wait for PLL to lock and stabilize

    RSCLKCFG |= (0x1u << 31) | (0x1 << 28);  // Use PLL and update Memory Timing Register
    return 1;
}

void LED_Init(void) {
  // STEP 1: Initialize the 4 on board LEDs by initializing the corresponding
  // GPIO pins.

  // YOUR CODE HERE
  volatile unsigned short delay = 0;
  delay = 2;
  RCGCGPIO |= 0x020; // Enable PortF
  RCGCGPIO |= 0x1000; // Enable PortN
  delay++; // Delay 2 more cycles before access Timer registers
  delay++; // Refer to Page. 756 of Datasheet for info
  
  //LED D4 and D3
  GPIODIR_F = 0x11; // Set PF0 and PF4 to output
  GPIODEN_F = 0x11; // Set PF0 and PF4 to digital port
  
  //LED D2 and D1
  GPIODIR_N = 0x3; // Set PN0 to output and maybe also PN1
  GPIODEN_N = 0x3; // Set PN0 to digital port and maybe also PN1
  GPIODATA_N0 = 0x0;
}

void ADCReadPot_Init(void) {
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
  if (task1) {
    ADCSSCTL0_3 |= (1 << 3);  // read temperature sensor for task1b
    ADCSSTSH3_0 = 0x6;  // 32 period sample width
  }
  // 2.15: Set the SS3 interrupt mask
  ADCIM0 |= 0x8;
  // 2.16: Set the corresponding bit for ADC0 SS3 in NVIC
  EN0 |= (1<<17);
  // 2.17: Enable ADC0 SS3
  ADCACTSS0_3 |= 0x8;
}

void TimerADCTriger_Init(void) {
  // STEP 3: Initialize Timer0A to trigger ADC0 at 1 HZ.
  // Hint: Refer to section 13.3.7 of the datasheet
  
  // YOUR CODE HERE
  RCGCTIMER = 0x1; // turn on timer 0
  int actualDelay = 2;
  actualDelay++;
  
  // timer 0 (task a)
  GPTMCTL_0 &= ~0x01; // clear bit 0 to disable subtimer A
  GPTMCTL_0 |= (1 << 5); // enable ADC trigger
  GPTMCFG_0 = 0x00000000;
  GPTMTAMR_0A = 0x2;  // periodic
  GPTMTAILR_0 = 16000000;  // 1 sec
  EN0 &= ~(1 << 19); // disable interrupts
  GPTMIMR_0 &= ~0x01; // disable interrupts
  
  GPTMADCEV_0 |= 0x1; //interupt by timeout event
  GPTMCTL_0 |= 0x1;
}

void GPIO_init() {
  RCGCGPIO |= (1 << 8); 
  int wait = 0;
  wait++;
  // on-board input buttons (port J)
  GPIODIR_J = 0x0; // Set to input
  GPIODEN_J = 0x3; // Set PJ0,1 to digital port
  GPIOPUR_J = 0x3; // pull up resistors
  GPIOPDR_J = 0x0;
  // set up interrupts for port J
  GPIOIS_J &= ~0x3; // edge sensitive 
  GPIOIBE_J &= ~0x3; // trigger is controlled by IEV
  GPIOIEV_J = ~0x3; // falling edge trigger (sw are active low)
  GPIOICR_J |= 0x3; // clear any prior interrupt
  GPIOIMR_J |= 0x3; // unmask interrupt
  EN1 |= (1 << 19); // enable interrupt
}

// NEXT STEP: Go to Lab3_Task1a.c and finish implementing ADC0SS3_Handler
