import TrueFocus from "@/TextAnimations/TrueFocus/TrueFocus";
import Magnet from "@/Animations/Magnet/Magnet";
// import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CodeSnipp from "@/components/codesnipp";
import { ArrowRight, ChevronDown, ChevronUp, Info } from "lucide-react";

const features1 = [
  {
    icon: "🔄",
    title: "Dynamic Inline Buttons",
    description:
      "Design interactive experiences with inline buttons that perform specific actions directly within chats."
  },
  {
    icon: "🤖",
    title: "Automated Replies",
    description:
      "Respond to user messages instantly using predefined patterns — no manual effort required."
  },
  {
    icon: "🔌",
    title: "External API & Webhook Support",
    description:
      "Integrate third-party APIs and services to expand your bot’s capabilities beyond Telegram."
  },
  {
    icon: "🧠",
    title: "AI-Powered Features",
    description:
      "Use artificial intelligence to enable smarter conversations and contextual understanding."
  },
  {
    icon: "👨‍💼",
    title: "Advanced Admin Tools",
    description:
      "Control access with role-based permissions and powerful command configurations for admins."
  },
  {
    icon: "💾",
    title: "Built-in Database Integration",
    description:
      "Utilize MongoDB or Redis to store and manage persistent data across user sessions."
  },
  {
    icon: "💰",
    title: "Revenue & Payments",
    description:
      "Add monetization through payments, subscriptions, or gated premium features."
  },
  {
    icon: "⏰",
    title: "Timed Actions",
    description:
      "Automatically execute tasks or messages on a schedule — ideal for alerts and timed workflows."
  },
  {
    icon: "🎯",
    title: "Audience Targeting",
    description:
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
    icon: "📱",
    title: "Content Creators",
    description:
      "Engage your audience, share premium content, and connect with fans through automated, personalized experiences."
  },
  {
    icon: "₿",
    title: "Crypto Projects",
    description:
      "Provide instant price updates, token stats, and automated answers to FAQs — keeping your crypto community informed 24/7."
  },
  {
    icon: "🏢",
    title: "Businesses",
    description:
      "Handle customer inquiries, generate leads, book appointments, and simplify daily tasks using intelligent bots."
  },
  {
    icon: "👥",
    title: "Communities",
    description:
      "Boost group activity, manage events, automate moderation, and broadcast announcements seamlessly."
  }
];

