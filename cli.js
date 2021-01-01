#!/usr/bin/env node

import fs from 'fs'
import {exit, cwd} from 'process'
import chalk from 'chalk'
import path from 'path'
import {renderTemplateFile } from 'template-file'
import minimist from 'minimist'
import { mergeJSON } from "merge-json-file";
import { getInstalledPath } from 'get-installed-path'

const localPath = await getInstalledPath('react-scaffold-generator')

const USAGE = `${process.argv[1]} generate [modelName] [attributeName:attributeType ...]`

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
    
    // Parse checking
    if (generate !== "generate") {
        error(`First argument is an action [generate, remove]\n${chalk.green('USAGE')}: ${USAGE}`)
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
    
    const ComponentName = modelName.charAt(0).toUpperCase() + modelName.slice(1)
    const basepath = argv["p"] || argv["path"] || cwd()

    const data = {
        ComponentName, 
        componentName: modelName.toLowerCase(),
        attrs,
        meta: { 
            basepath
        },
        doubleEscapeState: () => `{{ state, setState }}`
    }
    console.log(JSON.stringify(data, null, 2))


    const scaffoldPath = path.join(localPath, "templates", "scaffold")
    const componentsPath = path.join(scaffoldPath, "components")

    const staticFiles = [ 
        "Form.js",
        "Router.js",
        "State.js",
        "Shared.js",
        "Networking.js",
        "ScaffoldHome.js"
    ].map(fileName => path.join(scaffoldPath, fileName))
    
    
    const destinationComponentPath = path.join(data.meta.basepath, "src", "components")
    const newComponentPath = path.join(destinationComponentPath, ComponentName)
    makeFolders(newComponentPath)

    const links = [
        { link: "/scaffold", name: 'Scaffold' },
        { link: `/${data.componentName}`, name: data.ComponentName },
    ]

    const routesPath = path.join(destinationComponentPath, "routes.js")
    fs.writeFileSync(routesPath, `export const routes = ${JSON.stringify({[data.componentName]: links}, 0, 2)}`)
    console.log(`${chalk.green("Success")} wrote routes.js to ${routesPath}`)
    
    // Output static files
    staticFiles.map(sourcePath => {
        const destinationPath = path.join(destinationComponentPath, path.parse(sourcePath).base)
        renderTemplateFile(sourcePath, data).then(str => {
            fs.writeFileSync(destinationPath, str)
            console.log(`${chalk.green("Success")} wrote static component to ${destinationPath}`)
            destinationPath
        })    
    })

    
    // Output model files

    const modelDefPath = path.join(newComponentPath, `model.js`)
    fs.writeFileSync(modelDefPath, `export const model = ${JSON.stringify(data.attrs, 0, 2)}`)
    console.log(`${chalk.green("Success")} wrote model.js to ${modelDefPath}`)

    const componentFiles = fs.readdirSync(componentsPath).map(name => path.join(componentsPath, name))
    componentFiles.map(sourcePath => {
        const destinationPath = path.join(newComponentPath, path.parse(sourcePath).base)
        renderTemplateFile(sourcePath, data).then(str => {
            fs.writeFileSync(destinationPath, str)
            console.log(`${chalk.green("Success")} wrote model component to ${destinationPath}`)
            destinationPath
        })
    })

}

main()

