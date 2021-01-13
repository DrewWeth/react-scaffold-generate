import React from 'react';

const table = [
    ["Scaffold documentation", "https://github.com/DrewWeth/react-scaffold-generate"],
    ["Demo App", "http://rsg.drewweth.com/"]
]


const ScaffoldHome = () => {
    return <div>
        <h3>Links</h3>
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
        <div className="spacerTop40">
            <p>Thank you for checking out this project!</p>
            <a href="https://www.buymeacoffee.com/drewweth"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=drewweth&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"/></a>
        </div>
    </div>
}

export default ScaffoldHome
