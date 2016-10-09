install:
	cd ModuleManager && npm install
	sudo systemctl disable multiband-modulemanager
	sudo cp ./system/multiband-modulemanager.service /etc/systemd/system/multiband-modulemanager.service
	sudo systemctl enable multiband-modulemanager
	sudo systemctl disable multiband-webapp
	sudo cp ./system/multiband-webapp.service /etc/systemd/system/multiband-webapp.service
	sudo systemctl enable multiband-webapp
