import { Route, Routes } from "react-router-dom";
import "./App.css";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/common/Navbar";
import Error from "./pages/Error";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Setting from "./components/core/Dashboard/Settings"
import EnrolledCourses from "./components/core/Dashboard/Student/EnrolledCourses";
import Cart from "./components/core/Dashboard/Student/Cart";
import {ACCOUNT_TYPE} from "./utils/constants"
import { useSelector } from "react-redux";
import MyCourses from "./components/core/Dashboard/Instructor/MyCourse/MyCourses";
import AddCourse from "./components/core/Dashboard/Instructor/AddCourse"
import EditCourse from "./components/core/Dashboard/Instructor/EditCourse";
import Catalog from "./pages/Catalog";
import AddCategory from "./components/core/Dashboard/Admin/AddCategory/Index";
import AllCourses from "./components/core/Dashboard/Admin/AllCourses/Index";
import CourseDetails from "./pages/CourseDetails";
import InstructorProfile from "./pages/InstructorProfile";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";

function App() {

  const {user} = useSelector((state)=>state.profile)

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="catalog/:catalogName" element={<Catalog/>}/>
        <Route path="courses/:courseId" element={<CourseDetails/>}/>
        <Route path="instructor/:instructorId" element={<InstructorProfile/>}/>

        {/* Dashboard */}

        <Route
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
        >
         {/* Nested Routing */}
          <Route path="dashboard/my-profile" element={<MyProfile />}/>
          <Route path="dashboard/settings" element={<Setting />}/>


          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
                <Route path="dashboard/cart" element={<Cart/>}/>
              </>
            )
          }
          
          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="dashboard/my-courses" element={<MyCourses/>}/>
                <Route path="dashboard/add-course" element={<AddCourse/>}/>
                <Route path="dashboard/edit-course/:courseId" element={<EditCourse/>}/>
              </>
            )
          }

          {
            user?.accountType === ACCOUNT_TYPE.ADMIN && (
              <>
                
                <Route path="dashboard/add-category" element={<AddCategory/>}/>
                <Route path="dashboard/all-courses" element={<AllCourses/>}/>
              </>
            )
          }
        </Route>

        
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />

        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        {/* View courses Route */}
        <Route element={<PrivateRoute><ViewCourse/></PrivateRoute>}>
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route
                  path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                  element={<VideoDetails/>}
                />
              </>
            )
          }
        </Route>
      </Routes>
    </div>
  );
}

export default App;
