import React from 'react';

const table = [
    ["Scaffold documentation", "https://github.com/DrewWeth/react-scaffold-generate"],
    ["Demo App", "http://rsg.drewweth.com/"],
    ["NPM Package", "https://www.npmjs.com/package/react-scaffold-generate"]
]


const ScaffoldHome = () => {
    return <div>
        <h3>About</h3>
        <div className="section">
            <p>
                This app was made with 3 commands, and one was command was <code>cd</code>.
                <div className="codeExample"> 
                    <img className="responsive" src="https://github.com/DrewWeth/react-scaffold-generate/blob/main/static/generate-no-padding.png?raw=true"></img>
                </div>
            </p>
        </div>
        <h3>Links</h3>
        <div className="styled-table-container">
            <table className="styled-table">
                <tbody>
                    {table.map( ([name, link]) =>{
                        return <tr>
                            <td>{name}</td>
                            <td><a className="navLink" href={link} target="_blank">{link}</a></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
        <div className="spacerTop40">
            <p>Thank you for checking out this project!</p>
            <a href="https://www.buymeacoffee.com/drewweth"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=drewweth&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"/></a>
        </div>
    </div>
}

export default ScaffoldHome
