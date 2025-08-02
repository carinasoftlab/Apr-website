"use client"
import { motion } from "framer-motion"

const SchemeTab = ({ actionButtons, currentTab, onTabChange }) => {
  return (
    <div className="w-full flex items-center justify-center p-4 lg:px-0 xl:px-4 flex-row">
      <div className="flex flex-wrap flex-row gap-3 overflow-x-auto pb-2 scrollbar-hide w-full sm:w-auto">
        {actionButtons.map((button, index) => {
          const isActive =
            currentTab === (button.id || button.label.toLowerCase().replace(/\s+/g, "-"))

          return (
            <div key={index} className="flex-shrink-0 w-full md:w-auto flex-row ">
              <button
                onClick={() =>
                  onTabChange(button.id || button.label.toLowerCase().replace(/\s+/g, "-"))
                }
                className={`relative w-full flex-shrink-0 min-w-[140px] rounded-md px-4 py-2 text-sm font-medium shadow-sm overflow-hidden transition-colors duration-200
                  ${
                    isActive
                      ? "text-white rounded-md px-4 py-2 "
                      : "text-gray-700 bg-white dark:bg-white/[0.03] border  border-gray-200 dark:border-white/[0.09] dark:text-white hover:text-[var(--prime-color)] dark:hover:text-white"
                  }
                `}
              >
                {/* Simple background for active tab */}
                {isActive && (
                  <motion.div
                    layoutId="active-tab-bg "
                    className="absolute inset-0 rounded-md px-4 py-2 "
                    style={{ backgroundColor: "var(--prime-color)" }}
                    transition={{ duration: 0.2 }}
                  />
                )}

                <span className="relative z-10">{button.label}</span>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SchemeTab
