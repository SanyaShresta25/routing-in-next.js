import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import Stepper from './Stepper';
import PersonalDetails from './steps/PersonalDetails';
import AddressDetails from './steps/AddressDetails';
import EventPreferences from './steps/EventPreferences';
import PaymentDetails from './steps/PaymentDetails';
import {
  personalDetailsSchema,
  addressDetailsSchema,
  eventPreferencesSchema,
  paymentDetailsSchema,
  PersonalDetailsInput,
  AddressDetailsInput,
  EventPreferencesInput,
  PaymentDetailsInput,
} from '@/lib/validations/eventRegistration';
import { EventRegistrationData } from '@/types/eventRegistration';

const steps = [
  { id: 1, title: 'Personal Details', description: 'Basic information' },
  { id: 2, title: 'Address Details', description: 'Location information' },
  { id: 3, title: 'Event Preferences', description: 'Event selections' },
  { id: 4, title: 'Payment Details', description: 'Payment information' },
];

// Accept `initialStep` prop for Go Back handling
const EventRegistrationForm: React.FC<{ initialStep?: number }> = ({ initialStep = 1 }) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<EventRegistrationData>>({});
  const router = useRouter();

  // Use form hooks for each step
  const personalForm = useForm<PersonalDetailsInput>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: { phoneCode: 'IN +91', ...formData },
  });
  const addressForm = useForm<AddressDetailsInput>({
    resolver: zodResolver(addressDetailsSchema),
    defaultValues: formData,
  });
  const eventForm = useForm<EventPreferencesInput>({
    resolver: zodResolver(eventPreferencesSchema),
    defaultValues: { selectedEvents: [], emergencyContactPhoneCode: 'IN +91', ...formData },
  });
  const paymentForm = useForm<PaymentDetailsInput>({
    resolver: zodResolver(paymentDetailsSchema),
    defaultValues: formData,
  });

  const getCurrentForm = () => {
    switch (currentStep) {
      case 1: return personalForm;
      case 2: return addressForm;
      case 3: return eventForm;
      case 4: return paymentForm;
      default: return personalForm;
    }
  };

  const getCurrentSchema = () => {
    switch (currentStep) {
      case 1: return personalDetailsSchema;
      case 2: return addressDetailsSchema;
      case 3: return eventPreferencesSchema;
      case 4: return paymentDetailsSchema;
      default: return personalDetailsSchema;
    }
  };

  const validateCurrentStep = async () => {
    const form = getCurrentForm();
    const schema = getCurrentSchema();
    try {
      const data = form.getValues();
      await schema.parseAsync(data);
      return true;
    } catch {
      await form.trigger();
      return false;
    }
  };

  const validateAllSteps = async () => {
    let allValid = true;
    try { await personalDetailsSchema.parseAsync(personalForm.getValues()); } catch { allValid = false; personalForm.trigger(); }
    try { await addressDetailsSchema.parseAsync(addressForm.getValues()); } catch { allValid = false; addressForm.trigger(); }
    try { await eventPreferencesSchema.parseAsync(eventForm.getValues()); } catch { allValid = false; eventForm.trigger(); }
    try { await paymentDetailsSchema.parseAsync(paymentForm.getValues()); } catch { allValid = false; paymentForm.trigger(); }
    return allValid;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      const currentData = getCurrentForm().getValues();
      setFormData(prev => ({ ...prev, ...currentData }));
      if (!completedSteps.includes(currentStep)) setCompletedSteps(prev => [...prev, currentStep]);
      if (currentStep < steps.length) setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      const currentData = getCurrentForm().getValues();
      setFormData(prev => ({ ...prev, ...currentData }));
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const allValid = await validateAllSteps();
    if (!allValid) { setIsSubmitting(false); return; }
    const finalData = {
      ...personalForm.getValues(),
      ...addressForm.getValues(),
      ...eventForm.getValues(),
      ...paymentForm.getValues(),
    } as EventRegistrationData;
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      sessionStorage.setItem('registrationData', JSON.stringify(finalData));
      router.push('/event-registration/success');
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return <PersonalDetails form={personalForm} />;
      case 2: return <AddressDetails form={addressForm} />;
      case 3: return <EventPreferences form={eventForm} />;
      case 4: return <PaymentDetails form={paymentForm} />;
      default: return <PersonalDetails form={personalForm} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Event Registration</h1>
            <p className="text-lg text-gray-600">
              Complete your registration for the upcoming tech event
            </p>
          </div>
          <Stepper
            steps={steps}
            currentStep={currentStep}
            completedSteps={completedSteps}
          />
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>{steps[currentStep - 1].title}</CardTitle>
              <CardDescription>{steps[currentStep - 1].description}</CardDescription>
            </CardHeader>
            <CardContent>
              {renderStepContent()}
            </CardContent>
          </Card>
          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Previous
            </Button>
            {currentStep < steps.length ? (
              <Button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2"
              >
                Next
                <ArrowRight size={16} />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Submit Registration'
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventRegistrationForm;
