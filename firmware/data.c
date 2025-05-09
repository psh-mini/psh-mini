#include <stdint.h>
#include "inits.h"
#include "reg.h"
#include <stdio.h>

#define R 220.0f

float getPower() {
  float voltage = (float)ADC_value * 3.3 / 4095.0;
  return voltage * voltage / (float)R;  // R defined above
}

int getValve() {
  return (GPIODATA_L3 != 0);
}

int getPump() {
  return (GPIODATA_L2 != 0);
}

void sendData() {
  int currVal = ADCSSFIFO3_0;
  float voltage = currVal * 3.3 / 4095.0;
  printf("ADC_value: %d\n", currVal);
  float power = voltage * voltage / (float)R * 1000.0;  // R defined above, power in mW
  //float power = getPower();
  int pump = getPump();
  int valve = getValve();
  char c[150];
  snprintf(c, sizeof(c), "{\"power\": %f, \"flowrate\": %f, \"valve\": %d, \"pump\": %d}", power, flow, valve, pump);
  bluetoothSendString(c);
}