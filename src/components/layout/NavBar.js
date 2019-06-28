import React, {Fragment} from 'react'
import logo from "../../images/logo.png"
import bu_logo from "../../images/bu.gif"
import './NavBar.css';

const NavBar = ({ title, subtitle}) => {
    return (
        <Fragment>
            <header>
                <div className="container">
                    <h1>{title}<br/>
                        <small>{subtitle}</small>
                    </h1>
                    <div id="logos">
                        {/*todo make the logos disappear or contained for low width screens*/}
                        <img id="logo" src={logo} alt="Logo"/>
                        <img src={bu_logo} alt="BU Logo"/>
                    </div>
                </div>
            </header>
            <div id="shadow" className="ss-style-multitriangles"></div>
        </Fragment>
    );
}

export default NavBar;