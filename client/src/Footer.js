import React from "react";

export default function Footer(){

    return (
        <div className="footer">
            <div className='tab' id='tab2'>
              <div className='linkContainer'>
                <Link className='link' to='/profile'>
                  <h3>Profile</h3>
                </Link>
              </div>
            </div>

            <div className='tab' id='tab3'>
              <div className='linkContainer'>
                <Link className='link' to='/createRoom'>
                  <h3>Create Room</h3>
                </Link>
              </div>
            </div>
        </div>
    )
}
