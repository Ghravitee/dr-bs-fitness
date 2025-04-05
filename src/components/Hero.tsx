import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

// Form Validation Schema
const formSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  date: z.string().min(1, "Date is required"),
  ageRange: z.string().min(1, "Select an age range"),
  phone: z.string().min(10, "Enter a valid phone number"),
  instagram: z.string().optional(),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),
  fitnessGoal: z.string().min(5, "Enter a fitness goal"),
  employment: z.string().min(2, "Enter your employment status"),
  confirmation: z.enum(["yes", "no"], {
    required_error: "Please confirm to proceed",
  }),
});

const steps = [
  { id: 1, label: "What's your name?", name: "name", type: "text" },
  { id: 2, label: "Your email?", name: "email", type: "email" },
  { id: 3, label: "Preferred appointment date?", name: "date", type: "date" },
  {
    id: 4,
    label: "Select your age range",
    name: "ageRange",
    type: "select",
    options: ["18-25", "26-35", "36-45", "46+"],
  },
  { id: 5, label: "Your phone number?", name: "phone", type: "tel" },
  {
    id: 6,
    label: "Your Instagram username (optional)?",
    name: "instagram",
    type: "text",
  },
  { id: 7, label: "Your city?", name: "city", type: "text" },
  { id: 8, label: "Your country?", name: "country", type: "text" },
  {
    id: 9,
    label: "Your fitness goal for the next 120 days?",
    name: "fitnessGoal",
    type: "text",
  },
  {
    id: 10,
    label: "Your current employment status?",
    name: "employment",
    type: "text",
  },
  {
    id: 11,
    label: "Trainer's fee starts at $50. Do you agree?",
    name: "confirmation",
    type: "radio",
    options: ["yes", "no"],
  },
];

type FormData = {
  name: string;
  email: string;
  date: string;
  ageRange: string;
  phone: string;
  city: string;
  country: string;
  fitnessGoal: string;
  employment: string;
  confirmation: "yes" | "no";
  instagram?: string; // ✅ optional to match react-hook-form inference
};

const allowedKeys = [
  "name",
  "email",
  "date",
  "ageRange",
  "phone",
  "instagram",
  "city",
  "country",
  "fitnessGoal",
  "employment",
  "confirmation",
] as const;

type FormFieldNames = (typeof allowedKeys)[number];

export default function Hero() {
  const [stepIndex, setStepIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [, setIsLoading] = useState(true);
  const { register, handleSubmit, formState, setValue, watch } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    const stored = localStorage.getItem("formInfo");
    const storedData = stored ? JSON.parse(stored) : {};

    Object.keys(storedData).forEach((key) => {
      if (allowedKeys.includes(key as FormFieldNames)) {
        setValue(key as FormFieldNames, storedData[key]);
      }
    });
  }, [setValue]);

  useEffect(() => {
    const subscription = watch((data) => {
      localStorage.setItem("formInfo", JSON.stringify(data));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".custom-dropdown")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    // Simulate page loading delay (replace with your actual loading logic)
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const nextStep = () => setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  const prevStep = () => setStepIndex((i) => Math.max(i - 1, 0));

  const onSubmit = (data: FormData) => {
    console.log("Form Info:", data);
    localStorage.removeItem("formInfo");
    alert("Form submitted successfully!");
  };
  return (
    <div className="relative h-screen w-full overflow-hidden text-white font-sans">
      <div className="absolute top-0 left-5 flex items-center justify-start">
        <div>
          <img
            src="/logo.PNG"
            alt="This is the logo of the website"
            width={100}
            height={100}
          />
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={stepIndex}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100vh", opacity: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
          className="absolute top-0 left-0 flex h-screen w-full items-center justify-center"
        >
          <form
            className="max-w-[900px] w-full mx-auto p-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex items-center gap-2 mb-6">
              <p className="text-white text-sm">{steps[stepIndex].id}</p>
              <FaArrowRightLong className="text-white" />
              <h2 className="text-xl lg:text-2xl font-bold font-raleway">
                {steps[stepIndex].label}
              </h2>
            </div>

            {/* Input Type Handling */}
            {/* Dropdown (Select Type) */}
            {steps[stepIndex].type === "select" ? (
              <div className="relative custom-dropdown">
                <div
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="bg-white text-black p-3 rounded-md border border-gray-300 cursor-pointer flex justify-between items-center"
                >
                  <span>
                    {watch(steps[stepIndex].name as keyof FormData) ||
                      "Select..."}
                  </span>

                  <span>
                    {isDropdownOpen ? (
                      <MdOutlineKeyboardArrowUp />
                    ) : (
                      <MdOutlineKeyboardArrowDown />
                    )}
                  </span>
                </div>
                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-black rounded-md shadow-lg">
                    {steps[stepIndex].options?.map((option) => (
                      <div
                        key={option}
                        onClick={() => {
                          setValue(
                            steps[stepIndex].name as keyof FormData,
                            option
                          );
                          setIsDropdownOpen(false);
                          nextStep(); // Move to next step after selection
                        }}
                        className={`p-3 cursor-pointer hover:bg-gray-600 ${
                          watch(steps[stepIndex].name as keyof FormData) ===
                          option
                            ? "bg-transparent font-semibold"
                            : ""
                        }`}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : steps[stepIndex].type === "radio" ? (
              <div className="space-y-2">
                {steps[stepIndex].options?.map((option) => (
                  <label key={option} className="flex items-center gap-3">
                    <input
                      type="radio"
                      value={option}
                      {...register(steps[stepIndex].name as keyof FormData)}
                      className="accent-black"
                      onChange={() => nextStep()} // Move to next step on selection
                    />
                    <span className="capitalize">{option}</span>
                  </label>
                ))}
              </div>
            ) : (
              <input
                {...register(steps[stepIndex].name as keyof FormData)}
                type={steps[stepIndex].type}
                className="lg:text-2xl block w-full px-3 pt-3 pb-2 focus:outline-0 border-b border-gray-300 bg-transparent text-white"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // Prevent form submission
                    nextStep(); // Move to the next step
                  }
                }}
              />
            )}

            {/* Error message */}
            {formState.errors[steps[stepIndex].name as keyof FormData] && (
              <p className="text-red-400 mt-2">
                {
                  formState.errors[steps[stepIndex].name as keyof FormData]
                    ?.message
                }
              </p>
            )}

            {stepIndex === steps.length - 1 && (
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-md mt-4"
              >
                Submit
              </button>
            )}
          </form>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="absolute bottom-10 right-10 flex space-x-4">
        {stepIndex > 0 && (
          <div
            onClick={prevStep}
            className="p-3 bg-black rounded-md flex items-center justify-center cursor-pointer"
          >
            <MdOutlineKeyboardArrowUp className="text-2xl text-white" />
          </div>
        )}
        {stepIndex < steps.length - 1 && (
          <div
            onClick={nextStep}
            className="p-3 bg-black rounded-md flex items-center justify-center cursor-pointer"
          >
            <MdOutlineKeyboardArrowDown className="text-2xl text-white" />
          </div>
        )}
      </div>
    </div>
  );
}
