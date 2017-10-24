#!/usr/bin/env python3

import socket
import sys
import os

from RPLCD.gpio import CharLCD
from RPi import GPIO

server_address = './lcd_daemon'

# Make sure the socket does not already exist
try:
	os.unlink(server_address)
except OSError:
	if os.path.exists(server_address):
		raise

# Create a UDS socket
sock = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)

#Setup LCD Screen
GPIO.setmode(GPIO.BOARD)
lcd = CharLCD(pin_rs=15, pin_rw=18, pin_e=16, pins_data=[21, 22, 23, 24], numbering_mode=GPIO.BOARD)

# Bind the socket to the port
print('starting up on %s' % server_address)
sock.bind(server_address)
os.chmod(server_address, 0o777)


# Listen for incoming connections
sock.listen(1)

try:
	while True:
		# Wait for a connection
		print('waiting for a connection')
		connection, client_address = sock.accept()
		try:
			# Receive the data in small chunks and retransmit it
			while True:
				data = connection.recv(1024)
				print("recieved " + data.decode("utf-8") )
				if data:
					print('sending data back to the client')
					lcd.clear()
					lcd.write_string(data.decode("utf-8"))
					connection.sendall(str.encode("ok"))
				else:
					print("No more data...", file=sys.stderr)
					break
				
		finally:
			# Clean up the connection
			connection.close()
finally:
	GPIO.cleanup()