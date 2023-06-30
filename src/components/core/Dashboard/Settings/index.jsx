import ChangeProfilePicture from "./ChangeProfilePicture";
import DeleteAccount from "./DeleteAccount";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";
import RequestAccount from "./RequestAccount";

export default function Settings() {
  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Profile
      </h1>
      {/* Change Profile Picture */}
      <ChangeProfilePicture />
      {/* Profile */}
      <EditProfile />
      {/* Request Account */}
      <RequestAccount />
      {/* Password */}
      <UpdatePassword />
      {/* Delete Account */}
      <DeleteAccount />
    </>
  );
}
