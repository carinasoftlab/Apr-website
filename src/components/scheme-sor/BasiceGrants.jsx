import React from 'react';
// import { SearchInput } from './search-input';
import { SchemeSorAccordion } from './SchemeSorAccordion';
import { schemeSorData } from '@/constants/scheme-sor.data';
import { SearchInput } from './search-input';

const BasiceGrants = () => {
  return (
    <div>
      {/* Search Section */}
      <div className="bg-gray-50 lg:p-4 flex flex-col md:flex-row items-start md:items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--prime-color)' }}></div>
          <p className="font-bold text-gray-800">Month & Year</p>
        </div>
        <SearchInput />
      </div>

      {/* Accordion Content */}
      <SchemeSorAccordion />
    </div>
  );
};

export default BasiceGrants;
