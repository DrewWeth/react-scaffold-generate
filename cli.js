#!/usr/bin/env node

import fs from 'fs'
import {exit, cwd} from 'process'
import chalk from 'chalk'
import path from 'path'
import {renderTemplateFile } from 'template-file'
import minimist from 'minimist'
import { mergeJSON } from "merge-json-file";
import { getInstalledPath } from 'get-installed-path'

const localPath = await getInstalledPath('react-scaffold-generate')

const ENTRYPOINT = "react-scaffold-generate"
const EXAMPLE = `${chalk.yellow("EXAMPLE")}: ${ENTRYPOINT} generate Inventory name:string description:string:textarea isSold:boolean seller:string:email`
const USAGE = `${ENTRYPOINT} generate [MODEL_NAME] [ATTRIBUTE_NAME:ATRIBUTE_TYPE:ATTRIBUTE_FORMAT ...]\n${EXAMPLE}`

export const error = (str) => {
    console.error(chalk.red("ERROR") + ": " + str)
}

const makeFolders = (dir) => {
    fs.mkdirSync(dir, {recursive: true})
    return dir
}

const main = () => {
    var argv = minimist(process.argv.slice(2));
    const [generate, modelName] = argv._
    
    // Step 1: Parse checking

    if (generate !== "generate") {
        error(`First argument is an action [generate]\n${chalk.green('USAGE')}: ${USAGE}`)
        exit(1)
    }
    if (!modelName) {
        error(`Model name missing.\n${chalk.green('USAGE')}: ${USAGE}`)
        exit(1)
    }
    
    const attrs = argv._.slice(2).map( modelAttr => {
        const [name, type, field] = modelAttr.split(":").map(s => s.trim().toLowerCase())
        return {name, type, field, required: false}
    })

    if(argv._.length < 3 || !attrs){
        error(`Missing model attributes.\nUSAGE: ${USAGE}`)
        exit(1)
    }
    
    const componentName = modelName.toLowerCase()
    const ComponentName = componentName.charAt(0).toUpperCase() + componentName.slice(1)
    const basepath = argv["p"] || argv["path"] || cwd()
    
    // Function for getting path relative to basepath.
    const relative = (str) =>{
        return path.relative(basepath, str);
    }
    
    const data = {
        ComponentName, 
        componentName,
        attrs,
        meta: { 
            basepath
        },
        doubleEscapeState: () => `{{ state, setState }}`
    }
    if(!fs.existsSync(path.join(data.meta.basepath, "package.json")) && !argv["g"]){
        console.error(`${chalk.yellow("Warning")}: Are you sure you are in a React project directory? It is recommended to run this command in the root directory of a react project (where package.json is). To run in directory without package.json use -g flag.`)
        exit(1)
    }


    // Step 2: Done parsing, print internal state and start templating process.
    
    console.log(JSON.stringify(data, null, 2))

    const scaffoldPath = path.join(localPath, "templates", "scaffold")
    const componentsPath = path.join(scaffoldPath, "components")

    const staticComponentFiles = [ 
        "Form.js",
        "Router.js",
        "State.js",
        "Shared.js",
        "Networking.js",
        "ScaffoldHome.js",
        "Component.css"
    ].map(fileName => path.join(scaffoldPath, fileName))
    
    const destinationComponentPath = path.join(data.meta.basepath, "src", "components")
    const destinationModelPath = path.join(destinationComponentPath, ComponentName)
    makeFolders(destinationModelPath)

    // Merge scaffold attributes to 
    const modelsPath = path.join(destinationComponentPath, "models.json")
    mergeJSON(modelsPath, { [ComponentName]: {} }, { pretty:true })
    console.log(`${chalk.green("Success")} wrote and merged models.json to ${relative(modelsPath)}`)
    
    // Output static files
    staticComponentFiles.forEach(sourcePath => {
        const fileName = path.parse(sourcePath).base
        const destinationPath = path.join(destinationComponentPath, fileName)
        renderTemplateFile(sourcePath, data).then(str => {
            fs.writeFileSync(destinationPath, str)
            console.log(`${chalk.green("Success")} wrote static component to ${relative(destinationPath)}`)
        })    
    })

    // Output model files
    const modelDefPath = path.join(destinationModelPath, `model.js`)
    fs.writeFileSync(modelDefPath, `export const model = ${JSON.stringify(data.attrs, 0, 2)}`)
    console.log(`${chalk.green("Success")} wrote model.js to ${relative(modelDefPath)}`)

    const componentFiles = fs.readdirSync(componentsPath).map(name => path.join(componentsPath, name))
    componentFiles.forEach(sourcePath => {
        const fileName = path.parse(sourcePath).base
        const destinationPath = path.join(destinationModelPath, fileName)
        renderTemplateFile(sourcePath, data).then(str => {
            fs.writeFileSync(destinationPath, str)
            console.log(`${chalk.green("Success")} wrote model component to ${relative(destinationPath)}`)
        })
    })

    const indexTemplatePath = path.join(scaffoldPath, "index.js")
    const indexWritePath = path.join(data.meta.basepath, "src", "index.js")
    renderTemplateFile(indexTemplatePath, data).then(str =>{
        fs.writeFileSync(indexWritePath, str)
        console.log(`${chalk.green("Success")} wrote index.js component to ${relative(indexWritePath)}`)
    })
}

main()

