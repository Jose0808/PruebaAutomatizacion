import React, { useState } from 'react'
import { Form, Button, Toast, Col, Row } from 'react-bootstrap';
import { GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth'
import { FirebaseAuth } from './firebase/DatabaseConn'
import { Link } from "react-router-dom";

const RegularExpression = "^[^@]+@[^@]+\.[a-zA-Z]{2,}$";

export const Login = () => {

    const [showToast, setToast] = useState(false);
    const [message, setmessage] = useState("Error en el inicio de sesion");
    const [toastType, settoastType] = useState("text-bg-danger");
    const [isvalid, setIsvalid] = useState(false);

    const LoginValidate = async (form) => {
        form.preventDefault();

        try {
            const resp = await signInWithEmailAndPassword(FirebaseAuth, form.target["email"].value, form.target["password"].value);
            setmessage("Inicio Exitoso!!!");
            settoastType("text-bg-success");
            setToast(true);

        } catch (e) {
            setmessage(e.message);
            settoastType("text-bg-danger");
            setToast(true);
        }
    }



    return (
        <div className='container my-5 align-items-center'>
            <Col className='d-flex align-items-end justify-content-end align-self-end" '>
                <Toast
                    onClose={() => setToast(false)}
                    autohide
                    show={showToast}
                    delay={3200}
                    className={toastType}
                >
                    <Toast.Body>{message}</Toast.Body>
                </Toast>
            </Col>
            <h1 className='text-center'>Ingreso</h1>
            <hr />
            <Row className='row mt-4 pl-5 pr-5'>
                <Form onSubmit={LoginValidate}>
                    <Form.Group className="mb-4" controlId="email">
                        <Form.Label>Correo Electrónico</Form.Label>
                        <Form.Control type="email" placeholder="Correo Electrónico" pattern={RegularExpression} required />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" minLength={8} required />
                    </Form.Group>
                    <hr />
                    <Row>
                        {/* <Route path="/Register" render={<Register/>}/> */}
                        <Col className='d-flex align-items-center justify-content-center'>
                            <Link to='/Register'><a class="btn btn-secondary">Registro</a></Link>
                        </Col>
                        <Col className='d-flex align-items-center justify-content-center'>
                            <Link to='/Users'><a class="btn btn-secondary">Usuarios</a></Link>
                        </Col>
                        <Col className='d-flex align-items-center justify-content-center'>
                            <Button variant="primary" type="submit">
                                Ingresar
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Row>
        </div>
    )
}