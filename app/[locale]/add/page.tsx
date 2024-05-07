"use client";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { FormEvent } from "react";

export default function AddPage() {
  const session = useSession();
  const router = useRouter();
  const pathName = usePathname();
  const currentLanguage = pathName.split("/")[1] || "en";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const title = (target[0] as HTMLInputElement).value;
    const imageurl = (target[1] as HTMLInputElement).value;
    const cookingtime = (target[2] as HTMLInputElement).value;
    const description = (target[3] as HTMLInputElement).value;
    const ingredients = (target[4] as HTMLInputElement).value;
    const instructions = (target[5] as HTMLInputElement).value;

    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        body: JSON.stringify({
          title,
          imageurl,
          cookingtime,
          description,
          ingredients,
          instructions,
          creator: session?.data?.user?.name,
        }),
      });
      if (res.ok) {
        alert("Recipe Added Successfully");
        router.push(`${currentLanguage}/recipes`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      } else {
        console.error("An uknown error occured", error);
      }
    }
  };
  return (
    <div className="my-[80px]">
      <div>
        <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
          Post Recipe
        </div>

        <form
          onSubmit={handleSubmit}
          className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl"
        >
          <label>Title</label>
          <input
            className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
            spellCheck="false"
            placeholder="Title"
            type="text"
            required
          />
          <label>Image Url</label>
          <input
            className="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
            spellCheck="false"
            placeholder="https://images.unsplash.com/photo-1171"
            type="text"
            required
          />
          <label>Cooking Time (minutes)</label>
          <input
            className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
            spellCheck="false"
            placeholder="Example 90"
            type="number"
            required
          />
          <label>Description</label>
          <textarea
            className="description bg-gray-100 sec p-3 h-24 overflow-y-scroll border border-gray-300 outline-none resize-none"
            spellCheck="false"
            placeholder="Describe everything about this recipe here"
            required
          ></textarea>
          <label>Ingredients</label>
          <textarea
            className="bg-gray-100 sec p-3 h-24 overflow-y-scroll border border-gray-300 outline-none resize-none"
            spellCheck="false"
            placeholder="Write all Ingredients"
            required
          ></textarea>
          <label>Instructions</label>
          <textarea
            className="bg-gray-100 sec p-3 h-24 overflow-y-scroll border border-gray-300 outline-none resize-none"
            spellCheck="false"
            placeholder="give all Instructions"
            required
          ></textarea>

          <div className="buttons flex mt-4">
            <button
              type="reset"
              className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn border border-green-500 p-1 px-4 font-semibold cursor-pointer text-white ml-2 bg-green-400"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
