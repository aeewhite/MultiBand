install:
	cd ModuleManager && npm install
	sudo cp ./system/multiband-modulemanager.service /etc/systemd/system/multiband-modulemanager.service
	sudo systemctl enable multiband-modulemanager
