import React, {useState} from 'react'
import { Link, useParams } from 'react-router-dom';
import './Profile.css'
import Navbar from '../../components/Navbar/Navbar'
import FriendList from '../../components/FriendList/FriendList';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../../utils/queries';
import { UPDATE_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import Footer from '../../components/footer/Footer';
import { useNavigate } from 'react-router-dom';



const ProfilePage = () => {

  let navigate = useNavigate()

  if (!Auth.loggedIn()) {
    navigate('/login')
  }
  const { username: userParam } = useParams();

  const [username, setUsername] = useState('')
  const [edit, setEdit] = useState(false)

  const [updateUser, { error }] = useMutation(UPDATE_USER);
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });


  const user = data?.me || data?.user || {};

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Link to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const editClick = async () => {
    setEdit(true)
  };

  const onChangeHandle = (event) => {
    setUsername(event.target.value)
  }

  const update = async (e) => {
    e.preventDefault()
    console.log('This is username: ', username)
    console.log('This is id: ', user._id)
    try {
      const { data } = await updateUser({
        variables: { updateUserId: user._id, username: username},
      });
    } catch (e) {
      console.error(e);
    }

    setEdit(false)
    setUsername('')
  }


  const signOff = () => {

    localStorage.clear()
    console.log('Successfuly logged out.')
    navigate('/login')

  }
  return (
    <div className='loginWrapper'>
      <div className='profileContainer'>


        <div className='profileWrapper'>



          <main className='userInfo'>

            <div className='boxWrapper'>
              <h1>{user.firstName} {user.lastName}</h1>
              <div className='friendList'>
                <h2>Friends: </h2>
                <div className='line'></div>
                <FriendList
                  username={user.username}
                  friendCount={user.friendCount}
                  friends={user.friends}
                  first={user.firstName}
                  last={user.lastName}
                />

                <div className='changeName'>
                  {edit ? (
                    <div>
                      <input placeholder='Enter a new username' className='searchInput' value={username} onChange={onChangeHandle}></input>
                      <button className='editButton' onClick={update}>Update</button>
                    </div>
                  ) : (
                    <button className='editButton' onClick={editClick}>
                      Update Profile
                    </button>
                  )}
                  
                </div>
              </div>

            </div>

            <button onClick={signOff} className='logout'>Sign out</button>



          </main>

        </div>
        <Footer />

      </div>
    </div>
  )
}

export default ProfilePage