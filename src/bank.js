for (let i = 1; i < this.state.min_x_y[0]; i++) {
    this.el.setHeader(i, "var" + i)
}

// data: Handsontable.helper.createSpreadsheetData(200, 200),
const makeVerticalAlign = (col, TH) => {
    TH.className = 'align-middle'
}

// return [[...state].filter( alert => alert.msg !== action.payload.msg), action.payload]
