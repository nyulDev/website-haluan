"use client";

import dynamic from "next/dynamic";
import React from "react";

// Avoid SSR / hydration issues in Next.js production
const WhatsAppWidget = dynamic(
  () => import("react-whatsapp-chat-widget").then((m) => m.default),
  { ssr: false },
);

// The widget library doesn't ship perfect TS types; accept props as-is.
const WhatsAppWidgetAny = WhatsAppWidget as any;

export default function WhatsAppChatWidgetClient() {
  return (
    <div
      style={{
        position: "fixed",
        right: 20,
        bottom: 20,
        zIndex: 9999,
      }}
    >
      <WhatsAppWidgetAny
        phoneNo="6289663060020"
        position="right"
        widgetWidth="380px"
        widgetWidthMobile="340px"
        autoOpen={true}
        autoOpenTimer={5000}
        messageBox={true}
        messageBoxTxt="Hi Team, is there any related service available ?"
        iconSize={70}
        iconColor="white"
        iconBgColor="tomato"
        headerIcon="https://www.pdapps.net.in/_next/static/media/android-chrome-192x192.9a39c2c7.png"
        headerIconColor="pink"
        headerTxtColor="black"
        headerBgColor="blue"
        headerTitle="Haluan Group"
        headerCaption="Online"
        bodyBgColor="#bbb"
        chatPersonName="Support"
        chatMessage={
          <>
            Hi there 👋 <br />
            <br /> How can I help you?
          </>
        }
        footerBgColor="#999"
        placeholder="Type a message.."
        btnBgColor="yellow"
        btnTxt="Start Chat"
        btnTxtColor="black"
      />
    </div>
  );
}
