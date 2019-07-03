import Handsontable from "handsontable";
import Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more' //module
import {dropDownStart} from "./Constants"
HC_more(Highcharts)

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
    else if (row === 0 || column === 0) {
        cellMeta.renderer = bolden
    } else if (column === 1 && row !== 0) {
        cellMeta.renderer = forestPlot
        cellMeta.editor = false
    }

    if (row === 0) {
        cellMeta.className = "htBottom htCenter"
    }
    else {
        cellMeta.className = "htMiddle htCenter"
    }
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

export function bolden (instance, td, row, col, prop, value, cellProperties) {
    td.style.fontWeight = 'bold';
    Handsontable.renderers.TextRenderer.apply(this, [instance, td, row, col, prop, value, cellProperties]);
    return td
}

export function forestPlot (instance, td, row, col, prop, value, cellProperties) {

    const aOr = instance.getDataAtCell(row, col + 1)
    if (td.hasChildNodes() && cellProperties.has_chart) {
        // cellProperties.has_chart.update();
        return td;
    }

    const chartContainer = document.createElement('div');
    chartContainer.className = 'chart'
    td.appendChild(chartContainer)

    cellProperties.has_chart = Highcharts.chart(chartContainer, {
        title: {
            text: null
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
            type: 'boxplot',
            inverted: true,
            height: 68,
            width: 200
        },
        xAxis: {
            labels: {
                enabled: false
            },
            title: {
                text: null
            }
        },

        yAxis: {
            title: {
                text: null
            },
            plotLines: [{
                value: aOr,
                color: 'red',
                width: 1,
                label: {
                    align: 'center',
                    style: {
                        color: 'gray'
                    }
                }
            }],
            // tickPixelInterval: 2
        },
        series: [{
            data: [
                [760, 848, 848, 848, 965]
                // [aOr - .2, aOr, aOr, aOr, aOr + .2],
            ],
            tooltip: {
                headerFormat: '<em>Experiment No {point.key}</em><br/>'
            }
        }]

    });

    return td
}