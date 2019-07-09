import Handsontable from "handsontable";
import Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more' //module
import {dropDownStart, colorDict} from "./Constants"
HC_more(Highcharts)

export function generalRenderer (row, column) {
    let cellMeta = {}

    //dropdown columns
    if (column >= dropDownStart) {
        cellMeta.colWidths = 30

        //dropdown cells (no header)
        if (row !== 0) {
            cellMeta.type = 'dropdown';
            cellMeta.source = ['Adequate', 'Unclear', 'Inadequate', "N/A"]
            cellMeta.renderer = highlightByVal
        }
    }
    //pre-dropdown columns
    else if (row === 0 || column === 0) {
        cellMeta.renderer = bolden
    } else if (column === 2 && row !== 0) {
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
    const controlDegree = colorDict[value]
    if (controlDegree !== undefined) {
        const color = `var(${controlDegree["color"]})`
        console.log(color)
        td.style.color = color
        td.style.background = color
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
    // console.log("width:", instance.getColWidth(col))
    let allAORs = []
    let i
    const aORCol = col - 1
    for (i = 1; i < instance.countRows(); i++) {
        allAORs.push(parseFloat(instance.getDataAtCell(i, aORCol )))
    }
    const minAOr = Math.min(...allAORs) - .2
    const maxAOr = Math.max(...allAORs) + .2
    //todo fix scaling
    let aOr = parseFloat(instance.getDataAtCell(row, aORCol))
    let input = [aOr - .2, aOr, aOr, aOr, aOr + .2]
    if (!td.hasChildNodes() || cellProperties.chart_instance) {
        const chartContainer = document.createElement('div');
        chartContainer.className = 'chart'
        td.appendChild(chartContainer)
    }

    cellProperties.chart_instance = Highcharts.chart(td, {
        title: {
            text: null
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        tooltip: {
            formatter: function () {
                return `aOR: ${this.y}<br>
                    CI: {${this.point.options.low}, ${this.point.options.high}}
                    `
            }
        },
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
            }
        },
        chart: {
            type: 'boxplot',
            inverted: true,
            height: 68,
            // width: instance.getColWidth(col)
        },
        // dont' forget xAxis and yAxis are inverted - put data in yAxis
        xAxis: {
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
        },
        yAxis: {
            title: {
                text: null
            },
            plotLines: [{
                value: 1,
                color: 'red',
                width: 2,
                label: {
                    align: 'center',
                    style: {
                        color: 'gray'
                    }
                }
            }],
            min: minAOr,
            max: maxAOr,
        },
        series: [{
            data: [
                input
            ]
        }]
    });
    return td;
}