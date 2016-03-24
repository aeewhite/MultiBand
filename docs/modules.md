# MultiBand Module Specification

Modules for MultiBand each get their own folder in the `modules/` subdirectory. It is designed such that you can just clone a repo into that folder and it will be detected by MultiBand.

## Structure of a Module

```
ModuleName
├── module
│   ├── executable
│   └── module.json
└── readme.md
```

MultiBand will only look in the `module` subdirectory when is loading and using the module, so you are free to put whatever you like outside of it. The `module` directory must contain at least two files: a json file named module.json and an executable the module will use to run. The name of the executable is defined in your module.json, so it can be called whatever you like. You can also write the executable in any language you like as long as it can be called directly (i.g. no `python whatever.py`). You can build an actual binary and choose that as your executable, or if you choose an interpreted language like JavaScript or Python, include a shebang at the beginning to indicate which interpreter to use (`#!/usr/bin/python` for example). 

## Module File

Each module must have a file named `module.json` in the `module` directory. This is where your module will define its capabilities and other metadata. 

```
{
	"name": String,
	"version": String,
	"executable": String
	"actions" : {
		"start": String,
		"stop": String
	}
}
```

### Module Actions

Your module file with define a number of actions that it can perform. Every module must define both start and stop, but can define as many others as you wish. Each action can be defined in one of two ways. First, you can set the action to just a string. For example you could assign 'start' to 'begin' and 'begin' would be passed as the first parameter to your executable (`executable start`). The other way you can define an action is to assign the action to an object. This gives you some more options for configuring how your action will work.

```
{
	"argument": String,
	"parameters":[
		{
			"name": String,
			"type": String
		},
		...
	]
}
```

The argument will be passed as the first parameter to your executable. Following that will each of the parameters you define (and you can define as many as you like). The type value will tell MultiBand how to ask for that parameter. Allowable types are "String" or "Number". MultiBand will show inputs for those parameters and they will be passed to your executable following the `argument` value.

Every module must define both start and stop, but can define as many others as you wish. As a result of this, your module's executable must be able to handle any arguments that you have defined in your module file. Other possible actions might be `next` or `playpause`.

#### start

This will be called when your module is selected and loaded by MultiBand. You should start any processes and create any necessary files to keep track of your modules operation.

#### stop

Will be called when another module is selected or MultiBand is shutting down. You should kill any process you have created and perform any necessary cleanup.

The above are the only two actions that absolutely must be defined but others can also be added. Some other actions have special meanings and will be automatically be styled in the interface if you include them. They are:

#### next


#### playpause
