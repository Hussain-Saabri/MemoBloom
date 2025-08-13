import React from 'react'
import AddNoNotesImage from '../../assets/add-notes.svg';
import { useState } from 'react';
const EmptyCard = ({showEmptycard=false}) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    
    <div className="flex  flex-col w-305 justify-center items-center relative right-17 mt-25">
  <img
  src={AddNoNotesImage}
  alt="No notes"
  className="w-100 h-72"
  onLoad={() => setImgLoaded(true)}
/>
{imgLoaded && <p className="text-2xl font-black">Oops! No Notes Found</p>}
  
</div>

  

   

    
  )
}

export default EmptyCard