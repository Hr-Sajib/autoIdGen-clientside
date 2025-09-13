

// src/app/_components/HeroButtons.tsx
"use client";
import { setRole } from "@/lib/slice/role/roleSlice";
import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";


export default function HeroButtons() {
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.role.selected);

  return (
    <div className="mt-8 flex justify-center">
      <div className="relative flex border border-white rounded-xl overflow-hidden w-max">
        {/* Sliding background */}
        <div
          className={`absolute top-0 left-0 h-full w-1/2 bg-white rounded-lg transition-all duration-300 ease-in-out`}
          style={{
            transform: selected === "student" ? "translateX(0%)" : "translateX(calc(100% + 1px))",
          }}
        ></div>

        {/* Buttons */}
        <button
          onClick={() => dispatch(setRole("student"))}
          className={`relative z-10 py-4 px-6 font-semibold transition-colors duration-300 ease-in-out ${
            selected === "student" ? "text-[#4A61E4]" : "text-white"
          }`}
        >
          Student
        </button>
        <button
          onClick={() => dispatch(setRole("employee"))}
          className={`relative z-10 py-4 px-6 font-semibold transition-colors duration-300 ease-in-out ${
            selected === "employee" ? "text-[#4A61E4]" : "text-white"
          }`}
        >
          Employee
        </button>
      </div>
    </div>
  );
}
