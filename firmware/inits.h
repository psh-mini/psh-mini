
#ifndef Inits_H_
#define Inits_H_

#define VREFP 3.3
#define VREFN 0

extern float ADC_value;
extern int count;
extern float flow;

// Preset frequency for 120 MHZ, 60 MHZ, and 12 MHZ clock
// Pass in the preset to Timer1_Init and PLL_Init to configure
// the system clock to specified frequency
enum frequency {PRESET1 = 120, PRESET2 = 60, PRESET3 = 12, PRESET4 = 20};

// Initializes the PLL module and generates a system clock frequency
// that equal to the frequency preset.
// Returns 1 if configured successfully, -1 if you select a non-exist preset.
int PLL_Init(enum frequency freq);

// Initializes the 4 onboard LEDs.
void LED_Init(void);

// Initializes ADC Module 0 Sample Sequencer 3. The module is triggered by
// Timer module 0 subtimer A at 1 HZ. The interupt of ADC0 SS3 will be
// generated whenever the A/D conversion is done.
void ADCReadPot_Init(void);

// Initializes Timer 0A to trigger ADC0 at 1 HZ.
void TimerADCTriger_Init(void);

// Initializes port J for interrupts
void GPIO_init(); 

// initialize timers
void timerInit();

void i2cInit();

int readPower();

void PortL_Handler();

void uartSendChar(char c);

char uartReadChar();

void uartInit();

void bluetoothUartInit();

void bluetoothSendChar(char c);

char bluetoothGetChar();
   
void bluetoothSendString(const char* str);

void proccessRequest(char c); 

void pumpOn();

void pumpOff();

void valveOpen();

void valveClose();




#endif  // Inits_H_
