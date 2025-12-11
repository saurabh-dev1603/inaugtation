"use client";
import React, { useState, useEffect } from "react";
import PortalLayout from "@/components/PortalLayout";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

// Mock Data matching the payload structure
const MOCK_DATA = [
  {
    id: 1,
    name: "Aarav Sharma",
    contact: "9876543210",
    email: "aarav.sharma@example.com",
    birthPlace: "New Delhi, India",
    dob: "1990-05-15",
    tob: "14:30",
    gender: "male",
    status: "pending",
  },
  {
    id: 2,
    name: "Priya Patel",
    contact: "9812345678",
    email: "priya.p@example.com",
    birthPlace: "Mumbai, India",
    dob: "1995-08-22",
    tob: "09:15",
    gender: "female",
    status: "completed",
  },
  {
    id: 3,
    name: "Rahul Verma",
    contact: "9988776655",
    email: "rahul.v@example.com",
    birthPlace: "Bangalore, India",
    dob: "1988-12-10",
    tob: "18:45",
    gender: "male",
    status: "pending",
  },
  {
    id: 4,
    name: "Sneha Gupta",
    contact: "9123456780",
    email: "sneha.g@example.com",
    birthPlace: "Kolkata, India",
    dob: "1992-03-30",
    tob: "06:00",
    gender: "female",
    status: "completed",
  },
  {
    id: 5,
    name: "Vikram Singh",
    contact: "9876509876",
    email: "vikram.s@example.com",
    birthPlace: "Jaipur, India",
    dob: "1985-07-07",
    tob: "12:00",
    gender: "male",
    status: "pending",
  },
];

export default function ReportPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggleLoading, setToggleLoading] = useState(null);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setData(MOCK_DATA);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStatusToggle = async (id, currentStatus) => {
    setToggleLoading(id);
    const newStatus = currentStatus === "pending" ? "completed" : "pending";

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setToggleLoading(null);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center px-4 md:px-8 pt-10 pb-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-8xl mb-8 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-ptsans-bold text-white mb-2">
          Submitted Reports
        </h1>
        <p className="text-zinc-300 text-lg">List of all user submissions</p>
      </motion.div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <Loader2 className="w-12 h-12 text-white animate-spin mb-4" />
          <p className="text-white text-lg">Loading data...</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-8xl overflow-hidden rounded-2xl shadow-2xl p-1 mobile-glass-container"
        >
          <div className="overflow-x-auto bg-black/20 rounded-xl">
            <table className="w-full text-left text-white border-collapse">
              <thead>
                <tr className="bg-white/5 text-indigo-100 uppercase text-sm tracking-wider border-b border-white/10">
                  <th className="px-6 py-4 font-semibold">Name</th>
                  <th className="px-6 py-4 font-semibold">Contact</th>
                  <th className="px-6 py-4 font-semibold">Email</th>
                  <th className="px-6 py-4 font-semibold">Birth Details</th>
                  <th className="px-6 py-4 font-semibold">Place</th>
                  <th className="px-6 py-4 font-semibold">Gender</th>
                  <th className="px-6 py-4 font-semibold text-center">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {data.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-white/5 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 font-medium">{item.name}</td>
                    <td className="px-6 py-4 text-zinc-200">
                      +91 {item.contact}
                    </td>
                    <td className="px-6 py-4 text-zinc-200">{item.email}</td>
                    <td className="px-6 py-4 text-zinc-200">
                      <div className="flex flex-col">
                        <span>Date: {item.dob}</span>
                        <span className="text-xs text-zinc-400">
                          Time: {item.tob}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-200">
                      {item.birthPlace}
                    </td>
                    <td className="px-6 py-4 capitalize text-zinc-200">
                      {item.gender}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleStatusToggle(item.id, item.status)}
                        disabled={toggleLoading === item.id}
                        className={`
                            px-4 py-1.5 rounded-full text-xs font-semibold
                            transition-all duration-300 transform hover:scale-105
                            ${
                              item.status === "completed"
                                ? "bg-green-500/20 text-green-300 border border-green-500/50 hover:bg-green-500/30"
                                : "bg-orange-500/20 text-orange-300 border border-orange-500/50 hover:bg-orange-500/30"
                            }
                            ${
                              toggleLoading === item.id
                                ? "opacity-50 cursor-wait"
                                : ""
                            }
                          `}
                      >
                        {toggleLoading === item.id ? (
                          <Loader2 className="w-4 h-4 animate-spin inline-block" />
                        ) : (
                          <span className="capitalize">{item.status}</span>
                        )}
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {data.length === 0 && (
            <div className="p-8 text-center text-zinc-400">
              No records found.
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
