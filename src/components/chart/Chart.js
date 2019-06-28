import React from 'react';
import ReactDOM from 'react-dom';
import jexcel from "jexcel";

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: props.options,
            template_col: { type: 'dropdown', source: ['A','I', 'U']},
            col_properties: [
                { type: 'text', title:'STUDY', width:300},
                { type: 'text', title:'aOR'}
            ],
            min_x_y: [8, 5]
        }
    }

    componentDidMount = function() {
        for (var i = 1; i < this.state.min_x_y[0]; i++) this.state.col_properties.push(this.state.template_col);

        this.el = jexcel(ReactDOM.findDOMNode(this).children[0], {
            data:[[]],
            columns: this.state.col_properties,
            minDimensions: this.state.min_x_y,
            search:true,
            allowComments: true,
        });


    }

    addRow = function() {
        this.el.insertRow();
    }

    addCol = function() {
        this.el.insertColumn(null, null, null, {columns: this.template_col});
    }

    render() {
        return (
            <div>
                <div></div><br/>
                <input type='button' value='Add new row' onClick={() => this.addRow()}></input>
                <br/>
                <input type='button' value='Add new column' onClick={() => this.addCol()}></input>
            </div>
        );
    }
}

export default Chart;