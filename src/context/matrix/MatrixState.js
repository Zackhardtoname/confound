import React, { useReducer } from "react"
import MatrixContext from "./MatrixContext"
import MatrixReducer from "./MatrixReducer"
import {
    GET_RANGE,
    RESET_RANGE,
    Change_Metric_Name
} from "../types"

const MatrixState = props =>    {
    const initialState = {
        minMetric: Number.POSITIVE_INFINITY,
        maxMetric: Number.NEGATIVE_INFINITY,
        inputs: [],
        metricName: "metric"
    }

    const [state, dispatch] = useReducer(MatrixReducer, initialState)


    const getRange = (candidate) => {
        dispatch({type: GET_RANGE, payload: candidate})
    }

    const resetRange = () => {
        dispatch({type: RESET_RANGE})
    }

    const changeMetricName = (newName) => {
        console.log(newName)
        dispatch({type: Change_Metric_Name, payload: newName})
    }

    return <MatrixContext.Provider
        value={{
            minMetric: state.minMetric,
            maxMetric: state.maxMetric,
            inputs: state.inputs,
            metricName: state.metricName,
            getRange,
            resetRange,
            changeMetricName
        }}
    >
        {props.children}
    </MatrixContext.Provider>
}

export default MatrixState