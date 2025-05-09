# ⚡ PSH-mini: Pumped Storage Hydroelectricity System  
### 🏞️ Built at Seattle Climate Hacks 2025

HydroPulse is a functional prototype of a **pumped storage hydroelectricity system** with real-time hardware control, SCADA-style monitoring, and cloud-integrated data acquisition. Designed for resilience and sustainability, our system simulates the energy storage model used in grid-scale renewable systems, scaled for demonstration and educational use.

---

## Our Product

### 🌊 Physical System
A working scaled model of a pumped hydro system:
- **Upper and Lower Reservoirs** with visible flow simulation
- **DC Pump & Valve Actuators** controlled via microcontroller
- **Custom Generator Module** producing measurable electrical output
- **Current Sensors** sending generation output data
- **Flow Rate Sensors** monitoring hydrodynamic changes

### Hardware Interfacing
- **Microcontroller (TM4C1294NCPDT)** reads sensor data and controls devices
- Real-time communication via serial API over Bluetooth
- Support for manual override and system failsafe behaviors

### SCADA Interface
- Built a clean, responsive **React dashboard**
- Shows real-time valve and pump state
- Allows manual override control with visual feedback
- Displays live energy generation data and system health

### Cloud Data Platform
- Power generation, valve/pump state, and overrides sent to cloud
- Data stored in **Azure** for real-time syncing
- **Historical logs** accessible via dashboard for performance analytics

---

## Demo Screenshots

| Physical Model | SCADA UI |
|----------------|----------|
| ![model](docs/model.jpg) |

---

## Use Cases
- Renewable energy education
- Low-cost testing for SCADA pipelines
- Microgrid implementation demo

---

## Tech Stack

| Layer            | Tools Used                     |
|------------------|--------------------------------|
| Frontend         | React, animation, JS, HTML     |
| Backend/Hardware | Node, Express, lcurl, psycopg  |
| Cloud            | Azure, MySQL, POSTRGRE         |
| Communication    | REST API, Serial Bluetooth, UART |

---

## Built By

Seattle Climate Hacks 2025 Team:  
- **[Dane Grassy]** – Cloud Integration 
- **[Karl Drabek]** – Full Stack, Marketing 
- **[Sean Ozinsky]** – Frontend, Data Visualization, Hardware
- **[Ben Horton]** – Embedded Systems, Electrical
- **[Dominic Roser]** – Full Stack
- **[Radu Richardson]** – Machine Learning

---

## Future Improvements
- Scaling
- Water Level Sensors
- Improved Hardware
- Integrated Water Flow System
- Recurrent Neural Network

---

## Contact
domdomroser@gmail.com

---


How to build 

Dependencies:

npm install

npm run dev  - to start frontend server

pip install psycopg2-binary PostgresSQL Python Package

npm install d3

npm install express

node src/api/server - to start backend server

pip install dotenv

npm install pg

./Sourceben/dom - simple post request to HTTP:3000

pip install scikit-learn

pip install pandas

# Setup
npm run dev  - to start interface

node src/api/server - hardware interface server

node src/api/server2 - frontend interface server

./Sourceben/serial - hardware client communication over UART

connect to bluetooth device h40c

Flash firmware folder onto microcontroller
