import React, {useState, useContext, useEffect} from 'react';
import Handsontable from "handsontable";
import Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more'
import {dropDownStart, colorDict, metricCol} from "./Constants"
import AlertContext from "../../context/alert/alertContext"
import MatrixContext from "../../context/matrix/MatrixContext"
HC_more(Highcharts)

// const alertContext = useContext(AlertContext)
// const {setAlert} = alertContext
//
// const matrixContext = useContext(MatrixContext)
// const {inputs, getRange} = matrixContext

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
        cellMeta.renderer = forestPlot.bind(this)
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
    // parameters' purposes: https://handsontable.com/docs/7.1.0/Hooks.html#event:beforeRenderer
    let input

    // create the new range
    if (row === 1) {
        for (let i = 1; i < instance.countRows(); i++) {
            input = parseInput(instance.getDataAtCell(i, metricCol))
            // this.inputs.push(input)
            this.getRange(input[0])
            this.getRange(input[2])
        }
    }

    // generate input
    input = parseInput(instance.getDataAtCell(row, metricCol))
    input = precisionControl(input)
    const full_input = [input[0], input[1], input[1], input[1], input[2]]

    // Rendering for the first time
    // or when rendering the first plot
    if (!(td.hasChildNodes() && cellProperties.hasOwnProperty("chart_instance"))) {
        const chartContainer = document.createElement('div');
        chartContainer.className = 'chart'
        td.appendChild(chartContainer)
    }
    cellProperties.chart_instance = createHCInstance(instance, td, full_input, this.minMetric, this.maxMetric)
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
                return `metric: ${full_input [(full_input .length-1) / 2]}<br>
                    CI: {${full_input [0]}, ${full_input [full_input .length-1]}}
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

function parseInput(input_str) {
    const input_list = input_str.split(" ")
    const metric = parseFloat(input_list[0])
    const lower_bound = parseFloat(input_list[1].substring(1))
    const higher_bound = parseFloat(input_list[2].substring(0, input_list[2].length - 1))
    return [lower_bound, metric, higher_bound]
}