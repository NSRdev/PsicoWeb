import React, {Component, Fragment} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";

class LoginComponent extends Component {

    constructor() {
        super();
        this.state = {
            showLoginModal: false,
        };
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {
        this.setState({
            showLoginModal: !this.state.showLoginModal
        });
    }

    render() {
        return (
            <Fragment>
                <div className="navbar-nav">
                    <Button onClick={this.handleLogin} className="me-2">Iniciar sesión</Button>
                </div>

                <Dialog
                    id="loginDialog"
                    open={this.state.showLoginModal}
                    onClose={this.handleLogin}
                >
                    <DialogTitle>Iniciar sesión</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Correo electrónico"
                            type="email"
                            fullWidth
                            variant="standard"
                        />

                        <TextField
                            margin="dense"
                            id="password"
                            label="Contraseña"
                            type="password"
                            fullWidth
                            variant="standard"
                        />
                        <DialogActions>
                            <Button onClick={this.handleLogin}>Cerrar</Button>
                            <Button onClick={this.handleLogin}>Acceder</Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}

export default LoginComponent;