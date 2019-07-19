import React, {useContext} from 'react';
import AlertContext from "../../context/alert/alertContext";
import MatrixContext from "../../context/matrix/MatrixContext";

const Alerts = () => {
    const alertContext = useContext(AlertContext);
    window.alertContext = alertContext;
    const {alerts} = alertContext;

    // provides global access for HandsOnTable renderer functions
    const matrixContext = useContext(MatrixContext);
    window.matrixContext = matrixContext;

    return (
        alerts.length >= 0 && (
            alerts.map(alert => (
                <div key={alert.id} className={`alert alert-${alert.style_type}`}>
                    <i className="fas fa-info-circle"/> {alert.msg}
                </div>
            ))
        )
    );
};

export default Alerts;