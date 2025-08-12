"use client"

import { useState, useRef, useEffect } from "react"
import { Calendar, Search, ChevronLeft, ChevronRight } from "lucide-react"

export function SearchInput() {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [currentView, setCurrentView] = useState('month') // 'month' or 'year'
  const wrapperRef = useRef(null)
  const modalRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      // If clicking on the backdrop (the outer div) or outside both elements
      if (event.target === event.currentTarget || 
          (wrapperRef.current && !wrapperRef.current.contains(event.target) &&
           modalRef.current && !modalRef.current.contains(event.target))) {
        setShowDatePicker(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleDatePicker = () => {
    setShowDatePicker((prev) => !prev)
  }

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i)

  const handleMonthChange = (monthIndex) => {
    setSelectedMonth(monthIndex)
    setCurrentView('month')
  }

  const handleYearChange = (year) => {
    setSelectedYear(year)
    setCurrentView('year')
  }

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      if (selectedMonth === 0) {
        setSelectedMonth(11)
        setSelectedYear(selectedYear - 1)
      } else {
        setSelectedMonth(selectedMonth - 1)
      }
    } else {
      if (selectedMonth === 11) {
        setSelectedMonth(0)
        setSelectedYear(selectedYear + 1)
      } else {
        setSelectedMonth(selectedMonth + 1)
      }
    }
  }

  const navigateYear = (direction) => {
    setSelectedYear(selectedYear + direction)
  }

  return (
    <div className="flex items-center justify-center py-4 pl-0 md:p-4">
      <div
        ref={wrapperRef}
        className="relative flex items-center bg-[#EEEEEE] dark:bg-gray-800 rounded-2xl pr-2 max-w-md w-full"
      >
        <input
          type="text"
          placeholder={`${months[selectedMonth]} ${selectedYear}`}
          className="flex-grow px-3 py-2   md:px-5 md:py-3 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 text-sm  md:text-base rounded-l-full cursor-pointer"
          aria-label="Date input"
          readOnly
          onClick={toggleDatePicker}
        />
        <Calendar
          className=" h-5 w-5 md:h-6 md:w-6 text-prime dark:text-green-400 cursor-pointer flex-shrink-0"
          aria-label="Open date picker"
          onClick={toggleDatePicker}
        />

        {showDatePicker && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 md:absolute md:inset-auto md:top-full md:mt-3 md:left-1/2 md:-translate-x-1/2 md:bg-transparent md:p-0"
            onClick={(e) => {
              // Close when clicking on the backdrop
              if (e.target === e.currentTarget) {
                setShowDatePicker(false)
              }
            }}
          >
            <div
              ref={modalRef}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-sm md:w-80 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-prime to-[#25633c] p-4 text-white">
                <div className="flex items-center justify-between mb-2">
                  <button
                    onClick={() => navigateMonth('prev')}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <h3 className="font-bold text-lg">
                    {months[selectedMonth]} {selectedYear}
                  </h3>
                  <button
                    onClick={() => navigateMonth('next')}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {/* View Toggle */}
                <div className="flex bg-white/20 rounded-lg p-1">
                  <button
                    onClick={() => setCurrentView('month')}
                    className={`flex-1 py-1 px-2 rounded text-xs font-medium transition-colors ${
                      currentView === 'month' ? 'bg-white text-[#1E4C30]' : 'text-white'
                    }`}
                  >
                    Month
                  </button>
                  <button
                    onClick={() => setCurrentView('year')}
                    className={`flex-1 py-1 px-2 rounded text-xs font-medium transition-colors ${
                      currentView === 'year' ? 'bg-white text-[#1E4C30]' : 'text-white'
                    }`}
                  >
                    Year
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                {currentView === 'month' ? (
                  <div className="space-y-4">
                    {/* Month Grid */}
                    <div className="grid grid-cols-3 gap-2">
                      {months.map((month, index) => (
                        <button
                          key={month}
                          onClick={() => handleMonthChange(index)}
                          className={`py-2 px-1 text-xs font-medium rounded-lg transition-all duration-200 ${
                            selectedMonth === index
                              ? 'bg-[#1E4C30] text-white shadow-lg transform scale-105'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          {month.slice(0, 3)}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Year Navigation */}
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => navigateYear(-1)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                      >
                        <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </button>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        {selectedYear}
                      </span>
                      <button
                        onClick={() => navigateYear(1)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                      >
                        <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>

                    {/* Year Grid */}
                    <div className="grid grid-cols-3 gap-2">
                      {years.map((year) => (
                        <button
                          key={year}
                          onClick={() => handleYearChange(year)}
                          className={`py-2 px-1 text-xs font-medium rounded-lg transition-all duration-200 ${
                            selectedYear === year
                              ? 'bg-[#1E4C30] text-white shadow-lg transform scale-105'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Selected Date Display */}
                <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Selected</span>
                    <div className="font-semibold text-gray-900 dark:text-gray-100">
                      {months[selectedMonth]} {selectedYear}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        className="ml-2 p-2 md:p-3 bg-[#EEEEEE] text-prime dark:bg-gray-800 rounded-xl flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900 transition-colors duration-200"
        aria-label="Search button"
      >
        <Search className="h-5 w-5 md:h-6 md:w-6 text-primer dark:text-green-400" />
      </button>
    </div>
  )
}
