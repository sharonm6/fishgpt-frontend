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
  viewers
}) => {
  return (
    <div className="bg-gray-800 text-white p-4 flex items-start space-x-4">
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
        {status === 'LIVE' && (
          <div className="text-sm flex items-center">
            <span className="mr-1">{viewers} viewers</span>
            <img
              src="/viewers.png" // Replace with your human icon image path
              alt="Viewers"
              className="w-4 h-4"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StreamerInfo;
