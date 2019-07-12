export const dropDownStart = 3
export const metricCol = 1

export const colorDict = {
    Adequate: {
        shortName: "A",
        color: '--adequate-color'
    },
    Unclear: {
        shortName: "U",
        color: '--unclear-color'
    },
    Inadequate: {
        shortName: "I",
        color: '--inadequate-color'
    }
}

export const initialData = [
    ["Study", "metric", "Forest Plot", "Location", "GDP", "Country"],
    ["paper 1", ".5 (0.4, 0.6)", null,  "Adequate", "Inadequate", "Unclear"],
    ["paper 2", ".8 (0.5, 1.1)", null, "Adequate", "N/A", "Unclear"],
    ["paper 3", "1.1 (0.75, 1.45)", null, "Adequate", "Inadequate", "Unclear"],
]