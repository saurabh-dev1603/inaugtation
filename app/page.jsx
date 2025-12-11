"use client";
import CommonInput from "@/components/CommonInput";
import PortalLayout from "@/components/PortalLayout";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <CommonInput />
      </main>
    </div>
  );
}
Home.getLayout = function getLayout(page) {
  return <PortalLayout>{page}</PortalLayout>;
};
