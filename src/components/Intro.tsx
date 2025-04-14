import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const Intro = () => {
  const [showStory, setShowStory] = useState(false);
  const [showCerts, setShowCerts] = useState(false);
  const [showOffer, setShowOffer] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen text-white flex flex-col justify-between p-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-[1100px] mx-auto mt-10 space-y-10 text-center"
      >
        {/* Title */}
        <motion.h1
          variants={fadeInUp}
          className="text-4xl sm:text-5xl font-bold leading-tight font-raleway"
        >
          {t("mainWelcome")} <span className="text-Primary">BS Coaching</span>
        </motion.h1>

        {/* Intro Paragraph */}
        <motion.p
          variants={fadeInUp}
          className="text-lg sm:text-xl md:text-2xl text-white max-w-4xl mx-auto"
        >
          {t("welcomeMessage")}
        </motion.p>

        {/* My Story */}
        <motion.div variants={fadeInUp} className="space-y-6 text-left">
          <h2
            onClick={() => setShowStory(!showStory)}
            className="text-2xl lg:text-3xl font-semibold text-Primary rubik cursor-pointer"
          >
            {t("myStory")} {showStory ? "−" : "+"}
          </h2>
          {showStory && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.p variants={fadeInUp} className="text-base sm:text-xl">
                {t("story1")}
              </motion.p>
              <motion.p variants={fadeInUp} className="text-base sm:text-xl">
                {t("story2")}
              </motion.p>
            </div>
          )}
        </motion.div>

        {/* Certifications */}
        {/* Certifications */}
        <motion.div variants={fadeInUp} className="space-y-4 text-left">
          <h2
            onClick={() => setShowCerts(!showCerts)}
            className="text-2xl lg:text-3xl font-semibold text-Primary rubik cursor-pointer"
          >
            {t("certifications")} {showCerts ? "−" : "+"}
          </h2>
          {showCerts && (
            <ul className="text-base sm:text-lg text-gray-300 list-disc list-inside space-y-4">
              <motion.li variants={fadeInUp}>
                IFBB advanced personal trainer.
                <br />
                <a
                  href="/certificates/Ifbb.pdf"
                  download
                  className="inline-block mt-1 text-sm text-Primary underline hover:text-white transition"
                >
                  {t("downloadCertificate")}
                </a>
              </motion.li>
              <motion.li variants={fadeInUp}>
                International advanced personal trainer of small group by the
                local gym federation.
                <br />
                <a
                  href="/certificates/Local_Federation.pdf"
                  download
                  className="inline-block mt-1 text-sm text-Primary underline hover:text-white transition"
                >
                  {t("downloadCertificate")}
                </a>
              </motion.li>
              <motion.li variants={fadeInUp}>
                4 certificates of a private academy: floor coach, sports
                nutrition, personal trainer, food supplements…
                <br />
                <a
                  href="/certificates/PrivateAcademy.pdf"
                  download
                  className="inline-block mt-1 text-sm text-Primary underline hover:text-white transition"
                >
                  {t("downloadCertificate")}
                </a>
              </motion.li>
            </ul>
          )}
        </motion.div>

        {/* What I Offer */}
        <motion.div variants={fadeInUp} className="space-y-4 text-left">
          <h2
            onClick={() => setShowOffer(!showOffer)}
            className="text-2xl lg:text-3xl font-semibold text-Primary rubik cursor-pointer"
          >
            {t("what_i_offer")} {showOffer ? "−" : "+"}
          </h2>
          {showOffer && (
            <ul className="text-base sm:text-lg text-white list-disc list-inside space-y-1">
              <motion.li variants={fadeInUp}>
                {t("offers.calisthenics")}
              </motion.li>
              <motion.li variants={fadeInUp}>{t("offers.cardio")}</motion.li>
              <motion.li variants={fadeInUp}>{t("offers.bulking")}</motion.li>
              <motion.li variants={fadeInUp}>{t("offers.cutting")}</motion.li>
              <motion.li variants={fadeInUp}>{t("offers.weights")}</motion.li>
              <motion.li variants={fadeInUp}>{t("offers.tips")}</motion.li>
            </ul>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Intro;
