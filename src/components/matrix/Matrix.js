import React, {Fragment, useEffect} from 'react';
import { HotTable } from '@handsontable/react';
import {generalRenderer} from "./MatrixRenderers"
import {exportBtnSetup, importCSV, sortMetric} from "./BtnScripts"
import {dropDownStart, initialData} from "./Constants"
import Legend from "./Legend"
import './Matrix.css';

const Matrix = () => {
    const hotTableComponent = React.createRef()

    const settings = {
        // refactor out some of these settings
        licenseKey: "non-commercial-and-evaluation",
        data: initialData,
        colHeaders: true,
        rowHeaders: false,
        manualRowMove: true,
        contextMenu: true,

        width: '100%',
        height: 350,
        stretchH: "all",
        className: "htCenter",
        cells: generalRenderer,
        afterRender: () => {
            verticalHeaders()
            makeTooltip()
        },
        //todo unable to disable due to a buggy behavior
        columnSorting: true,
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
        sortMetric()
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
                    <button id="sort-metric" className="btn intext-btn btn-warning">Sort Metric</button>
                    <button id="export-file" className="btn intext-btn btn-primary">Download CSV</button>
                    {/*styling with the bootstrap intext-btn class for consistency*/}
                    <input type="file" id="dealCsv" className="btn intext-btn btn-info"/>
                </div>
            </Fragment>
        )
}

export default Matrix;