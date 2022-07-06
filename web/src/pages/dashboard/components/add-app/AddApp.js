import React, {useEffect, useState} from 'react';
import {useHttp} from "../../../../hooks/http.hook";
import {useMessage} from "../../../../hooks/message.hook";

export const AddApp = ({onAdd}) => {
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        url: ''
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const changeEventHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    };

    const addNewAppHandler = async () => {
        try {
            await request('/api/apps', 'POST', {...form});
            onAdd();
        } catch (e) {}
    }

    return (
        <div className="col s12" >
            <div className="row valign-wrapper center-align">
                <div className="input-field col s6">
                    <input id="url" type="text" name="url" className="validate" onChange={changeEventHandler}/>
                        <label htmlFor="url">Google play link</label>
                </div>
                <button className="btn waves-effect waves-light" name="action" onClick={addNewAppHandler} disabled={loading}>Submit</button>
            </div>
        </div>
    )
}
