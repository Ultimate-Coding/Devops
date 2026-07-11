"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";


export default function LanguageSwitcher() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();


  function changeLanguage(locale: "en" | "ar") {
    document.cookie = `locale=${locale}; path=/`;

    startTransition(() => {
      router.refresh();
    });
  }


  return (
    <div className="flex gap-2">

      <button
        disabled={isPending}
        onClick={() => changeLanguage("en")}
        className="
          px-3 py-1
          rounded-md
          bg-zinc-200
          hover:bg-zinc-300
        "
      >
        English
      </button>


      <button
        disabled={isPending}
        onClick={() => changeLanguage("ar")}
        className="
          px-3 py-1
          rounded-md
          bg-zinc-200
          hover:bg-zinc-300
        "
      >
        العربية
      </button>

    </div>
  );
}