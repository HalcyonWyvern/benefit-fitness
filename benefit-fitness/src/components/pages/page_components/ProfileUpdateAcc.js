//Modal button for updating the user profile
import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";

class ProfileUpdateAcc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: props.address || "",
            city: props.city || "",
            state: props.state || "",
            zip: props.zip || "",
        }
    }

    valid = () => {
        let addressErr = "";
        let cityErr = "";
        let stateErr = "";
        let zipErr = "";


        if (!this.state.address) {
            addressErr = "Address cannot be blank."
        }

        if (!this.state.city) {
            cityErr = "City cannot be blank."
        }

        if (!this.state.state) {
            stateErr = "State cannot be blank."
        }

        if (!this.state.zip) {
            zipErr = "Zip code cannot be blank."
        }

        if (addressErr || cityErr || stateErr || zipErr) {
            this.setState({
                addressErr,
                cityErr,
                stateErr,
                zipErr,
            });
            return false;
        } else {
            return true;
        }
    }

    showModal = () => {
        this.setState({
            isOpen: true
        })
    }

    hideModal = () => {
        this.setState({
            isOpen: false
        })
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const {user} = this.props.auth;
        const isValid = this.valid();

        if(isValid) {
        const newRequest = {
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip
        }
        console.log(newRequest);

        axios
            .put('/api/users/' + user.id, newRequest)
            .then(res => console.log(res.data));

        this.setState({
            isOpen: false,
            city: "",
            state: "",
            zip: "",
            address: "",
        })

        //Refreshes the profile page to show new data
        window.location.reload(false);
        }
    }

    render() {
        return (
            <>
                <Button onClick={this.showModal}>
                    Update Address
                </Button>
                <Modal size="lg" show={this.state.isOpen} onHide={this.hideModal}
                       style={{
                           position: "absolute",
                           left: "50%",
                           top: "45%",
                           transform: "translate(-50%, -50%)",
                           background: 0,
                           boxShadow: "none",
                       }}
                       scrollable
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Update My Address</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group>
                                <Form.Label>Address</Form.Label>
                                <Form.Control onChange={this.onChange} value={this.state.address} type="box" name="address" id="address" placeholder="Address"/>
                            </Form.Group>
                            <div style={{ fontSize: 10, color: "red" }}>
                                {this.state.addressErr}
                            </div>

                            <Form.Group>
                                <Form.Label>City</Form.Label>
                                <Form.Control onChange={this.onChange} value={this.state.city} type="box" name="city" id="city" placeholder="City"/>
                            </Form.Group>
                            <div style={{ fontSize: 10, color: "red" }}>
                                {this.state.cityErr}
                            </div>

                            <Form.Group>
                                <Form.Label>State</Form.Label>
                                <Form.Control onChange={this.onChange} value={this.state.state} type="box" name="state" id="state" placeholder="State"/>
                            </Form.Group>
                            <div style={{ fontSize: 10, color: "red" }}>
                                {this.state.stateErr}
                            </div>

                            <Form.Group>
                                <Form.Label>Zip Code</Form.Label>
                                <Form.Control onChange={this.onChange} value={this.state.zip} type="box" name="zip" id="zip" placeholder="Zip Code"/>
                            </Form.Group>
                            <div style={{ fontSize: 10, color: "red" }}>
                                {this.state.zipErr}
                            </div>
                            <p>{' '}</p>
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </>
        );
    }


}

ProfileUpdateAcc.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {}
)(ProfileUpdateAcc);