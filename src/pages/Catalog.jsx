import React from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import {getCatalogPageData} from "../services/operations/pageAndComponentData"

const Catalog = () => {

  const {catalogName} = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null)
  const [categoryId, setCategoryId] = useState("")

  //fetch all categories
  useEffect(()=>{
    const getCategories = async()=>{
      const res = await apiConnector("GET", categories.CATEGORIES_API);

      // filtring
      const category_id = res?.data?.data.filter(
        (ct)=>ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id  
        setCategoryId(category_id)
    }

    getCategories()
  },[catalogName])

  useEffect(()=>{
    const getCategoryDetails = async()=>{
      try{
        const res = await getCatalogPageData(categoryId)
        setCatalogPageData(res);
      }catch(error){
        console.log(error)
      }
    }

    getCategoryDetails()
  },[categoryId])

  return (
    <div className='text-white'>
      <div>
        {/* Path of page */}
        <p>{catalogPageData?.data?.selectedCategory?.name}</p>

        {/* Name of the page */}
        <p>{catalogPageData?.data?.selectedCategory?.name}</p>

        {/* Description of the page */}
        <p>{catalogPageData?.data?.selectedCategory?.name}</p>

      </div>

      {/* Course to be bought */}
      <div>
        {/* Section 1 */}
        <div>
          {/* Headings/text */}
          <div className='flex gap-x-3'>
            <p>Most popular</p>
            <p>New</p>
          </div>
          
          {/* Course display */}
          {/* <CourseSlider/> */}
        </div>

        {/* Section 2 */}
        <div>
          {/* Headings */}
          <p>Top Courses</p>

          {/* Course display */}        
          <div>
            {/* <CourseSlider/> */}
          </div>
          
        </div>

        {/* Section 2 */}
        <div>
          {/* Headings */}
          <p>Frequently Bought Together</p>

          {/* Course display */}        
          
        </div>

      </div>

      <Footer/>

    </div>
  )
}

export default Catalog