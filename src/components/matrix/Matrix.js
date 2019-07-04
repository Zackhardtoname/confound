import React, {Fragment} from 'react';
import './Matrix.css';
import { HotTable } from '@handsontable/react';
import {generalRenderer} from "./MatrixRenderers"
import {exportBtnSetup, stretchBtnSetup, unStretchBtnSetup} from "./BtnScripts"
import {dropDownStart} from "./Constants"

class Matrix extends React.Component {
    constructor(props) {
        super(props)
        this.exportBtnSetup = exportBtnSetup.bind(this)
        this.stretchBtnSetup = stretchBtnSetup.bind(this)
        this.unStretchBtnSetup = unStretchBtnSetup.bind(this)
        this.generalRenderer = generalRenderer.bind(this)

        this.settings = {
            licenseKey: "non-commercial-and-evaluation",
            data: [
                ["Study", "Forest Plot", "aOR", "Location", "GDP", "Country"],
                ["paper 1", null, ".5", "A", "I", "U"],
                ["paper 2", null, ".8", "A", "N", "U"],
                ["paper 3", null, "1.1", "A", "I", "U"],
            ],
            colHeaders: false,
            rowHeaders: false,
            contextMenu: true,
            width: '100%',
            height: 400,
            stretchH: "all",
            className: "htCenter",
            cells: this.generalRenderer,

            afterRender: () => {
                this.verticalHeaders()
            }
        }

        this.hotTableComponent = React.createRef()
    }

    verticalHeaders = () => {
        let vertical = document.querySelectorAll(".handsontable tr:first-child td")
        vertical.forEach((item, idx) => {
            if (idx >= dropDownStart) item.innerHTML = `<span>${item.innerHTML}</span>`
        })
    }

    componentDidMount = () => {
        this.exportBtnSetup()
        this.stretchBtnSetup()
        this.unStretchBtnSetup()
        this.verticalHeaders()
    }

    render() {
        return (
            <div id="hot-container">
                <div className="btn-group mr-3">
                    <button id="export-file" className="intext-btn btn btn-success">Download CSV</button>
                    <button id="stretch" className="intext-btn btn btn-warning">Stretch</button>
                    <button id="unstretch" className="intext-btn btn btn-danger">Unstretch</button>
                </div>
                <HotTable ref={this.hotTableComponent} id="hot" settings={this.settings}/>
            </div>
        )
    }
}

export default Matrix;