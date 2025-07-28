import { Suspense } from 'react';
import ClientFormPage from './ClientFormPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientFormPage />
    </Suspense>
  );
}
