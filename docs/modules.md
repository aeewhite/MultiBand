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

MultiBand will only look in the `module` subdirectory when is loading and using the module, so you are free to put whatever you like outside of it. The `module` directory must contain at least two files: a json file named module.json and an executable the module will use to run. The name of the executable is defined in your module.json, so it can be called whatever you like. You can also write the executable in any langauge you like as long as it can be called directly (i.g. no `python whatever.py`). You can build an actual binary and choose that as your executable, or if you choose an interpreted language like JavaScript or Python, include a shebang at the beginning to indicate which interpreter to use (`#!/usr/bin/python` for example). 
