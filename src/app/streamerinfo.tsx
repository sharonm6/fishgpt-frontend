
interface StreamerInfoProps {
  username: string;
  status: string;
  game: string;
  description: string;
  profilePic: string;
}

const StreamerInfo: React.FC<StreamerInfoProps> = ({
  username,
  status,
  game,
  description,
  profilePic
}) => {
  return (
    <div className="bg-gray-800 text-white p-4 flex items-start space-x-4">
      <div className="relative">
        <img
          src={profilePic}
          alt={`${username}'s profile`}
          className="w-16 h-16 rounded-full"
        />
        <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2  text-xs rounded-full px-2 py-0 ${status === "LIVE" ? "bg-red-500" : "bg-gray-500"}`}>
          {status}
        </div>
      </div>
      <div>
        <div className="text-lg font-bold">{username}</div>
        <div className="text-sm">{game}</div>
        <p className="text-xs italic">{description}</p>
      </div>
    </div>
  );
};

export default StreamerInfo;
