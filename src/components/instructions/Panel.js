import React from 'react';
import './Panel.css';

const Panel = () => {
    return (
        <div id="panel" className="card">
            <div className="card-body">
                <h5 className="card-title">Quick Start</h5>
                <ol>
                    <li>
                        Edit any value via double clicks
                    </li>
                    <li>
                        <b>Values in the metric column must be in the format: metric (lower bound, upper bound)</b>
                    </li>
                    <li>
                        To empty a dropdown cell, select the cell, press space, and enter
                    </li>
                    <li>
                        Right click on cells (except for the plot cells) to see the menu that allows inserting rows,
                        columns, etc.
                    </li>
                </ol>
                <h5 className="card-title">Sorting</h5>
                <ol>
                    <li>
                        Sorting uses the "metric" value (instead of the boundaries)
                    </li>
                    <li>
                        The sorting button toggle between ascending and descending upon clicks (initially ascending)
                    </li>
                </ol>
                <h5 className="card-title">Plots</h5>
                <ol>
                    <li>
                        Hover over the Plot column to see the specific values in popups
                    </li>
                    <li>
                        Hover over the headers of the dropdown columns to see the name in popups
                    </li>
                </ol>
                <h5 className="card-title">Downloading/Uploading</h5>
                <ol>
                    <li>
                        For now, you can only download the text/numbers without the plots
                    </li>
                    <li>
                        The matrix would be saved as a TSV file. Usage instructions are <a
                        href="https://rievent.zendesk.com/hc/en-us/articles/360000029172-FAQ-How-do-I-open-a-tsv-file-in-Excel-"
                        target="_blank" rel="noopener noreferrer">here</a>
                    </li>
                    <li>
                        Note the Plot column must be kept empty
                    </li>
                </ol>
                <h5 className="card-title">Questions/Contributions</h5>
                <p className="card-text tab">
                    Please contact BU SAIL: <a href="mailto: hicsail@bu.edu">hicsail@bu.edu</a>
                </p>
            </div>
        </div>
    );
};

export default Panel;
