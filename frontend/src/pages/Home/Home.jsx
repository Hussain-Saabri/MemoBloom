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
        setAllNotes(response.data.note);
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

  const handleDelete = async (data) => {
    try {
      const response = await axiosInstance.delete("/delete-note/" + data._id);
      if (response.data && !response.data.error) {
        getAllNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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
  <EmptyCard />   // ✅ direct yaha rakh do
) : (
  <div className="container mx-auto max-w-6xl px-4 mt-14">
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
          date={moment(item.updatedOn).format("Do MMM YYYY")}
          content={item.content}
          tags={item.tags}
          isPinned={item.isPinned}
          onEdit={() => handleEdit(item)}
          onDelete={() => handleDelete(item)}
          onPinNote={() => {}}
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
