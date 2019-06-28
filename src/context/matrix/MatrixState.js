import React, { useReducer } from "react"
import MatrixContext from "./MatrixContext"
import MatrixReducer from "./MatrixReducer"
// import {
//     SEARCH_USERS,
//     GET_USER,
//     GET_REPOS,
//     SET_LOADING,
//     CLEAR_USERS,
// } from "../../types"

const MatrixState = props =>    {
    const data = [
        ['Tokyo', 7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
        ['New York', -0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5],
        ['Berlin', -0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0],
        ['London', 3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8],
    ]

    const initialState = {
        options: {data: data},
        colHeaders: ['Model', 'Price', 'Price' ],
        // colWidths: [ 300, 300, 300 ],
        columns: [
            { type: 'text', title:'Car', width:120 },
            { type: 'dropdown', title:'Make', width:'120px', source:[ "Alfa Romeo", "Audi", "Bmw" ] },
            { type: 'calendar', title:'Available', width:'200px' },
            { type: 'image', title:'Photo', width:'120px' },
            { type: 'checkbox', title:'Stock', width:'80px' },
            { type: 'numeric', title:'Price', width:'100px', mask:'$ #.##,00', decimal:',' },
            { type: 'color', width:'100px', render:'square', }
        ]
    }

    const [state, dispatch] = useReducer(MatrixReducer, initialState)

    return <MatrixContext.Provider
        value={{
            options: state.options
        }}
    >
        {props.children}
    </MatrixContext.Provider>
}

export default MatrixState