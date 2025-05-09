import serial
import time

# Replace with your actual serial port:
# e.g., macOS: /dev/tty.usbserial-XXXXX
#       Windows: COM3
SERIAL_PORT = "/dev/tty.HC-06"
BAUD_RATE = 9600

def main():
    with serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1) as ser:
        time.sleep(2)  # Allow time for TM4C reset if needed

        print("Connected. Type commands (e.g., LED) and press Enter. Type 'exit' to quit.")

        while True:
            command = input("> ").strip()
            if command.lower() == "exit":
                break

            # Send command with newline (TM4C should expect this)
            ser.write((command + "\n").encode())

            # Wait and read response (optional)
            response = ser.readline().decode().strip()
            if response:
                print("Response:", response)

if __name__ == "__main__":
    main()

