import React from 'react';
import Navbar from "./components/layout/NavBar"
import Panel from "./components/instructions/Panel"
import Matrix from "./components/Matrix/Matrix"
import './App.css';

function App() {
    return (
        <div className="App">
            <Navbar title="Confounder Matrix" subtitle="Open-access Tool for Confounder Bias Analysis in SR"/>
            <main id="content" className="container">
                <Panel />
                <Matrix />
            </main>
        </div>
    );
}

export default App;