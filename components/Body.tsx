"use client";
import React from "react";
import { Boxes } from "./ui/BackgroundBoxes";
import { cn } from "@/utils/cn";

export default function Body() {
  return (
    <div className="h-[750px] mt-[80px] relative w-full overflow-hidden bg-[#0F172A] flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-[#475569] z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <h1 className={cn("md:text-4xl text-gray-300 text-xl relative z-20")}>
        Super quick recipes.
      </h1>
      <h2 className="text-center md:text-2xl text-gray-400 mt-2 relative z-20">
        easy-to-find ingredients.
      </h2>
      <p className="text-center text-gray-500 mt-2 relative z-20">
        Unlock the flavors of the world with our delicious recipes!.
      </p>
    </div>
  );
}
