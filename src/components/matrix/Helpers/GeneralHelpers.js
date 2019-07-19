import {colorDict, dropDownStart, metricCol} from "../Constants";
import Handsontable from "handsontable";

// for Matrix.js
export const verticalHeaders = () => {
    let vertical = document.querySelectorAll(".handsontable tr:first-child td")
    vertical.forEach((item, idx) => {
        if (idx >= dropDownStart) {
            const original = item.textContent
            item.innerHTML = `<span data-toggle="tooltip" data-placement="top" title="${original}">${original}</span>`
        }
    })
}

export const makeTooltip = () => {
    window.$('[data-toggle="tooltip"]').tooltip({
        offset: '0, 10'
    });
}


// for MatrixRenderers.js

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

