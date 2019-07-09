export const dropDownStart = 3

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
    ["Study", "aOR", "Forest Plot", "Location", "GDP", "Country"],
    ["paper 1", ".5", null,  "Adequate", "Inadequate", "Unclear"],
    ["paper 2", ".8", null, "Adequate", "N/A", "Unclear"],
    ["paper 3", "1.1", null, "Adequate", "Inadequate", "Unclear"],
]