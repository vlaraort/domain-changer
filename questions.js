module.exports = {
    createDomainsFolder: [{
        type: 'confirm',
        name: 'createFolder',
        message: 'domains folder does not exists. Do you want to create it?',
        default: true
    }],
    createDomainBool: [{
        type: 'confirm',
        name: 'createDomain',
        message: 'Do you want to create a new Domain?',
        default: true
    }],
    createDomain: [{
        type: 'input',
        name: 'domainName',
        message: 'Type the name of your new domain:'
    },
    {
        type: 'checkbox',
        name: 'files',
        message: 'What files do you need in your domain?',
        choices: [
            {
                name: '.npmrc',
                value: '.npmrc'
            },
            {
                name: '.gitconfig',
                value: '.gitconfig',
            },
            {
                name: '.bowerrc',
                value: '.bowerrc',
            }
        ]
    },
    {
        type: 'confirm',
        name: 'activeDomain',
        message: 'Do you want to set it as active',
        default: true
    }],
    default: [{
        type: 'list',
        name: 'default',
        message: 'What do you want to do?',
        choices: [{
            name: 'Create a new domain',
            value: 'newDomain'
        },{
            name: 'Set an existing domain active',
            value: 'setDomain'
        }, {
            name: 'Exit',
            value: 'exit'
        }]
    }],
    selectDomain: [{
        type: 'list',
        name: 'selectDomain',
        message: 'Select one of your domains',
        choices: []
    }],
}