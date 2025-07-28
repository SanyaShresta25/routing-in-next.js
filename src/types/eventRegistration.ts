export type PhoneCode = {
  id: number;
  phoneCode: string;
  phoneLengths: number[];
};

export interface PersonalDetailsData {
  fullName: string;
  email: string;
  phoneCode: string;
  phoneNumber: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  tshirtSize?: 'S' | 'M' | 'L' | 'XL';
}

export interface AddressDetailsData {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface EventPreferencesData {
  selectedEvents: string[];
  mealPreference: 'veg' | 'non-veg' | 'vegan';
  emergencyContactName: string;
  emergencyContactPhoneCode: string;
  emergencyContactPhone: string;
}

export interface PaymentDetailsData {
  cardholderName: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
}

export interface EventRegistrationData extends 
  PersonalDetailsData, 
  AddressDetailsData, 
  EventPreferencesData, 
  PaymentDetailsData {}

export interface FormStep {
  id: number;
  title: string;
  description: string;
}