 - Package up server.py into an actual command
	 - File Name
	 - Help Message (`-h`)
	 - Flag to write to display (`-w message`)
		 - Integrate `lcdwrite`
 - Makefile to install into system
 - Systemd unit file
 - Improve handling of input strings
	 - Multiline Strings (insert carriage return)
	 - Long Strings (scroll individual line)
 - Possibly add support for custom characters
	 - Probably just a pre-defined set
	 - How to use from client?
 - Document the daemon's api