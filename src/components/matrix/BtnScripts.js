import {initialData as curData} from "./Constants"
import {parseInput} from "./MatrixRenderers"

export function exportBtnSetup(hotTableComponent) {
    let btn = document.getElementById('export-file');
    const cur_instance = hotTableComponent.current.hotInstance
    btn.addEventListener('click', function() {
        let exportPlugin = cur_instance.getPlugin('exportFile');
        exportPlugin.downloadFile('csv', {
            bom: false,
            columnDelimiter: ',',
            exportHiddenColumns: true,
            exportHiddenRows: true,
            fileExtension: 'csv',
            filename: 'ConfounderMatrix-CSV-file_[YYYY]-[MM]-[DD]',
            mimeType: 'text/csv',
            rowDelimiter: '\r\n',
            columnHeaders: false,
            rowHeaders: false
        })
    })
}

export function importCSV() {
    let input = document.getElementById('dealCsv');
    input.addEventListener('change', async function(e) {
        let reader = new FileReader()

        reader.addEventListener('load', function (e) {
            let csvdata = e.target.result;
            parseCSV(this.instance, csvdata)
        });

        reader.readAsText(e.target.files[0]);
    })
}

export function sortMetric() {
    let btn = document.getElementById('sort-metric');

    btn.addEventListener('click', function() {
        curData.sort(function(x, y) {
            const x_metric = parseInput(x[1], null, null, null, false)[1]
            const y_metric = parseInput(y[1], null, null, null, false)[1]
            //two loops since even if x[1] or y[1] is "metric", x_metric or y_metric could still be 1, a number
            if (x[1] === "metric") {
                return -1;
            }
            else if (y[1] === "metric") {
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
    let parsedata = [];
    let newLinebrk = data.split("\n");

    for(let i = 0; i < newLinebrk.length; i++) {
        parsedata.push(newLinebrk[i].split(","))
    }

    // const cur_instance = this.hotTableComponent.current.hotInstance
    cur_instance.loadData(parsedata)
}