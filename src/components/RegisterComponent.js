import React, {Component, Fragment} from 'react';
import {
    Alert,
    AlertTitle,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Snackbar,
    TextField
} from "@mui/material";

class RegisterComponent extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            name: "",
            lastname: "",
            created: null,
            updated: null,
            deleted: false,
            blocked: false,
            premium: false,
            showRegisterModal: false,
            showSuccessAlert: false,
            showErrorAlert: false,
        };

        this.handleRegister = this.handleRegister.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.createUser = this.createUser.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
    }

    handleRegister() {
        this.setState({
            email: "",
            password: "",
            name: "",
            lastname: "",
            showRegisterModal: !this.state.showRegisterModal
        });
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
        console.log([name] + ": " + value)
    }

    closeAlert() {
        this.setState({
            showSuccessAlert: false,
            showErrorAlert: false,
        })
    }

    createUser() {
        console.log("CREATE USER");
        fetch('http://localhost:5000/users/create', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(() => {
                this.handleRegister();
                this.setState({
                    showSuccessAlert: true
                });
            })
            .catch(() => {
                this.setState({
                    showErrorAlert: true
                });
            });
    }

    render() {
        return (
            <Fragment>
                <div className="navbar-nav">
                    <Button onClick={this.handleRegister} variant="outlined">Unirse a PsicoWeb</Button>
                </div>

                <Dialog
                    id="registerDialog"
                    open={this.state.showRegisterModal}
                    onClose={this.handleRegister}
                >
                    <DialogTitle>¡Bienvenido/a a PsicoWeb!</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            name="email"
                            label="Correo electrónico"
                            type="email"
                            fullWidth
                            variant="standard"
                            onChange={this.handleChange}
                            value={this.state.email}
                        />
                        <TextField
                            margin="dense"
                            id="password"
                            name="password"
                            label="Contraseña"
                            type="password"
                            fullWidth
                            variant="standard"
                            onChange={this.handleChange}
                            value={this.state.password}
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            name="name"
                            label="Nombre"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={this.handleChange}
                            value={this.state.name}
                        />
                        <TextField
                            margin="dense"
                            id="lastname"
                            name="lastname"
                            label="Apellidos"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={this.handleChange}
                            value={this.state.lastname}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleRegister}>Cerrar</Button>
                        <Button onClick={this.createUser}>Registrarse</Button>
                    </DialogActions>
                </Dialog>
                {
                    this.state.showSuccessAlert &&
                    <Snackbar open={this.state.showSuccessAlert} autoHideDuration={6000} onClose={this.closeAlert} >
                        <Alert severity="success">
                            <AlertTitle>¡Bienvenido/a!</AlertTitle>
                            Tu cuenta ha sido creada con éxito.
                        </Alert>
                    </Snackbar>
                }
                {
                    this.state.showErrorAlert &&
                    <Snackbar open={this.state.showErrorAlert} autoHideDuration={6000} onClose={this.closeAlert} >
                        <Alert severity="error">
                            <AlertTitle>¡Ups!</AlertTitle>
                            Hemos tenido un pequeño contratiempo. Vuelve a intentarlo más tarde.
                        </Alert>
                    </Snackbar>
                }

            </Fragment>
        );
    }
}

export default RegisterComponent;