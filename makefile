install:
	cd ModuleManager && npm install
	cp ./system/multiband-modulemanager.service /etc/systemd/system/multiband-modulemanager.service
	sudo systemctl enable multiband-modulemanager
