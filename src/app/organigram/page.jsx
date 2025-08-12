


"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  Users,
  Phone,
  MapPin,
  Building2,
  User,
} from "lucide-react";
import employeesData from "@/components/data/panchayati-raj-employees.json";
import Image from "next/image";

export default function OrganigramPage() {
  const [employees] = useState(employeesData.employees);
  const [expandedNodes, setExpandedNodes] = useState(new Set([0, 1, 2, 3, 4]));
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const toggleNode = (employeeId) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(employeeId)) {
      newExpanded.delete(employeeId);
    } else {
      newExpanded.add(employeeId);
    }
    setExpandedNodes(newExpanded);
  };

  const getSubordinates = (employeeId) => {
    const employee = employees.find((emp) => emp.id === employeeId);
    if (!employee) return [];
    return employees.filter((emp) => employee.subordinates.includes(emp.id));
  };

  const getEmployeesBySection = (subordinates) => {
    const sections = {};
    subordinates.forEach((emp) => {
      if (!sections[emp.section]) {
        sections[emp.section] = [];
      }
      sections[emp.section].push(emp);
    });
    return sections;
  };

  const OrganigramBox = ({
    employee,
    isExpanded,
    onToggle,
    isSection = false,
  }) => {
    const subordinates = getSubordinates(employee.id);
    const hasSubordinates = subordinates.length > 0;
    const sectionGroups = hasSubordinates
      ? getEmployeesBySection(subordinates)
      : {};

    if (employee.level === 0) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="bg-gradient-to-r from-prime to-olive text-white p-8 rounded-lg shadow-2xl border-4 border-prime min-w-[500px]">
            <div className="text-center">
              <Building2 className="w-16 h-16 mx-auto mb-4" />
              <h1 className="text-4xl font-bold font-mont mb-2 uppercase tracking-wide">
                {employee.name}
              </h1>
              <div className="text-lg opacity-90 font-medium">
                {employee.designation}
              </div>
              <div className="text-sm opacity-75 mt-2">
                {employee.placeOfPosting}
              </div>
            </div>
          </div>

          {hasSubordinates && isExpanded && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 50 }}
              className="w-1 bg-prime mt-4"
            />
          )}

          <AnimatePresence>
            {hasSubordinates && isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <div className="flex flex-col items-center gap-8">
                  {subordinates.map((subordinate) => (
                    <div key={subordinate.id} className="relative">
                      <div className="absolute -top-8 left-1/2 w-1 h-8 bg-prime transform -translate-x-1/2" />
                      <OrganigramBox
                        employee={subordinate}
                        isExpanded={expandedNodes.has(subordinate.id)}
                        onToggle={() => toggleNode(subordinate.id)}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center"
      >
        <div className="bg-white border-2 border-prime rounded-lg shadow-lg min-w-[350px] max-w-[400px]">
          {/* Header with position info */}
          <div className="bg-gradient-to-r from-prime to-olive text-white p-4 rounded-t-lg">
            <div className="text-center ">
              {employee.image ? (
                <div className="w-24 h-24 object-cover rounded-full overflow-hidden mb-2 mx-auto">
                  <img
                    src={employee.image}
                    alt={employee.name}
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-2">
                  {employee.name.charAt(0)}
                </div>
              )}
              <h3 className="font-bold text-lg mb-1 leading-tight">
                {employee.designation}
              </h3>
              <div className="text-sm opacity-90">{employee.name}</div>
            </div>
          </div>

          {/* Body with details */}
          <div className="p-4">
            <div className="space-y-2 text-sm mb-4">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4 text-olive flex-shrink-0" />
                <span className="text-xs">{employee.placeOfPosting}</span>
              </div>
              {employee.contactNo && employee.contactNo !== "N/A" && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4 text-olive flex-shrink-0" />
                  <span className="text-xs">{employee.contactNo}</span>
                </div>
              )}
              <div className="text-xs text-white font-medium bg-olive px-2 py-1 rounded">
                {employee.section}
              </div>
            </div>

            {hasSubordinates && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onToggle()}
                className="w-full border-prime text-prime hover:bg-prime hover:text-white"
              >
                <Users className="w-4 h-4 mr-2" />
                {subordinates.length} Position
                {subordinates.length > 1 ? "s" : ""} Under This
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 ml-2" />
                ) : (
                  <ChevronDown className="w-4 h-4 ml-2" />
                )}
              </Button>
            )}
          </div>
        </div>

        {hasSubordinates && isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 40 }}
            className="w-1 bg-olive mt-4"
          />
        )}

        <AnimatePresence>
          {hasSubordinates && isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              {Object.keys(sectionGroups).length > 1 ? (
                <div className="flex flex-wrap justify-center gap-12">
                  {Object.entries(sectionGroups).map(
                    ([sectionName, sectionEmployees]) => (
                      <div
                        key={sectionName}
                        className="flex flex-col items-center"
                      >
                        {/* Section Header */}
                        <div className="bg-gradient-to-r from-olive to-second text-white p-3 rounded-lg mb-6 min-w-[280px] text-center shadow-lg">
                          <h4 className="font-bold text-lg">{sectionName}</h4>
                          <div className="text-sm opacity-90">
                            {sectionEmployees.length} Position
                            {sectionEmployees.length > 1 ? "s" : ""}
                          </div>
                        </div>

                        {/* Connection line */}
                        <div className="w-1 h-6 bg-olive mb-4" />

                        {/* Employees in this section */}
                        <div className="flex flex-col gap-6">
                          {sectionEmployees.map((subordinate) => (
                            <div key={subordinate.id} className="relative">
                              <div className="absolute -top-6 left-1/2 w-1 h-6 bg-olive transform -translate-x-1/2" />
                              <OrganigramBox
                                employee={subordinate}
                                isExpanded={expandedNodes.has(subordinate.id)}
                                onToggle={() => toggleNode(subordinate.id)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-6">
                  {subordinates.map((subordinate) => (
                    <div key={subordinate.id} className="relative">
                      <div className="absolute -top-6 left-1/2 w-1 h-6 bg-olive transform -translate-x-1/2" />
                      <OrganigramBox
                        employee={subordinate}
                        isExpanded={expandedNodes.has(subordinate.id)}
                        onToggle={() => toggleNode(subordinate.id)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  const rootEmployee = employees.find((emp) => emp.level === 0);

  return (
    <div className="min-h-screen bg-prime-bg">
      <div className="bg-gradient-to-r from-prime via-olive to-second text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Building2 className="w-20 h-20 mx-auto mb-4" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold font-mont uppercase tracking-wider mb-4"
          >
            Organigram
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-3xl font-mont opacity-90 mb-2"
          >
            Panchayati Raj Department
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg opacity-75"
          >
            Government of Arunachal Pradesh
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center">
          {rootEmployee && (
            <OrganigramBox
              employee={rootEmployee}
              isExpanded={expandedNodes.has(rootEmployee.id)}
              onToggle={() => toggleNode(rootEmployee.id)}
            />
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedEmployee && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedEmployee(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-xl p-8 max-w-lg w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                {selectedEmployee.image ? (
                  <img
                    src={selectedEmployee.image}
                    alt={selectedEmployee.name}
                    className="w-24 h-24 object-cover rounded-full mx-auto mb-6"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gradient-to-r from-prime to-olive rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-6">
                    {selectedEmployee.name.charAt(0)}
                  </div>
                )}
                <h2 className="text-3xl font-bold text-prime mb-2">
                  {selectedEmployee.name}
                </h2>
                <p className="text-xl text-gray-600 mb-6">
                  {selectedEmployee.designation}
                </p>
                <div className="space-y-4 text-left bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-olive" />
                    <span className="text-gray-700">
                      {selectedEmployee.placeOfPosting}
                    </span>
                  </div>
                  {selectedEmployee.contactNo &&
                    selectedEmployee.contactNo !== "N/A" && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-olive" />
                        <span className="text-gray-700">
                          {selectedEmployee.contactNo}
                        </span>
                      </div>
                    )}
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-olive" />
                    <span className="text-gray-700">
                      {selectedEmployee.section}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={() => setSelectedEmployee(null)}
                  className="mt-8 bg-prime hover:bg-prime/90 px-8 py-3 text-lg"
                >
                  Close Details
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
