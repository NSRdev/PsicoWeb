import React, {Component} from 'react';
import {Link} from "react-router-dom";
import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";

class NavigationComponent extends Component {



    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light px-5">
                <a className="navbar-brand" href="/">
                    PsicoWeb
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-item nav-link" to="/users">Usuarios</Link>
                        <Link className="nav-item nav-link" to="/publications">Blog</Link>
                    </div>
                </div>
                <LoginComponent />
                <RegisterComponent/>

            </nav>
        );
    }
}

export default NavigationComponent;