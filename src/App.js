import React from 'react';
import Navbar from "./components/layout/NavBar"
import Panel from "./components/instructions/Panel"
import Chart from "./components/chart/Chart"
import './App.css';

function App() {
    return (
        <Chart />

        // <div className="App">
        //     <Navbar title="Confounder Matrix" subtitle="Open-access Tool for Confounder Bias Analysis in SR"/>
        //
        //     <main id="content" className="container">
        //         <Panel />
        //         <Chart />
        //     </main>
        // </div>
    );
}

export default App;