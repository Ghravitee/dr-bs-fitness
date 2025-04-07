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
import emailjs from "@emailjs/browser";

// Form Validation Schema
const formSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  date: z
    .string()
    .min(1, "Date is required")
    .refine(
      (value) => {
        const today = new Date();
        const selectedDate = new Date(value);
        today.setHours(0, 0, 0, 0); // remove time part
        return selectedDate >= today;
      },
      { message: "Please select a future date" }
    ),
  ageRange: z.string().min(1, "Select an age range"),
  phone: z.string().min(10, "Enter a valid phone number"),
  instagram: z.string().optional(),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),
  fitnessGoal: z.string().min(5, "Enter a fitness goal"),
  employment: z.string().min(2, "Enter your employment status"),
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

  instagram?: string; // ✅ optional to match react-hook-form inference
};

type FormFieldNames = keyof FormData;

export default function Hero() {
  const [stepIndex, setStepIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { register, handleSubmit, formState, trigger, setValue, watch } =
    useForm<FormData>({
      resolver: zodResolver(formSchema),
      mode: "onBlur",
    });

  const validateStep = async () => {
    const fieldName = steps[stepIndex].name as FormFieldNames;
    const isValid = await trigger(fieldName);
    return isValid;
  };

  useEffect(() => {
    const stored = localStorage.getItem("formInfo");
    const storedData = stored ? JSON.parse(stored) : {};

    Object.keys(storedData).forEach((key) => {
      if (key in formSchema.shape) {
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

  const nextStep = async () => {
    const field = steps[stepIndex].name as FormFieldNames;
    const isValid = await trigger(field);
    if (isValid) setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  };
  const prevStep = () => setStepIndex((i) => Math.max(i - 1, 0));

  // — Unified send handler —
  const handleSend = async (data: FormData, channel: "whatsapp" | "email") => {
    if (channel === "whatsapp") {
      const message = `
      *Fitness Coaching Form Submission*
      
      *Name:* ${data.name}
      *Email:* ${data.email}
      *Preferred Date:* ${data.date}
      *Age Range:* ${data.ageRange}
      *Phone:* ${data.phone}
      *Instagram:* ${data.instagram || "N/A"}
      *City:* ${data.city}
      *Country:* ${data.country}
      *Fitness Goal:* ${data.fitnessGoal}
      *Employment Status:* ${data.employment}
    `;

      // Encode the message for WhatsApp
      const encodedMessage = encodeURIComponent(message);

      // WhatsApp number (replace with the actual number)
      const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER;

      // Construct the WhatsApp API link
      const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

      alert("Form submitted successfully!");

      setTimeout(() => {
        // localStorage.removeItem("formInfo");
        // reset();
        window.location.href = whatsappLink;
      }, 500);
    } else {
      const message = `
      Name: ${data.name}
      Email: ${data.email}
      Preferred Date: ${data.date}
      Age Range: ${data.ageRange}
      Phone: ${data.phone}
      Instagram: ${data.instagram || "N/A"}
      City: ${data.city}
      Country: ${data.country}
      Fitness Goal: ${data.fitnessGoal}
      Employment Status: ${data.employment}
`;

      type EmailJSParams = {
        user_name: string;
        user_email: string;
        from_name: string;
        to_email: string;
        subject?: string;
        message: string;
      };

      const params: EmailJSParams = {
        user_name: data.name,
        user_email: data.email,
        from_name: "Yassine ( Yacin ) Ben Salem",
        to_email: import.meta.env.VITE_RECEIVER_EMAIL,
        subject: "New Fitness Coaching Inquiry",
        message,
      };

      try {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          params,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
        alert("Form emailed successfully!");
      } catch (err) {
        console.error("EmailJS error:", err);
        alert("Failed to send email. Please try again.");
      }
    }
  };
  return (
    <div className="relative h-screen w-full overflow-hidden text-white font-sans">
      <AnimatePresence mode="wait">
        <motion.div
          key={stepIndex}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100vh", opacity: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
          className="absolute top-0 left-0 flex h-screen w-full items-center justify-center"
        >
          <form className="max-w-[900px] w-full mx-auto p-8">
            <div className="flex items-center gap-2 mb-6">
              <p className="text-white text-sm">{steps[stepIndex].id}</p>
              <FaArrowRightLong className="text-white" />
              <h2 className="text-xl lg:text-2xl font-bold font-raleway">
                {steps[stepIndex].label}
              </h2>
            </div>

            {/* Input Type Handling */}
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
                        onClick={async () => {
                          setValue(
                            steps[stepIndex].name as keyof FormData,
                            option
                          );
                          const isValid = await validateStep();
                          if (isValid) {
                            setIsDropdownOpen(false);
                            nextStep();
                          }
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
                      onChange={async () => {
                        const isValid = await validateStep();
                        if (isValid) nextStep();
                      }}
                    />
                    <span className="capitalize">{option}</span>
                  </label>
                ))}
              </div>
            ) : (
              <input
                {...register(steps[stepIndex].name as keyof FormData)}
                type={steps[stepIndex].type}
                name={steps[stepIndex].name}
                className="lg:text-2xl block w-full px-3 pt-3 pb-2 focus:outline-0 border-b border-gray-300 bg-transparent text-white"
                min={
                  steps[stepIndex].type === "date"
                    ? new Date().toISOString().split("T")[0]
                    : undefined
                }
                onKeyDown={async (e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const isValid = await validateStep();
                    if (isValid) nextStep();
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
              <div className="mt-6 flex gap-4">
                <button
                  type="button"
                  onClick={handleSubmit((d) => handleSend(d, "whatsapp"))}
                  className="px-6 py-2 bg-green-600 rounded-md"
                >
                  WhatsApp
                </button>
                <button
                  type="button"
                  onClick={handleSubmit((d) => handleSend(d, "email"))}
                  className="px-6 py-2 bg-blue-600 rounded-md"
                >
                  Email
                </button>
              </div>
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
            onClick={async () => {
              const isValid = await validateStep();
              if (isValid) nextStep();
            }}
            className="p-3 bg-black rounded-md flex items-center justify-center cursor-pointer"
          >
            <MdOutlineKeyboardArrowDown className="text-2xl text-white" />
          </div>
        )}
      </div>
    </div>
  );
}
