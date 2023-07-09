import React from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import {getCatalogPageData} from "../services/operations/pageAndComponentData"
import CourseSlider from '../components/core/Catalog/CourseSlider';
import CatalogCourseCard from '../components/core/Catalog/CatalogCourseCard';
import { useSelector } from 'react-redux';
import Error from "./Error"


const Catalog = () => {

  const { loading } = useSelector((state) => state.profile)
  const {catalogName} = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [active, setActive] = useState(1)

  //Fetch all categories
  useEffect(()=> {
      const getCategories = async() => {
          const res = await apiConnector("GET", categories.CATEGORIES_API);
          const category_id = 
          res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
          setCategoryId(category_id);
      }
      getCategories();
  },[catalogName]);

  useEffect(() => {
      const getCategoryDetails = async() => {
          try{
              const res = await getCatalogPageData(categoryId);
              // console.log("PRinting res: ", res);
              setCatalogPageData(res);
          }
          catch(error) {
              console.log(error)
          }
      }
      if(categoryId) {
          getCategoryDetails();
      }
      
  },[categoryId]);

  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  if (!loading && !catalogPageData.success) {
    return <Error />
  }


  return (
    <div className='mt-14'>
      <div className='box-content bg-richblack-800 px-4'>
        <div className='mx-auto flex min-h-[260px] flex-col justify-center gap-4 max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
          {/* Path of page */}
          <p className='text-sm text-richblack-300'>
            {`Home/Catalog/`}
            <span className='text-yellow-25'>{catalogPageData?.data?.selectedCategory?.name}</span>        
          </p>

          {/* Name of the page */}
          <p className='text-3xl text-richblack-5'>{catalogPageData?.data?.selectedCategory?.name}</p>

          {/* Description of the page */}
          <p className='max-w-[870px] text-richblack-200'>{catalogPageData?.data?.selectedCategory?.description}</p>
        </div>
      </div>

      {/* Course to be bought */}

        {/* Section 1 */}
        <div className='mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
          <div className='section_heading'>Course to get you started</div>
          {/* Headings/text */}
          <div className="my-4 flex border-b border-b-richblack-600 text-sm">
              <p
                className={`px-4 py-2 ${
                  active === 1
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(1)}
              >
                Most Populer
              </p>
              <p
                className={`px-4 py-2 ${
                  active === 2
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(2)}
              >
                New
              </p>
            </div>
          
          {/* Course display */}
          <div><CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses}/></div>
        </div>

        {/* Section 2 */}
        <div className='mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
          {/* Headings */}
          <div className='section_heading'>
            Top Courses in {catalogPageData?.data?.differentCategory?.name}
          </div>

          {/* Course display */}        
          <div className='py-8'>
            <CourseSlider Courses={catalogPageData?.data?.differentCategory?.courses}/>
          </div>
          
        </div>

        {/* Section 3 */}
        <div className='mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
          {/* Headings */}
          <div className='section_heading'>Frequently Bought</div>

          {/* Course display */}        
          <div className='py-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {
                catalogPageData?.data?.mostSellingCourses?.slice(0,4)
                .map((course, index)=>(
                  <CatalogCourseCard course={course} key={index} Height={"h-[400px]"}/>
                ))
              }
            </div>
          </div>
        </div>

      <Footer/>

    </div>
  )
}

export default Catalog