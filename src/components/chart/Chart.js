import React, {Fragment} from 'react';
import './Chart.css';
import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.settings = {
            licenseKey: "non-commercial-and-evaluation",
            data: [
                ["Study", "aOR", "location", "GDP", "Country"],
                ["Zack et. 2016", ".5", "A", "I", "U"],
                ["Light et. 2017", ".8", "A", "N", "U"],
                [".com et. 2018", "1.1", "A", "I", "U"],
            ],
            colHeaders: false,
            rowHeaders: false,
            contextMenu: true,
            // stretchH: "all",
            className: "htCenter",
            cells: function(row, column) {
                const alignOptions = "htMiddle htCenter"

                let cellMeta = {
                    renderer: (instance, td, row, col, prop, value, cellProperties) => {
                        switch(value) {
                            case 'A':
                                td.style.background = '#a9d08f';
                                break;
                            case "I":
                                td.style.background = '#ffe69a';
                                break;
                            case "U":
                                td.style.background = '#f4b085';
                                break;
                            default:
                                Handsontable.renderers.TextRenderer.apply(this, [instance, td, row, col, prop, value, cellProperties]);
                        }
                        td.innerHTML = value
                        //redundancy here due to bug (issue #5027)
                        td.className = alignOptions
                        return td
                    }
                }

                //for dropdown cells
                if (row !== 0 && column >= 2) {
                    cellMeta.type = 'dropdown';
                    cellMeta.source = ['A', 'U', 'I', "N"]
                }

                //for dropdown columns
                if (column >= 2) {
                    cellMeta.colWidths = 30
                }

                cellMeta.className = alignOptions

                return cellMeta;
            },
            afterChange: (_) => {
                this.verticalHeaders()
                },
            //todo afterCreateCol not working
            afterCreateCol: (_) => {
                this.verticalHeaders()
            }
        }

        this.hotTableComponent = React.createRef()
    }

    exportBtnSetup = () => {
        let button1 = document.getElementById('export-file');
        let exportPlugin1 = this.hotTableComponent.current.hotInstance.getPlugin('exportFile');

        button1.addEventListener('click', function() {
            exportPlugin1.downloadFile('csv', {
                bom: false,
                columnDelimiter: ',',
                exportHiddenColumns: true,
                exportHiddenRows: true,
                fileExtension: 'csv',
                filename: 'Handsontable-CSV-file_[YYYY]-[MM]-[DD]',
                mimeType: 'text/csv',
                rowDelimiter: '\r\n',
                columnHeaders: false,
                rowHeaders: false
            });
        })
    }

    verticalHeaders = () => {
        let vertical = document.querySelectorAll(".handsontable tr:first-child td")
        vertical.forEach((item, idx) => {
            if (idx >= 2) item.innerHTML = `<span>${item.innerHTML}</span>`
        })
    }

    componentDidMount = () => {
        this.exportBtnSetup()
        this.verticalHeaders()
}

    render() {
        return (
            <Fragment>
                <HotTable ref={this.hotTableComponent} id="hot" settings={this.settings}/>
                <br/>
                <button id="export-file" className="intext-btn">Download CSV</button>
            </Fragment>
        );
}
}

export default Chart;