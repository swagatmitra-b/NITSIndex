import React from "react";
import { roboto700 } from "@/app/home/page";

const ChartCard = ({
  name,
  pic,
  multiplier,
}: {
  name: string;
  pic: string | null;
  multiplier: number;
}) => {
  return (
    <div
      className="rounded-lg relative border border-black text-center h-20 flex items-center justify-center"
      style={{ width: 500 - multiplier * 20 + "px" }}
    >
      {pic && (
        <img
          src={pic}
          alt=""
          className={`absolute rounded-md object-cover -z-10 h-full w-full`}
        />
      )}

      <h1
        className={`text-4xl font-extrabold text-white duration-300 ease-in ${roboto700.className}`}
        style={{
          WebkitTextStroke: "1px black",
        }}
      >
        {multiplier}. {name}
      </h1>
    </div>
  );
};

export default ChartCard;
