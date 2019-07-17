import {
    GET_RANGE,
    RESET_RANGE
} from "../types"

export default (state, action) => {
    switch(action.type) {
        case GET_RANGE:
            return {
                ...state,
                minMetric: Math.min(state.minMetric, action.payload),
                maxMetric: Math.max(state.maxMetric, action.payload)
            }
        case RESET_RANGE:
            return {
                ...state,
                minMetric: Number.POSITIVE_INFINITY,
                maxMetric: Number.NEGATIVE_INFINITY
            }
        default:
            return state;
    }
}