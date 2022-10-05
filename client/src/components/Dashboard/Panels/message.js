import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserMessage, getUserData } from '../../../actions/user';

import Loading from '../../Loading/loading';

const MessagePanel = () => {
    const dispatch = useDispatch();
    const { message, messageLoading } = useSelector(state => state.user);
    const [editMode, setEditMode] = useState(false);
    const [newMessage, setNewMessage] = useState(message);

    const updateMessage = () => {
        if(newMessage.length < 40 || newMessage.length > 160) return;
        dispatch(updateUserMessage(newMessage));
        setEditMode(false);
    }
    const cancelUpdateMessage = () => {
        setNewMessage(message);
        setEditMode(false);
    }

    if(messageLoading) return (
        <div className="loading-container">
            <Loading/>
        </div>
    )

    return (
        <section id="panel-message">
            {!editMode ? (
                <>
                    <h2 className="mb-3">Treść wiadomości</h2>
                    
                    {(message != 'not-set' && message) ? (
                    <>
                    <p className="mb-3 panel-user-message"> { message } </p>
                    <div className="flex" id="button-div">
                        <button onClick={() => { setEditMode(true); setNewMessage(message); }} className="no-outline color-gray underline">Edytuj treść</button>
                    </div>
                    </>
                    ) : (
                    <>
                    <p className="mb-3 color-red bold">Jeszcze nie ustawiono!</p>
                    <button onClick={() => { setEditMode(true); setNewMessage(''); }} className="no-outline color-red underline">Ustaw treść teraz</button>
                    </>
                    )} 
                    </>
                ) : (
                    <>
                    <h2 className="mb-3">Edytuj swoją wiadomość</h2>
                    
                    {newMessage.length < 40 && <p className="message-error">Twoja wiadomość musi zawierać conajmniej 40 znaków.</p>}
                    {newMessage.length > 160 && <p className="message-error">Twoja wiadomość musi zawierać maksymalnie 160 znaków.</p>}

                    <textarea
                        className="mb-1"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />

                    <div className="message-form-buttons mb-2">
                        <button onClick={updateMessage} id="message-save">Zapisz zmiany</button>
                        <button onClick={cancelUpdateMessage} id="message-cancel">Anuluj</button>
                    </div>

                    <div className="message-form-sidenote">
                        <p>Możesz użyć następujących tagów:</p>
                        <ul>
                            <li><span className="bold">!data!</span> w wysyłanej wiadomości zamieni się na datę umówionej wizyty</li>
                            <li><span className="bold">!godz!</span> w wysyłanej wiadomości zamieni się na godzinę rozpoczęcia umówionej wizyty</li>
                        </ul>
                    </div>
                    </>
            )}
        </section>
    )
}

export default MessagePanel;