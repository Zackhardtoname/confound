import {columnDelimiter, initialData as curData} from "./Constants";
import {parseCSV, parseInput} from "./helpers/InputHelpers";

export function exportBtnSetup(hotTableComponent) {
    let btn = document.getElementById('export-file');
    const cur_instance = hotTableComponent.current.hotInstance;
    btn.addEventListener('click', function () {
        let exportPlugin = cur_instance.getPlugin('exportFile');
        // HandsOnTable only support csv as the format parameter for now
        exportPlugin.downloadFile('csv', {
            bom: false,
            columnDelimiter: columnDelimiter,
            exportHiddenColumns: true,
            exportHiddenRows: true,
            fileExtension: 'tsv',
            filename: 'ConfounderMatrix-CSV-file_[YYYY]-[MM]-[DD]',
            mimeType: 'text/tab-separated-values',
            columnHeaders: false,
            rowHeaders: false,
        });
    });
}

export function importCSV(hotTableComponent) {
    const cur_instance = hotTableComponent.current.hotInstance;

    let input = document.getElementById('dealCsv');
    input.addEventListener('change', async function (e) {
        let reader = new FileReader();

        reader.addEventListener('load', function (e) {
            let csvData = e.target.result;
            parseCSV(cur_instance, csvData);
        });

        reader.readAsText(e.target.files[0]);
    });
}

export function sortMetric() {
    const ascBtn = document.getElementById('sort-metric');

    ascBtn.addEventListener('click', function () {
        const isAscending = window.matrixContext.isAscending;
        let compareFunction;
        isAscending ? compareFunction = customComparisonAsc : compareFunction = customComparisonDesc;
        curData.sort(compareFunction);

        // for next time
        window.matrixContext.toggleSorting();
    });
}

// here we have two compare functions that only differ in the last condition.
// tried to combine them into one with the help of an external variable, but it turns out
// from (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
// "compareFunction(a, b) must always return the same value when given a specific pair of elements a and b as its two arguments. If inconsistent results are returned, then the sort order is undefined"

function customComparisonAsc(x, y) {
    const { metricName, x_metric, y_metric } = getCompareData(x, y);

    //two conditional blocks since even if x[1] or y[1] is "Metric", x_metric or y_metric could still be 1, a number
    if (x[1] === metricName) {
        return -1;
    } else if (y[1] === metricName) {
        return 1;
    }

    if (x_metric === y_metric) {
        return 0
    }

    return x_metric > y_metric ? 1 : -1;
}

function customComparisonDesc(x, y) {
    const { metricName, x_metric, y_metric } = getCompareData(x, y);

    //two conditional blocks since even if x[1] or y[1] is "Metric", x_metric or y_metric could still be 1, a number
    if (x[1] === metricName) {
        return -1;
    } else if (y[1] === metricName) {
        return 1;
    }

    if (x_metric === y_metric) {
        return 0
    }

    return x_metric < y_metric ? 1 : -1;
}

function getCompareData(x, y) {
    const metricName = window.matrixContext.metricName;
    const x_metric = parseInput(x[1], null, null, null, false)[1];
    const y_metric = parseInput(y[1], null, null, null, false)[1];

    return {metricName: metricName, x_metric: x_metric, y_metric: y_metric};
}
