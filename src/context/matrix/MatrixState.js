import React, {useReducer} from "react";
import MatrixContext from "./MatrixContext";
import MatrixReducer from "./MatrixReducer";
import {Change_Metric_Name, GET_RANGE, RESET_RANGE, Toggle_Sorting} from "../types";

const MatrixState = props => {
    const initialState = {
        minMetric: Number.POSITIVE_INFINITY,
        maxMetric: Number.NEGATIVE_INFINITY,
        inputs: [],
        metricName: "Metric",
        isAscending: true,
    };

    const [state, dispatch] = useReducer(MatrixReducer, initialState);

    const getRange = (candidate) => {
        dispatch({type: GET_RANGE, payload: candidate});
    };

    const resetRange = () => {
        dispatch({type: RESET_RANGE});
    };

    const changeMetricName = (newName) => {
        dispatch({type: Change_Metric_Name, payload: newName});
    };

    const toggleSorting = () => {
        dispatch({type: Toggle_Sorting});
    };

    return <MatrixContext.Provider
        value={{
            minMetric: state.minMetric,
            maxMetric: state.maxMetric,
            inputs: state.inputs,
            metricName: state.metricName,
            isAscending: state.isAscending,
            getRange,
            resetRange,
            changeMetricName,
            toggleSorting
        }}
    >
        {props.children}
    </MatrixContext.Provider>;
};

export default MatrixState;
