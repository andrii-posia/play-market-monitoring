import React, {useCallback, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useHttp} from "../../hooks/http.hook";

export const AppViewPage = () => {
    let {appId} = useParams();
    const {loading, request} = useHttp();
    const [app, setApp] = useState({screenshots: []});

    const getApp = useCallback(async () => {
        try {
            const data = await request(`/api/apps/${appId}`, 'GET');
            setApp(data.data);
        } catch (e) {}
    }, [appId, request]);

    useEffect(() => {
        getApp();
    }, [getApp]);

    return (
        <div>
            <div className="center-align">
                <h3>{app.name}</h3>
            </div>
            <div>
                <h5><b>Link</b> {app.url}</h5>
                <h5><b>Start time</b> {app.start_time}</h5>
            </div>
            <div className="center-align">
                {app.screenshots.map((screenshot, i) => {
                    const imgLink = `http://localhost:3333/assets/screenshots/${app.name}/${screenshot.img}`;

                    return (
                        <div className="row" key={i}>
                            <div className="col s12">
                                <div className="card">
                                    <div className="card-image">
                                        <Link to={imgLink} target="_blank"><img src={imgLink} /></Link>
                                            <span className="card-title">Card Title</span>
                                    </div>
                                    <div className="card-content">
                                        <p>Screenshot time: {screenshot.time}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}