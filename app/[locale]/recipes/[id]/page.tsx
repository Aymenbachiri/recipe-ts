import { DateTimeFormatOptions } from "next-intl";
import React from "react";

interface Params {
  _id: string;
  id: string;
  title: string;
  description: string;
  imageurl: string;
  ingredients: string;
  instructions: string;
  cookingtime: number;
  updatedAt: Date;
  creator: string;
}

function Pen() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
      />
    </svg>
  );
}

function Time() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}

async function getData(id: string) {
  const url = process.env.NEXTAUTH_URL;
  const res = await fetch(`${url}/api/recipes/new/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function generateMetadata({ params }: { params: Params }) {
  const recipe = await getData(params.id);
  return {
    title: recipe.title,
    description: recipe.description,
  };
}

function formatTimestamp(timestamp: Date) {
  const options: DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString("en-US", options);

  return formattedDate;
}

export default async function Product({ params }: { params: { id: string } }) {
  const data = await getData(params.id);
  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-8 md:p-12 relative">
      <div className="bg-cover w-full h-[450px] text-center overflow-hidden flex justify-center items-center">
        <img
          loading="lazy"
          src={data.imageurl}
          alt="recipeImage"
          width={950}
          height={400}
          className="object-cover w-auto h-auto"
        />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="mt-3 rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
          <div className="">
            <div className="flex justify-between items-center mb-8">
              <p className="text-gray-700 dark:text-white text-xs mt-2 flex items-end gap-2">
                <Pen />
                <span className="text-xl font-bold"> {data.creator} </span>
              </p>
              <p>
                at{" "}
                <span className="text-xl font-bold">
                  {formatTimestamp(data.createdAt)}
                </span>
              </p>
            </div>
            <div className="flex justify-between items-center">
              <h1 className="text-gray-900 dark:text-white  font-bold text-3xl mb-2 flex items-center gap-2">
                {data.title}
              </h1>
              <h1 className="text-gray-900 dark:text-white  font-bold text-xl mb-2 flex items-center gap-3">
                <Time />
                {data.cookingtime}
                <span className=" -ml-2">minutes</span>
              </h1>
            </div>

            <h1 className="text-gray-900 dark:text-white font-bold text-3xl my-2">
              Description
            </h1>
            <p className="text-base dark:text-white/70 leading-8 my-5">
              {data.description}
            </p>
            <h1 className="text-gray-900 dark:text-white font-bold text-3xl my-2">
              Ingredients
            </h1>
            <p className="text-base dark:text-white/70 leading-8 my-5">
              {data.ingredients}
            </p>
            <h1 className="text-gray-900 dark:text-white font-bold text-3xl my-2">
              Instructions
            </h1>
            <p className="text-base dark:text-white/70 leading-8 my-5">
              {data.instructions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
