interface StreamerInfoProps {
  username: string;
  activity: string;
  status: string;
  profilePic: string;
  viewers?: number;
}

const StreamerInfo: React.FC<StreamerInfoProps> = ({
  username,
  activity,
  status,
  profilePic,
  viewers,
}) => {
  return (
    <div className="bg-gray-800 text-white p-4 pr-6 w-full flex justify-between">
      <div className="flex items-start space-x-4">
        <div className="relative">
          <img
            src={profilePic}
            alt={`${username}'s profile`}
            className="w-16 h-16 rounded-full"
          />
          <div
            className={`absolute bottom-0 left-1/2 transform -translate-x-1/2  text-xs rounded-full px-2 py-0 ${
              status === "LIVE" ? "bg-red-500" : "bg-gray-500"
            }`}
          >
            {status}
          </div>
        </div>
        <div>
          <div className="text-lg font-bold">{username}</div>
          <div className="text-md">{activity}</div>
        </div>
      </div>
      {status === "LIVE" && (
        <div className="text-md flex items-center gap-x-2">
          <img src="/viewers.png" alt="Viewers" className="w-6 h-6" />
          <span className="mr-1">{viewers}</span>
        </div>
      )}
    </div>
  );
};

export default StreamerInfo;
