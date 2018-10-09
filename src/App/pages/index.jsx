import React, { Component } from 'react';
import { Grid, Row, Col, Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import axios from 'axios';

export default class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            user: null,
            pass: null
        }
    }

    handlerText(state, value) {
        this.setState({
            [state]: value
        });
    }

    render() {
        return( 
            <div className="app">
                <div style={style.container}>
                    <Grid>
                        <Row className="show-grid">
                            <Col md={4}>
                            </Col>
                            <Col md={4}>
                                <div style={style.boxLogin}>
                                    <h1>Login</h1>
                                    <form>
                                        <div style={{ padding: 25 }}>
                                            <FormGroup
                                                controlId="formBasicText"                                        
                                            >
                                                <ControlLabel>Usuário</ControlLabel>
                                                <FormControl
                                                    type="text"                                                
                                                    placeholder="Digite seu nome de usuário."             
                                                    onChange={(value) => this.handlerText("user", value.target.value)}                                   
                                                />

                                                <ControlLabel>Senha</ControlLabel>
                                                <FormControl
                                                    type="text"                                                
                                                    placeholder="Digite sua senha."               
                                                    onChange={(value) => this.handlerText("pass", value.target.value)}                                   
                                                />
                                            </FormGroup>    
                                            <div className="buttons" style={{ flex: 1, justifyContent:"space-between", padding: 10 }}>
                                                <Button
                                                    bsStyle="success" 
                                                    disabled={this.state.isLoading}
                                                    onClick={() => {
                                                        this.handlerText("isLoading", true);

                                                        let data = JSON.stringify({
                                                            post: {
                                                                email: this.state.user,
                                                                senha: this.state.pass
                                                            }
                                                        })
    
                                                        let headers = {
                                                            "Content-Type": "application/json"
                                                        }
    
                                                        if (this.state.user !== null && this.state.pass !== null) {
                                                            axios
                                                                .post("http://192.168.0.13:8080/users/auth", data, { headers }).then(res => {
                                                                    this.handlerText("isLoading", false);    

                                                                    if(res.data.result.ok) {
                                                                        alert("AUTENTICADO");
                                                                    }
                                                                    else {
                                                                        alert(res.data.result.message);
                                                                    }
                                                                })
                                                        }
                                                    }}    
                                                >
                                                    <text>Acessar</text>
                                                </Button>
                                            </div>
                                            
                                            <Button 
                                                bsStyle="warning"
                                            >
                                                <text>Registrar-se</text>
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </Col>
                            <Col md={4}>
                            </Col>
                        </Row>
                    </Grid>    
                </div>
            </div>
        )
    }
}

const style = {
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    boxLogin: {
        marginTop: 160,
        backgroundColor: "#2980b9",
        borderColor: "#3498db",
        borderWidth: 5,        
        borderRadius: 50,
        color: "#FFF",
        textAlign: "center",
        height: 350,        
    }
}