
CC = gcc
CFLAGS = -Wall
LDFLAGS = -lcurl
TARGET = dom
SRC = dom.c

all: $(TARGET)

$(TARGET): $(SRC)
	$(CC) $(CFLAGS) -o $(TARGET) $(SRC) $(LDFLAGS)

clean:
	rm -f $(TARGET)