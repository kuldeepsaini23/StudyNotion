import React from "react";
import ContactFormSection from "../components/ContactPage/ContactFormSection";
import ReviewSlider from "../components/common/ReviewSlider";
import Footer from "../components/common/Footer";
import InfoSection from "../components/ContactPage/InfoSection";
const Contact = () => {
  return (
    <div>
    
      {/* Section 1 */}
      <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
        <InfoSection/>
        <ContactFormSection />
      </section>

      {/* Section 2 */}
      <section className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </section>

      {/* Section 3 */}
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default Contact;
