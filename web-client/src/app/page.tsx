'use client';

import MainLayout from '@/components/MainLayout';

export default function Home() {
  return (
    <main className="bg-white min-h-screen flex items-center justify-center py-6">
      {/* Mobile frame for small screens */}
      <div className="md:hidden relative mx-auto my-4 bg-white">
        {/* App content */}
        <div className="bg-white h-full w-full overflow-y-auto">
          <MainLayout />
        </div>
      </div>
      
      {/* No frame for desktop view */}
      <div className="hidden md:block w-full h-full">
        <MainLayout />
      </div>
    </main>
  );
}