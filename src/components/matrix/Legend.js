import React from 'react';
import './Legend.css';

const Legend = () => {
    return (
        <div className="mt-3">
            <b>Degree of Confound Control</b>
            <ul className="list-group list-group-horizontal text-center">
                <li className="list-group-item py-2 bg-adequate">A: Adequate</li>
                <li className="list-group-item py-2 bg-unclear">U: Unclear</li>
                <li className="list-group-item py-2 bg-inadequate">I: Inadequate</li>
                <li className="list-group-item py-2 ">U: Unknown</li>
                <li className="list-group-item py-2 bg-invalid">Invalid Value</li>
            </ul>
        </div>
    );
};

export default Legend;