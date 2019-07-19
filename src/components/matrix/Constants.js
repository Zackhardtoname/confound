export const dropDownStart = 3
export const metricCol = 1
export const columnDelimiter = '\t'

export const colorDict = {
    A: {
        fullName: "Adequate",
        color: '--adequate-color'
    },
    U: {
        fullName: "Unclear",
        color: '--unclear-color'
    },
    I: {
        fullName: "Inadequate",
        color: '--inadequate-color'
    }
}

// Note the second col header is also specified in matrixState
export const initialData = [
    ["Study", "Metric", "Plot", "Location", "GDP", "Country"],
    ["paper 1", ".5 (0.4, 0.6)", null,  "A", "I", "U"],
    ["paper 2", ".8 (0.5, 1.1)", null, "A", "N", "U"],
    ["paper 3", "1.1 (0.75, 1.45)", null, "A", "I", "U"],
]