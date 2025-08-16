import TrueFocus from "@/TextAnimations/TrueFocus/TrueFocus";
import Magnet from "@/Animations/Magnet/Magnet";
import { Button } from "@/components/ui/button";
import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CodeSnipp from "@/components/codesnipp";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Info,
  Bot,
  Twitter,
  Github,
  Repeat,
  Plug,
  Brain,
  UserCog,
  Database,
  Wallet,
  Clock,
  Target,
  Smartphone,
  Bitcoin,
  Building,
  Users,
  Wrench,
  Sparkles,
  Rocket
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";
import { Input } from "@/components/ui/input";
import { motion, useInView } from "framer-motion";
import { useAnimation } from "@/hooks/useAnimation";

const features1 = [
  {
    icon: <Repeat className="w-6 h-6" />,
    titleKey: "Dynamic Inline Buttons",
    descriptionKey:
      "Design interactive experiences with inline buttons that perform specific actions directly within chats."
  },
  {
    icon: <Bot className="w-6 h-6" />,
    titleKey: "Automated Replies",
    descriptionKey:
      "Respond to user messages instantly using predefined patterns — no manual effort required."
  },
  {
    icon: <Plug className="w-6 h-6" />,
    titleKey: "External API & Webhook Support",
    descriptionKey:
      "Integrate third-party APIs and services to expand your bot's capabilities beyond Telegram."
  },
  {
    icon: <Brain className="w-6 h-6" />,
    titleKey: "AI-Powered Features",
    descriptionKey:
      "Use artificial intelligence to enable smarter conversations and contextual understanding."
  },
  {
    icon: <UserCog className="w-6 h-6" />,
    titleKey: "Advanced Admin Tools",
    descriptionKey:
      "Control access with role-based permissions and powerful command configurations for admins."
  },
  {
    icon: <Database className="w-6 h-6" />,
    titleKey: "Built-in Database Integration",
    descriptionKey:
      "Utilize MongoDB or Redis to store and manage persistent data across user sessions."
  },
  {
    icon: <Wallet className="w-6 h-6" />,
    titleKey: "Revenue & Payments",
    descriptionKey:
      "Add monetization through payments, subscriptions, or gated premium features."
  },
  {
    icon: <Clock className="w-6 h-6" />,
    titleKey: "Timed Actions",
    descriptionKey:
      "Automatically execute tasks or messages on a schedule — ideal for alerts and timed workflows."
  },
  {
    icon: <Target className="w-6 h-6" />,
    titleKey: "Audience Targeting",
    descriptionKey:
      "Segment users based on behavior or preferences and send personalized messages for higher engagement."
  }
];

const features2 = [
  {
    feature: "Unlimited Bots",
    description: "Create as many bots as you need with no restrictions",
    botu: "Yes",
    manybot: "Limited",
    flowxo: "Paid",
    priority: 1
  },
  {
    feature: "Free Hosting",
    description: "24/7 hosting included at no additional cost",
    botu: "Yes",
    manybot: "No",
    flowxo: "Paid",
    priority: 2
  },
  {
    feature: "AI Integration",
    description: "Built-in AI capabilities for smarter bots",
    botu: "Yes",
    manybot: "Limited",
    flowxo: "Paid",
    priority: 3
  },
  {
    feature: "Custom Scripts",
    description: "Full JavaScript support for custom functionality",
    botu: "Yes",
    manybot: "None",
    flowxo: "Limited",
    priority: 4
  },
  {
    feature: "Real-time Analytics",
    description: "Monitor bot performance with live analytics",
    botu: "Yes",
    manybot: "Basic",
    flowxo: "Paid",
    priority: 5
  },
  {
    feature: "Multi-language Support",
    description: "Create bots that understand multiple languages",
    botu: "Yes",
    manybot: "None",
    flowxo: "Paid",
    priority: 6
  },
  {
    feature: "API Access",
    description: "Full REST API for advanced integrations",
    botu: "Yes",
    manybot: "Limited",
    flowxo: "Paid",
    priority: 7
  },
  {
    feature: "Scheduled Tasks",
    description: "Automate tasks at specific times or intervals",
    botu: "Yes",
    manybot: "No",
    flowxo: "Limited",
    priority: 8
  }
];

