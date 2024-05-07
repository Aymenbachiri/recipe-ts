"use client";
import Body from "@/components/Body";
import { useTranslations } from "next-intl";

export default function Index() {
  const t = useTranslations("Index");
  return (
    <>
      <Body />
    </>
  );
}
