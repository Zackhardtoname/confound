import {metricCol} from "../Constants";

export function precisionControl(input) {
    return input.map(function(each_element){
        return Number(each_element.toFixed(2));
    })
}

export function parseInput(input_str, row, col, instance, alertable) {
    let study = null
    if (alertable) {
        study = instance.getDataAtCell(row, 0)
    }

    try {
        const input_list = input_str.split(" ")
        const metric = parseFloat(input_list[0])
        const lower_bound = parseFloat(input_list[1].substring(1))
        const higher_bound = parseFloat(input_list[2].substring(0, input_list[2].length - 1))

        //not entering the catch, meaning parsing succeeded
        window.alertContext.removeAlert(`${row}_parsing`)

        //validator
        if (lower_bound > higher_bound && study !== null) {
            window.alertContext.setAlert(`Please have the lower bound be less or equal to the upper bound for the study "${study}"`, "warning", `${row}_bound`)
        }
        else if ((metric > higher_bound || metric < lower_bound) && study !== null) {
            window.alertContext.setAlert(`Please have the metric to be between the lower and the upper bounds for the study "${study}"`, "warning", `${row}_metric`)
        }
        else {
            //not alerting about bound, remove if any
            window.alertContext.removeAlert(`${row}_bound`)
            window.alertContext.removeAlert(`${row}_metric`)
        }

        return [lower_bound, metric, higher_bound]
    }
    catch {
        if (alertable && study !== null) {
            window.alertContext.setAlert(`Please use the correct format for the study "${study}"`, "danger", `${row}_parsing`)
        }

        return [1, 1, 1]
    }
}

export function setRange(instance, row) {
    let inputs
    if (row === 1) {
        window.matrixContext.resetRange()
        for (let i = 1; i < instance.countRows(); i++) {
            inputs = parseInput(instance.getDataAtCell(i, metricCol), row, null, instance, false)
            window.matrixContext.getRange(inputs[0])
            window.matrixContext.getRange(inputs[2])
        }
    }
}