import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../reducers/redux-store";
import {messagesType, userType} from "../../Types/Types";
import {sendMessage, typeMessage} from "../../reducers/chat-reducer";
import styles from './Chat.module.scss';
import {NavLink} from "react-router-dom";

const Chat = React.memo(() => {

    const [message, setMessage] = useState('')
    const [isAutoScrollActive, setIsAutoScrollActive] = useState(false)
    const [lastScrollTop, setLastScrollTop] = useState(0)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const dispatch = useDispatch();

    const messages = useSelector<AppStateType, Array<messagesType>>(state => state.chatPage.messages)
    const typingUsers = useSelector<AppStateType, Array<userType>>(state => state.chatPage.typingUsers)

    useEffect(() => {
        if (isAutoScrollActive) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    const onKeyEnterPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (message !== '') {
                debugger
                dispatch(sendMessage(message))
                setMessage('')
            }
        }
    }

    return (
        <nav className={styles.wrapperChat}>
            <div className={styles.windowMessages} onScroll={(e) => {
                let element = e.currentTarget
                const maxScrollPosition = element.scrollHeight - element.clientHeight
                if (element.scrollTop > lastScrollTop && Math.abs(maxScrollPosition - element.scrollTop) < 10) {
                    setIsAutoScrollActive(true)
                } else {
                    setIsAutoScrollActive(false)
                }
                setLastScrollTop(element.scrollTop)
            }}>
                {messages.map((m) => {
                    return (
                        <div className={styles.renderingCustomMessages} key={m.id}>
                            <b style={{marginLeft: 5}}>{m.user.name}: </b>{m.message}
                        </div>
                    )
                })}

                {typingUsers.map((m) => {
                    return (
                        <div key={m.id}>
                            <b>{m.name}:</b> ...
                        </div>
                    )
                })}
                <div ref={messagesAnchorRef}/>
            </div>
            <div className={styles.wrapperTextareaButtons}>
                <div className={styles.wrapperTextarea}>
                     <textarea value={message}
                               className={styles.textareaMessage}
                               placeholder='Введите сообщение'
                               onKeyPress={(e) => {
                                   dispatch(typeMessage())
                                   onKeyEnterPress(e)
                               }}
                               onChange={(e) => {
                                   setMessage(e.currentTarget.value)
                               }}/>
                </div>
                <NavLink className={styles.exitButton} to={'/'}>
                    Exit
                </NavLink>
            </div>
        </nav>
    )
})

export default Chat;