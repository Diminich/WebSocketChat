import React, {useEffect} from 'react';
import styles from './App.module.scss';
import NameInput from "./components/nameInput/NameInput";
import Chat from './components/chat/Chat';
import { Switch, Route } from 'react-router-dom';
import {createConnection, destroyConnection} from "./reducers/chat-reducer";
import {useDispatch} from "react-redux";

const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(createConnection())
        return () => {
            dispatch(destroyConnection())
        }
    }, [])

    return (
        <div className={styles.wrapperApp}>
            <Switch>
                <Route exact path = '/' render={ () => <NameInput />}/>
                <Route exact path='/Chat' render={() => <Chat />} />
                <Route render={() => <div className={styles.notFound}>404 NOT FOUND</div>} />
            </Switch>
        </div>
    );
}

export default App;
