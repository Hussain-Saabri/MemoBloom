import React from 'react';
import { MdCreate, MdOutlinePushPin, MdDelete } from "react-icons/md";

const NoteCard = ({
  title,
  date,
  content,
  tags = [],
  isPinned,
  onEdit,
  onDelete,
  onPinNote
}) => {
  return (
    <div
      className="
        w-full rounded-2xl p-5
        bg-white/80 backdrop-blur-sm
        border border-gray-100
        shadow-md hover:shadow-xl
        hover:-translate-y-1
        transition-all duration-300
        flex flex-col
      "
    >
      {/* Header Row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h6 className="text-lg font-semibold text-gray-800 tracking-wide break-words">
          {title}
        </h6>
        <button
          onClick={onPinNote}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors active:scale-90"
          title="Pin Note"
        >
          <MdOutlinePushPin
            className={`text-2xl transition-colors duration-300 ${
              isPinned ? 'text-blue-600' : 'text-gray-400 hover:text-blue-500'
            }`}
          />
        </button>
      </div>

      {/* Date */}
      <span className="text-sm text-gray-400">{date}</span>

      {/* Content */}
      <p className="text-base text-gray-700 mt-3 leading-relaxed break-words">
        {content?.slice(0, 140)}
        {content?.length > 140 ? '...' : ''}
      </p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gradient-to-r from-blue-50 to-blue-100 
                         text-blue-700 text-xs font-medium rounded-full 
                         border border-blue-200 hover:from-blue-100 hover:to-blue-200 
                         transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-6 mt-5 border-t border-gray-100 pt-3">
        <button
          onClick={onEdit}
          className="flex items-center gap-1 text-green-600 hover:text-green-500 
                     transition-colors text-base active:scale-95"
          title="Edit"
        >
          <MdCreate className="text-xl" /> Edit
        </button>
        <button
          onClick={onDelete}
          className="flex items-center gap-1 text-red-600 hover:text-red-500 
                     transition-colors text-base active:scale-95"
          title="Delete"
        >
          <MdDelete className="text-xl" /> Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
