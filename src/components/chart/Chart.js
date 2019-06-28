import React from 'react';
import ReactDOM from 'react-dom';
import jexcel from "jexcel";

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: props.options,
            col_properties: [
                { type: 'text', title:'STUDY', width:300},
                { type: 'text', title:'aOR'}
            ],
            template_col: { type: 'dropdown', source: ['A','I', 'U']},
            min_x_y: [8, 5]
        }

        for (let i = this.state.col_properties.length; i < this.state.min_x_y[0]; i++) this.state.col_properties.push(this.state.template_col);
    }

    componentDidMount = function() {

        this.state.table = jexcel(ReactDOM.findDOMNode(this).children[0], {
            data:[[]],
            columns: this.state.col_properties,
            minDimensions: this.state.min_x_y,
            search:true,
            allowComments: true,
        });

        for (let i = this.state.col_properties.length; i < this.state.min_x_y[0]; i++)
        {
            this.state.table.setStyle('E1', 'background-color', 'yellow')
            this.state.col_properties.push(this.state.template_col);
        }
    }

    addRow = function() {
        this.state.table.insertRow();
    }

    addCol = function() {
        this.state.table.insertColumn(null, null, null, {columns: this.state.template_col});
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