install:
	cd Module && npm install
	ln -s system/multiband-modulemanager.service /etc/systemd/system/multiband-modulemanager.service
	