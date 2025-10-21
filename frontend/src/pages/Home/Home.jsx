import { React, useState, useEffect } from 'react';
import NoteCard from '../../components/Cards/NoteCard';
import Navbar from '../../components/Navbar/Navbar';
import Loader from '../../components/Loader/Loader';
import EmptyCard from '../../components/Cards/EmptyCard';
import AddEditNotes from './AddEditNotes';
import { IoAdd } from 'react-icons/io5';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import moment from 'moment';
import HomeEmptyCard from '../../components/Cards/HomeEmptyCard';
import toast from 'react-hot-toast';

const Home = () => {

  const [openAddEditModal, setOpenEditModal] = useState({ isShown: false, type: 'add', data: null });
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [allNotes, setAllNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllNotes = async () => {
   
    try {
      
      const response = await axiosInstance.get("/get-note");
      if (response.data && response.data.note) {
        const sortedNotes = response.data.note.sort((a, b) => b.isPinned - a.isPinned);
        setAllNotes(sortedNotes);
        console.log("All notes:", response.data.note);
      }
    } catch (error) {
      
      console.log(error);
    }
    finally {
      setIsLoading(false);
      
    }
  };

  const filteredNotes = allNotes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
        console.log(response.data.user);
      }
    } catch (error) {
      console.log("Some Error", error);
    }
  };

  const handleEdit = (item) => {
    console.log("Clicked on edit button");
    setOpenEditModal({ isShown: true, type: 'edit', data: item });
  };

// pinned the note

const handlePinNote = async(note) => {

  try{
    console.log();
    console.log();
      console.log(note._id);
      const noteExtract = await axiosInstance.get("/get-single-note/" + note._id);
      console.log("CLicked on the pin note button");
      console.log("previous pin note",noteExtract.data.note.isPinned);
      const updatedPin = !noteExtract.data.note.isPinned;
      console.log("updating pinnote to",updatedPin);

      const response = await axiosInstance.put("/update-note-pin/" + note._id,{
        updatedPin
      });

      console.log("Response from updating the pin note");

    console.log(response);
    if (!response.data.error) {
      
      await getAllNotes();
      
    }

    if( updatedPin == true )
    {
      toast.success("Note Pin successfully!");
    }else{
       toast.success("Note unpinned successfully!");
    }

  }catch(error){
    console.log(error);
  }

};



//delete the note
  const handleDelete = async (data) => {
    try {
      const response = await axiosInstance.delete("/delete-note/" + data._id);
      if (response.data && !response.data.error) {


                toast.error("Note Deleted Successfully!", {
  style: {
    background: "linear-gradient(145deg, #ef4444, #b91c1c)", // red gradient
    color: "#fff5f5", 
    fontWeight: "700",
    borderRadius: "16px",
    padding: "10px 24px",
    boxShadow: "0 6px 20px rgba(185, 28, 28, 0.5), 0 0 10px rgba(239, 68, 68, 0.3)", 
    fontSize: "18px",
    letterSpacing: "0.7px",
    textTransform: "capitalize",
    fontFamily: "'Poppins', sans-serif",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255,255,255,0.2)",
  },
  iconTheme: {
    primary: "#fee2e2", // soft pink/red tone
    secondary: "#7f1d1d", // darker red for icon
  },
  duration: 4000,
});





        getAllNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("Clicked on logout");
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }

  // Show loader for at least 2 seconds
  setIsLoading(true);
  const timer = setTimeout(() => {
    Promise.all([getAllNotes(), getUserInfo()]).finally(() => {
      setIsLoading(false);
    });
  }, 2000);

  return () => clearTimeout(timer);
}, []);


  const notesToShow = searchQuery ? filteredNotes : allNotes;

  return (
    <div>
      
       <Navbar setSearchQuery={setSearchQuery} />


{isLoading ? (
  <Loader />
) : allNotes.length === 0 ? (
  <HomeEmptyCard />
) : notesToShow.length === 0 ? (
  <EmptyCard />  
) : (
  <div className="container mx-auto max-w-6xl px-4 mt-25">
    <div
      className="
        grid gap-6
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3 
        xl:grid-cols-4
        items-stretch
      "
    >
      {notesToShow.map((item) => (
        <NoteCard
          key={item._id}
          title={item.title}
          date={moment(item.createdOn).format("Do MMM YYYY")}
          content={
            
            item.content}
          tags={item.tags}
          isPinned={item.isPinned}
          onEdit={() => handleEdit(item)}
          onDelete={() => handleDelete(item)}
          onPinNote={() => handlePinNote(item)}
        />
      ))}
    </div>
  </div>
)}



   <div className="fixed bottom-6 right-6">
  <button
    onClick={() => setOpenEditModal({ isShown: true, type: 'add', data: null })}
    className="
      relative w-16 h-16 rounded-full
      bg-gradient-to-br from-blue-500 to-cyan-500
      text-white shadow-lg hover:shadow-xl
      hover:scale-110 transform transition-all
      flex items-center justify-center
    "
    title="Add Note"
  >
    <IoAdd className="text-3xl" />
  </button>
</div>



      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => setOpenEditModal({ isShown: false, type: 'add', data: null })}
        style={{
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(4px)',
    zIndex: 1000,
    overflow: 'auto',
  },
}}
        contentLabel="Add or Edit Note"
        className="bg-white rounded-3xl w-[95%] sm:w-[80%] md:w-[60%] lg:w-[40%] mx-auto mt-9 p-6 relative shadow-xl transition-all duration-300"
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              {openAddEditModal.type === 'edit' ? 'Edit Note' : 'Add New Note'}
            </h2>
            <button
              className="text-gray-500 hover:text-red-500 text-xl"
              onClick={() => setOpenEditModal({ isShown: false, type: 'add', data: null })}
            >
              &times;
            </button>
          </div>

          <AddEditNotes
            type={openAddEditModal.type}
            noteData={openAddEditModal.data}
            onClose={() => setOpenEditModal({ isShown: false, type: 'add', data: null })}
            getAllNotes={getAllNotes}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Home;
