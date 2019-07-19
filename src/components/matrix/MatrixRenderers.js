import Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more';
import {dropDownStart} from "./Constants";
import {headers, highlightByVal} from "./Helpers/GeneralHelpers";
import {plot} from "./Helpers/PlotHelpers";

HC_more(Highcharts);

export function generalRenderer(row, col) {
    let cellMeta = {};

    //dropdown columns
    if (col >= dropDownStart) {
        cellMeta.colWidths = 30;

        //dropdown cells (no header)
        if (row !== 0) {
            cellMeta.type = 'dropdown';
            cellMeta.source = ['A', 'U', 'I', "N"];
            cellMeta.renderer = highlightByVal;
        }
    }
    //pre-dropdown columns
    else if (row === 0 || col === 0) {
        cellMeta.renderer = headers;
    } else if (col === 2 && row !== 0) {
        cellMeta.renderer = plot;
        cellMeta.editor = false;
    }

    if (row === 0) {
        cellMeta.className = "htBottom htCenter";
    } else {
        cellMeta.className = "htMiddle htCenter";
    }

    return cellMeta;
}
