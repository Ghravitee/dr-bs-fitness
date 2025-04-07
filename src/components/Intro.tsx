import { useState } from "react";
import { motion } from "framer-motion";

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
  const [showStory, setShowStory] = useState(true);
  const [showCerts, setShowCerts] = useState(true);
  const [showOffer, setShowOffer] = useState(true);

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
          Welcome to <span className="text-Primary">BS Coaching</span>
        </motion.h1>

        {/* Intro Paragraph */}
        <motion.p
          variants={fadeInUp}
          className="text-lg sm:text-xl text-white max-w-4xl mx-auto"
        >
          Welcome everyone to my only official website. Here you will start your
          journey to shape your body and to be the best version of yourself.
          Training is not just a “ thing “ you have to do to change your body…
          it’s also a lifestyle, mindset , discipline and hard work to reach
          success. I want you to lock in and focus on your goals because nothing
          is hard on us.
        </motion.p>

        {/* My Story */}
        <motion.div variants={fadeInUp} className="space-y-6 text-left">
          <h2
            onClick={() => setShowStory(!showStory)}
            className="text-2xl lg:text-3xl font-semibold text-Primary rubik cursor-pointer"
          >
            My Story {showStory ? "−" : "+"}
          </h2>
          {showStory && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.p variants={fadeInUp} className="text-base sm:text-xl">
                My name is Yassine ( Yacin ) Ben Salem. I’m 20yo ambitious man
                that went through hard times in early age and a great experience
                that made me achieve a lot already in that early age. I started
                hitting gym 2020 because my family told me that I look fat and
                unhealthy. I started some random cardio exercises for months
                then I started a mixture between body weight workout and
                bodybuilding. I made a great progress burning almost all the fat
                and started the shape phase moving to fully calisthenics
                training the next year. And after another half year the
                transformation was really clear and everyone noticed the change,
                even me I was surprised and proud looking at what I achieved
                whenever I look at my reflection on the mirror. It wasn’t easy
                but after that hard work and all the productivity I made what I
                wanted to do that time… the way I was focusing on that I
                couldn’t even notice the change in body only months after
                months.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-base sm:text-xl">
                The next years I kept training both calisthenics and
                bodybuilding with a great mixture between the basic exercises of
                each sports and that time I started to realize that both are
                giving such beautiful details in the body shape , and getting
                used to your body weight gives such a great power to lift
                heavier weights. So I kept as well learning and training till my
                bachelor where I was obliged to quit gym for more than half year
                wich was the hardest part in my whole life. I won’t mention any
                private details but all what I can tell is the way I’ve been
                away from training was really feeling wrong and hard till I got
                back to my place. Being a coach and a personal trainer was a
                dream and I started to achieve it once the bachelor year has
                ended and I didn’t pass it. Everyone in this life is good at a “
                thing “ and studying wasn’t my thing… that feeling got stronger
                by time while training people and working at gym and all what I
                want to say now is “ alhamdulellah “ to keep following the right
                path.
              </motion.p>
            </div>
          )}
        </motion.div>

        {/* Certifications */}
        <motion.div variants={fadeInUp} className="space-y-4 text-left">
          <h2
            onClick={() => setShowCerts(!showCerts)}
            className="text-2xl lg:text-3xl font-semibold text-Primary rubik cursor-pointer"
          >
            Certifications and Diplomas {showCerts ? "−" : "+"}
          </h2>
          {showCerts && (
            <ul className="text-base sm:text-lg text-gray-300 list-disc list-inside space-y-1">
              <motion.li variants={fadeInUp}>
                IFBB advanced personal trainer.
              </motion.li>
              <motion.li variants={fadeInUp}>
                International advanced personal trainer of small group by the
                local gym federation.
              </motion.li>
              <motion.li variants={fadeInUp}>
                4 certificates of a private academy: floor coach, sports
                nutrition, personal trainer, food supplements…
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
            What I Offer {showOffer ? "−" : "+"}
          </h2>
          {showOffer && (
            <ul className="text-base sm:text-lg text-white list-disc list-inside space-y-1">
              <motion.li variants={fadeInUp}>
                Calisthenics basics & skills
              </motion.li>
              <motion.li variants={fadeInUp}>Cardio fat burning</motion.li>
              <motion.li variants={fadeInUp}>Bulking with cali & bb</motion.li>
              <motion.li variants={fadeInUp}>Cutting cali & bb</motion.li>
              <motion.li variants={fadeInUp}>
                Gaining & losing weight full diets
              </motion.li>
              <motion.li variants={fadeInUp}>Private tips & advice</motion.li>
            </ul>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Intro;
