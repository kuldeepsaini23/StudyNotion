import { ACCOUNT_TYPE } from "../utils/constants";
export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/instructor",
    type: ACCOUNT_TYPE.INSTRUCTOR, 
    icon: "VscDashboard",
  },
  {
    id: 3,
    name: "My Courses",
    path: "/dashboard/my-courses",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscVm",
  },
  {
    id: 4,
    name: "Add Course",
    path: "/dashboard/add-course",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscAdd",
  },
  {
    id: 5,
    name: "Enrolled Courses",
    path: "/dashboard/enrolled-courses",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscMortarBoard",
  },
  {
    id: 6,
    name: "Wishlist",
    path: "/dashboard/bookmarked-courses",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscBookmark",
  },
  // {
  //   id: 6,
  //   name: "Purchase History",
  //   path: "/dashboard/purchase-history",
  //   type: ACCOUNT_TYPE.STUDENT,
  //   icon: "VscHistory",
  // },
  //! For admin
  {
    id: 7,
    name: "Enrolled Courses",
    path: "/dashboard/enrolled-courses",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscMortarBoard",
  },
  {
    id: 8,
    name: "Add Categories",
    path: "/dashboard/add-category",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscLayers",
  },
  {
    id: 9,
    name: "All Courses",
    path: "/dashboard/all-courses",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscVm",
  },
  {
    id: 10,
    name: "All Users",
    path: "/dashboard/all-users",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscPerson",
  },

  {
    id: 11,
    name: "Bugs",
    path: "/dashboard/all-bugs",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscBug",
  },
  {
    id: 12,
    name: "Requests/Contact",
    path: "/dashboard/user-contact",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscInbox",
  },
  
];
