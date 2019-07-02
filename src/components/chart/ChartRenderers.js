import Handsontable from "handsontable";
import Highcharts from 'highcharts';
import {dropDownStart} from "./Constants"

export function generalRenderer (row, column) {
    let cellMeta = {}

    //dropdown columns
    if (column >= dropDownStart) {
        cellMeta.colWidths = 30

        //dropdown cells (no header)
        if (row !== 0) {
            cellMeta.type = 'dropdown';
            cellMeta.source = ['A', 'U', 'I', "N"]
            cellMeta.renderer = highlightByVal
        }
    }
    //pre-dropdown columns
    else if (column === 0) {
        cellMeta.renderer = studyNames
    } else if (column === 1 && row !== 0) {
        cellMeta.renderer = forestPlot
        cellMeta.editor = false
    }
    cellMeta.className = "htBottom htCenter"
    return cellMeta
}

//functions used by generalRenderer
export function highlightByVal (instance, td, row, col, prop, value, cellProperties) {
    switch (value) {
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
    }

    Handsontable.renderers.TextRenderer.apply(this, [instance, td, row, col, prop, value, cellProperties]);
    return td
}

export function studyNames (instance, td, row, col, prop, value, cellProperties) {
    td.style.fontWeight = 'bold';
    td.style["white-space"] = "nowrap"
    Handsontable.renderers.TextRenderer.apply(this, [instance, td, row, col, prop, value, cellProperties]);
    return td
}

export function forestPlot (instance, td, row, col, prop, value, cellProperties) {
        if (!td.hasChildNodes()) {
            if (cellProperties.chart) {
                cellProperties.chart.destroy();
                cellProperties.chart = void 0;
            }
        } else if (cellProperties.chart) {
            // cellProperties.chart.update();
            return td;
        }

        const rates = [.5, .5, .5]
        console.log(row, col, rates)
        const chartContainer = document.createElement('div');
        chartContainer.className = 'chart';
        // const chartCanvas = document.createElement('canvas');
        // chartContainer.appendChild(chartCanvas);
        td.appendChild(chartContainer);

        cellProperties.chart = Highcharts.chart(chartContainer, {
            title: {
                text: null
            },
            yAxis: {
                title: {
                    text: null
                }
            },
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: -1
                }
            },
            series: [{
                data: [-1, 2]
            }],
            // responsive: {
            //     rules: [{
            //         condition: {
            //             maxWidth: 100
            //         },
            //     }]
            // }

        });

    return td
}