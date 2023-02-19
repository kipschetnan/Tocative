import React, { useState } from 'react'
import { useQuery ,useMutation} from '@apollo/client'
import { CREATE_CONVERSATION } from '../../utils/mutations'
import { QUERY_ME, QUERY_USER } from '../../utils/queries'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Auth from '../../utils/auth'

const createRoom = () => {
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        participants: []
    });
    const [username, setUsername] = useState('')
    const {  } = useQuery(QUERY_USER, {
        variables: {username},
        onCompleted: (data) => {
            setFormState({
                participants: [data.user._id]
            })
        }
    })       
    
    const [createConversation, { error }] = useMutation(CREATE_CONVERSATION);

    const { loading: userLoading, error: userError, data: userData } = useQuery(QUERY_ME);

    if (userLoading) return <p>Loading logged in user...</p>;
    if (userError) return <p>Error loading logged in user: {userError.message}</p>;
    // setFormState([searchedUser._id])

    // const { username: userParam } = useParams();

 

    // const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    //     variables: { username: userParam },
    // });

    // const user = data?.me || data?.user || {};

    // if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    //     return <Link to="/profile" />;
    //   }
    
    //   if (loading) {
    //     return <div>Loading...</div>;
    //   }
    
    //   if (!user?.username) {
    //     return (
    //       <h4>
    //         You need to be logged in to see this. Use the navigation links above to
    //         sign up or log in!
    //       </h4>
    //     );
    //   }

    const handleChange = (event) => {
        setUsername(event.target.value)
    }

    const onSubmit = async (event) => {
        console.log(username)
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
        <div>
            <form onSubmit={onSubmit}>
                <input type='text' placeholder='Enter a username' value={username} onChange={handleChange}></input>
                <button type='submit'>
                    Create Conversation
                </button>
            </form>

            <h1>Friends List</h1>
                {userData.me.friends.map(item => (
                    <ul key={item._id}>
                        <div>{item.username}</div>
                    </ul>
                ))}
        </div>
    )
}

export default createRoom;