import React from 'react'
import { Link, useParams } from 'react-router-dom';
import './Profile.css'
import Navbar from '../../components/Navbar/Navbar'
import FriendList from '../../components/FriendList/FriendList';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../../utils/queries';
import { UPDATE_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';


const ProfilePage = () => {    
    const { username: userParam } = useParams();

    const [updateUser] = useMutation(UPDATE_USER);
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
    
      if (!user?.username) {
        return (
          <h4>
            You need to be logged in to see this. Use the navigation links above to
            sign up or log in!
          </h4>
        );
      }

      const updateClick = async () => {
        try {
            await updateUser({
                variables: { id: user._id},
            });
        } catch (e) {
            console.error(e);
        }
      };

    return (
        <div className='profileContainer'>
            <main className='userInfo'>
                <div className='friendList'>
                    <h1>Friends</h1>
                    <FriendList 
                        username={user.username}
                        friendCount={user.friendCount}
                        friends={user.friends}
                    />
                </div>
                <div className='changeName'>
                      <button className='btn ml-auto' onClick={updateClick}>
                        Update Profile
                      </button>
                    

                </div>
            </main>
        </div>
    )
}

export default ProfilePage