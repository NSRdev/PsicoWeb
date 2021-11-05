import React, {Component, Fragment} from 'react';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PasswordIcon from '@mui/icons-material/Password';

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
                    fullWidth
                >
                    <DialogTitle>Iniciar sesión</DialogTitle>

                    <DialogContent>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <MailOutlineIcon sx={{ color: 'lightblue', mr: 1, my: 0.5 }} />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="email"
                                label="Correo electrónico"
                                type="email"
                                fullWidth
                                variant="standard"
                            />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <PasswordIcon sx={{ color: 'lightblue', mr: 1, my: 0.5 }} />
                            <TextField
                                margin="dense"
                                id="password"
                                label="Contraseña"
                                type="password"
                                fullWidth
                                variant="standard"
                            />
                        </Box>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleLogin}>Cerrar</Button>
                        <Button onClick={this.handleLogin}>Acceder</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

export default LoginComponent;