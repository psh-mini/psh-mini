/*
reg.hs

This file includes register definitions for TM4C1294
*/

#ifndef __REG_H__
#define __REG_H__

// GPIO clock gating
#define RCGCGPIO (*((volatile uint32_t *)0x400FE608))
#define RCGCADC (*((volatile uint32_t *)0x400FE638))
#define RCGCTIMER (*((volatile uint32_t *) 0x400FE604))

//ADC config
#define ADCCC0 (*((volatile uint32_t *) 0x40038FC8))
#define ADCACTSS0_3 (*((volatile uint32_t *) 0x40038000))
#define ADCEMUX0_3 (*((volatile uint32_t *) 0x40038014))
#define ADCSSMUX0_3 (*((volatile uint32_t *) 0x400380A0))
#define ADCSSEMUX0_3 (*((volatile uint32_t *) 0x400380B0))
#define ADCSSCTL0_3 (*((volatile uint32_t *) 0x400380A4))
#define ADCIM0 (*((volatile uint32_t *) 0x40038008))
#define ADCSSFIFO3_0 (*((volatile uint32_t *) 0x400380A8))
#define ADCISC_0 (*((volatile uint32_t *) 0x4003800C))
#define ADCSSTSH3_0 (*((volatile uint32_t *) 0x400380BC))

//Port E config
#define GPIOAFSEL_E (*((volatile uint32_t *) 0x4005C420))
#define GPIODEN_E (*((volatile uint32_t *) 0x4005C51C))
#define GPIOAMSEL_E (*((volatile uint32_t *) 0x4005C528))

// port F config
#define GPIODIR_F (*((volatile uint32_t *)0x4005D400))  // 0->input 1->output
#define GPIODEN_F (*((volatile uint32_t *)0x4005D51C))  // enable digital functionality
#define GPIODATA_F (*((volatile uint32_t *)0x4005D3FC))

// port N config
#define GPIODIR_N (*((volatile uint32_t *)0x40064400))
#define GPIODEN_N (*((volatile uint32_t *)0x4006451C))
#define GPIODATA_N (*((volatile uint32_t *)(0x400643FC)))
#define GPIODATA_N0 (*((volatile uint32_t *)(0x40064000 + (1 << 2))))
#define GPIODATA_N1 (*((volatile uint32_t *)(0x40064000 + (1 << 3))))

// port J config
#define GPIOPUR_J (*((volatile uint32_t *)0x40060510))  // enable pull up resistor
#define GPIOPDR_J (*((volatile uint32_t *)0x40060514))  // enable pull down resistor
#define GPIODIR_J (*((volatile uint32_t *)0x40060400))
#define GPIODEN_J (*((volatile uint32_t *)0x4006051C))
#define GPIODATA_J0 (*((volatile uint32_t *)(0x40060000 + (1 << 2))))
#define GPIODATA_J1 (*((volatile uint32_t *)(0x40060000 + (1 << 3))))
#define GPIORIS_J (*((volatile uint32_t *)0x40060414))
#define GPIOIS_J (*((volatile uint32_t *)0x40060404))
#define GPIOIBE_J (*((volatile uint32_t *)0x40060408))
#define GPIOIEV_J (*((volatile uint32_t *)0x4006040C))
#define GPIOICR_J (*((volatile uint32_t *)0x4006041C))
#define GPIOIMR_J (*((volatile uint32_t *)0x40060410))

// Port C config
#define GPIOAMSEL_C (*((volatile uint32_t *)0x4005A528))
#define GPIODIR_C (*((volatile uint32_t *)0x4005A400))
#define GPIODEN_C (*((volatile uint32_t *)0x4005A51C))
#define GPIOAFSEL_C (*((volatile uint32_t *)0x4005A420))
#define GPIODATA_C (*((volatile uint32_t *)0x4005A3FC))

// port N config
#define GPIOAMSEL_N (*((volatile uint32_t *)0x40064528))
#define GPIODIR_N (*((volatile uint32_t *)0x40064400))
#define GPIODEN_N (*((volatile uint32_t *)0x4006451C))
#define GPIOAFSEL_N (*((volatile uint32_t *)0x40064420))

