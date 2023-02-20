import React, { useState } from 'react'
import { useQuery ,useMutation} from '@apollo/client'
import { CREATE_CONVERSATION } from '../../utils/mutations'
import { QUERY_ME, QUERY_USER } from '../../utils/queries'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Auth from '../../utils/auth'
import './index.css'
import Footer from '../../components/footer/Footer'


const createRoom = () => {
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        name: '',
        participants: []
    });

    const [username, setUsername] = useState('')
    const {  } = useQuery(QUERY_USER, {
        variables: {username},
        onCompleted: (data) => {
            setFormState({
                name: formState.name,
                participants: [data.user._id]
            })
        }
    })       
    
    const [createConversation, { error }] = useMutation(CREATE_CONVERSATION);

    const { loading: userLoading, error: userError, data: userData } = useQuery(QUERY_ME);

    if (userLoading) return <p>Loading logged in user...</p>;
    if (userError) return <p>Error loading logged in user: {userError.message}</p>;

    const handleChange = (event) => {
        console.log('handle change', event.target)
        setUsername(event.target.value)
    }
    const handleChange2 = (event) => {
        console.log("Handlechange2", event.target.value)
        const newFormState = { 
            name: event.target.value,
            participants: formState.participants
        }
        //newFormState.name = event.target.value
        setFormState(newFormState)
    }

    const onCreateConversation = async (event) => {
        console.log('username is', username)
        console.log('formstate is', formState)
        event.preventDefault();
        console.log(formState)
        try {
            const { data } = await createConversation({
                variables: { ...formState },
            });
            const convo = data.createConversation
            navigate(`/messages/${convo._id}`)
        } catch (e) {
            console.error(e);
        }
        
    }

    return (
        <div className='loginWrapper'>

            <div className='createRoomWrapper'>

                <div className='formWrapper'>
                
                    <form onSubmit={onSubmit}>
                        <div className='section1'>
                            <input className='searchInput' type='text' placeholder='Enter Your Chat Name' value={formState.name} onChange={handleChange2}></input>
                            <input className='searchInput' type='text' placeholder='Enter a username' value={username} onChange={handleChange}></input>
                            <button className='searchButton2' type='submit'>
                                Create Conversation
                            </button>
                        </div>
                    </form>
                    
                    <div className='friendList'>
                        <h2>Friends List: </h2>
                            {userData.me.friends.map(item => (
                                <ul key={item._id}>
                                    <div>{item.username}</div>
                                </ul>
                            ))}
                    </div>
                    
                </div>
                <Footer />
                

            </div>
            
        </div>
    )
}

export default createRoom;