
import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
import Cookies from "js-cookie";
import './Chart.css'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var TripChart = CanvasJSReact.CanvasJSChart;


var dataPoints = [];
let usUserIder = {
	"numberId": Cookies.get('UserId')
}




class MarketChart extends Component {





	render() {
		const options = {
			animationEnabled: true,
			animationDuration: 3000,
			exportEnabled: true,
			theme: "dark2",
			backgroundColor: null,
			title: {
				text: "Locations"
			},


			data: [{
				type: "pie",
				indexLabel: "{label}: {y}%",
				startAngle: -90,
				dataPoints: dataPoints
			}]


		}
		return (
			<div>

				<CanvasJSChart options={options} onRef={ref => this.chart = ref}
				/* onRef={ref => this.chart = ref} */
				/>


			</div>
		);
	}

	componentDidMount() {
		var chart = this.chart;
		var locations = [];
		var locationsCount = 0;
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
					locations[i] = data[i].location;

				}
				locations.sort();

				for (var i = 0; i < locations.length; i++) {
					locationsCount = locationsCount + 1;
					if (locations[i] != locations[i + 1]) {
						dataPoints.push({
							label: "" + locations[i],
							y: locationsCount * 100 / locations.length

						});
						locationsCount = 0;
					}

				}

				chart.render();


			});
	}


}

export default MarketChart;