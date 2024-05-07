import EditForm from "@/components/EditForm";
import React from "react";

interface Params {
  params: {
    id: string;
  };
}

const url = process.env.API_URL;

async function getData(id: string | number) {
  const res = await fetch(`${url}/api/recipes/new/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Edit({ params }: Params) {
  const recipe = await getData(params.id);

  return (
    <EditForm
      id={recipe._id}
      title={recipe.title}
      imageurl={recipe.imageurl}
      cookingtime={recipe.cookingtime}
      description={recipe.description}
      ingredients={recipe.ingredients}
      instructions={recipe.instructions}
      _id={""}
    />
  );
}
