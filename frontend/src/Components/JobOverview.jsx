import React from "react";
import {
  FiUser,
  FiBriefcase,
  FiClock,
  FiMapPin,
  FiAward,
  FiCreditCard,
  FiTag,
} from "react-icons/fi";

export default function JobOverview() {
  return (
    <div className="bg-teal-50 dark:bg-[#0d2a28] dark:border dark:border-slate-700 dark:shadow-black/20 rounded-2xl p-6">
      <h3 className="font-bold text-gray-900 dark:text-white mb-5">
        Job Overview
      </h3>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white dark:bg-[#071A19] flex items-center justify-center text-teal-600 dark:text-teal-400">
            <FiUser className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              Job Title
            </p>
            <p className="font-medium text-gray-900 dark:text-white text-sm">
              Full Stack Developer
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white dark:bg-[#071A19] flex items-center justify-center text-teal-600 dark:text-teal-400">
            <FiClock className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              Job Type
            </p>
            <p className="font-medium text-gray-900 dark:text-white text-sm">
              Full Time
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white dark:bg-[#071A19] flex items-center justify-center text-teal-600 dark:text-teal-400">
            <FiBriefcase className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              Category
            </p>
            <p className="font-medium text-gray-900 dark:text-white text-sm">
              Tech
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white dark:bg-[#071A19] flex items-center justify-center text-teal-600 dark:text-teal-400">
            <FiAward className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              Experience
            </p>
            <p className="font-medium text-gray-900 dark:text-white text-sm">
              5 Years
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white dark:bg-[#071A19] flex items-center justify-center text-teal-600 dark:text-teal-400">
            <FiTag className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-slate-400">Degree</p>
            <p className="font-medium text-gray-900 dark:text-white text-sm">
              Master
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white dark:bg-[#071A19] flex items-center justify-center text-teal-600 dark:text-teal-400">
            <FiCreditCard className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              Offered Salary
            </p>
            <p className="font-medium text-gray-900 dark:text-white text-sm">
              ৳40000-৳42000
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white dark:bg-[#071A19] flex items-center justify-center text-teal-600 dark:text-teal-400">
            <FiMapPin className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              Location
            </p>
            <p className="font-medium text-gray-900 dark:text-white text-sm">
              Uttara, Dhaka
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
