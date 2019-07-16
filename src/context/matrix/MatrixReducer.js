import {
    GET_RANGE
} from "../../types"

export default (state, action) => {
    switch(action.type) {
        case GET_RANGE:
            return {
                ...state,
                minMetric: Math.min(state.minMetric, action.payload),
                maxMetric: Math.max(state.maxMetric, action.payload)
            }
        default:
            return state;
    }
}