import React from 'react';
import ReactDOM from 'react-dom';
import './Chart.css';
// import jexcel from "jexcel";

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: props.options,
            col_properties: [
                { type: 'text', title:'STUDY', width:300},
                { type: 'text', title:'aOR'}
            ],
            template_col: { type: 'dropdown'},
            min_x_y: [8, 5],
            color_dict: {
                "A": "#a9d08f",
                "I": "#ffe69a",
                "U": "#f4b085",
            }
        }
        this.state.template_col.source = Object.keys(this.state.color_dict)

        for (let i = this.state.col_properties.length; i < this.state.min_x_y[0]; i++) this.state.col_properties.push(this.state.template_col);
    }

    handler = (obj, cell, val) => {
        // would not bother with the span
        cell.style.backgroundColor = this.state.color_dict[cell.innerHTML]
        console.log(cell.nodeName)

        if (cell.nodeName === "td") {
            console.log(cell)
        }
    };

    componentDidMount = function() {

        this.table = window.jexcel(ReactDOM.findDOMNode(this).children[0], {
            data:[[]],
            columns: this.state.col_properties,
            minDimensions: this.state.min_x_y,
            search:true,
            allowComments: true,
            onchange: this.handler,
        });

        let vertical = document.querySelectorAll("thead td")
        vertical.forEach((item, idx) => {
            // todo span would cause a problem with right click pop up
            if (idx >= 3) item.innerHTML = `<span>${item.innerHTML}</span>`
        })
    }

    addRow = function() {
        this.table.insertRow();
    }

    addCol = function() {
        this.table.insertColumn(null, null, null, {columns: this.state.template_col});
    }

    download = function() {
        this.table.download()
    }

    render() {
        return (
            <div>
                <div></div><br/>
                <input type='button' value='Add new row' onClick={() => this.addRow()}></input>
                <br/>
                <input type='button' value='Add new column' onClick={() => this.addCol()}></input>
                <br/>
                <input type='button' value='Download Matrix' onClick={() => this.download()}></input>
            </div>
        );
    }
}

export default Chart;