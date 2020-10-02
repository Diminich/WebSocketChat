import React, {useState} from "react";
import {setClientName} from "../../reducers/chat-reducer";
import {useDispatch} from "react-redux";
import styles from './NameInput.module.scss'
import {NavLink} from "react-router-dom";

const NameInput = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const dispatch = useDispatch();

    return (
        <nav className={styles.nameInputButton}>
            <div className={styles.inputNameError}>
                <input value={name} placeholder={'Введите имя'}
                       className={error ? styles.errorInputName : styles.normalInputName}
                       onChange={(e) => {
                           setName(e.currentTarget.value)
                           if (e.currentTarget.value === '') {
                               setError(true)
                           } else {
                               setError(false)
                           }
                       }}
                />
                {error && <span className={styles.errorOutput}>Введите имя!</span>}
            </div>
            <NavLink to='/Chat'>
                <button className={styles.button} disabled={name.length < 1} onClick={() => {
                    dispatch(setClientName(name))
                }}>
                    Sent name
                </button>
            </NavLink>
        </nav>
    )
}

export default NameInput;