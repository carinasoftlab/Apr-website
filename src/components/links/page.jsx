import React from "react";
import "./link.css";
import Image from "next/image";

const links = [
  { src: "/images/image1.svg", name: "NAME" },
  { src: "/images/image2.svg", name: "NAME" },
  { src: "/images/image3.svg", name: "NAME" },
  { src: "/images/image4.svg", name: "NAME" },
  { src: "/images/image5.svg", name: "NAME" },
  { src: "/images/image6.svg", name: "NAME" },
];



const Page = () => {
  return (
    <section id="link" className="important-links-section">
      <div className="header">
        <h1>IMPORTANT LINKS</h1>
      </div>

      {/* Grid section 1 */}
      <div className="link-container">
        {links.map((link, idx) => (
          <div className="content-img" key={idx}>
            <img src={link.src} alt={link.name} width={250} height={300} />
            <h2>{link.name}</h2>
          </div>
        ))}
      </div>

      {/* Grid section 2 */}
      
    </section>
  );
};

export default Page;