export default function Landing() {
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);
  const [sortConfig, setSortConfig] = useState({
    key: "priority",
    direction: "ascending"
  });

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
    <div className="flex flex-col items-center justify-center mt-20 select-none bg-transparent">
      <div className="Section-1 flex flex-col justify-center items-center bg-transparent">
        <Magnet padding={5000} disabled={false} magnetStrength={50}>
          <h1 className="font-extralight text-lg mb-7 text-center [text-shadow:_0px_0px_20px_#000000]">
            Telegram bot templates
          </h1>
        </Magnet>

        <div className="mt-16">
          <div className="w-[600px] leading-6">
            <TrueFocus
              sentence="Stop building from scratch"
              manualMode={false}
              blurAmount={5}
              borderColor="red"
              animationDuration={2}
              pauseBetweenAnimations={1}
            />
          </div>
        </div>

        <div className="mt-16">
          <p className="font-extralight text-xl text-center w-[35rem]">
            Create, launch, and control advanced Telegram bots completely
            <span className="font-semibold uppercase text-[#00a3a3] [text-shadow:_0px_0px_10px_#00a3a3] ">
              {""} free
            </span>
            , no coding experience needed.
          </p>
        </div>

        <div className="flex flex-col md:flex-row mt-12 mb-28 gap-5">
          <Button
            className="p-8 rounded-2xl text-2xl font-light hover:-translate-y-1 transition-transform duration-300 ease-in-out"
            variant="default"
          >
            Get Started
          </Button>
          <Button
            className="p-8 rounded-2xl text-2xl font-light hover:-translate-y-1 transition-transform duration-300 ease-in-out"
            variant="outline"
          >
            Pro Trial
          </Button>
        </div>
      </div>

      <CodeSnipp />

      <div className="Section-2 mb-20 text-center bg-transparent">
        <h2 className="text-4xl font-bold drop-shadow-md mb-4">
          Build Your Bot in Just a Few Easy Steps
        </h2>
        <p className="text-lg font-extralight drop-shadow-sm max-w-[50rem] mx-auto">
          Our simplified process ensures a fast, user-friendly experience
          perfect for newcomers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 px-4 max-w-5xl mx-auto">
          <Card className="h-full border-2 rounded-xl shadow-sm bg-transparent backdrop-blur-md transition-all duration-300 transform-gpu origin-center hover:scale-[1.03] hover:border-primary-foreground hover:shadow-md hover:z-10">
            <CardHeader className="items-center">
              <div className="bg-primary/10 text-primary rounded-lg w-14 h-14 flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-primary/20">
                <span className="text-2xl">🛠️</span>
              </div>
              <CardTitle>Select Command Type</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Choose from a variety of command types like text, buttons,
                images, or custom actions.
              </p>
            </CardContent>
          </Card>

          <Card className="h-full border-2 rounded-xl shadow-sm bg-transparent backdrop-blur-md transition-all duration-300 transform-gpu origin-center hover:scale-[1.03] hover:border-primary-foreground hover:shadow-md hover:z-10">
            <CardHeader className="items-center">
              <div className="bg-primary/10 text-primary rounded-lg w-14 h-14 flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-primary/20">
                <span className="text-2xl">✨</span>
              </div>
              <CardTitle>Write Easy Code with Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Use our interactive code editor with AI-powered suggestions to
                create bot logic effortlessly.
              </p>
            </CardContent>
          </Card>

          <Card className="h-full border-2 rounded-xl shadow-sm bg-transparent backdrop-blur-md transition-all duration-300 transform-gpu origin-center hover:scale-[1.03] hover:border-primary-foreground hover:shadow-md hover:z-10">
            <CardHeader className="items-center">
              <div className="bg-primary/10 text-primary rounded-lg w-14 h-14 flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-primary/20">
                <span className="text-2xl">🚀</span>
              </div>
              <CardTitle>Deploy Instantly</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Go live with one click. Your bot is immediately available on
                Telegram for all your users.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="Section-3 mb-16 py-16 bg-transparent">
        <div className="container mx-auto px-4 max-w-6xl bg-transparent">
          <div className="text-center mb-16 bg-transparent">
            <h1 className="text-4xl font-bold mb-4">
              Powerful Features With Easy Coding
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create sophisticated Telegram bots without
              writing a single line of code. All features are available on our
              free forever plan.
            </p>

            <div className="flex justify-center my-8">
              <div className="w-16 h-1 bg-primary rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features1.map((feature, index) => (
              <Card
                key={index}
                className="group h-full border-2 rounded-xl shadow-sm bg-transparent backdrop-blur-md transition-all duration-300 transform-gpu origin-center hover:scale-[1.03] hover:border-primary-foreground hover:shadow-md hover:z-10"
              >
                <CardHeader className="pb-3">
                  <div className="bg-primary/10 text-primary rounded-lg w-12 h-12 flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-primary/20">
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="Section-4 py-12 bg-transparent">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-3">Platform Comparison</h2>
            <p className="text-muted-foreground">
              See how BotU outperforms other Telegram bot platforms
            </p>
          </div>

          {/* Desktop/Tablet View */}
          <div className="hidden md:block overflow-x-auto text-sm">
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
                        index % 2 === 0 ? "bg-transparen" : "bg-transparen"
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
          </div>

          {/* Mobile View - Compact Cards */}
          <div className="md:hidden space-y-3">
            {sortedFeatures.map((feat, index) => (
              <div
                key={index}
                className="bg-transparent backdrop-blur-md rounded-xl border border-border p-3 shadow-sm"
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
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="mt-8 p-4 border border-border rounded-xl bg-transparent backdrop-blur-md grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm font-bold mb-1">100%</div>
              <div className="text-xs text-muted-foreground">
                Feature Coverage
              </div>
            </div>
            <div>
              <div className="text-sm font-bold mb-1">24/7</div>
              <div className="text-xs text-muted-foreground">Support</div>
            </div>
            <div>
              <div className="text-sm font-bold mb-1">$0</div>
              <div className="text-xs text-muted-foreground">
                Free Tier Cost
              </div>
            </div>
          </div>

          <div className="mt-4 text-center text-xs text-muted-foreground">
            All premium features available in our free plan with no restrictions
          </div>
        </div>
      </div>

      <div className="Section-5 py-16 bg-transparent">
        <div className="container mx-auto px-4 max-w-6xl bg-transparent">
          <div className="text-center mb-12 bg-transparen">
            <h1 className="text-4xl font-bold mb-4">Who is BotU for?</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              BotU is built to empower creators, communities, and businesses of
              all sizes — no coding needed.
            </p>

            <div className="flex justify-center my-8">
              <div className="w-16 h-1 bg-primary rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {audience.map((item, index) => (
              <Card
                key={index}
                className="border-2 rounded-lg shadow-sm bg-transparent backdrop-blur-md transition-all duration-300 transform-gpu hover:scale-[1.03] hover:border-primary-foreground hover:shadow-sm"
              >
                <CardHeader className="pb-3">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center max-w-2xl mx-auto bg-transparent">
            <p className="text-lg mb-6">
              Whether you're a solo creator or part of a large team, BotU gives
              you everything you need to launch smart Telegram bots without
              touching a single line of code.
            </p>
            <button className="inline-flex items-center text-primary font-medium group">
              Explore Use Cases
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
