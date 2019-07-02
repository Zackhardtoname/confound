import React, {Fragment} from 'react';
import './Chart.css';
import { HotTable } from '@handsontable/react';
import {initialRenderer} from "./ChartRenderers"
import {exportBtnSetup, stretchBtnSetup, unStretchBtnSetup} from "./BtnScripts"
import {dropDownStart} from "./Constants"

class Chart extends React.Component {
    constructor(props) {
        super(props)
        this.exportBtnSetup = exportBtnSetup.bind(this)
        this.stretchBtnSetup = stretchBtnSetup.bind(this)
        this.unStretchBtnSetup = unStretchBtnSetup.bind(this)
        this.initialRenderer = initialRenderer.bind(this)

        this.settings = {
            licenseKey: "non-commercial-and-evaluation",
            data: [
                ["Study", "Forest Plot", "aOR", "location", "GDP", "Country"],
                ["paper 1", , ".5", "A", "I", "U"],
                ["paper 2", , ".8", "A", "N", "U"],
                ["paper 3", , "1.1", "A", "I", "U"],
            ],
            colHeaders: false,
            rowHeaders: false,
            contextMenu: true,
            stretchH: "all",
            className: "htCenter",
            cells: this.initialRenderer,

            afterRender: () => {
                this.verticalHeaders()
            },
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
            <Fragment>
                <button id="export-file" className="intext-btn">Download CSV</button>
                <button id="stretch" className="intext-btn">Stretch</button>
                <button id="unstretch" className="intext-btn">Unstretch</button>

                <HotTable ref={this.hotTableComponent} id="hot" settings={this.settings}/>
            </Fragment>
        )
    }
}

export default Chart;