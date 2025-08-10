import React from 'react'
import AddNoNotesImage from '../../assets/add-notes.svg';
const EmptyCard = ({showEmptycard=false}) => {
  return (
    
    <div className="flex  flex-col w-305 justify-center items-center relative right-17 mt-25">
  <img
    src={AddNoNotesImage}
    alt="No notes"
    className="w-100 h-72"
  />
  <p className="text-2xl font-black relative  object-contain">Oops!No Notes Found</p>
</div>

  

   

    
  )
}

export default EmptyCard