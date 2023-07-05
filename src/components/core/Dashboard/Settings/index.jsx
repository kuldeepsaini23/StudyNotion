import ChangeProfilePicture from "./ChangeProfilePicture";
import DeleteAccount from "./DeleteAccount";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";
import RequestAccount from "./RequestAccount";
import SocialMedia from "./SocialMedia";
import { ACCOUNT_TYPE } from "../../../../utils/constants";
import { useSelector } from "react-redux";

export default function Settings() {
  const { user } = useSelector((state) => state.profile);
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
      {/* {user.accountType === ACCOUNT_TYPE.STUDENT && <RequestAccount/>} */}
  

      {/*Social Media only for instructor  */}
      {user.accountType === ACCOUNT_TYPE.INSTRUCTOR && <SocialMedia />}

      {/* Password */}
      <UpdatePassword />
      {/* Delete Account */}
      <DeleteAccount />
    </>
  );
}
