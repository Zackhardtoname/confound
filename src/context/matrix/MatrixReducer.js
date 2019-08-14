import {Change_Metric_Name, GET_RANGE, RESET_RANGE, Toggle_Sorting} from "../types";

export default (state, action) => {
    switch (action.type) {
        case GET_RANGE:
            return {
                ...state,
                minMetric: Math.min(state.minMetric, action.payload),
                maxMetric: Math.max(state.maxMetric, action.payload)
            };
        case RESET_RANGE:
            return {
                ...state,
                minMetric: Number.POSITIVE_INFINITY,
                maxMetric: Number.NEGATIVE_INFINITY
            };
        case Change_Metric_Name:
            return {
                ...state,
                metricName: action.payload
            };
        case Toggle_Sorting:
            return {
                ...state,
                isAscending: !state.isAscending
            };
        default:
            return state;
    }
}
