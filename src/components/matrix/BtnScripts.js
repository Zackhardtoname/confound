import {initialData as curData, columnDelimiter} from "./Constants"
import {parseInput} from "./Helpers/InputHelpers"

export function exportBtnSetup(hotTableComponent) {
    let btn = document.getElementById('export-file');
    const cur_instance = hotTableComponent.current.hotInstance
    btn.addEventListener('click', function() {
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
        })
    })
}

export function importCSV(hotTableComponent) {
    const cur_instance = hotTableComponent.current.hotInstance

    let input = document.getElementById('dealCsv');
    input.addEventListener('change', async function(e) {
        let reader = new FileReader()

        reader.addEventListener('load', function (e) {
            let csvData = e.target.result;
            parseCSV(cur_instance, csvData)
        });

        reader.readAsText(e.target.files[0]);
    })
}

export function sortMetric() {
    let btn = document.getElementById('sort-metric');

    btn.addEventListener('click', function() {
        const metricName = window.matrixContext.metricName
        curData.sort(function(x, y) {
            const x_metric = parseInput(x[1], null, null, null, false)[1]
            const y_metric = parseInput(y[1], null, null, null, false)[1]
            //two loops since even if x[1] or y[1] is "Metric", x_metric or y_metric could still be 1, a number
            if (x[1] === metricName) {
                return -1;
            }
            else if (y[1] === metricName) {
                return 1;
            }

            if (x_metric < y_metric) {
                return -1;
            }
            if (x_metric  > y_metric) {
                return 1;
            }
            return 0;
        });
    })
}

function parseCSV(cur_instance, data) {
    let parseData = [];
    let lines = data.split("\n");
    for(let i = 0; i < lines.length; i++) {
        if (lines[i] !== "") {
            let toPush = lines[i].split(columnDelimiter)
            toPush.forEach( (str) => (
                str.replace(/^"|"$/g, '')
                )
            )
            parseData.push(toPush)
        }
    }

    cur_instance.loadData(parseData)
}