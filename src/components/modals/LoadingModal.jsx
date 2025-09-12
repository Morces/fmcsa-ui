import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";

const LoadingModal = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="p-6 flex flex-col items-center">
        <ClipLoader color="#052e0f" size={50} />
      </div>
    </div>
  );
};

export default LoadingModal;
