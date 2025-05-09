#include <stdint.h>
#include "inits.h"
#include "reg.h"
#include <stdio.h>

int count;
float flow;

void GPIO_init() {
  RCGCGPIO |= (1 << 8); 
  int wait = 0;
  wait++;

  // port L
  // PL2 -> pump relay
  volatile unsigned short delay = 0;
  RCGCGPIO |= 0x400; // activate clock for Port L
  delay++;
  delay++;
  GPIODIR_L |= 0x1C; // set PL2, 3, 4 to output
  GPIODEN_L |= 0x1F; // enable digital output on PL4-0
  
  // PL0, 1 -> flow rate sensors
  GPIODIR_L &= ~0x3; // Set 0, 1 to input
  GPIODEN_L |= 0x3; // Set PL0,1 to digital port
  GPIOPUR_L &= ~0x3; // pull up resistors off
  GPIOPDR_L = 0x0;
  // set up interrupts for port L
  GPIOIS_L &= ~0x3; // edge sensitive 
  GPIOIBE_L &= ~0x3; // trigger is controlled by IEV
  GPIOIEV_L = ~0x3; // falling edge trigger (sw are active low)
  GPIOICR_L |= 0x3; // clear any prior interrupt
  GPIOIMR_L |= 0x3; // unmask interrupt
  EN1 |= (1 << 21); // enable interrupt #53
  
    //LED D4 and D3
  RCGCGPIO |= (1 << 5);
  GPIODIR_F = 0x11; // Set PF0 and PF4 to output
  GPIODEN_F = 0x11; // Set PF0 and PF4 to digital port
}

void LED_Init(void) {
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

void pumpOn() {
  // pump uses PL2
  GPIODATA_L2 = 0xFF;
}

void pumpOff() {
  GPIODATA_L2 = 0x0;
}

// valve uses PL3
void valveOpen() {
  GPIODATA_L3 = 0xFF;
}

void valveClose() {
  GPIODATA_L3 = 0x00;
}

// calculate flow every so many seconds
#pragma call_graph_root = "interrupt"
__weak void Timer1A_Handler() {
  GPTMICR_1 |= 0x01; // clear interrupt
    flow = ((count / 5.0)) / 5.0;
    count = 0;
}

// counts pulses from flow rate sensors
#pragma call_graph_root = "interrupt"
__weak void PortL_Handler() {
  count++;
  GPIOICR_L |= 0x3;
  int wait = 0;
  wait++;
}