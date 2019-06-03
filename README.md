# Domain changer

domain-changer is a node-based CLI, to manage different configurations of your .npmrc .gitconfig and .bowerrc files.

This package is based on symlinks to your home folder. You can create your own folders via file explorer, or let domain-changer create them for you.

This is a tipical folder structure for domain-changer

    .
    ├── ...
    ├── home                      # Your home folder
    │   ├── domains               # The folder where your domains live
    │   │    ├── work             # Domain for your work 
    │   │    └── home             # Domain for your home
    │   │         ├── .npmrc      # .npmrc file with your home configuration
    │   │         └── .gitconfig  # .gitconfig file with your home configuration
    │   ├── .npmrc                # .npmrc read by the system, will be a symlink to the /domains/ACTIVE_DOMAIN/.npmrc file
    │   ├── .gitignore .          # .gitignore read by the system, will be a symlink to the /domains/ACTIVE_DOMAIN/.gitignore file

**CONSIDERATIONS**

domain-changer needs to create symbolic links to the files in your home folder, so before using it, consider remove the original ones, and move them to a domains folder. If not, it will not work.

## Installation


```bash
npm install -g domain-changer
```

## Usage

```bash
dom
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## ToDo

- [ ] Test on Windows
- [ ] Make testing
- [x] Allow to delete domains from CLI
- [ ] Add some fancy ascii art
- [ ] Allow to move non-symlinks to a domain folder
- [ ] Create a travis pipeline
- [x] Add eslint

## License
[MIT](https://choosealicense.com/licenses/mit/)