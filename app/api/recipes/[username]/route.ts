import Recipe from "@/models/recipe";
import connectToDB from "@/utils/database";
import { NextRequest } from "next/server";

interface Params {
  params: {
    id: string;
  };
  username: string;
}

export const GET = async (req: NextRequest, { params }: { params: Params }) => {
  const { username } = params;
  try {
    await connectToDB();

    const posts = await Recipe.find({ creator: username });
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch posts", { status: 500 });
  }
};
