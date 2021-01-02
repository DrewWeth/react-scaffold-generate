import React from 'react';

const table = [
    ["Project Github", "https://github.com/DrewWeth/react-scaffold-generate"],
    ["Demo App", "http://rsg.drewweth.com/"],
    ["Form generator", "https://github.com/rjsf-team/react-jsonschema-form"],
    ["File templating", "https://github.com/gsandf/template-file"]
]


const ScaffoldHome = () => {
    return <div>
        <h3>
        Example Usage
        </h3>
        <code></code>
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
    </div>
}

export default ScaffoldHome
