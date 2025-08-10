import React from 'react'
import { validateEmail, getInitials } from '../../utils/helper';

const ProfileInfo = ({onLogout}) => {
  return (
    <div className="flex items-center gap-3">

    
       

        <div>
          <p className="text-sm font-medium"></p>
          
         <button
  onClick={onLogout}
  className="px-4 py-1 bg-gradient-to-r from-blue-500 to-green-400 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out hover:scale-105"
>
  Logout
</button>

        </div>
      </div>
    
  )
}

export default ProfileInfo