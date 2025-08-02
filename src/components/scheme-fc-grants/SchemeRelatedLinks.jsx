import React from 'react'

const SchemeRelatedLinks = () => {
  return (
    <div className="rounded-2xl border border-[#F4AC1A] bg-[#faf0de] p-6 md:p-10 max-w-2xl mx-auto shadow-sm">
      <h2 className="text-2xl md:text-3xl font-bold text-prime mb-4">
        Scheme Related Links
      </h2>
      {/* <ul className="space-y-3">
        {relatedLinks.map((link, idx) => (
          <li key={idx}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline flex items-center gap-2"
            >
              <span className="inline-block w-2 h-2 bg-prime rounded-full"></span>
              <span>{link.title}</span>
              <svg
                className="w-4 h-4 text-blue-500"
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
            </a>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default SchemeRelatedLinks;
