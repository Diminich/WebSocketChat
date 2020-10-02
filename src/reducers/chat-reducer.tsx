import { InferActionTypes } from "./redux-store";
import {Dispatch} from "redux";
import { api } from "../API/api";
import {messagesType, userType} from "../Types/Types";

const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED';
const NEW_MESSAGE_RECEIVED = 'NEW_MESSAGES_RECEIVED';
const TYPING_USERS_ADDED = 'TYPING_USERS_ADDED'

const initialState = {
    messages: [] as Array<messagesType>,
    typingUsers: [] as Array<userType>
}


type InitialStateType = typeof initialState
type ActionTypes = InferActionTypes<typeof action>;

const chatReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case MESSAGES_RECEIVED: {
            return {
                ...state,
                messages: action.messages
            }
        }

        case NEW_MESSAGE_RECEIVED: {
            return {
                ...state,
                messages: [...state.messages, action.message],
                typingUsers: state.typingUsers.filter((u) => u.id !== action.message.user.id)
            }
        }

        case TYPING_USERS_ADDED: {
            return {
                ...state,
                typingUsers: [...state.typingUsers.filter((u) => u.id !== action.user.id), action.user]
            }
        }

        default:
            return state;
    }
}

const action = {
    messagesReceived: (messages: Array<messagesType>) => ({
        type: MESSAGES_RECEIVED,
        messages
    }as const),

    newMessageReceived: (message: messagesType) => ({
        type: NEW_MESSAGE_RECEIVED,
        message
    }as const),

    typingUserAdded: (user: userType) => ({
        type: TYPING_USERS_ADDED,
        user,
    }as const)
}

export const setClientName = (name: string) => {
    return async (dispatch: Dispatch) => {
        api.sendName(name)
    }
}

export const typeMessage = () => {
    return async (dispatch: Dispatch) => {
        api.typeMessage()
    }
}

export const sendMessage = (message: string) => {
    return async (dispatch: Dispatch) => {
        api.sendMessage(message)
    }
}

export const createConnection = () => {
    return async (dispatch: Dispatch) => {
        api.createConnection()
        api.subscriber((messages: Array<messagesType>, fn: (data: string) => void) => {
            dispatch(action.messagesReceived(messages))
            fn("data from front");
        }, (message: messagesType) => {
            dispatch(action.newMessageReceived(message))
        }, (user: userType) => {
            dispatch(action.typingUserAdded(user))
        })

    }
}

export const destroyConnection = () => {
    return async (dispatch: Dispatch) => {
        api.destroyConnection()
    }
}

export default chatReducer;