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
        <div className="spacerTop">
            <p>If you feel like contributing to support more projects like this, thanks for checking it out!</p>
            <form action="https://www.paypal.com/donate" method="post" target="_top">
                <input type="hidden" name="cmd" value="_donations" />
                <input type="hidden" name="business" value="U467JHPZNYVBS" />
                <input type="hidden" name="item_name" value="Donation for open source software contribution" />
                <input type="hidden" name="currency_code" value="USD" />
                <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
            </form>
        </div>
    </div>
}

export default ScaffoldHome
