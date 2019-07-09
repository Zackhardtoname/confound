import React from 'react';
import './Matrix.css';
import { HotTable } from '@handsontable/react';
import {generalRenderer} from "./MatrixRenderers"
import {exportBtnSetup, importCSV} from "./BtnScripts"
import {dropDownStart, initialData} from "./Constants"

class Matrix extends React.Component {
    constructor(props) {
        super(props)
        this.exportBtnSetup = exportBtnSetup.bind(this)
        this.generalRenderer = generalRenderer.bind(this)

        this.settings = {
            licenseKey: "non-commercial-and-evaluation",
            data: initialData,
            colHeaders: false,
            rowHeaders: false,
            contextMenu: true,
            width: '100%',
            height: 310,
            stretchH: "all",
            className: "htCenter",
            trimDropdown: false,
            cells: this.generalRenderer,

            afterRender: () => {
                this.verticalHeaders()
                this.makeTooltip()
            }
        }
        this.hotTableComponent = React.createRef()
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

    componentDidMount = () => {
        this.exportBtnSetup()
        this.verticalHeaders()
        this.makeTooltip()

        const cur_instance = this.hotTableComponent.current.hotInstance
        cur_instance.updateSettings({
            stretchH: "all",
        })

        importCSV(cur_instance)
    }

    render() {
        return (
            <div id="hot-container">
                <div className="btn-group mb-3">
                    <button id="export-file" className="btn intext-btn bg-adequate">Download CSV</button>
                    {/*styling with the bootstrap intext-btn class for consistency*/}
                    <input type="file" id="dealCsv" className="btn intext-btn bg-inadequate"/>


                </div>
                <HotTable ref={this.hotTableComponent} id="hot" settings={this.settings}/>
            </div>
        )
    }
}

export default Matrix;