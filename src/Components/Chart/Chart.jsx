
import React, { useState, Component } from 'react';

import CanvasJSReact from '../../assets/canvasjs.react';
import Cookies from "js-cookie";
import './Chart.css'
import MarketChart from './MarketChart.jsx';
import PersonalizationChart from './PersonalizationChart.jsx';
import { confirmAlert } from 'react-confirm-alert';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


var dataPoints = [];

let usUserIder = {
	"numberId": Cookies.get('UserId')
}


var globalcount = 0;

class Chart extends Component {

	constructor(props) {
		super(props);
		this.state = {
			textLength: 0,
			text: '',
		}
	}

	logOut() {

		Cookies.remove('UserId');
		window.location.replace('https://moneymanagementapp.herokuapp.com/LogIn');

	}

	newReceipt() {


		window.location.replace('https://moneymanagementapp.herokuapp.com/NewReceipt');
	}
	seeReceipts() {

		window.location.replace('https://moneymanagementapp.herokuapp.com/ViewReceipts');
	}


	resetPassword() {


		confirmAlert({


			customUI: ({ onClose }) => {

				let userResetPasswprd = { "id": usUserIder.numberId, "oldPassword": "", "newPassword": "", "repeatNewPassword": "" };
				function oldPassword(event) {
					userResetPasswprd.oldPassword = event;
				}
				function newPassword(event) {
					userResetPasswprd.newPassword = event;
				}
				function repeatNewPassword(event) {
					userResetPasswprd.repeatNewPassword = event;
				}
				return (
					<div className="changePasswordContainer">
						<div className="alert">
							<h1 className="alert__title">Change the password</h1>
							<label ><b>Old password</b></label>
							<input type="password" onChange={e => oldPassword(e.currentTarget.value)} placeholder="Old password" /><br />
							<label ><b>New Password</b></label>
							<input type="password" onChange={e => newPassword(e.currentTarget.value)} placeholder="New Password" /><br />
							<label ><b>Repeat new password</b></label>
							<input type="password" onChange={e => repeatNewPassword(e.currentTarget.value)} placeholder="Repeat new password" /><br />
							<button onClick={onClose} className="noButton">Chancel</button>

							<button
								onClick={() => {


									console.log(usUserIder.numberId);

									if (userResetPasswprd.newPassword == userResetPasswprd.repeatNewPassword && userResetPasswprd.newPassword != userResetPasswprd.oldPassword) {
										const requestMetadata = {
											method: 'POST',
											headers: {
												'Content-Type': 'application/json'
											},
											body: JSON.stringify(userResetPasswprd)
										};

										fetch('https://moneymanagersspring.herokuapp.com/updatePassword', requestMetadata)
											.then(res => res.json())
											.then(json => {

												console.log(json);
												alert(json.message);
												
											})
										//window.location.reload();
									} else {
										alert("Wrong Change");
									}

									 onClose();
								}}
								className="confirm"
							>
								Confirm change
							</button>
						</div>
					</div>
				);
			}
		});
	}


	totalCalculater = (obj) => {

		var count = 0;
		for (var i = 0; i < obj.length; i++) {
			count = count + obj[i].total;
		}
		//	console.log(count);
		globalcount = count;
	}

	componentDidMount = () => {
		var chart = this.chart;
		const requestMetadata = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(usUserIder)
		};
		fetch('https://moneymanagersspring.herokuapp.com/getReceipt', requestMetadata)
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				for (var i = 0; i < data.length; i++) {
					dataPoints.push({
						x: new Date(data[i].date),
						y: data[i].total
					});
				}
				chart.render();
				let mychart = new Chart();
				mychart.totalCalculater(data);
				console.log(data);

			}).then(json => {
				this.setState({
					textLength: 1,
				})
			})




	}

	render() {
		const options = {
			theme: "dark2",
			backgroundColor: null,
			ontColor: "white",
			zoomEnabled: true,
			animationEnabled: true,
			animationDuration: 2000,
			title: {
				text: "My table of expenses"
			},
			exportEnabled: true,
			axisY: {
				title: "Money",
				prefix: "Ron ",
				crosshair: {
					enabled: true,
					snapToDataPoint: true,
					labelFormatter: function (e) {
						return "Ron " + CanvasJS.formatNumber(e.value, "##0.00");
					}
				}
			},

			axisX: {
				title: "Date",
				crosshair: {
					enabled: true,
					snapToDataPoint: true
				}

			},
			data: [{
				type: "line",
				color: "orange",
				dataPoints: dataPoints
			}]


		}
		var Loading
		console.log(this.state.textLength);
		if (this.state.textLength == 0) {
			Loading = <p id="loading">Loading...</p>
		}

		return (
			<div>
				<div className="navBar">
					<button type="button" className="seeReceipts" onClick={this.resetPassword} >Reset Password</button>
					<button type="button" className="seeReceipts" onClick={this.seeReceipts} >See Receipts</button>
					<button type="button" id="upploadeReceipt" onClick={this.newReceipt} >Upploade Receipt</button>
					<button type="button" id="logOut" onClick={this.logOut} >Log Out</button>
				</div>
				{Loading}
				<div className="chartContainer">

					<CanvasJSChart id="Chart" options={options}
						onRef={ref => this.chart = ref}
					/>	</div>

				<div id="marketChartContainer">
					<MarketChart />
				</div>


				<div id="PersonalizationChart" >
					<PersonalizationChart />
				</div>

			</div>

		);
	}



}

export default Chart;


