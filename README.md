# react-scaffold-generate


## About

This project is a port of `rails scaffold generate` for React ([More info](https://www.rubyguides.com/2020/03/rails-scaffolding/)). It leverages file templating and dynamic form generation, with routing and CRUD state management.

I used to do a lot of Ruby of Rails projects and loved the ability to generate a model, view, and controller for a model in seconds. It abstracted CRUD operations, form generation, form validation, basic list-detail presentation pages and fast forwarded every new project.


![steps of generator](https://github.com/DrewWeth/react-scaffold-generate/blob/main/static/append.png?raw=true)



## Example usage:

Install templating 
```
npm install -g react-scaffold-generate
```

Create new React app
```
# Create new app called example-app
npx create-react-app example-app
# Change working directory to example-app
cd example-app
```

```
# Create component Template for Inventory with 4 attributes
react-scaffold-generate generate Inventory \
    name:string \
    description:string:textarea \
    isSold:boolean \
    seller:string:email
```

The output will be:
```
Success wrote and merged models.json to src/components/models.json
Success wrote model.js to src/components/Inventory/model.js
Success wrote static component to src/components/Form.js
Success wrote static component to src/components/Router.js
Success wrote static component to src/components/State.js
Success wrote static component to src/components/Shared.js
Success wrote static component to src/components/Networking.js
Success wrote static component to src/components/ScaffoldHome.js
Success wrote static component to src/components/Component.css
Success wrote model component to src/components/Inventory/Details.js
Success wrote model component to src/components/Inventory/Edit.js
Success wrote model component to src/components/Inventory/List.js
Success wrote model component to src/components/Inventory/New.js
Success wrote model component to src/components/Inventory/Routes.js
Success wrote index.js component to index.js
```

Install dependencies used by react-scaffold-generate
```
# Used for browser routing, very common React dependency
npm install --save react-router-dom
# Used for form generation form UI and css
npm install --save @rjsf/material-ui
# Dependency for notifications
npm install --save react-notifications
```

Part of the templating overwrites index.js which replaces `<App>` with `<Router>` from `src/components/Router.js`.

### Last step, start example app
```
npm start
```

## Command Arguments

`react-scaffold-generate generate [ModelName] [list of attributeName:attributeType:atributeFormat`

The list of attributes for a model can be the following:

Type | Format | Description
--- | --- | ---
boolean | | for button true/false  
boolean | select | for separate true and false
string | | for string
string | email | for @ and . domain
string | uri | protocol://domain
string | data-uri | file as UTC8 
string | date | local date
string | date-time | local date and yyyy/mm/dd
string | password | dont display input
string | color | color picker serialized to hex code
string | textarea | paragraphs amount of text
number | | double
number | updown | increment & decrement
number | range | between min/max
integer | | integer value

[more details on react-jsonschema-form types](https://react-jsonschema-form.readthedocs.io/en/latest/usage/widgets/)


## Local Development

Clone this repo then run:
```
# Install dependencies
npm i
# Creates example-app, runs react-scaffold-generate, installs extra dependencies
`npm run setup`
# Runs templater and example-app
`npm run watch` 
```

`setup` makes an example-app and installs dependencies in that directory. `watch` reloads the templates and example-app when templates or cli.js are updated. 

