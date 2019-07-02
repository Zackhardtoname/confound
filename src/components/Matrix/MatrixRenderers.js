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
        // forestPlot = forestPlot.bind(this)
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
    console.log(cellProperties)
    // console.log(row, col)
    // if (!td.hasChildNodes()) {
    //     console.log("!td.hasChildNodes()")
    //     if (cellProperties.Matrix) {
    //         console.log("cellProperties.Matrix")
    //         cellProperties.Matrix.destroy();
    //         cellProperties.Matrix = void 0;
    //     }
    // } else if (cellProperties.Matrix) {
    //     console.log("cellProperties.Matrix")
    //     cellProperties.Matrix.update();
    //     return td;
    // }

    if (cellProperties.chart) {
        console.log("has chart")
        // cellProperties.Matrix.update();
        return td;
    }

    const chartContainer = document.createElement('div');
    chartContainer.className = 'chart';
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
                // pointStart: -1
            }
        },

        chart: {
            type: 'bar'
        },
        xAxis: {
            categories: ['Africa'],
            title: {
                text: null
            }
        },
        tooltip: {
            valueSuffix: ' millions'
        },
        series: [ {
            name: 'Year 2016',
            data: [1216, 1001, 4436, 738, 40]
        }]
    });

    return td
}