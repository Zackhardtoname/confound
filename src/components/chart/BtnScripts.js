export function exportBtnSetup() {
    let btn = document.getElementById('export-file');
    let exportPlugin1 = this.hotTableComponent.current.hotInstance.getPlugin('exportFile');

    btn.addEventListener('click', function() {
        exportPlugin1.downloadFile('csv', {
            bom: false,
            columnDelimiter: ',',
            exportHiddenColumns: true,
            exportHiddenRows: true,
            fileExtension: 'csv',
            filename: 'Handsontable-CSV-file_[YYYY]-[MM]-[DD]',
            mimeType: 'text/csv',
            rowDelimiter: '\r\n',
            columnHeaders: false,
            rowHeaders: false
        });
    })
}

export function stretchBtnSetup() {
    let btn = document.getElementById('stretch');
    const cur_instance = this.hotTableComponent.current.hotInstance

    btn.addEventListener('click', function() {
        cur_instance.updateSettings({
            stretchH: "all",
        })
    })
}

export function unStretchBtnSetup() {
    let btn = document.getElementById('unstretch');
    const cur_instance = this.hotTableComponent.current.hotInstance

    btn.addEventListener('click', function() {
        cur_instance.updateSettings({
            stretchH: "none",
            // do not rerun this.initialRenderer here
        })
    })
}