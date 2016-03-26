# MultiBand

MultiBand is a system to control a variety of different music/audio sources in a modular way.

## Modules

For information on how to make a module, visit the docs [here](docs/modules.md).

To add modules to your own setup, clone a module's git repo into the modules directory and then start MultiBand.

## Architecture

The system has three main parts: the web interface, the module manager, and the modules themselves. The module manager is the interface between the modules and the user interface. It handles verifying and loading the modules and then controls them.

The web interface communicates with the module manager over http with a json api. 
