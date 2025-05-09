// working i2c code

#include "reg.h"
#include <stdint.h>

// SDA: PB3  SCL: PB2
void i2cInit() {
  
  RCGCI2C |= 0x01;
  RCGCGPIO |= (1 << 1); // port B
  
  SRI2C |= 0x01;
  SRI2C &= ~0x01;
  
  // setup port B for i2c
  GPIOAFSEL_B |= 0x0C;  // alt functions on pin 2, 3
  GPIODEN_B |= 0x0C;
  GPIOODR_B = (1 << 3);  // open drain config for SDA
  GPIOPCTL_B |= 0x2200;  // set pin functions to i2c
  
  I2CMCR_0 = 0x00000010; // initialize master
  I2CMCS_0 = 0x0;
  I2CMTPR_0 = 9; // timer period = 100 Kbps see datasheet p1298
}


int i2cPingINA219() {
    I2CMSA_0 = (0x68 << 1);  // INA219 default address is 0x40, bit 0 = 0 for write

    I2CMDR_0 = 0x1B;

    // start, run, and stop
    I2CMCS_0 = 0x07;

    // Step 4: Wait for BUSY to clear
    while (I2CMCS_0 & 0x01);  // Wait for I2C to finish
    
    I2CMSA_0 = (0x68 << 1) | 1;  // INA219 default address is 0x40, bit 0 = 0 for write

    // start, run, and stop
    I2CMCS_0 = 0x07;

    // Step 4: Wait for BUSY to clear
    while (I2CMCS_0 & 0x01);  // Wait for I2C to finish
    
    

    // Step 5: Check ERROR bit (bit 1)
    if (I2CMCS_0 & 0x02) {
        return 0; // NACK received (INA219 not responding)
    }

    return 1; // ACK received (INA219 is present and responded)
}
