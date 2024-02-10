"use client";
import { useSession } from "next-auth/react";
import CountDown from "react-countdown";
import VoteDialog from "@/components/VoteDialog";
import { trpc } from "@/trpc_client/client";
import { useEffect, useState } from "react";

const page = () => {
  const { data: session } = useSession();
  const [isVotingOpen, setVotingOpen] = useState(false);
  const [Dday, setDday] = useState("");
  const time = trpc.getTime.useQuery();

  useEffect(() => {
    if (time.data) setDday(time.data.time);
  }, [time.data]);

  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: {
    days?: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
  }) => {
    if (!completed)
      return (
        <h2 className="text-xl my-2" suppressHydrationWarning={true}>
          Voting starts in {days} day{days != 1 ? "s" : ""} {hours} hour
          {hours != 1 ? "s" : ""} {minutes} minute
          {minutes != 1 ? "s" : ""} and {seconds} second
          {seconds != 1 ? "s" : ""}.
        </h2>
      );
  };
  return (
    <div className="flex flex-col justify-center items-center w-full ">
      <h1 className="text-3xl font-semibold">Hello {session?.user?.name}</h1>
      {isVotingOpen ? (
        <div className="text-center my-2">
          <h2 className="text-2xl mb-2">Voting is now open!</h2>
          <VoteDialog />
        </div>
      ) : Dday ? (
        <CountDown
          date={Dday}
          renderer={renderer}
          daysInHours={false}
          onComplete={() => setVotingOpen(true)}
        />
      ) : (
        <h1 className="text-2xl my-2">Loading...</h1>
      )}
    </div>
  );
};

export default page;
