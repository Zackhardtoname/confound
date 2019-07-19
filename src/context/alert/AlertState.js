import React, {useReducer} from "react";
import uuid from "uuid";
import AlertContext from "./AlertContext";
import AlertReducer from "./AlertReducer";
import {REMOVE_ALERT, SET_ALERT,} from "../types";

const AlertState = props => {
    const initialState = [];

    const [state, dispatch] = useReducer(AlertReducer, initialState);

    const setAlert = (msg, style_type, desc_key, timeout = 15000) => {
        const id = uuid.v4();

        dispatch({
            type: SET_ALERT,
            payload: {msg, style_type, id, desc_key},
        });

        setTimeout(() =>
            dispatch({
                type: REMOVE_ALERT,
                payload: id
            }), timeout);
    };

    const removeAlert = (desc_key) => {
        dispatch({
            type: REMOVE_ALERT,
            payload: desc_key
        });
    };


    return (<AlertContext.Provider
            value={{
                alerts: state,
                setAlert,
                removeAlert
            }}
        >
            {props.children}
        </AlertContext.Provider>
    );
};

export default AlertState;