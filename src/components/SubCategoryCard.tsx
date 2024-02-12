"use client";
import Link from "next/link";
import { trpc } from "@/trpc_client/client";
import { type subCategoryCardProps } from "@/lib/utils";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Roboto } from "next/font/google";

const roboto700 = Roboto({ subsets: ["latin"], weight: ["900"] });

const SubCategoryCard = ({
  subCategoryId,
  category,
  subCategory,
  pic,
  votes,
  name,
  count,
}: subCategoryCardProps) => {
  const [blur, setBlur] = useState(false);
  const { theme } = useTheme();
  const calculatePercent = () => {
    if (count == 0) return "0";
    const percent = (votes / count) * 100;
    return percent.toFixed(2);
  };
  const sentences = trpc.getSentence.useQuery({ subCategoryId });

  const getSentence = () => {
    if (sentences.data?.length) {
      const sentence =
        sentences.data[Math.floor(Math.random() * sentences.data?.length)];
      let a = sentence.content.split(" ");
      a[0] = calculatePercent();
      a[1] = a[1] + name;
      let final = a.join("").split(";").join(" ");
      return final;
    }
  };
  return (
    <Link href={`/home/${category}/${subCategory}%20${subCategoryId}`}>
      <div
        className="rounded-lg relative w-[330px] md:w-[350px] border border-black text-center
         h-[270px] duration-300 ease-in dark:border-white"
        onMouseEnter={() => setBlur(true)}
        onMouseLeave={() => setBlur(false)}
      >
        {pic && (
          <img
            src={pic}
            alt=""
            className={`absolute rounded-md object-cover -z-10 h-full w-full ${
              blur ? "blur-sm" : ""
            }`}
          />
        )}
        <div className="flex flex-col p-8 justify-center h-full">
          <h1
            className={`text-5xl font-extrabold ${
              (category === "academics" || category === "misc") &&
              theme !== "dark"
                ? "text-black"
                : "text-white"
            } duration-300 ease-in ${roboto700.className}`}
            style={{
              WebkitTextStroke: blur ? "1px black" : "",
              fontSize: blur ? "3.25rem" : "",
            }}
          >
            {subCategory}
          </h1>
          {sentences.data?.length ? (
            <p
              className={`${
                blur ? "opacity-1" : "opacity-0"
              } duration-300 ease-in ${
                (category === "academics" || category === "misc") &&
                theme != "dark"
                  ? "text-black"
                  : "text-white"
              } mt-2 text-lg ${roboto700.className}`}
              style={{
                WebkitTextStroke:
                  blur && category !== "academics" ? "0.8px black" : "",
              }}
            >
              {getSentence()}
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </Link>
  );
};

export default SubCategoryCard;
