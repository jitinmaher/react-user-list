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
    /**
     * Sets state of the modal
     * @param {Boolean} state modal state
     */
    setModalState(state) {
        this.setState({
            open: state
        });
    }
    /**
     * Returns user contact details
     */
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
    /**
     * Returns modal with all the necessary contact information
     */
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
    /**
     * Sets state on closing of modal
     */
    onCloseModal() {
        this.setState({
            open: false,
            userContactDetails: null
        });
    }
    /**
     * sets user infor in componnet state
     * @param {Array} details user contact details
     */
    setUserCOntactDetails(details) {
        this.setState({
            userContactDetails: details
        });
    }
    /**
     * Sets filter type info in state
     * @param {String} state 
     */
    setFilter(state) {
        this.setState({
            filterType: state
        })
    }
    /**
     * Iterates over user object and returns component based on filter set
     */
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
    /**
     * Changes the filter button class
     * @param {String} type type of filter button
     */
    getAdditionalClass(type) {
        const { filterType } = this.state;
        if(type === filterType) {
            return "btn-selected";
        }
        return null;
    }
    /**
     * Renders the component
     */
    render() {
        return (
            <div className="container">
                <div className="heading-cont">
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