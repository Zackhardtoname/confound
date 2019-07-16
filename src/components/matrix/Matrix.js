import React, {Fragment, useEffect, useState} from 'react';
import './Matrix.css';
import { HotTable } from '@handsontable/react';
import {generalRenderer} from "./MatrixRenderers"
import {exportBtnSetup, importCSV} from "./BtnScripts"
import {dropDownStart, metricCol, initialData} from "./Constants"
import Legend from "./Legend"

const Matrix = () => {
    const [inputs, setinputs] = useState([])

    const hotTableComponent = React.createRef()
    const settings = {
        // refactor out some of these settings
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
        cells: generalRenderer,

        // //reset since the bound might decrease
        // beforeRender: () => {
        //     setminMetric(Number.POSITIVE_INFINITY)
        //     setmaxMetric (Number.NEGATIVE_INFINITY)
        // },

        afterRender: () => {
            verticalHeaders()
            makeTooltip()
        },
    }

    const verticalHeaders = () => {
        let vertical = document.querySelectorAll(".handsontable tr:first-child td")
        vertical.forEach((item, idx) => {
            if (idx >= dropDownStart) {
                const original = item.textContent
                item.innerHTML = `<span data-toggle="tooltip" data-placement="top" title="${original}">${original}</span>`
            }
        })
    }

    const makeTooltip = () => {
        window.$('[data-toggle="tooltip"]').tooltip({
            offset: '0, 10'
        });
    }


    useEffect(() => {
        exportBtnSetup(hotTableComponent)
        verticalHeaders()
        makeTooltip()
        importCSV()
        //eslint-disable-next-line
    }, [])

    return (
            <Fragment>
                <HotTable ref={hotTableComponent} id="hot" settings={settings}/>
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

export default Matrix;