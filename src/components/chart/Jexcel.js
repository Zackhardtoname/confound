import React from 'react';
import ReactDOM from 'react-dom';
import jexcel from "jexcel";
import $ from "jquery";
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class Chart extends React.Component {
    constructor(props) {
        super(props)
        this.options = props.options
        this.chart = props.chart
    }

    componentDidMount = function() {
        this.el = jexcel(ReactDOM.findDOMNode(this).children[0], this.options)
    }

    addRow = function() {
        this.el.insertRow()
    }

    render() {

        return (
            <div>
                <div></div><br/>
                <input type='button' value='Add new row' onClick={() => this.addRow()}></input>
            </div>
        );
    }
}

export default Chart;