'use client';

import { useState } from 'react';
import TextField from '@/components/TextField';
import FadeInDiv from '@/components/FadeInDiv';
import UpwardStack from '@/components/UpwardStack';
import Modal from '@/components/Modal';
import SendRequestButton from '@/components/SendRequestButton';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen relative">
      {/* First section with text field and modal button */}
      <FadeInDiv delay={0}>
        <div className="max-w-md mx-auto p-4 space-y-4">
          <h1 className="text-2xl font-bold">Interactive Components Demo</h1>
          <TextField />
          <div className="space-x-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Open Modal
            </button>
            <FadeInDiv delay={600}>
              <SendRequestButton />
            </FadeInDiv>
          </div>
          
        </div>
      </FadeInDiv>

      {/* Upward stack section */}
      <FadeInDiv delay={400}>
        <div className="h-[500px] max-w-md mx-auto">
          <UpwardStack />
        </div>
      </FadeInDiv>
      
      {/* Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      >
        <h2 className="text-xl font-bold mb-4">Welcome!</h2>
        <p>This is our modal component with some sample content.</p>
        <p className="mt-4">You can close it using the X button or clicking outside.</p>
      </Modal>
    </main>
  );
}