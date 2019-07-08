import React, {Fragment} from 'react';
import './Legend.css';

const Legend = () => {
    return (
        <Fragment>
            <b>Degree of Confound Control</b>
            <ul className="list-group list-group-horizontal text-center mb-5">
                <li className="list-group-item py-2 bg-adequate">Adequate</li>
                <li className="list-group-item py-2 bg-unclear">Unclear</li>
                <li className="list-group-item py-2 bg-inadequate">Inadequate</li>
                <li className="list-group-item py-2 ">Unknown</li>
                <li className="list-group-item py-2 bg-invalid">Invalid dropdown value</li>
            </ul>
        </Fragment>
        // <div id="legend" className="">
        //     <div className="row border-between">
        //         <div className="col-2">
        //             <div className="grid-cell bg-adequate"></div>
        //         </div>
        //         <div className="col-4">Adequate</div>
        //         <div className="col-6">Degree of</div>
        //     </div>
        //     <div className="row border-between">
        //         <div className="col-2">
        //             <div className="grid-cell bg-unclear"></div>
        //         </div>
        //         <div className="col-4">Unclear</div>
        //         <div className="col-6">Confounder</div>
        //     </div>
        //     <div className="row border-between">
        //         <div className="col-2">
        //             <div className="grid-cell bg-inadequate"></div>
        //         </div>
        //         <div className="col-4">Inadequate</div>
        //         <div className="col-6">Control</div>
        //     </div>
        // </div>
    );
};

export default Legend;
