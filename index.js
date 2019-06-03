#!/usr/bin/env node

const inquirer = require('inquirer');
const homedir = require('os').homedir();
const path = require('path');
const fs = require('fs-extra')

const questions = require('./questions.js');
const baseFolderPath = path.join(homedir, 'domains');

async function run() {

    const exists = await existsDir(baseFolderPath);
    if (!exists) {
        await firstRun();
    } else {
        const answers = await inquirer.prompt(questions.default);
        switch (answers.default) {
            case 'setDomain':
                await selectDomain();
                break;
            case 'newDomain':
                await createDomain();
                break;
            case 'deleteDomain':
                await deleteDomain();
                break;
        }

    }
}

async function firstRun() {

    const { createFolder } = await inquirer.prompt(questions.createDomainsFolder);
    if (createFolder) {
        // create domains folder 
        await fs.ensureDir(baseFolderPath)
        const { createDomain } = await inquirer.prompt(questions.createDomainBool);
        if (createDomain) {
            createDomain()
        }
    }
}

async function selectDomain() {
    // const domains = await fs.readdir(baseFolderPath);
    const domains = await getDirectories(baseFolderPath);

    //  Push the domains to the promt
    for (let domain of domains) {
        questions.selectDomain[0].choices.push(domain)
    }
    const { selectDomain } = await inquirer.prompt(questions.selectDomain);
    await setDomainActive(selectDomain);

}

async function createDomain() {
    const answers = await inquirer.prompt(questions.createDomain);
    console.log(answers)

    // Create Domain Folder
    const domainFolderPath = getDomainPath(answers.domainName)
    await fs.ensureDir(domainFolderPath);

    // Create files
    for (let file of answers.files) {
        const filePath = path.join(domainFolderPath, file);

        await fs.ensureFile(filePath);
    }

    // link if want active
    if (answers.activeDomain) {
        await setDomainActive(answers.domainName)
    }
}

async function deleteDomain() {
    const domains = await getDirectories(baseFolderPath);

    //  Push the domains to the promt
    for (let domain of domains) {
        questions.deleteDomain[0].choices.push(domain)
    }

    const { domainToDelete, confirmDeleteDomain } = await inquirer.prompt(questions.deleteDomain);
    if(confirmDeleteDomain) {
        const domainFilePath = getDomainPath(domainToDelete);
        await fs.remove(domainFilePath)
        console.log(`Success deleting ${domainToDelete} domain`)
    }


}

async function setDomainActive(domain) {
    const domainFolderPath = getDomainPath(domain);
    const filesInDomain = await fs.readdir(domainFolderPath);
    for (let file of filesInDomain) {
        await setFileActive(file, domain)
    }
}

async function setFileActive(file, domain) {
    const domainFilePath = path.join(getDomainPath(domain), file);
    const filePath = path.join(homedir, file);
    if (!canBeLinked(filePath)) {
        console.log(`
            ${filePath} is not a Symlink.
            ${file} is not setted properly. Consider move it to a domain folder, and delete it from your user folder.
        `)
    } else {
        await fs.removeSync(filePath)
        await fs.ensureSymlink(domainFilePath, filePath)
        console.log(`Success setting ${file} from ${domainFilePath}`)
    }
}

//  FS Utils
async function existsDir(f) {
    const exists = await fs.pathExists(f)
    return exists;
}

async function getDirectories(path) {
    const files = await fs.readdir(path)
    const directories = files.filter((file) => {
        return fs.statSync(path + '/' + file).isDirectory();
    });
    return directories;
}

function canBeLinked(file) {
    if (fs.existsSync(path)) {
        return fs.lstatSync(file).isSymbolicLink();
    }
    return true;
}

function getDomainPath(domainName) {
    return path.join(baseFolderPath, domainName);

}

run()