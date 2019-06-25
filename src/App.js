import React from 'react';
import Navbar from "./components/layout/NavBar"
import Panel from "./components/instructions/Panel"
import Chart from "./components/chart/Jexcel"
import $ from 'jquery';
import Highcharts from 'highcharts';
import './App.css';

function App() {
    var data = [
        ['Jazz', 'Honda', '2019-02-12', '', true, '$ 2.000,00', '#777700'],
        ['Civic', 'Honda', '2018-07-11', '', true, '$ 4.000,01', '#007777'],
    ];

    // data = [
    //     ['Mazda', 2001, 2000],
    //     ['Pegeout', 2010, 5000],
    //     ['Honda Fit', 2009, 3000],
    //     ['Honda CRV', 2010, 6000],
    // ];

    var options = {
        data:data,
        colHeaders: ['Model', 'Price', 'Price' ],
        // colWidths: [ 300, 300, 300 ],
        columns: [
            { type: 'text', title:'Car', width:120 },
            { type: 'dropdown', title:'Make', width:120, source:[ "Alfa Romeo", "Audi", "Bmw" ] },
            { type: 'calendar', title:'Available', width:200 },
            { type: 'image', title:'Photo', width:120 },
            { type: 'checkbox', title:'Stock', width:80 },
            { type: 'numeric', title:'Price', width:100, mask:'$ #.##,00', decimal:',' },
            { type: 'color', width:100, render:'square', }
        ]

    };

    return (
        <div className="App">
            <Navbar title="Confounder Matrix"/>
            <Panel />
            <Chart options={options} />
        </div>
    );
}

export default App;