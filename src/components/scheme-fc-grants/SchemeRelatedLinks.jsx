import React from "react";

const SchemeRelatedLinks = () => {

   const relatedLinks = [
     {
       title: "Audit Online",
       url: "https://auditonline.gov.in/",
     },
     {
       title: "E-Gramswaraj",
       url: "https://egramswaraj.gov.in/",
     },
     {
       title: "PFMS",
       url: "https://pfms.nic.in/",
     },
     {
       title: "Panchayat Development Plan",
       url: "https://gpdp.nic.in/",
     },
   ];
  return (
    <div className="rounded-2xl border border-[#F4AC1A] bg-[#faf0de] p-6 md:p-10 max-w-auto mx-auto shadow-sm">
      <h2 className="text-2xl md:text-3xl font-bold text-prime mb-4">
        Scheme Related Links
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {relatedLinks.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="rounded-2xl border border-[#F4AC1A] bg-[#faf0de] p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] hover:border-[#e69a00]">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="inline-block w-3 h-3 bg-prime rounded-full group-hover:scale-110 transition-transform duration-200"></span>
                  <h3 className="text-xl font-semibold text-prime group-hover:text-[#e69a00] transition-colors duration-200">
                    {link.title}
                  </h3>
                </div>
                <svg
                  className="w-5 h-5 text-[#F4AC1A] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 7l-10 10M17 17V7H7"
                  />
                </svg>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed">
                {link.description}
              </p>

              <div className="mt-4 pt-3 border-t border-[#F4AC1A]/30">
                <p className="text-xs text-gray-600 truncate font-mono">
                  {link.url}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SchemeRelatedLinks;
