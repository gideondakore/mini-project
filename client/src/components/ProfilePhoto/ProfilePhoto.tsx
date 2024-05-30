import React from "react";
import { FaRegCircleUser } from "react-icons/fa6";
interface ProfilePhotoProps {
  profileUrl: string;
}
const ProfilePhoto = ({ profileUrl }: ProfilePhotoProps) => {
  return (
    <div style={{ height: "50px", width: "50px" }}>
      {profileUrl ? (
        <img
          alt="pic"
          src={profileUrl}
          height={50}
          width={50}
          style={{ borderRadius: "50%" }}
        />
      ) : (
        <FaRegCircleUser size={50} color="#64766a" />
      )}
    </div>
  );
};

export default ProfilePhoto;
