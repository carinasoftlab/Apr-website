"use client";

import Image from "next/image";
import { PlayCircle, ArrowRight } from "lucide-react";
import "./About.css";

export default function PanchayatPortal() {
  return (
    <div className="portal-wrapper">
      <div className="main-heading-section">
        <h1>KNOW YOUR PANCHAYAT</h1>
        <p>
          Explore important circulars, guidelines, and informative videos to
          better understand the functioning of your Panchayat.<br/> This section
          serves as a resource hub to keep you informed about policies, roles,
          and responsibilities at the grassroots<br/> level. Stay updated, stay
          empowered.
        </p>
      </div>
      <div className="portal-grid">
        {/* Left Column */}
        <div className="portal-section">
          <div className="portal-heading green">Know Your Panchayat</div>
          <div className="card-list">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <div key={index} className="video-card">
                <div className="video-thumbnail">
                  <Image
                    src="/images/videolink.png"
                    alt="Panchayat Bhavan inauguration"
                    width={250}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                  <div className="video-overlay">
                    <PlayCircle className="icon-white" />
                  </div>
                </div>
                <div className="card-content-1">
                  <h3 className="card-title-1">Panchayat Bhavan inaugurated</h3>
                  <p className="card-description-1">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting. Lorem Ipsum is simply dummy text of the
                    printing and typesetting.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="portal-section">
          <div className="portal-heading orange">Orders / Circular</div>
          <div className="card-list">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <div key={index} className="text-card">
                <h3 className="card-title">Panchayat Bhavan inaugurated</h3>
                <p className="card-description">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting. Lorem Ipsum is simply dummy text of the printing
                  and typesetting.
                </p>
                <a href="#" className="read-more">
                  Read More <ArrowRight className="arrow-icon" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
