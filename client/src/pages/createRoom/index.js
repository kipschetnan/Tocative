import React, {useState} from 'react';

import { useMutation } from '@apollo/client';
import { CREATE_CONVERSATION } from '../../utils/mutations';

const createRoom = () => {
    const [formState, setFormState] = useState({
        participants: [],
        messages: [],
        latestMessage: []
    });

    const [createConversation, { error }] = useMutation(CREATE_CONVERSATION);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await createConversation({
                variables: {...formState},
            });
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name='YourUsername' placeholder='Your Username' value={formState.participants} onChange={handleChange}/>
                <input name='FriendUsername' placeholder="Your Friend's Username" value={formState.participants} onChange={handleChange}/>
                <button type='submit'>
                    Create Conversation
                </button>
            </form>
        </div>
    )
}

export default createRoom;