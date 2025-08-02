"use client";

import React from "react";
import { motion } from "framer-motion";
import "./Quote.css";

const page = () => {
  return (
    <motion.section
      id="about"
      className="quote-section-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.div
        className="quote-heading"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1>ABOUT US</h1>
      </motion.div>

      <div className="page-1">
        <div className="img-1">
          <img src="/images/img1.svg" alt="" />
          <h1>SHRI PEMA KHANDU</h1>
          <p>Hon’ble, Chief Minister</p>
        </div>
        <div className="paragraph">
          <p>
            The Department of Panchayati Raj was established in the Year 1985.
            Since then, the functions of the Department as per Allocation of
            Business Rules were limited with the conduct of Panchayati Raj
            Election and promulgation of Acts, Laws, Bye-Laws, Guidelines etc.
            of Panchayati Raj Department and Its relevant matters. The work load
            of the Department has increased manifold and despite shortage of man
            power the department of Panchayati Raj had to implement the various
            flagship programmes in mission mode with limited man powers. As per
            implementation strategy of the Department, in all the respective
            Programme guidelines, there were provisions of man power for
            programme driven engagement on monthly fixed honorarium/salary basis
            in order to work with elected PRls and smooth implementation of
            Civil works, basis services and to oversee accounts and
            establishment matters at District level as well as at head quarters.
          </p>
        </div>
        <div className="img-2">
          <img src="/images/img2.svg" alt="" />
          <h1>SHRI OJING TASING</h1>
          <p>Hon’ble Minister, Panchayati Raj</p>
        </div>
      </div>

      <div className="page-2">
        <div className="img-3">
          <img src="/images/img3.svg" alt="" />
          <h1>SHRI MANISH K GUPTA</h1>
          <p>Hon'ble Chief Secretary</p>
        </div>

        <div className="img-4">
          <img src="/images/img4.svg" alt="" />
          <h1>DR. SONAL SWAROOP, IAS</h1>
          <p>Hon’ble, Secretary Panchayati Raj</p>
        </div>
      </div>
    </motion.section>
  );
};

export default page;
