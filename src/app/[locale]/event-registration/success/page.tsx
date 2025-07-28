'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SuccessCard from '@/components/EventRegistrationForm/SuccessCard';
import { EventRegistrationData } from '@/types/eventRegistration';
import { Button } from '@/components/ui/button';
import { Home, Download } from 'lucide-react';

export default function SuccessPage() {
  const [registrationData, setRegistrationData] = useState<EventRegistrationData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
 
    const data = typeof window !== 'undefined' ? sessionStorage.getItem('registrationData') : null;
    if (data) {
      setRegistrationData(JSON.parse(data));
      setLoading(false);
   
    } else {
      
      router.replace('/event-registration/'); 
    }
  }, [router]);

  const handleNewRegistration = () => {
    sessionStorage.removeItem('registrationData');
    router.push('/event-registration/form'); 
  };

  const handleDownloadReceipt = () => {
    alert('Receipt download feature would be implemented here!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading registration details...</p>
        </div>
      </div>
    );
  }

  if (!registrationData) {
  
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <SuccessCard data={registrationData} />

        <div className="max-w-4xl mx-auto mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleDownloadReceipt}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download size={16} />
            Download Receipt
          </Button>
          <Button
            onClick={handleNewRegistration}
            className="flex items-center gap-2"
          >
            <Home size={16} />
            New Registration
          </Button>
        </div>
      </div>
    </div>
  );
}