// port L config
#define GPIOAMSEL_L (*((volatile uint32_t *)0x40062528))
#define GPIOAFSEL_L (*((volatile uint32_t *)0x40062420))
#define GPIODEN_L (*((volatile uint32_t *)0x4006251C))
#define GPIODIR_L (*((volatile uint32_t *)0x40062400))
#define GPIODATA_L0 (*((volatile uint32_t *)(0x40062000 + (1 << 2))))
#define GPIODATA_L1 (*((volatile uint32_t *)(0x40062000 + (1 << 3))))
#define GPIODATA_L2 (*((volatile uint32_t *)(0x40062000 + (1 << 4))))
#define GPIODATA_L3 (*((volatile uint32_t *)(0x40062000 + (1 << 5))))
#define GPIODATA_L4 (*((volatile uint32_t *)(0x40062000 + (1 << 6))))
#define GPIOIS_L (*((volatile uint32_t *)0x40062414))
#define GPIORIS_L (*((volatile uint32_t *)0x40062404))
#define GPIOIBE_L (*((volatile uint32_t *)0x40062408))
#define GPIOIEV_L (*((volatile uint32_t *)0x4006240C))
#define GPIOICR_L (*((volatile uint32_t *)0x4006241C))
#define GPIOIMR_L (*((volatile uint32_t *)0x40062410))

// Interrupt enable regs
#define EN0 (*((volatile uint32_t *) 0xE000E100))
#define EN1 (*((volatile uint32_t *) 0xE000E104))

// timer 0 config
#define GPTMCTL_0  (*((volatile uint32_t *) 0x4003000C))
#define GPTMCFG_0 (*((volatile uint32_t *) 0x40030000))
#define GPTMTAMR_0A (*((volatile uint32_t *) 0x40030004))
#define GPTMTAILR_0 (*((volatile uint32_t *) 0x40030028))
#define GPTMRIS_0 (*((volatile uint32_t *)0x4003001C))
#define GPTMICR_0 (*((volatile uint32_t *)0x40030024))
#define GPTMIMR_0 (*((volatile uint32_t *) 0x40030018))
#define GPTMADCEV_0 (*((volatile uint32_t *) 0x40030070))

// timer 1 config
#define GPTMCTL_1  (*((volatile uint32_t *) 0x4003100C))
#define GPTMCFG_1 (*((volatile uint32_t *) 0x40031000))
#define GPTMTAMR_1A (*((volatile uint32_t *) 0x40031004))
#define GPTMTAILR_1 (*((volatile uint32_t *) 0x40031028))
#define GPTMRIS_1 (*((volatile uint32_t *)0x4003101C))
#define GPTMICR_1 (*((volatile uint32_t *)0x40031024))
#define GPTMIMR_1 (*((volatile uint32_t *) 0x40031018))

// timer 2 config
#define GPTMCTL_2  (*((volatile uint32_t *) 0x4003200C))
#define GPTMCFG_2 (*((volatile uint32_t *) 0x40032000))
#define GPTMTAMR_2A (*((volatile uint32_t *) 0x40032004))
#define GPTMTAILR_2 (*((volatile uint32_t *) 0x40032028))
#define GPTMRIS_2 (*((volatile uint32_t *)0x4003201C))
#define GPTMICR_2 (*((volatile uint32_t *)0x40032024))
#define GPTMSYNC_2 (*((volatile uint32_t *)0x40032010))
#define GPTMIMR_2 (*((volatile uint32_t *) 0x40032018))

// timer 3 config
#define GPTMCTL_3  (*((volatile uint32_t *) 0x4003300C))
#define GPTMCFG_3 (*((volatile uint32_t *) 0x40033000))
#define GPTMTAMR_3A (*((volatile uint32_t *) 0x40033004))
#define GPTMTAILR_3 (*((volatile uint32_t *) 0x40033028))
#define GPTMRIS_3 (*((volatile uint32_t *)0x4003301C))
#define GPTMICR_3 (*((volatile uint32_t *)0x40033024))
#define GPTMSYNC_3 (*((volatile uint32_t *)0x40033010))
#define GPTMIMR_3 (*((volatile uint32_t *) 0x40033018))

// timer 4 config
#define GPTMCTL_4  (*((volatile uint32_t *) 0x4003400C))
#define GPTMCFG_4 (*((volatile uint32_t *) 0x40034000))
#define GPTMTAMR_4A (*((volatile uint32_t *) 0x40034004))
#define GPTMTAILR_4 (*((volatile uint32_t *) 0x40034028))
#define GPTMRIS_4 (*((volatile uint32_t *)0x4003401C))
#define GPTMICR_4 (*((volatile uint32_t *)0x40034024))
#define GPTMSYNC_4 (*((volatile uint32_t *)0x40034010))
#define GPTMIMR_4 (*((volatile uint32_t *) 0x40034018))

#endif

// lab2.h