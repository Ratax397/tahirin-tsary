import { Suspense } from "react";
import HomeContent from "./components/HomeContent";

export default function Home() {
  return (
    <Suspense fallback={
      <div className="p-3 flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Chargement...</div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}