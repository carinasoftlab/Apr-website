
"use client";
import React from 'react'
import Image from 'next/image'
import "./Quote.css"

const page = () => {
  return (
    <section className="about-container">
      <h1 className="quote-title"> ABOUT US</h1>

      <div className='about-content-container'>
        <div className="about-content">
          <div className="about-content-left-image">
            <Image
              src="/images/img1.svg"
              alt="about"
              width={500}
              height={500}
            />
            <div className="text-center">
              <h2>SHRI PEMA KHANDU</h2>
              <p>Hon'ble, Chief Minister</p>
            </div>
          </div>

          <div className="about-content-center">
            <p>
              The Department of Panchayati Raj was established in the year 1985.
              Since then, the functions of the Department, as per the Allocation
              of Business Rules, were limited to conducting Panchayati Raj
              elections and promulgating Acts, Laws, Bye-laws, Guidelines, etc.,
              of the Panchayati Raj Department and its relevant matters. The
              workload of the Department has increased manifold, and despite a
              shortage of manpower, the Department of Panchayati Raj has had to
              implement various flagship programmes in mission mode with limited
              manpower. As per the implementation strategy of the Department, in
              all the respective programme guidelines, there were provisions for
              manpower for programme-driven engagement on a monthly fixed
              honorarium/salary basis in order to work with elected PRIs and
              ensure the smooth implementation of civil works, basic services,
              and to oversee accounts and establishment matters at the district
              level as well as at headquarters.
            </p>
          </div>

          <div className="about-content-right-image">
            <Image
              src="/images/img2.svg"
              alt="about"
              width={500}
              height={475}
            />
            <div className="text-center">
              <h2>SHRI OJING TASING</h2>
              <p>Hon’ble Minister, Panchayati Raaj</p>
            </div>
          </div>
        </div>

        <div className="about-content-bottom">
          <div className="about-content-bottom-left">
            <Image
              src="/images/img3.svg"
              alt="about"
              width={250}
              height={250}
            />
            <div className="text-center">
              <h2>SHRI MANISH K GUPTA</h2>
              <p>Chief Secretary</p>
            </div>
          </div>

          <div className="about-content-bottom-right">
            <Image
              src="/images/img4.svg"
              alt="about"
              width={250}
              height={250}
            />
            <div className="text-center">
              <h2>DR. SONAL SWAROOP, IAS</h2>
              <p>Secretary Panchayati Raj</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default page