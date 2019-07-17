for (let i = 1; i < this.state.min_x_y[0]; i++) {
    this.el.setHeader(i, "var" + i)
}

// data: Handsontable.helper.createSpreadsheetData(200, 200),
const makeVerticalAlign = (col, TH) => {
    TH.className = 'align-middle'
}

// return [[...state].filter( alert => alert.msg !== action.payload.msg), action.payload]

if (col === 1) {
    cellMeta.columnSorting = {
        indicator: false,
        headerAction: false,
        compareFunctionFactory: function compareFunctionFactory() {
            return function comparator() {
                console.log("bef")
                return 0; // Don't sort the first visual column.
            };
        }
    }
    cellMeta.columnSorting = {
        beforeColumnSort: function (currentSortConfig, destinationSortConfigs) {
            console.log("bef")
            // const columnSortPlugin = this.getPlugin('columnSorting');

            // columnSortPlugin.setSortConfig(destinationSortConfigs);

            // const newData = ... // Calculated data set, ie. from an AJAX call.

            // this.loadData(newData); // Load a new data set.

            return false; // The blockade for the default sort action.
        }
    }
}

