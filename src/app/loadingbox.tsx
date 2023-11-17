const LoadingBox: React.FC = () => {
  return (
    <div className="flex items-center py-2">
      <div className="w-2 h-2 border border gray-300 bg-white rounded-full mr-1 animate-bounce" />
      <div className="w-2 h-2 border border gray-300 bg-white rounded-full mr-1 animate-bounce" />
      <div className="w-2 h-2 border border gray-300 bg-white rounded-full animate-bounce" />
    </div>
  );
};

export default LoadingBox;