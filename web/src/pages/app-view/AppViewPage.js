import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useHttp} from "../../hooks/http.hook";

export const AppViewPage = () => {
    let {appId} = useParams();
    const {request} = useHttp();
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
                <h5><b>Link</b> <a href={app.url} target="_blank">{app.url}</a></h5>
                <h5><b>Start time</b> {app.start_time}</h5>
            </div>
            <div className="center-align">
                {app.screenshots.length ? app.screenshots.map((screenshot, i) => {
                    return (
                        <div className="row" key={i}>
                            <div className="col s12">
                                <div className="card">
                                    <div className="card-content">
                                        <p>Screenshot time: {screenshot.time}</p>
                                    </div>
                                    <div className="card-image">
                                        <a href={screenshot.img} target="_blank"><img src={screenshot.img} /></a>
                                            <span className="card-title">Card Title</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }) : (<h3>No screenshots yet, reload page in 10 seconds ;)</h3>)}
            </div>
        </div>
    )
}
