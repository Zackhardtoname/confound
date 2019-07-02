import Handsontable from "handsontable";
import {dropDownStart} from "./Constants"

export function initialRenderer (row, column) {
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
    }

    cellMeta.className = "htBottom htCenter"
    return cellMeta
}

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

    //redundancy here due to bug (issue #5027)
    td.className = "htBottom htCenter"
    return td
}

export function studyNames (instance, td, row, col, prop, value, cellProperties) {
    // this.initialRenderer = initialRenderer.bind(this)
    td.style.fontWeight = 'bold';
    td.style["white-space"] = "nowrap"
    Handsontable.renderers.TextRenderer.apply(this, [instance, td, row, col, prop, value, cellProperties]);
    return td
}