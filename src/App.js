import React from 'react';
import Navbar from "./components/layout/NavBar"
import Panel from "./components/instructions/Panel"
import Chart from "./components/chart/Chart"
import MatrixState from "./context/matrix/MatrixState"
import './App.css';

function App() {
    return (
        <MatrixState>
            <div className="App">
                <Navbar title="Confounder Matrix" subtitle="Open-access Tool for Confounder Bias Analysis in SR"/>
                <main id="content" className="container">
                    <Panel />
                    <Chart />
                </main>
            </div>
        </MatrixState>
    );
}

export default App;