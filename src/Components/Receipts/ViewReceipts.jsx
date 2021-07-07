import React, { useEffect, useState } from "react";
import './ViewReceipts.css'
import io from "socket.io-client";
import Cookies, { get } from "js-cookie";

import { confirmAlert } from 'react-confirm-alert';
import Modal from "react-modal";
let usUserIder = {
	"numberId": Cookies.get('UserId')
}

var modalIsActive = false;
var check;

class ViewReceipts extends React.Component {
	constructor(props) {

		super(props);

		this.state = {
			items: [],
			isLoaded: false,
			modalIsActive: false,
			element: [],
			isOpen: false
		}

	}

	state = {
		showModal: false
	}


	logOut() {

		Cookies.remove('UserId');
		window.location.replace('https://moneymanagementapp.herokuapp.com/LogIn');
	}

	newReceipt() {

		window.location.replace('https://moneymanagementapp.herokuapp.com/NewReceipt');
	}
	chart() {

		window.location.replace('https://moneymanagementapp.herokuapp.com/chart');
	}


	viewReceipt(indexNumber, element) {

		this.setState({
			modalIsActive: true,
			element: element
		})


	}


	closeModal = () => {
		this.setState({
			modalIsActive: false
		})
	}


	methodAlert(element){
console.log(element);
		confirmAlert({
			customUI: ({ onClose }) => {
			  return (
				<div className="alert">
				  <h1 className="alert__title">Are you sure?</h1>
				  <p className="alert__body">You want to delete this receipt?</p>
				  <button onClick={onClose} className="noButton">No</button>
				  <button
					onClick={() => {
						console.log(element);
						const requestMetadata = {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify(element)
						};
						fetch('https://moneymanagersspring.herokuapp.com/delteReceipt', requestMetadata)
							.then(res => res.json())
							.then(json => {
							})
							window.location.reload();
					  onClose();
					}}
					className="confirm"
				  >
					Yes, Delete it!
				  </button>
				</div>
			  );
			}
		  });
	}

	deletReceipt(indexNumber, element) {
		console.log("mata");
 let something = new ViewReceipts;
 something.methodAlert(element);

	
	}

		

	componentDidMount() {

		const requestMetadata = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(usUserIder)
		};
		fetch('https://moneymanagersspring.herokuapp.com/getReceipt', requestMetadata)
			.then(res => res.json())
			.then(json => {
				this.setState({
					items: json,
					isLoaded: true,
				})
			})
	}



	render() {
		let paragraph;
		let div = [];
		let modal;
		var j = 0;
		const elements = this.state.items;
		const numerotation = []
		const listItems = elements.map((element, numerotation) =>

			<div className="receiptContainer" key={element.id.toString()}>
				<div className="ReceiptID" > {numerotation + 1} </div>
				<div className="dateTime" >{element.date}</div>
				<div className="location">{element.location}</div>
				<div className="location">{element.total} Ron</div>
				<button id="deleteButton" onClick={() => this.deletReceipt(numerotation, element)} type="button">Delete</button>

				<button id="viewButton" value={element.id} key={element.id} onClick={() => this.viewReceipt(numerotation, element)} type="button" >View</button>

			</div>

		);

		if (this.state.isLoaded == true) {

		} else {
			paragraph = <p id="Loading">Loading...</p>
		}

		if (this.state.modalIsActive == true) {

			console.log(this.state.element);
			var value = this.state.element.receiptValue;
			modal = <div className="myModal">
				<div className="modalContainer">
					<p>Receipt Content</p>
					<div>	<textarea value={this.state.element.receiptValue.toString()} onChange={e => (e.currentTarget.value)}></textarea></div>
					<button id="CloseButton" onClick={this.closeModal} type="button" >Close</button>
				</div>

			</div>

		}
	

		return (
			<div className="ViewContainer">

				<div className="navBar">
					<button type="button" id="upploadeReceipt" onClick={this.newReceipt} >Upploade Receipt</button>
					<button type="button" id="upploadeReceipt" onClick={this.chart} >Chart</button>
					<button type="button" id="logOut" onClick={this.logOut} >Log Out</button>
				</div>

				{modal}
				<div className="elementcontainer">
					{listItems}

				</div>
				{paragraph}
				{div}

			</div>

		);
	}

}
export default ViewReceipts;

