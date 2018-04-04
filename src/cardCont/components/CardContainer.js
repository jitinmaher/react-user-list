import React, { Component } from 'react';
import Card from "../../card/components/Card";
import Modal from 'react-responsive-modal';
import '../styles/style.css';

class CardContainer extends Component {
    constructor() {
        super();
        this.state= {
            open: false,
            userContactDetails: null,
            filterType: "all"
        }
    }

    setModalState(state) {
        this.setState({
            open: state
        });
    }

    getAddressField(data, type) {
        if(!data || data.length === 0) {
            return null;
        }
        const modData = Array.isArray(data) ? data.join(", ") : data;
        return(
            <div>
                <span><u>{type}: </u>{`${modData}`}</span><br/>
            </div>
        );
    }

    getUserDetailsModal() {
        const { open, userContactDetails } = this.state;
        if(!open) {
            return null;
        }
        const { address, email, phone } = userContactDetails;
        const { city, state, street, zip } = address;
        return (
            <Modal open={open} onClose={this.onCloseModal.bind(this)} little>
                <h1>Contact Me!</h1>
                <div className="detailsCont">
                    <address className="address">
                        {this.getAddressField(street, "Street")}
                        {this.getAddressField(city, "City")}
                        {this.getAddressField(state, "State")}
                        {this.getAddressField(zip, "Zip code")}
                        {this.getAddressField(email, "Email Address")}
                        {this.getAddressField(phone, "Phone number")}
                    </address>
                </div>
            </Modal>
        );
    }

    onCloseModal() {
        this.setState({
            open: false,
            userContactDetails: null
        });
    }

    setUserCOntactDetails(details) {
        this.setState({
            userContactDetails: details
        });
    }

    setFilter(state) {
        this.setState({
            filterType: state
        })
    }

    getUserCards() {
        const { allUsers } = this.props;
        const { filterType } = this.state;
        return(
            allUsers.map((user, index) => {
                if(user.gender !== filterType && filterType !== "all") {
                    return null;
                }
                return (
                    <Card
                        user={user}
                        key={index}
                        contactButtonClicked={(details) => { 
                            this.setModalState(true);
                            this.setUserCOntactDetails(details);
                        }}
                    />)
            })
        )
    }

    getAdditionalClass(type) {
        const { filterType } = this.state;
        if(type === filterType) {
            return "btn-selected";
        }
        return null;
    }

    render() {
        return (
            <div className="container">
                <div className="heading-cont">
                    <div className="heading">Facebook employees</div>
                    <div className="filterParent">
                        <button className={`btn ${this.getAdditionalClass("all")}`}onClick={()=>{ this.setFilter("all") }}> Remove filter</button>
                        <button className={`btn ${this.getAdditionalClass("male")}`} onClick={()=>{ this.setFilter("male") }}> Male</button>
                        <button className={`btn ${this.getAdditionalClass("female")}`} onClick={()=>{ this.setFilter("female") }}> Female</button>
                    </div>
                </div>
                {this.getUserDetailsModal()}
                <div className="card-grid">
                {this.getUserCards()}
                </div>
            </div>
        );
    }
}

export default CardContainer;