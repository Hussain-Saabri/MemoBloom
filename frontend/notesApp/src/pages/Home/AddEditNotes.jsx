import React,{useState} from 'react'
import { MdClose} from 'react-icons/md'
import axiosInstance from '../../utils/axiosInstance'

const AddEditNotes = ({noteData,type,getAllNotes,onClose}) => {
  const[title,setTitle]=useState(noteData?.title||"");
  const[content,setContent]=useState(noteData?.content || "");
  const[tags,setTags]=useState(noteData?.tags?.join(", ") || "");
  const[titleError,settitleError]=useState(null);
const[contentError,setcontentError]=useState(null);
const[tagsError,settagsError]=useState(null);
  const addNewNotes=async()=>{
    console.log("Adding the note gets started");
    try {
      const response=await axiosInstance.post("/add-note",{
      title,
      content,
      tags,
    });
    if(response.data && response.data.note)
    {
      console.log(response.data.note);
      onClose();
      getAllNotes();
      

    }
      
    } catch (error) {
      console.log(error);
    }
    
  }
  const editNotes=async()=>{
    console.log("Enter the editing note");
    const noteId=noteData._id;
    try {
      const response= await axiosInstance.put("/edit-note/" +noteId, {
      title,
      content,
      tags,
    });
    if(response.data && response.data.note)
    {
      console.log(response.data.note);
      onClose();
     getAllNotes();
      

    }
      
    } catch (error) {
      console.log(error);
    }

  }
  const handleAddNote=()=>{
    console.log("Button Clicked");
    if(!title)
    {
      settitleError("Please enter the title");

    }
    if(!content)
    {
      setcontentError("Please enter the content"); 
      
      
    }
    if(!tags)
    {
      settagsError("Please enter the tags");
      
    }
    if(type=="add")
    {
      addNewNotes();
    }
     if(type=="edit")
    {
      editNotes();
    }
  }

  return (
 
    <div className="relative space-y-7">
  {/* Title */}
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 tracking-wide">Title</label>
    <input
      type="text"
      className="rounded-xl px-4 py-3 mt-1 text-base font-medium shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none focus:border-blue-400 placeholder-gray-400 transition duration-200"
      placeholder="Add Title Here"
      value={title}
      onChange={({ target }) => setTitle(target.value)}
    />
    {titleError && <p className="text-red-500 text-xs mt-1">{titleError}</p>}
  </div>

  {/* Content */}
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 tracking-wide">Content</label>
    <textarea
      className="rounded-xl px-4 py-3 mt-1 text-base font-medium shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none focus:border-blue-400 placeholder-gray-400 transition duration-200 resize-none"
      placeholder="Content..."
      rows={5}
      value={content}
      onChange={({ target }) => setContent(target.value)}
    />
    {contentError && <p className="text-red-500 text-xs mt-1">{contentError}</p>}
  </div>

  {/* Tags */}
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 tracking-wide">Tags</label>
    <input
      type="text"
      className="rounded-xl px-4 py-3 mt-1 text-base font-medium shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none focus:border-blue-400 placeholder-gray-400 transition duration-200"
      placeholder="Add Tags Here"
      value={tags}
      onChange={({ target }) => setTags(target.value)}
    />
    {tagsError && <p className="text-red-500 text-xs mt-1">{tagsError}</p>}
  </div>

  {/* Add Button */}
  <button
    onClick={handleAddNote}
    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl py-3 transition duration-300 shadow-md hover:shadow-lg"
  >
    {type === 'edit' ? 'UPDATE' : 'ADD'}
  </button>
</div>

      
  )
}

export default AddEditNotes