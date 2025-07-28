import React from "react";

const CodeSnippet: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto mb-20 p-4 font-sans">
      {/* Traffic Light Header with whiteish-transparent background */}
      <div className="flex items-center space-x-2 bg-[#fafafa2c] backdrop-blur-sm rounded-t-lg p-3 border-b border-white/10">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      </div>

      {/* Code Snippet Container with transparent background and blur */}
      <div className="bg-[#3131315b] backdrop-blur p-4 rounded-b-lg border border-white/10">
        <pre className="text-gray-200 overflow-x-auto font-mono text-sm">
          <code>
            <div className="text-green-400">
              bot.sendMessage("Hello user, Welcome To Telebot Cree")
            </div>
            <div className="text-amber-300">
              - Bot connected | Running on BotU Creator
            </div>
            <div className="flex items-center">
              <span className="text-purple-300">import</span>
              <span className="text-gray-300"> axios from </span>
              <span className="text-emerald-300">'axios'</span>
              <span className="ml-2 w-2 h-4 bg-gray-300 animate-blink"></span>
            </div>
          </code>
        </pre>

        {/* Status Bar with transparent background */}
        <div className="mt-4 flex items-center text-sm text-gray-300 backdrop-blur-sm py-2 px-3 rounded">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          <span>Bot Connected</span>
          <span className="mx-2">|</span>
          <span>Running on BotU Hosts</span>
        </div>
      </div>

      {/* Blinking Cursor Animation */}
      <style>{`
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-blink {
          animation: blink 1s infinite;
          display: inline-block;
          vertical-align: middle;
        }
      `}</style>
    </div>
  );
};

export default CodeSnippet;