const audience = [
  {
    icon: <Smartphone className="w-6 h-6" />,
    titleKey: "Content Creators",
    descriptionKey:
      "Engage your audience, share premium content, and connect with fans through automated, personalized experiences."
  },
  {
    icon: <Bitcoin className="w-6 h-6" />,
    titleKey: "Crypto Projects",
    descriptionKey:
      "Provide instant price updates, token stats, and automated answers to FAQs — keeping your crypto community informed 24/7."
  },
  {
    icon: <Building className="w-6 h-6" />,
    titleKey: "Businesses",
    descriptionKey:
      "Handle customer inquiries, generate leads, book appointments, and simplify daily tasks using intelligent bots."
  },
  {
    icon: <Users className="w-6 h-6" />,
    titleKey: "Communities",
    descriptionKey:
      "Boost group activity, manage events, automate moderation, and broadcast announcements seamlessly."
  }
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Add this new variant for when animations are disabled
const noAnimation = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 }
};

// Add this new container variant for when animations are disabled
const noAnimationContainer = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
};

const slideInFromBottom = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

export default function Landing() {
  const { language, isRTL } = useLanguage();
  const { animationsEnabled } = useAnimation();
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);
  const [sortConfig, setSortConfig] = useState({
    key: "priority",
    direction: "ascending"
  });

  // Create refs for animation triggers
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const section5Ref = useRef(null);
  const footerRef = useRef(null);

  // Check when sections are in view
  const section1InView = useInView(section1Ref, {
    once: false,
    margin: "-100px"
  });
  const section2InView = useInView(section2Ref, {
    once: false,
    margin: "-100px"
  });
  const section3InView = useInView(section3Ref, {
    once: false,
    margin: "-100px"
  });
  const section4InView = useInView(section4Ref, {
    once: false,
    margin: "-100px"
  });
  const section5InView = useInView(section5Ref, {
    once: false,
    margin: "-100px"
  });
  const footerInView = useInView(footerRef, { once: false, margin: "-100px" });

  // Use conditional variants based on animation preference
  const sectionVariants = animationsEnabled ? fadeInUp : noAnimation;
  const containerVariants = animationsEnabled ? staggerContainer : noAnimationContainer;

  const sortedFeatures = [...features2].sort((a, b) => {
    if (sortConfig.direction === "ascending") {
      return a[sortConfig.key as keyof typeof a] >
        b[sortConfig.key as keyof typeof b]
        ? 1
        : -1;
    } else {
      return a[sortConfig.key as keyof typeof a] <
        b[sortConfig.key as keyof typeof b]
        ? 1
        : -1;
    }
  });

  const toggleExpand = (index: number) => {
    setExpandedFeature(expandedFeature === index ? null : index);
  };

  const requestSort = (key: string) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnName: string) => {
    if (sortConfig.key !== columnName) return null;
    return sortConfig.direction === "ascending" ? (
      <ChevronUp className="w-3 h-3 ml-1 inline-block" />
    ) : (
      <ChevronDown className="w-3 h-3 ml-1 inline-block" />
    );
  };

  return (
    <div
      className="flex flex-col items-center justify-center mt-10 md:mt-20 bg-transparent px-4"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Section 1 - Hero */}
      <motion.div
        ref={section1Ref}
        className="Section-1 w-full max-w-6xl flex flex-col justify-center items-center bg-transparent"
        initial="hidden"
        animate={section1InView ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <Magnet padding={5000} disabled={!animationsEnabled} magnetStrength={50}>
          <h1 className="font-extralight text-base md:text-lg mb-5 md:mb-7 text-center [text-shadow:_0px_0px_20px_#000000]">
            {t("Telegram bot templates", language)}
          </h1>
        </Magnet>

        <div className="mt-10 md:mt-16 w-full">
          <div className="w-full max-w-full md:max-w-[600px] mx-auto leading-6">
            <TrueFocus
              sentence={t("Stop building from scratch", language)}
              manualMode={!animationsEnabled}
              blurAmount={5}
              borderColor="red"
              animationDuration={2}
              pauseBetweenAnimations={1}
            />
          </div>
        </div>

        <div className="mt-10 md:mt-16 w-full">
          <p className="font-extralight text-base md:text-xl text-center max-w-full md:max-w-[35rem] mx-auto">
            {t(
              "Create, launch, and control advanced Telegram bots completely",
              language
            )}
            <span className="font-semibold uppercase text-[#00a3a3] [text-shadow:_0px_0px_10px_#00a3a3]">
              {""} {t("free", language)}
            </span>
            , {t("no coding experience needed", language)}.
          </p>
        </div>

        <div className="flex flex-col md:flex-row mt-8 md:mt-12 mb-16 md:mb-28 gap-4 md:gap-5">
          <Button
            className="backdrop-blur-lg py-6 md:py-8 px-6 text-xl md:text-2xl font-light hover:-translate-y-1 transition-transform duration-300 ease-in-out rounded-xl"
            variant="default"
          >
            {t("Get Started", language)}
          </Button>
          <Button
            className="backdrop-blur-lg py-6 md:py-8 px-6 text-xl md:text-2xl font-light hover:-translate-y-1 transition-transform duration-300 ease-in-out rounded-xl"
            variant="outline"
          >
            {t("Pro Trial", language)}
          </Button>
        </div>
      </motion.div>

      <CodeSnipp />

      {/* Section 2 - Steps */}
      <motion.div
        ref={section2Ref}
        className="Section-2 mb-16 md:mb-20 text-center w-full max-w-6xl"
        initial="hidden"
        animate={section2InView ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <motion.h2
          className="text-2xl md:text-4xl font-bold drop-shadow-md mb-3 md:mb-4"
          variants={sectionVariants}
        >
          {t("Build Your Bot in Just a Few Easy Steps", language)}
        </motion.h2>
        <motion.p
          className="text-base md:text-lg font-extralight drop-shadow-sm max-w-full md:max-w-[50rem] mx-auto"
          variants={sectionVariants}
        >
          {t(
            "Our simplified process ensures a fast, user-friendly experience perfect for newcomers.",
            language
          )}
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-12 w-full max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={section2InView ? "visible" : "hidden"}
        >
          <motion.div variants={sectionVariants}>
            <Card className="h-full border-2 rounded-xl shadow-sm bg-transparent backdrop-blur-md transition-all duration-300 transform-gpu origin-center hover:scale-[1.03] hover:border-primary-foreground hover:shadow-md hover:z-10">
              <CardHeader className="items-center">
                <div className="bg-primary/10 text-primary rounded-lg w-14 h-14 flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-primary/20">
                  <Wrench className="w-8 h-8" />
                </div>
                <CardTitle>{t("Select Command Type", language)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t(
                    "Choose from a variety of command types like text, buttons, images, or custom actions.",
                    language
                  )}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={sectionVariants}>
            <Card className="h-full border-2 rounded-xl shadow-sm bg-transparent backdrop-blur-md transition-all duration-300 transform-gpu origin-center hover:scale-[1.03] hover:border-primary-foreground hover:shadow-md hover:z-10">
              <CardHeader className="items-center">
                <div className="bg-primary/10 text-primary rounded-lg w-14 h-14 flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-primary/20">
                  <Sparkles className="w-8 h-8" />
                </div>
                <CardTitle>
                  {t("Write Easy Code with Suggestions", language)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t(
                    "Use our interactive code editor with AI-powered suggestions to create bot logic effortlessly.",
                    language
                  )}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={sectionVariants}>
            <Card className="h-full border-2 rounded-xl shadow-sm bg-transparent backdrop-blur-md transition-all duration-300 transform-gpu origin-center hover:scale-[1.03] hover:border-primary-foreground hover:shadow-md hover:z-10">
              <CardHeader className="items-center">
                <div className="bg-primary/10 text-primary rounded-lg w-14 h-14 flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-primary/20">
                  <Rocket className="w-8 h-8" />
                </div>
                <CardTitle>{t("Deploy Instantly", language)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t(
                    "Go live with one click. Your bot is immediately available on Telegram for all your users.",
                    language
                  )}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Section 3 - Features */}
      <motion.div
        ref={section3Ref}
        className="Section-3 mb-12 py-12 md:mb-16 md:py-16 w-full max-w-6xl"
        initial="hidden"
        animate={section3InView ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <div className="w-full px-0 md:px-4 bg-transparent">
          <motion.div className="text-center mb-12" variants={sectionVariants}>
            <h1 className="text-2xl md:text-4xl font-bold mb-4">
              {t("Powerful Features With Easy Coding", language)}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-full md:max-w-2xl mx-auto">
              {t(
                "Everything you need to create sophisticated Telegram bots without writing a single line of code. All features are available on our free forever plan.",
                language
              )}
            </p>

            <div className="flex justify-center my-8">
              <div className="w-16 h-1 bg-primary rounded-full"></div>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={section3InView ? "visible" : "hidden"}
          >
            {features1.map((feature, index) => (
              <motion.div key={index} variants={sectionVariants}>
                <Card className="group h-full border-2 rounded-xl shadow-sm bg-transparent backdrop-blur-md transition-all duration-300 transform-gpu origin-center hover:scale-[1.03] hover:border-primary-foreground hover:shadow-md hover:z-10">
                  <CardHeader className="pb-3">
                    <div className="bg-primary/10 text-primary rounded-lg w-12 h-12 flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-primary/20">
                      <span className="text-2xl">{feature.icon}</span>
                    </div>
                    <CardTitle className="text-xl">
                      {t(feature.titleKey, language)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {t(feature.descriptionKey, language)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Section 4 - Comparison Table */}
      <motion.div
        ref={section4Ref}
        className="Section-4 py-8 md:py-12 w-full max-w-6xl"
        initial="hidden"
        animate={section4InView ? "visible" : "hidden"}
        variants={animationsEnabled ? slideInFromBottom : noAnimation}
      >
        <div className="w-full px-0 md:px-4">
          <motion.div className="text-center mb-8 md:mb-10" variants={sectionVariants}>
            <h2 className="text-xl md:text-2xl font-bold mb-3">
              Platform Comparison
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              See how BotU outperforms other Telegram bot platforms
            </p>
          </motion.div>

          {/* Desktop/Tablet View */}
          <motion.div
            className="hidden md:block overflow-x-auto text-xs md:text-sm"
            variants={animationsEnabled ? fadeIn : noAnimation}
          >
            <table className="min-w-full rounded-xl border border-border overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-transparent backdrop-blur-md border-b border-border">
                  <th
                    className="py-3 px-4 text-left font-semibold cursor-pointer w-[30%]"
                    onClick={() => requestSort("feature")}
                  >
                    <div className="flex items-center">
                      FEATURE {getSortIcon("feature")}
                    </div>
                  </th>
                  <th className="py-3 px-4 text-center font-semibold w-[15%]">
                    BOTU
                  </th>
                  <th
                    className="py-3 px-4 text-center font-semibold w-[15%] cursor-pointer"
                    onClick={() => requestSort("manybot")}
                  >
                    <div className="flex items-center justify-center">
                      MANYBOT {getSortIcon("manybot")}
                    </div>
                  </th>
                  <th
                    className="py-3 px-4 text-center font-semibold w-[15%] cursor-pointer"
                    onClick={() => requestSort("flowxo")}
                  >
                    <div className="flex items-center justify-center">
                      FLOWXO {getSortIcon("flowxo")}
                    </div>
                  </th>
                  <th className="py-3 px-4 text-center font-semibold w-[25%]">
                    DETAILS
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedFeatures.map((feat, index) => (
                  <React.Fragment key={index}>
                    <tr
                      className={`border-b border-border hover:bg-transparent backdrop-blur-md transition-colors ${
                        index % 2 === 0 ? "bg-transparent" : "bg-transparent"
                      }`}
                    >
                      <td className="py-2 px-4 font-medium">{feat.feature}</td>
                      <td className="py-2 px-4 text-center">
                        <div className="flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                          <span className="font-medium">{feat.botu}</span>
                        </div>
                      </td>
                      <td className="py-2 px-4 text-center">
                        <div className="flex items-center justify-center">
                          {feat.manybot !== "None" &&
                          feat.manybot !== "Limited" ? (
                            <span className="font-medium">{feat.manybot}</span>
                          ) : (
                            <span className="text-muted-foreground">
                              {feat.manybot}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-2 px-4 text-center">
                        <div className="flex items-center justify-center">
                          {feat.flowxo !== "None" &&
                          feat.flowxo !== "Limited" &&
                          !feat.flowxo.includes("Paid") ? (
                            <span className="font-medium">{feat.flowxo}</span>
                          ) : (
                            <span className="text-muted-foreground">
                              {feat.flowxo}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-2 px-4 text-center">
                        <button
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => toggleExpand(index)}
                        >
                          <Info className="w-4 h-4 mx-auto" />
                        </button>
                      </td>
                    </tr>
                    {expandedFeature === index && (
                      <tr className="bg-transparent backdrop-blur-md">
                        <td
                          colSpan={5}
                          className="py-3 px-4 border-t border-border"
                        >
                          <div className="text-xs text-muted-foreground">
                            {feat.description}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Mobile View - Compact Cards */}
          <motion.div
            className="md:hidden space-y-3"
            variants={containerVariants}
            initial="hidden"
            animate={section4InView ? "visible" : "hidden"}
          >
            {sortedFeatures.map((feat, index) => (
              <motion.div
                key={index}
                className="bg-transparent backdrop-blur-md rounded-xl border border-border p-3 shadow-sm"
                variants={sectionVariants}
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleExpand(index)}
                >
                  <h3 className="font-semibold text-sm">{feat.feature}</h3>
                  <button className="text-muted-foreground">
                    {expandedFeature === index ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {expandedFeature === index && (
                  <div className="mt-2 text-xs text-muted-foreground">
                    {feat.description}
                  </div>
                )}

                <div className="grid grid-cols-3 gap-2 mt-3">
                  <div className="text-center">
                    <div className="text-[10px] text-muted-foreground mb-1">
                      BOTU
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                      <span className="text-xs font-medium">{feat.botu}</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-[10px] text-muted-foreground mb-1">
                      MANYBOT
                    </div>
                    <div>
                      {feat.manybot !== "None" && feat.manybot !== "Limited" ? (
                        <span className="text-xs font-medium">
                          {feat.manybot}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          {feat.manybot}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-[10px] text-muted-foreground mb-1">
                      FLOWXO
                    </div>
                    <div>
                      {feat.flowxo !== "None" &&
                      feat.flowxo !== "Limited" &&
                      !feat.flowxo.includes("Paid") ? (
                        <span className="text-xs font-medium">
                          {feat.flowxo}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          {feat.flowxo}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Summary Section */}
          <motion.div
            className="mt-6 p-4 border border-border rounded-xl bg-transparent backdrop-blur-md grid grid-cols-3 gap-4 text-center text-xs md:text-sm"
            variants={sectionVariants}
          >
            <div>
              <div className="font-bold mb-1">100%</div>
              <div className="text-muted-foreground">Feature Coverage</div>
            </div>
            <div>
              <div className="font-bold mb-1">24/7</div>
              <div className="text-muted-foreground">Support</div>
            </div>
            <div>
              <div className="font-bold mb-1">$0</div>
              <div className="text-muted-foreground">Free Tier Cost</div>
            </div>
          </motion.div>

          <motion.div
            className="mt-4 text-center text-xs text-muted-foreground"
            variants={sectionVariants}
          >
            All premium features available in our free plan with no restrictions
          </motion.div>
        </div>
      </motion.div>

      {/* Section 5 - Audience */}
      <motion.div
        ref={section5Ref}
        className="Section-5 py-12 md:py-16 w-full max-w-6xl"
        initial="hidden"
        animate={section5InView ? "visible" : "hidden"}
        variants={animationsEnabled ? slideInFromBottom : noAnimation}
      >
        <div className="w-full px-0 md:px-4 bg-transparent">
          <motion.div
            className="text-center mb-10 md:mb-12"
            variants={sectionVariants}
          >
            <h1 className="text-2xl md:text-4xl font-bold mb-4">
              {t("Who is BotU for?", language)}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-full md:max-w-2xl mx-auto">
              {t(
                "BotU is built to empower creators, communities, and businesses of all sizes — no coding needed.",
                language
              )}
            </p>

            <div className="flex justify-center my-8">
              <div className="w-16 h-1 bg-primary rounded-full"></div>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16"
            variants={containerVariants}
            initial="hidden"
            animate={section5InView ? "visible" : "hidden"}
          >
            {audience.map((item, index) => (
              <motion.div key={index} variants={sectionVariants}>
                <Card className="border-2 h-[18rem] rounded-lg shadow-sm bg-transparent backdrop-blur-md transition-all duration-300 transform-gpu hover:scale-[1.03] hover:border-primary-foreground hover:shadow-sm">
                  <CardHeader className="pb-3">
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <CardTitle className="text-xl">
                      {t(item.titleKey, language)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {t(item.descriptionKey, language)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center max-w-full md:max-w-2xl mx-auto"
            variants={sectionVariants}
          >
            <p className="text-base md:text-lg mb-6">
              {t(
                "Whether you're a solo creator or part of a large team, BotU gives you everything you need to launch smart Telegram bots without touching a single line of code.",
                language
              )}
            </p>
            <button className="inline-flex items-center text-primary font-medium group">
              {t("Explore Use Cases", language)}
              <ArrowRight
                className={`ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 ${
                  isRTL ? "rotate-180" : ""
                }`}
              />
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer Section */}
      <motion.div
        ref={footerRef}
        className="w-full max-w-6xl mt-20 mb-10 px-4"
        initial="hidden"
        animate={footerInView ? "visible" : "hidden"}
        variants={animationsEnabled ? fadeIn : noAnimation}
      >
        <div className="border-t border-border/50 pt-10">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={footerInView ? "visible" : "hidden"}
          >
            {/* Brand Column */}
            <motion.div className="flex flex-col gap-4" variants={sectionVariants}>
              <div className="flex items-center gap-2">
                <Bot className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold tracking-tight">BotU</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">
                Build smarter Telegram bots without code. Free forever plan with
                all premium features.
              </p>
              <div className="flex gap-3 mt-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full backdrop-blur"
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full backdrop-blur"
                >
                  <Github className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>

            {/* Features Column */}
            <motion.div variants={sectionVariants}>
              <h3 className="text-sm font-semibold mb-4 tracking-wider uppercase">
                Features
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    AI Chatbots
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Payment Integration
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Database Storage
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Scheduled Tasks
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Resources Column */}
            <motion.div variants={sectionVariants}>
              <h3 className="text-sm font-semibold mb-4 tracking-wider uppercase">
                Resources
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    API Reference
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Tutorials
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Community
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Newsletter Column */}
            <motion.div className="" variants={sectionVariants}>
              <h3 className="text-sm font-semibold mb-4 tracking-wider uppercase">
                Stay Updated
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Join our newsletter for product updates and bot-building tips.
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-transparent backdrop-blur rounded-xl border border-border/50"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl backdrop-blur mt-1"
                >
                  Subscribe
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom Bar */}
          <motion.div
            className="mt-12 pt-6 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4"
            variants={sectionVariants}
          >
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} BotU. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Cookies
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
