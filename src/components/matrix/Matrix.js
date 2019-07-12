import React, {Fragment} from 'react';
import './Matrix.css';
import { HotTable } from '@handsontable/react';
import {generalRenderer} from "./MatrixRenderers"
import {exportBtnSetup, importCSV} from "./BtnScripts"
import {dropDownStart, metricCol, initialData} from "./Constants"
import Legend from "./Legend"

class Matrix extends React.Component {

    constructor(props) {
        super(props)
        this.hotTableComponent = React.createRef()
        this.minMetric =  Number.POSITIVE_INFINITY
        this.maxMetric =  Number.NEGATIVE_INFINITY
        this.inputs =  []
        this.exportBtnSetup = exportBtnSetup.bind(this)
        this.generalRenderer = generalRenderer.bind(this)
        this.importCSV = importCSV.bind(this)

        this.settings = {
            licenseKey: "non-commercial-and-evaluation",
            data: initialData,
            colHeaders: true,
            rowHeaders: false,

            columnSorting: true,
            manualRowMove: true,

            contextMenu: true,
            width: '100%',
            height: 310,
            stretchH: "all",
            className: "htCenter",
            cells: this.generalRenderer,

            //reset since the bound might decrease
            beforeRender: () => {
                this.minMetric =  Number.POSITIVE_INFINITY
                this.maxMetric =  Number.NEGATIVE_INFINITY
            },

            afterRender: () => {
                this.verticalHeaders()
                this.makeTooltip()
            },
        }
    }

    verticalHeaders = () => {
        let vertical = document.querySelectorAll(".handsontable tr:first-child td")
        vertical.forEach((item, idx) => {
            if (idx >= dropDownStart) {
                const original = item.textContent
                item.innerHTML = `<span data-toggle="tooltip" data-placement="top" title="${original}">${original}</span>`
            }
        })
    }

    makeTooltip = () => {
        window.$('[data-toggle="tooltip"]').tooltip({
            offset: '0, 10'
        });
    }

    getRange = (candidate) => {
        this.minMetric = Math.min(this.minMetric, candidate)
        this.maxMetric = Math.max(this.maxMetric, candidate)
    }

    componentDidMount = () => {
        this.exportBtnSetup()
        this.verticalHeaders()
        this.makeTooltip()
        this.importCSV()
    }

    render() {
        return (
            <Fragment>
                <HotTable ref={this.hotTableComponent} id="hot" settings={this.settings}/>
                <Legend />
                <hr/>
                <div className="btn-group mb-5">
                    <button id="export-file" className="btn intext-btn btn-primary">Download CSV</button>
                    {/*styling with the bootstrap intext-btn class for consistency*/}
                    <input type="file" id="dealCsv" className="btn intext-btn btn-info"/>
                </div>
            </Fragment>
        )
    }
}

export default Matrix;