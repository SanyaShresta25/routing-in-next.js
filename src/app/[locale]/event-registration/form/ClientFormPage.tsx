'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import EventRegistrationForm from '@/components/EventRegistrationForm/EventRegistrationForm';

export default function ClientFormPage() {
  const searchParams = useSearchParams();
  const initialStep = Number(searchParams.get('step')) || 1;

  return <EventRegistrationForm initialStep={initialStep} />;
}
