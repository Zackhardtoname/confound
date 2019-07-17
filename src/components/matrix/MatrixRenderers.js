import Handsontable from "handsontable";
import Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more'
import {dropDownStart, colorDict, metricCol} from "./Constants"
HC_more(Highcharts)

export function generalRenderer (row, col) {
    let cellMeta = {}

    //dropdown columns
    if (col >= dropDownStart) {
        cellMeta.colWidths = 30

        //dropdown cells (no header)
        if (row !== 0) {
            cellMeta.type = 'dropdown';
            cellMeta.source = ['A', 'U', 'I', "N"]
            cellMeta.renderer = highlightByVal
        }
    }
    //pre-dropdown columns
    else if (row === 0 || col === 0) {
        cellMeta.renderer = headers
    } else if (col === 2 && row !== 0) {
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

export function headers (instance, td, row, col, prop, value, cellProperties) {
    td.style.fontWeight = 'bold';
    Handsontable.renderers.TextRenderer.apply(this, [instance, td, row, col, prop, value, cellProperties]);

    if (row ===  0 && col === 1) {
        window.matrixContext.changeMetricName(value)
    }

    return td
}

export function forestPlot (instance, td, row, col, prop, value, cellProperties) {
    // parameters' purposes: https://handsontable.com/docs/7.1.0/Hooks.html#event:beforeRenderer
    // create the new range
    setRange(instance, row)
    // generate inputs
    let inputs = parseInput(instance.getDataAtCell(row, metricCol), row, col, instance, true)
    inputs = precisionControl(inputs)
    const full_input = [inputs[0], inputs[1], inputs[1], inputs[1], inputs[2]]

    // Rendering for the first time
    // or when rendering the first plot
    if (!(td.hasChildNodes() && cellProperties.hasOwnProperty("chart_instance"))) {
        const chartContainer = document.createElement('div');
        chartContainer.className = 'chart'
        td.appendChild(chartContainer)
    }
    cellProperties.chart_instance = createHCInstance(instance, td, full_input, window.matrixContext.minMetric, window.matrixContext.maxMetric, row)
    return td;
}

function createHCInstance (instance, td, full_input, minMetric, maxMetric) {
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
                return `${window.matrixContext.metricName}: ${full_input[(full_input.length-1) / 2]}<br>
                    CI: {${full_input[0]}, ${full_input[full_input.length-1]}}
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
            min: minMetric,
            max: maxMetric,
            resize: {
                enabled: true
            }
        },
        series: [{
            data: [
                full_input
            ]
        }]
    });
}

function precisionControl(input) {
    return input.map(function(each_element){
        return Number(each_element.toFixed(2));
    })
}

export function parseInput(input_str, row, col, instance, alertable) {
    let study = null
    if (alertable) {
        study = instance.getDataAtCell(row, 0)
    }

    try {
        const input_list = input_str.split(" ")
        const metric = parseFloat(input_list[0])
        const lower_bound = parseFloat(input_list[1].substring(1))
        const higher_bound = parseFloat(input_list[2].substring(0, input_list[2].length - 1))

        //not entering the catch, meaning parsing succeeded
        window.alertContext.removeAlert(`${row}_parsing`)

        //validator
        if (lower_bound > higher_bound && study !== null) {
            window.alertContext.setAlert(`Please have the lower bound be less or equal to the upper bound for the study "${study}"`, "warning", `${row}_bound`)
        }
        else if ((metric > higher_bound || metric < lower_bound) && study !== null) {
            window.alertContext.setAlert(`Please have the metric to be between the lower and the upper bounds for the study "${study}"`, "warning", `${row}_metric`)
        }
        else {
            //not alerting about bound, remove if any
            window.alertContext.removeAlert(`${row}_bound`)
            window.alertContext.removeAlert(`${row}_metric`)
        }

        return [lower_bound, metric, higher_bound]
    }
    catch {
        if (alertable && study !== null) {
            window.alertContext.setAlert(`Please use the correct format for the study "${study}"`, "danger", `${row}_parsing`)
        }

        return [1, 1, 1]
    }
}

function setRange(instance, row) {
    let inputs
    if (row === 1) {
        window.matrixContext.resetRange()
        for (let i = 1; i < instance.countRows(); i++) {
            inputs = parseInput(instance.getDataAtCell(i, metricCol), row, null, instance, false)
            window.matrixContext.getRange(inputs[0])
            window.matrixContext.getRange(inputs[2])
        }
    }
}