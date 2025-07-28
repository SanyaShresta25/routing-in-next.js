import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, User, MapPin, Calendar, CreditCard } from 'lucide-react';
import { EventRegistrationData } from '@/types/eventRegistration';
import { eventOptions } from '@/lib/utils';
import phoneCodesData from '@/app/data/phone_codes.json';
import { PhoneCode } from '@/types/eventRegistration';
import { Button } from '@/components/ui/button'; 

interface SuccessCardProps {
  data: EventRegistrationData;
  onGoBack?: () => void; 
}

const phoneCodes = phoneCodesData as unknown as PhoneCode[];

const SuccessCard: React.FC<SuccessCardProps> = ({ data, onGoBack }) => {
  const getPhoneCodeData = (code: string) => {
    return phoneCodes.find(pc => pc.phoneCode === code);
  };

  const getEventLabels = (eventIds: string[]) => {
    return eventIds.map(id => {
      const event = eventOptions.find(e => e.id === id);
      return event ? event.label : id;
    });
  };

  const formatMealPreference = (preference: string) => {
    switch (preference) {
      case 'veg': return 'Vegetarian';
      case 'non-veg': return 'Non-Vegetarian';
      case 'vegan': return 'Vegan';
      default: return preference;
    }
  };

  const formatTshirtSize = (size?: string) => {
    if (!size) return 'Not specified';
    const sizeMap = { S: 'Small', M: 'Medium', L: 'Large', XL: 'Extra Large' };
    return sizeMap[size as keyof typeof sizeMap] || size;
  };

  const formatGender = (gender: string) => {
    return gender.charAt(0).toUpperCase() + gender.slice(1);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Success Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Registration Successful!</h1>
        <p className="text-lg text-gray-600">
          Thank you for registering for the event. Your registration has been confirmed.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 inline-block">
          <p className="text-green-800 font-medium">
            Registration ID: <span className="font-mono">REG-{Date.now().toString().slice(-6)}</span>
          </p>
        </div>
      </div>

      {/* Registration Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium">{data.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{data.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">
                {data.phoneCode} {data.phoneNumber}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Gender</p>
              <p className="font-medium">{formatGender(data.gender)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="font-medium">{new Date(data.dateOfBirth).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">T-shirt Size</p>
              <p className="font-medium">{formatTshirtSize(data.tshirtSize)}</p>
            </div>
          </CardContent>
        </Card>

        {/* Address Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Address Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Street Address</p>
              <p className="font-medium">{data.streetAddress}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">City</p>
              <p className="font-medium">{data.city}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">State</p>
              <p className="font-medium">{data.state}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">ZIP Code</p>
              <p className="font-medium">{data.zipCode}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Country</p>
              <p className="font-medium">{data.country}</p>
            </div>
          </CardContent>
        </Card>

        {/* Event Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Event Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Selected Events</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {getEventLabels(data.selectedEvents).map((event, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {event}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Meal Preference</p>
              <p className="font-medium">{formatMealPreference(data.mealPreference)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Emergency Contact</p>
              <p className="font-medium">{data.emergencyContactName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Emergency Contact Phone</p>
              <p className="font-medium">
                {data.emergencyContactPhoneCode} {data.emergencyContactPhone}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Cardholder Name</p>
              <p className="font-medium">{data.cardholderName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Card Number</p>
              <p className="font-medium">
                **** **** **** {data.cardNumber.slice(-4)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Payment Status</p>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                Confirmed
              </Badge>
            </div>
          
          </CardContent>
        </Card>
      </div>

      {/* Next Steps & Go Back Button */}
      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>• You will receive a confirmation email within 24 hours with event details</p>
            <p>• Please bring a valid ID for verification at the event</p>
            <p>• Check your email for event updates and important announcements</p>
            <p>• Contact support if you have any questions: support@event.com</p>
          </div>
          {onGoBack && (
            <div className="mt-4">
              <Button type="button" onClick={onGoBack}>
                Go Back to Personal Details
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessCard;
