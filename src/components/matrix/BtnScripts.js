export function exportBtnSetup() {
    let btn = document.getElementById('export-file');
    const cur_instance = this.hotTableComponent.current.hotInstance
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

export function importCSV(cur_instance) {
    let input = document.getElementById('dealCsv');
    input.addEventListener('change', async function(e) {
        let reader = new FileReader()

        reader.addEventListener('load', function (e) {

            let csvdata = e.target.result;
            console.log(csvdata)
            parseCSV(cur_instance, csvdata)
        });

        reader.readAsText(e.target.files[0]);
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