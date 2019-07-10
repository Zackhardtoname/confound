import React, {Fragment} from 'react';
import './Legend.css';

const Legend = () => {
    return (
        <Fragment>
            <b>Degree of Confound Control</b>
            <ul className="list-group list-group-horizontal text-center">
                <li className="list-group-item py-2 bg-adequate">Adequate</li>
                <li className="list-group-item py-2 bg-unclear">Unclear</li>
                <li className="list-group-item py-2 bg-inadequate">Inadequate</li>
                <li className="list-group-item py-2 ">Unknown</li>
                <li className="list-group-item py-2 bg-invalid">Invalid Dropdown Value</li>
            </ul>
        </Fragment>
    );
};

export default Legend;
