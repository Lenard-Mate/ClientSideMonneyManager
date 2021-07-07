
import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
import Cookies from "js-cookie";
import './Chart.css'

var TripChart = CanvasJSReact.CanvasJSChart;


var dataPoints = [];
let usUserIder = {
    "numberId": Cookies.get('UserId')
}

var statistic = [];


class PersonalizationChart extends Component {

    render() {
        const settings = {
            theme: "dark2",
            backgroundColor: null,
            title: {
                text: "Custom Charts"
            },
            zoomEnabled: true,
            exportEnabled: true,
            axisY: {
                includeZero: true
            },
            data: [{
                type: "column",
                indexLabel: "Ron {y}",
                dataPoints: dataPoints,
                indexLabelFontColor: "white",
                indexLabelPlacement: "outside",
            }]



        }
        return (
            <div>

                <TripChart options={settings} onRef={ref => this.chart = ref}
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

                var todayForDay = new Date();
                var todayForWeek = new Date();
                var todayForMount = new Date();
                var todayFor6Mount = new Date();
                var todayForYear = new Date();
                todayForDay.setDate(todayForDay.getDate() - 1);
                todayForWeek.setDate(todayForWeek.getDate() - 7);
                todayFor6Mount.setDate(todayFor6Mount.getDate() - 182);
                todayForMount.setDate(todayForMount.getDate() - 30);
                todayForYear.setDate(todayForYear.getDate() - 365);

                var dateDay = todayForDay.getFullYear() + '-' + (todayForDay.getMonth() + 1) + '-' + todayForDay.getDate();
                var dateWeek = todayForWeek.getFullYear() + '-' + (todayForWeek.getMonth() + 1) + '-' + todayForWeek.getDate();
                var dateMounth = todayForMount.getFullYear() + '-' + (todayForMount.getMonth() + 1) + '-' + todayForMount.getDate();
                var dateFor6Mount = todayFor6Mount.getFullYear() + '-' + (todayFor6Mount.getMonth() + 1) + '-' + todayFor6Mount.getDate();
                var dateYear = todayForYear.getFullYear() + '-' + (todayForYear.getMonth() + 1) + '-' + todayForYear.getDate();
                var lastDay = 0;
                var lastWeek = 0;
                var lastMounth = 0;
                var last6Mounths = 0;
                var lastYear = 0;
                var allTotal = 0;
                data.sort();
                for (var i = 0; i < data.length; i++) {
                    if (Date.parse(dateDay) < Date.parse(data[i].date)) {
                        lastDay = lastDay + data[i].total;
                    }
                    if (Date.parse(dateWeek) < Date.parse(data[i].date)) {
                        lastWeek = lastWeek + data[i].total;
                    }
                    if (Date.parse(dateMounth) < Date.parse(data[i].date)) {
                        lastMounth = lastMounth + data[i].total;

                    }
                    if (Date.parse(dateFor6Mount) < Date.parse(data[i].date)) {
                        last6Mounths = last6Mounths + data[i].total;

                    }
                    if (Date.parse(dateYear) < Date.parse(data[i].date)) {
                        lastYear = lastYear + data[i].total;
                    }

                    allTotal = allTotal + data[i].total;

                }
                
                console.log(lastDay);
                console.log(lastWeek);
                console.log(lastMounth);
                console.log(last6Mounths);
                console.log(lastYear);
                console.log(allTotal);

                    statistic[0] = {sum:lastDay,date:"Last Day"};
                    statistic[1] = {sum:lastWeek,date:"Last Week"};
                    statistic[2] = {sum:lastMounth,date:"Month"};
                    statistic[3] = {sum:last6Mounths,date:"Last 6 Mounths"};
                    statistic[4] = {sum:lastYear,date:"Last Year"};
                    statistic[5] = {sum:allTotal,date:"Total"};
                

                for (var i = 0; i < statistic.length; i++) {
                    dataPoints.push({
                        label: statistic[i].date,
                        y: statistic[i].sum

                    });
                }
                chart.render();
            });
    }
}

export default PersonalizationChart;