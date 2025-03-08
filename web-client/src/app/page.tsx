'use client';

import MainLayout from '@/components/MainLayout';

export default function Home() {
  return (
    <main className="bg-white min-h-screen flex items-center justify-center py-6">
      {/* Mobile frame for small screens */}
      <div className="md:hidden relative mx-auto my-4 w-[320px] h-[640px] bg-white rounded-[40px] shadow-xl overflow-hidden border-8 border-black">
        {/* Phone speaker */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-5 bg-white rounded-b-xl z-10 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-gray-800"></div>
        </div>
        
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