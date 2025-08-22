import React, { useState } from "react";
import Image from "next/image";

const GramPanchayatCard = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    {
      id: 1,
      src: "/images/dprc/dprc1.jpeg",
      alt: "Gram Panchayat project image 1",
      title: "Project Phase 1",
    },
    {
      id: 2,
      src: "/images/dprc/dprc2.jpeg",
      alt: "Gram Panchayat project image 2",
      title: "Project Phase 2",
    },
    {
      id: 3,
      src: "/images/dprc/dprc3.jpeg",
      alt: "Gram Panchayat project image 3",
      title: "Project Phase 3",
    },
  ];

  const PanchImages = [
    {
      id: 1,
      src: "/images/dprc/dprc4.jpeg",
      alt: "Gram Panchayat project image 1",
      title: "Project Phase 1",
    },
    {
      id: 2,
      src: "/images/dprc/dprc5.jpeg",
      alt: "Gram Panchayat project image 2",
      title: "Project Phase 2",
    },
    {
      id: 3,
      src: "/images/dprc/dprc6.jpeg",
      alt: "Gram Panchayat project image 3",
      title: "Project Phase 3",
    },
  ];

  return (
    <div className="max-w-full mx-auto p-4">
      {/* Main Card */}
      <div className="flex gap-12 flex-col">
        <div className="rounded-2xl border p-8 md:p-14 border-[#F4AC1A] bg-gradient-to-b from-[#FFF8E1] to-white overflow-hidden space-y-8">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 border-b border-[#F4AC1A] pb-2">
              Project Images
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-105"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-48 lg:h-60 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Card Header */}
          <div className="flex flex-col sm:justify-between sm:items-start gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-[#F4AC1A] uppercase tracking-wide">
              District: Changlang District
            </h2>
            {/* <p className="text-black uppercase font-semibold">
              District: Kurung Kumey
            </p> */}
          </div>

          {/* Images Section */}

          {/* Additional Info */}
          {/* <div className="bg-[#FFF8E1] border border-[#F4AC1A] rounded-lg p-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-semibold text-gray-700">Status:</span>
                <p className="text-gray-600">Ongoing</p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Added:</span>
                <p className="text-gray-600">20 Jan 2022</p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Scheme:</span>
                <p className="text-gray-600">Gram Panchayat</p>
              </div>
            </div>
          </div> */}
        </div>

        <div className="rounded-2xl border p-8 md:p-14 border-[#F4AC1A] bg-gradient-to-b from-[#FFF8E1] to-white overflow-hidden space-y-8">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 border-b border-[#F4AC1A] pb-2">
              Project Images
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {PanchImages.map((PanchImages) => (
                <div
                  key={PanchImages.id}
                  className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-105"
                  onClick={() => setSelectedImage(PanchImages)}
                >
                  <img
                    src={PanchImages.src}
                    alt={PanchImages.alt}
                    className="w-full h-48 lg:h-60 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Card Header */}
          <div className="flex flex-col sm:justify-between sm:items-start gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-[#F4AC1A] uppercase tracking-wide">
              District: kurung Kumey district
            </h2>
            {/* <p className="text-black uppercase font-semibold">
              District: Kurung Kumey
            </p> */}
          </div>

          {/* Images Section */}

          {/* Additional Info */}
          {/* <div className="bg-[#FFF8E1] border border-[#F4AC1A] rounded-lg p-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-semibold text-gray-700">Status:</span>
                <p className="text-gray-600">Ongoing</p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Added:</span>
                <p className="text-gray-600">20 Jan 2022</p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Scheme:</span>
                <p className="text-gray-600">Gram Panchayat</p>
              </div>
            </div>
          </div> */}
        </div>

        {/* Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-xl bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-4xl max-h-fit"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 px-3.5 hover:bg-opacity-75 transition-all"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-75 text-white p-3 rounded">
                <h4 className="font-semibold">{selectedImage.title}</h4>
                <p className="text-sm text-gray-300">{selectedImage.alt}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GramPanchayatCard;
