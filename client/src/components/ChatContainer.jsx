import React, { useEffect, useRef } from "react";
import assets, { messagesDummyData } from "../assets/assets";
import { formateMassageTime } from "../lib/utils";

export default function ChatContainer({ selectedUser, setSelectedUser }) {
  const scrollEnd = useRef();

  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, []);
  return (
    <>
      {selectedUser ? (
        <div className="h-full overflow-scroll relative backdrop-blur-lg">
          {/* Chat header */}
          <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
            <img
              src={assets.profile_martin}
              alt="profile-image"
              className="w-8 rounded-full"
            />
            <p className="flex-1 text-lg text-white flex items-center gap-2">
              Mertin Johnson
              <span className="h-2 w-2 rounded-full bg-green-400"></span>
            </p>

            <img
              onClick={() => setSelectedUser(null)}
              src={assets.arrow_icon}
              alt="arrow-icon"
              className="md:hidden max-w-7"
            />

            <img
              src={assets.help_icon}
              alt="info-icon"
              className="max-md:hidden max-w-5"
            />
          </div>

          {/* Chat area */}
          <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6">
            {messagesDummyData.map((message, idx) => (
              <div
                key={idx}
                className={`flex items-end gap-2 justify-end ${
                  message.senderId !== "680f5116f10f3cd28382ed02" &&
                  "flex-row-reverse"
                }`}
              >
                {message?.image ? (
                  <img
                    src={message.image}
                    alt="message-image"
                    className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8"
                  />
                ) : (
                  <p
                    className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${
                      message.senderId === "680f5116f10f3cd28382ed02"
                        ? "rounded-br-none"
                        : "rounded-bl-none"
                    }`}
                  >
                    {message.text}
                  </p>
                )}

                <div className="text-center text-xs">
                  <img
                    src={
                      message.senderId === "680f5116f10f3cd28382ed02"
                        ? assets.avatar_icon
                        : assets.profile_martin
                    }
                    alt="profile-image"
                    className="w-7 rounded-full"
                  />
                  <p className="text-gray-500">
                    {formateMassageTime(message.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div ref={scrollEnd}></div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-2 text-gray-500 bg-white/10 max-md:hidden">
          <img src={assets.logo_icon} alt="logo-icon" className="max-w-16" />
          <p className="text-lg font-medium text-white">
            Chat anytime, anywhere.
          </p>
        </div>
      )}
    </>
  );
}
