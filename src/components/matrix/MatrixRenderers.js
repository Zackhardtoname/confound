import Handsontable from "handsontable";
import Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more'
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
        // cellMeta.renderer = bolden
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
    // get rid of the carriage returns
    if (value !== null) value = value.replace(/[\n\r'"]/g, "")
    const controlDegree = colorDict[value]
    if (controlDegree !== undefined) {
        const color = `var(${controlDegree["color"]})`
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
    // Zack's understanding -- no documentation:
    // instance - the handsOnTable instance
    // td - the the td element
    // cellProperties - the properties of the td element
    let allAORs = []
    let i
    const aORCol = col - 1
    for (i = 1; i < instance.countRows(); i++) {
        allAORs.push(parseFloat(instance.getDataAtCell(i, aORCol )))
    }

    let minAOr = Math.min(...allAORs) - .2
    let maxAOr = Math.max(...allAORs) + .2

    if (!minAOr || !maxAOr) {
        allAORs.pop()
        minAOr = Math.min(...allAORs) - .2
        maxAOr = Math.max(...allAORs) + .2
    }

    let aOr = parseFloat(instance.getDataAtCell(row, aORCol))
    let input = [aOr - .2, aOr, aOr, aOr, aOr + .2]

    input = precisionControl(input)

    if (!(td.hasChildNodes() && cellProperties.hasOwnProperty("chart_instance"))) {
        const chartContainer = document.createElement('div');
        chartContainer.className = 'chart'
        td.appendChild(chartContainer)

        //Commented out the bugged way to update charts without complete rerendering
        cellProperties.chart_instance = createHCInstance(instance, td, input, minAOr, maxAOr)
    }
    cellProperties.chart_instance = createHCInstance(instance, td, input, minAOr, maxAOr)

    const chart = cellProperties.chart_instance
    chart.series[0].remove()
    chart.addSeries({
        data: [
            input
        ]
    })
    chart.yAxis[0].update({
        max: minAOr
    });
    chart.yAxis[0].update({
        max: maxAOr
    });

    return td;
}

function createHCInstance (instance, td, input, minAOr, maxAOr) {
    return Highcharts.chart(td, {
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
                return `aOR: ${input[(input.length-1) / 2]}<br>
                    CI: {${input[0]}, ${input[input.length-1]}}
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
            endOnTick: true,
            startOnTick: true,
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
}

function precisionControl(input) {
    return input.map(function(each_element){
        return Number(each_element.toFixed(2));
    })
}