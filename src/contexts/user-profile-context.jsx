"use client";

import { createContext, useContext, useState, useEffect } from "react";

const UserProfileContext = createContext();

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error("useUserProfile must be used within UserProfileProvider");
  }
  return context;
};

const userProfile = {
  name: "Alex Tech",
  role: "Content Creator",
  niche: "Technology",
  contentFocus: ["AI tools", "software development", "programming productivity"],
  platforms: ["YouTube", "LinkedIn", "Twitter/X"],
  targetAudience: "Beginner and intermediate developers",
  
  trendingIdeas: [
    "Top 5 AI Tools Developers Should Use in 2026",
    "Build a SaaS Using AI in 10 Minutes",
    "Best VS Code Extensions for Developers",
    "AI Agents Explained for Programmers",
    "Developer Productivity Tools That Save 10 Hours a Week",
  ],
  
  recommendedHashtags: [
    "#AItools",
    "#coding",
    "#developers",
    "#buildinpublic",
    "#techcreator",
    "#programmingtips",
  ],
  
  bestPostingTimes: [
    { day: "Tuesday", time: "7:00 PM", dayIndex: 2, hour: 19 },
    { day: "Thursday", time: "6:00 PM", dayIndex: 4, hour: 18 },
    { day: "Saturday", time: "11:00 AM", dayIndex: 6, hour: 11 },
  ],
  
  contentCalendar: [
    { day: "Monday", topic: "AI Tool Review" },
    { day: "Wednesday", topic: "Coding Productivity Tips" },
    { day: "Friday", topic: "New Developer Tools" },
    { day: "Sunday", topic: "Tech News Breakdown" },
  ],
  
  contentPrediction: {
    title: "Top 5 AI Tools Developers Should Use in 2026",
    successScore: 87,
    viralPotential: "High",
    reasoning: "Developer-focused AI tools have strong engagement trends and high search demand among technology audiences.",
  },
};

export function UserProfileProvider({ children }) {
  const [profile, setProfile] = useState(userProfile);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const getPersonalizedData = (dataType) => {
    switch (dataType) {
      case "trendingIdeas":
        return profile.trendingIdeas;
      case "hashtags":
        return profile.recommendedHashtags;
      case "postingTimes":
        return profile.bestPostingTimes;
      case "contentCalendar":
        return profile.contentCalendar;
      case "prediction":
        return profile.contentPrediction;
      default:
        return null;
    }
  };

  return (
    <UserProfileContext.Provider
      value={{
        profile,
        isLoaded,
        getPersonalizedData,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}
