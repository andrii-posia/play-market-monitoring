import React from 'react';
import {Link} from "react-router-dom";

export const AppListItem = ({app}) => {
    return (
        <tr>
            <td>{app.url}</td>
            <td>{app.screenshots.length}</td>
            <td className="center-align">
                <Link className="waves-effect waves-light btn" to={`/app/${app._id}`}>View</Link>
            </td>
        </tr>
    )
}
