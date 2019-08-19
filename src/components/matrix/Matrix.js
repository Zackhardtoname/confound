import React, {Fragment, useEffect} from 'react';
import Legend from "./Legend";
import {HotTable} from '@handsontable/react';
import {generalRenderer} from "./MatrixRenderers";
import {exportBtnSetup, importCSV, sortMetric} from "./BtnScripts";
import {initialData} from "./Constants";
import {makeTooltip, verticalHeaders} from "./helpers/GeneralHelpers";
import './Matrix.css';

const Matrix = () => {
    const hotTableComponent = React.createRef();

    const settings = {
        // refactor out some of these settings
        licenseKey: "non-commercial-and-evaluation",
        data: initialData,
        rowHeaders: false,
        manualRowMove: true,
        contextMenu: true,
        columnSorting: true,

        width: '100%',
        stretchH: "all",
        className: "htCenter",
        cells: generalRenderer,
        afterRender: () => {
            verticalHeaders();
            makeTooltip();
        },
    };

    useEffect(() => {
        exportBtnSetup(hotTableComponent);
        importCSV(hotTableComponent);
        sortMetric();
        verticalHeaders();
        makeTooltip();

        // have to turn the sorting functionality on for the plots to show due to issue integrating HandsOnTable with HighCharts
        // here we turn it off immediately after the table initialization since we implement our own sorting method
        const cur_instance = hotTableComponent.current.hotInstance
        cur_instance.updateSettings({
            columnSorting: false,
        })

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
