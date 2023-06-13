import React, { useState } from 'react'
import { Form, Button, Toast, Col, Row } from 'react-bootstrap';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc } from "firebase/firestore";
import { FirebaseAuth, db } from './firebase/DatabaseConn'
import { Link } from "react-router-dom";


const RegularExpression = "^[^@]+@[^@]+\.[a-zA-Z]{2,}$";

export const Register = () => {
    const [showToast, setToast] = useState(false);
    const [message, setMessage] = useState("Error en el inicio de sesion");
    const [toastType, setToastType] = useState("text-bg-danger");
    const [fullNameValue, setFullNameValue] = useState("");
    const [selectedIdType, setSelectedIdType] = useState('CC');

    const Register = async (e) => {
        e.preventDefault();
        const form = e.target;
        try {
            console.log(form["password"].value)
            let Users = {
                FullName: form["fullName"].value,
                IdNumber: form["idNumber"].value,
                IdType: selectedIdType,
                Email: form["email"].value,
                Password: form["password"].value
            }
            console.log(Users)

            const { user } = await createUserWithEmailAndPassword(FirebaseAuth, Users.Email, Users.Password);
            const resp1 = await setDoc(doc(db, "Users", Users.IdNumber), Users);
            setMessage("Registro Exitoso!!!");
            setToastType("text-bg-success");
            setToast(true);

        } catch (e) {
            console.log(e)
            setMessage(e.message);
            setToastType("text-bg-danger");
            setToast(true);
        }
    }

    const UppercaseField = (e) => {


        setFullNameValue((e.target.value).toUpperCase())
    }


    return (
        <div className='container my-5 align-items-center'>
            <Col className='d-flex align-items-center justify-content-start'>
                <Link to='/Login'><a class="btn btn-secondary bi bi-house-door-fill"></a></Link>
            </Col>
            <h1 className='text-center title'>Registro</h1>
            <hr />
            <Row className='row mt-4 pl-5 pr-5'>
                <Form onSubmit={Register}>
                    <Form.Group className="mb-4" controlId="fullName">
                        <Form.Label>Nombre Completo</Form.Label>
                        <Form.Control type="text" placeholder="Nombre Completo" value={fullNameValue} maxLength={100} onChange={UppercaseField} required/>
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="idType">
                        <Form.Label>Tipo de identificación</Form.Label>
                        <select class="form-select" aria-label="Default select example" controlId="idType"
                            value={selectedIdType} onChange={e => setSelectedIdType(e.target.value)} required>
                            <option value="CC">Cedula de Ciudadania</option>
                            <option value="TI">Tarjeta de Identidad</option>
                            <option value="PP">Pasaporte</option>
                            <option value="OT">Otro</option>
                        </select>
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="idNumber">
                        <Form.Label>Numero de identificación</Form.Label>
                        <Form.Control type="text" placeholder="Numero de identificación" required />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="email">
                        <Form.Label>Correo Electrónico</Form.Label>
                        <Form.Control type="email" placeholder="Correo Electrónico" pattern={RegularExpression} required />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" minLength={8} required />
                    </Form.Group>
                    <hr />
                    <Row className='d-flex align-items-center justify-content-center'>
                        <Button variant="primary" type="submit">
                            Registrar
                        </Button>
                    </Row>
                </Form>
            </Row>
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
        </div>
    )
}