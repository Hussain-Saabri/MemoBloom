
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
    w-full h-full rounded-2xl p-4 sm:p-5
    bg-white/80 backdrop-blur-sm
    border border-gray-100
    shadow-md hover:shadow-xl
    hover:-translate-y-1
    transition-all duration-300
    flex flex-col justify-between
    relative bottom-4
  "
>

  {/* Header Row */}
  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
    <h6 className="text-base sm:text-lg font-semibold text-gray-800 tracking-wide break-words">
      {title}
    </h6>
    <button
      onClick={onPinNote}
      className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition-colors active:scale-90 self-start sm:self-auto"
      title="Pin Note"
    >
      <MdOutlinePushPin
        className={`text-xl sm:text-2xl transition-colors duration-300 ${
          isPinned ? 'text-blue-600' : 'text-gray-400 hover:text-blue-500'
        }`}
      />
    </button>
  </div>

  {/* Date */}
  <span className="text-xs sm:text-sm text-gray-400">{date}</span>

  {/* Content */}
  <p className="text-sm sm:text-base text-gray-700 mt-2 sm:mt-3 leading-relaxed break-words">
    {content?.slice(0, 140)}
    {content?.length > 140 ? '...' : ''}
  </p>

  {/* Tags */}
  {tags.length > 0 && (
    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-blue-50 to-blue-100 
                     text-blue-700 text-xs sm:text-sm font-medium rounded-full 
                     border border-blue-200 hover:from-blue-100 hover:to-blue-200 
                     transition-colors"
        >
          #{tag}
        </span>
      ))}
    </div>
  )}

  {/* Actions */}
  <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-4 sm:mt-5 border-t border-gray-100 pt-2 sm:pt-3">
    <button
      onClick={onEdit}
      className="flex items-center gap-1 text-green-600 hover:text-green-500 
                 transition-colors text-sm sm:text-base active:scale-95"
      title="Edit"
    >
      <MdCreate className="text-lg sm:text-xl" /> Edit
    </button>
    <button
      onClick={onDelete}
      className="flex items-center gap-1 text-red-600 hover:text-red-500 
                 transition-colors text-sm sm:text-base active:scale-95"
      title="Delete"
    >
      <MdDelete className="text-lg sm:text-xl" /> Delete
    </button>
  </div>
</div>

  );
};

export default NoteCard;
