// import DarkVeil from "@/Backgrounds/DarkVeil/DarkVeil";
import TrueFocus from "@/TextAnimations/TrueFocus/TrueFocus";
import Magnet from "@/Animations/Magnet/Magnet";
// import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CodeSnipp from "@/components/codesnipp";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Check, X, ArrowRight } from "lucide-react";

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
    feature: "Number of Bots",
    botu: "Unlimited",
    manybot: "Up to 5",
    flowxo: "Up to 2"
  },
  {
    feature: "Command Limit",
    botu: "Unlimited",
    manybot: "Limited",
    flowxo: "5 (Free) / 15 (Paid)"
  },
  {
    feature: "Custom Code Support",
    botu: "Full Access",
    manybot: "Limited",
    flowxo: "Limited"
  },
  {
    feature: "Database Integration",
    botu: "Full Access",
    manybot: "Not Available",
    flowxo: "Basic"
  },
  {
    feature: "Webhook Support",
    botu: "Unlimited",
    manybot: "Limited",
    flowxo: "Limited"
  },
  {
    feature: "API Access",
    botu: "Full Access",
    manybot: "Not Available",
    flowxo: "Limited"
  },
  {
    feature: "Inline Button Features",
    botu: "Advanced",
    manybot: "Basic",
    flowxo: "Basic"
  },
  {
    feature: "AI Integration",
    botu: "Included",
    manybot: "Not Available",
    flowxo: "Paid Add-on"
  },
  {
    feature: "Analytics & Insights",
    botu: "Detailed",
    manybot: "Basic",
    flowxo: "Limited"
  },
  {
    feature: "Pricing",
    botu: "Free",
    manybot: "$10/mo",
    flowxo: "$18/mo"
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
  return (
    <div className="flex flex-col items-center justify-center mt-20 select-none">
      <div className="Section-1 flex flex-col justify-center items-center">
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

      <div className="Section-2 mb-20 text-center">
        <h2 className="text-4xl font-bold drop-shadow-md mb-4">
          Build Your Bot in Just a Few Easy Steps
        </h2>
        <p className="text-lg font-extralight drop-shadow-sm max-w-[50rem] mx-auto">
          Our simplified process ensures a fast, user-friendly experience
          perfect for newcomers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 px-4 max-w-5xl mx-auto">
          <Card className="h-full border-2 rounded-xl shadow-sm transition-all duration-300 transform-gpu origin-center hover:scale-[1.03] hover:border-primary-foreground hover:shadow-md hover:z-10">
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

          <Card className="h-full border-2 rounded-xl shadow-sm transition-all duration-300 transform-gpu origin-center hover:scale-[1.03] hover:border-primary-foreground hover:shadow-md hover:z-10">
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

          <Card className="h-full border-2 rounded-xl shadow-sm transition-all duration-300 transform-gpu origin-center hover:scale-[1.03] hover:border-primary-foreground hover:shadow-md hover:z-10">
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

      <div className="Section-3 mb-16 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
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
                className="group h-full border-2 rounded-xl shadow-sm transition-all duration-300 transform-gpu origin-center hover:scale-[1.03] hover:border-primary-foreground hover:shadow-md hover:z-10"
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

      <div className="Section-4 py-12 mb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-3">Why Choose Us?</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Discover how BotU compares to other popular Telegram bot
              platforms.
            </p>
          </div>

          <div className="overflow-x-auto pb-2">
            <Table className="min-w-[600px]">
              <TableHeader>
                <TableRow className="border-b border-border">
                  <TableHead className="w-[30%] py-3 text-left font-semibold">
                    FEATURE
                  </TableHead>
                  <TableHead className="text-center py-3 font-semibold text-[#00a3a3] [text-shadow:_0px_0px_10px_#00a3a3]">
                    BOTU
                  </TableHead>
                  <TableHead className="text-center py-3 font-semibold">
                    MANYBOT
                  </TableHead>
                  <TableHead className="text-center py-3 font-semibold">
                    FLOWXO
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {features2.map((feat, index) => (
                  <TableRow
                    key={index}
                    className="border-b border-border/30 hover:bg-muted/10 transition-colors"
                  >
                    <TableCell className="py-3 font-medium">
                      {feat.feature}
                    </TableCell>

                    <TableCell className="text-center py-3">
                      <div className="flex items-center justify-center">
                        <Check className="w-4 h-4 text-[#00a3a3] [text-shadow:_0px_0px_10px_#00a3a3] mr-1.5" />
                        <span className="font-medium text-[#00a3a3] [text-shadow:_0px_0px_10px_#00a3a3]">
                          {feat.botu}
                        </span>
                      </div>
                    </TableCell>

                    {/* Manybot */}
                    <TableCell className="text-center py-3">
                      <div className="flex items-center justify-center">
                        {feat.manybot !== "None" &&
                        feat.manybot !== "Limited" ? (
                          <>
                            <Check className="w-4 h-4 text-muted-foreground mr-1.5" />
                            <span>{feat.manybot}</span>
                          </>
                        ) : (
                          <>
                            <X className="w-4 h-4 text-muted-foreground mr-1.5" />
                            <span className="text-muted-foreground">
                              {feat.manybot}
                            </span>
                          </>
                        )}
                      </div>
                    </TableCell>

                    {/* FlowXO */}
                    <TableCell className="text-center py-3">
                      <div className="flex items-center justify-center">
                        {feat.flowxo !== "None" &&
                        feat.flowxo !== "Limited" &&
                        !feat.flowxo.includes("Paid") ? (
                          <>
                            <Check className="w-4 h-4 text-muted-foreground mr-1.5" />
                            <span>{feat.flowxo}</span>
                          </>
                        ) : (
                          <>
                            <X className="w-4 h-4 text-muted-foreground mr-1.5" />
                            <span className="text-muted-foreground">
                              {feat.flowxo}
                            </span>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            All features available in our free plan with no restrictions
          </div>
        </div>
      </div>

      <div className="Section-5 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
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
                className="border-2 rounded-lg shadow-sm transition-all duration-300 transform-gpu hover:scale-[1.03] hover:border-primary-foreground hover:shadow-sm"
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

          <div className="text-center max-w-2xl mx-auto">
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
