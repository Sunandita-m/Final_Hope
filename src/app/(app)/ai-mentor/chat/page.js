import { MentorChat } from "@/components/mentor/mentor-chat";

export default function AiMentorChatPage() {
  return (
    <div className="space-y-4">
      <h1
        className="text-2xl font-semibold"
        style={{ fontFamily: "var(--font-plus-jakarta)" }}
      >
        AI Growth Mentor
      </h1>
      <MentorChat />
    </div>
  );
}

