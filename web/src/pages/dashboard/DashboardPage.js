import React, {useCallback, useEffect, useState} from 'react';
import {AddApp} from "./components/add-app/AddApp";
import {AppListItem} from "./components/app-list-item/AppListItem";
import {useParams} from "react-router-dom";
import {useHttp} from "../../hooks/http.hook";

export const DashboardPage = () => {
    const {loading, request} = useHttp();
    const [apps, setApps] = useState([]);

    const getApps = useCallback(async () => {
        try {
            const data = await request(`/api/apps`, 'GET');
            setApps([...data.data]);
        } catch (e) {}
    }, [request]);

    useEffect(() => {
        getApps();
    }, [getApps]);

    return (
        <div>
            <AddApp onAdd={getApps}/>
            <table className="responsive-table highlight">
                <thead>
                <tr>
                    <th>Package name</th>
                    <th>Monitor count</th>
                    <th className="center-align">View monitoring</th>
                </tr>
                </thead>

                <tbody>
                    {apps.map((app, i) => (<AppListItem key={i} app={app}/>))}
                </tbody>
            </table>
        </div>
    )
}
