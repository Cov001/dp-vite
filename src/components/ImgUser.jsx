import React, { useEffect, useState } from "react";

const ImgUser = ({ src, alt }) => {
  const [flag, setFlag] = useState(true);
  useEffect(() => {
    if (src.length < 6) {
      setFlag(false);
    }
  }, []);
  return (
    <>
      {flag ? (
        <img src={src} alt={alt} className="w-14 h-14 rounded-full" />
      ) : (
        <div className="w-14 h-14 rounded-full bg-slate-400 flex items-center justify-center">
          <p className="text-black">+{src}</p>
        </div>
      )}
    </>
  );
};

export default ImgUser;
