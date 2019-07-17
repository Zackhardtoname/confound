import React, { useReducer } from "react"
import MatrixContext from "./MatrixContext"
import MatrixReducer from "./MatrixReducer"
import {
    GET_RANGE,
    RESET_RANGE
} from "../types"

const MatrixState = props =>    {
    const initialState = {
        minMetric: Number.POSITIVE_INFINITY,
        maxMetric: Number.NEGATIVE_INFINITY,
        inputs: []
    }

    const [state, dispatch] = useReducer(MatrixReducer, initialState)


    const getRange = (candidate) => {
        dispatch({type: GET_RANGE, payload: candidate})
    }

    const resetRange = () => {
        dispatch({type: RESET_RANGE})
    }


    return <MatrixContext.Provider
        value={{
            minMetric: state.minMetric,
            maxMetric: state.maxMetric,
            inputs: state.inputs,
            getRange,
            resetRange
        }}
    >
        {props.children}
    </MatrixContext.Provider>
}

export default MatrixState