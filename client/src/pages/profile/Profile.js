import React from 'react'
import { Link, useParams } from 'react-router-dom';
import './Profile.css'
import Navbar from '../../components/Navbar/Navbar'
import FriendList from '../../components/FriendList/FriendList';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../../utils/queries';
import { UPDATE_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';



const ProfilePage = () => {    

    let navigate = useNavigate()

    if (!Auth.loggedIn()) {
      navigate('/login')
    }
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
                  />

                  <div className='changeName'>
                    <button className='editButton' onClick={updateClick}>
                      Update Profile
                    </button>
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