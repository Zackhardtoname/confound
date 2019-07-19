import React, {Fragment, useEffect} from 'react';
import Legend from "./Legend";
import {HotTable} from '@handsontable/react';
import {generalRenderer} from "./MatrixRenderers";
import {exportBtnSetup, importCSV, sortMetric} from "./BtnScripts";
import {initialData} from "./Constants";
import {makeTooltip, verticalHeaders} from "./Helpers/GeneralHelpers";
import './Matrix.css';

const Matrix = () => {
    const hotTableComponent = React.createRef();

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
            verticalHeaders();
            makeTooltip();
        },
        //todo unable to disable due to a buggy behavior
        columnSorting: true,
    };

    useEffect(() => {
        exportBtnSetup(hotTableComponent);
        importCSV(hotTableComponent);
        sortMetric();
        verticalHeaders();
        makeTooltip();
        //eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <HotTable ref={hotTableComponent} id="hot" settings={settings}/>
            <Legend/>
            <hr/>
            <div className="btn-group mb-5">
                <button id="sort-metric" className="btn intext-btn btn-warning">Sort Metric</button>
                <button id="export-file" className="btn intext-btn btn-primary">Download Data</button>
                {/*styling with the bootstrap intext-btn class for consistency*/}
                <input type="file" id="dealCsv" className="btn intext-btn btn-info"/>
            </div>
        </Fragment>
    );
};

export default Matrix;