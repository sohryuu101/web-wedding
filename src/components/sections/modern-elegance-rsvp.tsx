"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

interface RSVPFormData {
  name: string;
  attendance: "yes" | "no";
  guestCount: number;
}

interface ModernEleganceRSVPProps {
  onRSVP?: (data: RSVPFormData) => Promise<void>;
  weddingDate?: string;
}

export function ModernEleganceRSVP({ 
  onRSVP,
  weddingDate
}: ModernEleganceRSVPProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [attendance, setAttendance] = useState<"yes" | "no" | null>(null);
  const [guestCount, setGuestCount] = useState(2);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAttendanceChange = (value: "yes" | "no") => {
    setAttendance(value);
  };

  const incrementGuests = () => {
    setGuestCount(prev => Math.min(10, prev + 1));
  };

  const decrementGuests = () => {
    setGuestCount(prev => Math.max(1, prev - 1));
  };

  const handleConfirm = async () => {
    if (!attendance) return;
    
    setIsSubmitting(true);
    try {
      await onRSVP?.({
        name: "Guest", // This would typically come from a form field
        attendance,
        guestCount: attendance === "yes" ? guestCount : 0
      });
    } catch (error) {
      console.error("RSVP submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Font Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes:wght@400&family=Cardo:wght@400;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+MT:wght@400&display=swap');
      `}</style>

      <section
        ref={ref}
        className="w-full bg-[#F3DBB9] relative overflow-hidden flex flex-col items-center justify-center p-8"
      >
        <div className="relative w-full max-w-[365px] h-[757px]">
          {/* Decorative Image */}
          <motion.img
            initial={{ opacity: 0, y: -30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            src="https://api.builder.io/api/v1/image/assets/TEMP/e29abaa5ab6710bd6d48001211d486c97f67e01a?width=502"
            alt="Decorative flourish"
            className="decorative-image w-[251px] h-[141px] flex-shrink-0 absolute left-[58px] top-0 object-contain"
            style={{ aspectRatio: '162/91' }}
          />

          {/* RSVP Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rsvp-title flex w-full h-[81px] flex-col justify-center flex-shrink-0 absolute left-0 top-[130px] text-center"
          >
            <div
              className="text-[#3E513C] text-[36px] tracking-[19.8px] font-normal sm:text-[28px] sm:tracking-[10px]"
              style={{
                fontFamily: "'Bodoni MT', serif"
              }}
            >
              RSVP
            </div>
          </motion.div>

          {/* Date Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="date-container w-[308px] h-[118px] flex-shrink-0 absolute left-[29px] top-[311px] lg:absolute lg:left-[29px] lg:top-[311px] md:relative md:left-auto md:top-auto md:mx-auto md:my-5 md:w-[90%]"
          >
            <div className="confirmation-text flex w-full h-[68px] flex-col justify-center flex-shrink-0 text-black text-center text-[20px] tracking-[3.2px] font-normal absolute left-0 top-0 sm:text-[16px] sm:tracking-[2px]"
              style={{
                fontFamily: "'Cardo', serif"
              }}
            >
              Please confirm your attendance before.
            </div>

            <div className="date-text flex w-full h-[68px] flex-col justify-center flex-shrink-0 text-black text-center text-[20px] tracking-[3.2px] font-bold absolute left-0 top-[50px] sm:text-[16px] sm:tracking-[2px]"
              style={{ fontFamily: "'Cardo', serif" }}
            >
              <div className="flex items-baseline justify-center">
                {weddingDate ? (() => {
                  const date = new Date(weddingDate);
                  const month = date.toLocaleString('en-US', { month: 'short' });
                  const day = date.getDate();
                  const year = date.getFullYear();
                  // Get ordinal suffix
                  const getOrdinal = (n: number) => {
                    if (n > 3 && n < 21) return 'th';
                    switch (n % 10) {
                      case 1: return 'st';
                      case 2: return 'nd';
                      case 3: return 'rd';
                      default: return 'th';
                    }
                  };
                  return (
                    <>
                      <span>{month} {day}</span>
                      <span className="text-[11px] tracking-[1.76px] font-bold relative -top-1 ml-0.5"
                        style={{ fontFamily: "'Cardo', serif" }}
                      >
                        {getOrdinal(day)}
                      </span>
                      <span>, {year}</span>
                    </>
                  );
                })() : (
                  <>
                    <span>Oct 13</span>
                    <span className="text-[11px] tracking-[1.76px] font-bold relative -top-1 ml-0.5"
                      style={{ fontFamily: "'Cardo', serif" }}
                    >
                      rd
                    </span>
                    <span>, 2025</span>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Attendance Question */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="attendance-question flex w-[312px] h-[47px] flex-col justify-center flex-shrink-0 text-black text-center text-[11px] tracking-[0.33px] font-normal absolute left-[27px] top-[448px]"
            style={{
              fontFamily: "'Cardo', serif",
            }}
          >
            Will you attend our wedding?
          </motion.div>

          {/* Attendance Buttons */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            onClick={() => handleAttendanceChange("yes")}
            className={`attendance-button w-[219px] h-[23px] flex-shrink-0 rounded-lg absolute left-[74px] top-[499px] cursor-pointer transition-all duration-200 ${
              attendance === "yes"
                ? "bg-[#3E513C] shadow-md"
                : "bg-[#B4B49F] hover:bg-[#A5A590]"
              }`}
          >
            <div className={`flex w-[118px] h-[17px] flex-col justify-center flex-shrink-0 text-center text-[11px] tracking-[0.33px] font-normal absolute left-[50px] top-[3px] ${
              attendance === "yes" ? "text-white" : "text-black"
              }`}
              style={{ fontFamily: "'Cardo', serif" }}
            >
              Will Attend
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
            onClick={() => handleAttendanceChange("no")}
            className={`attendance-button w-[219px] h-[23px] flex-shrink-0 rounded-lg absolute left-[74px] top-[529px] cursor-pointer transition-all duration-200 ${
              attendance === "no"
                ? "bg-[#3E513C] shadow-md"
                : "bg-[#B4B49F] hover:bg-[#A5A590]"
              }`}
          >
            <div className={`flex w-[118px] h-[17px] flex-col justify-center flex-shrink-0 text-center text-[11px] tracking-[0.33px] font-normal absolute left-[50px] top-[3px] ${
              attendance === "no" ? "text-white" : "text-black"
              }`}
              style={{ fontFamily: "'Cardo', serif" }}
            >
              Unable To Attend
            </div>
          </motion.button>

          {/* Guest Count Section - Only show if attending */}
          {attendance === "yes" && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="guest-count-question flex w-[312px] h-[47px] flex-col justify-center flex-shrink-0 text-black text-center text-[11px] tracking-[0.33px] font-normal absolute left-[27px] top-[577px]"
                style={{
                  fontFamily: "'Cardo', serif"
                }}
              >
                People you bring including you?
              </motion.div>

              {/* Decrement Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                onClick={decrementGuests}
                className="decrement-button w-[23px] h-[23px] flex-shrink-0 rounded-[5px] bg-[#B4B49F] hover:bg-[#A5A590] absolute left-[47px] top-[628px] cursor-pointer transition-all duration-200"
              >
                <div className="flex w-[14px] h-[13px] flex-col justify-center flex-shrink-0 text-black text-center text-[11px] tracking-[0.33px] font-normal absolute left-[5px] top-[5px]"
                  style={{ fontFamily: "'Cardo', serif" }}
                >
                  -
                </div>
              </motion.button>

              {/* Guest Count Display */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="guest-count-display w-[219px] h-[23px] flex-shrink-0 absolute left-[74px] top-[628px]"
              >
                <div className="w-full h-full flex-shrink-0 rounded-lg bg-[#B4B49F] absolute left-0 top-0" />
                <div className="flex w-[118px] h-[17px] flex-col justify-center flex-shrink-0 text-black text-center text-[11px] tracking-[0.33px] font-normal absolute left-[51px] top-[3px]"
                  style={{ fontFamily: "'Cardo', serif" }}
                >
                  {guestCount}
                </div>
              </motion.div>

              {/* Increment Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                onClick={incrementGuests}
                className="increment-button w-[23px] h-[23px] flex-shrink-0 rounded-[5px] bg-[#B4B49F] hover:bg-[#A5A590] absolute left-[297px] top-[628px] cursor-pointer transition-all duration-200"
              >
                <div className="flex w-[14px] h-[13px] flex-col justify-center flex-shrink-0 text-black text-center text-[11px] tracking-[0.33px] font-normal absolute left-[5px] top-[5px]"
                  style={{ fontFamily: "'Cardo', serif" }}
                >
                  +
                </div>
              </motion.button>
            </>
          )}

          {/* Confirm Button */}
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            onClick={handleConfirm}
            disabled={!attendance || isSubmitting}
            className={`confirm-button w-[219px] h-[23px] flex-shrink-0 absolute left-[74px] top-[694px] cursor-pointer transition-all duration-200 mb-8 rounded-[8px] ${
              !attendance || isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#3E513C] hover:bg-[#2A3B28] shadow-md"
              }`}
          >
            <div className="w-full h-full flex-shrink-0 rounded-lg absolute left-0 top-0" />
            <div className="flex w-[118px] h-[17px] flex-col justify-center flex-shrink-0 text-white text-center text-[11px] tracking-[0.33px] font-normal absolute left-[51px] top-[3px]"
              style={{ fontFamily: "'Cardo', serif" }}
            >
              {isSubmitting ? "Sending..." : "Confirm"}
            </div>
          </motion.button>
        </div>
      </section>
    </>
  );
}

export default ModernEleganceRSVP;
