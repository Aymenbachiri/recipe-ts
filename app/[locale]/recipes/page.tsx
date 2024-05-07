"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RecipesCard } from "@/components/RecipesCard";

function getData() {
  const url = process.env.NEXTAUTH_URL;

  return fetch(`/api/recipes`, {
    cache: "no-store",
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  });
}
interface Data {
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

export default function RecipesPAge() {
  const [data, setData] = useState<Data[]>([]);
  const pathName = usePathname();
  const currentLanguage = pathName.split("/")[1] || "en";

  useEffect(() => {
    getData()
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <div className="mt-[110px]">
      {data.map((item, index) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-4">
          <Link
            href={`/${currentLanguage}/recipes/${item._id}`}
            className="flex items-center gap-12 mb-12"
          >
            <RecipesCard
              _id={item._id}
              title={item.title}
              description={item.description}
              imageurl={item.imageurl}
              updatedAt={item.updatedAt}
              creator={item.creator}
              cookingtime={item.cookingtime}
              ingredients={item.ingredients}
              instructions={item.instructions}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}
