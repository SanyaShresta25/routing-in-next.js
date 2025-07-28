import { z } from 'zod';
import phoneCodesData from '@/app/data/phone_codes.json';
import { PhoneCode } from '@/types/eventRegistration';


const phoneCodes = phoneCodesData as PhoneCode[];

const validatePhoneLength = (phoneCode: string, phoneNumber: string): boolean => {
  const phoneCodeData = phoneCodes.find(pc => pc.phoneCode === phoneCode);
  if (!phoneCodeData) return false;

  const cleanNumber = phoneNumber.replace(/\D/g, '');
  const expectedLengths = Array.isArray(phoneCodeData.phoneLengths)
    ? phoneCodeData.phoneLengths
    : [phoneCodeData.phoneLengths];

  return expectedLengths.includes(cleanNumber.length);
};

// Step 1: Personal Details
export const personalDetailsSchema = z.object({
  fullName: z.string()
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Full name should only contain letters and spaces')
    .transform(str => str.trim()),

  email: z.string()
    .email('Please enter a valid email address')
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email must not exceed 100 characters')
    .transform(str => str.trim()),

  phoneCode: z.string()
    .min(1, 'Please select a country code'),

  phoneNumber: z.string()
    .nonempty('Phone number is required'),

  gender: z.enum(['male', 'female', 'other'] as const, {
    message: 'Please select your gender',
  }),

  dateOfBirth: z.string()
    .min(1, 'Date of birth is required')
    .refine((date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      return selectedDate <= today;
    }, 'Date of birth cannot be in the future'),

  tshirtSize: z.enum(['S', 'M', 'L', 'XL'] as const).optional(),
}).superRefine((data, ctx) => {
  if (data.phoneCode && data.phoneNumber) {
    const cleanNumber = data.phoneNumber.replace(/\D/g, '');

    if (!/^\d+$/.test(cleanNumber)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Phone number should only contain digits',
        path: ['phoneNumber'],
      });
      return;
    }

    if (!validatePhoneLength(data.phoneCode, data.phoneNumber)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid phone number length for selected country',
        path: ['phoneNumber'],
      });
    }
  }
});

// Step 2: Address Details 
export const addressDetailsSchema = z.object({
  streetAddress: z.string()
    .min(10, 'Street address must be at least 10 characters')
    .max(200, 'Street address must not exceed 200 characters')
    .transform(str => str.trim()),

  city: z.string()
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City must not exceed 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'City should only contain letters and spaces')
    .transform(str => str.trim()),

  state: z.string()
    .min(1, 'Please select a state')
    .transform(str => str.trim()),

  zipCode: z.string()
    .min(3, 'ZIP code must be at least 3 characters')
    .max(10, 'ZIP code must not exceed 10 characters')
    .regex(/^\d+$/, 'ZIP code should only contain numbers')
    .transform(str => str.trim()),

  country: z.string()
    .min(1, 'Please select a country')
    .transform(str => str.trim()),
});

// Step 3: Event Preferences
export const eventPreferencesSchema = z.object({
  selectedEvents: z.array(z.string())
    .min(1, 'Please select at least one event'),

  mealPreference: z.enum(['veg', 'non-veg', 'vegan'] as const, {
    message: 'Please select your meal preference',
  }),

  emergencyContactName: z.string()
    .min(2, 'Emergency contact name must be at least 2 characters')
    .max(50, 'Emergency contact name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Emergency contact name should only contain letters and spaces')
    .transform(str => str.trim()),

  emergencyContactPhoneCode: z.string()
    .min(1, 'Please select a country code for emergency contact'),

  emergencyContactPhone: z.string()
    .nonempty('Emergency contact phone is required'),
}).superRefine((data, ctx) => {
  if (data.emergencyContactPhoneCode && data.emergencyContactPhone) {
    const cleanNumber = data.emergencyContactPhone.replace(/\D/g, '');

    if (!/^\d+$/.test(cleanNumber)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Emergency contact phone should only contain digits',
        path: ['emergencyContactPhone'],
      });
      return;
    }
    if (!validatePhoneLength(data.emergencyContactPhoneCode, data.emergencyContactPhone)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid emergency contact phone number length for selected country',
        path: ['emergencyContactPhone'],
      });
    }
  }
});

// Step 4: Payment Details 
export const paymentDetailsSchema = z.object({
  cardholderName: z.string()
    .min(2, 'Cardholder name must be at least 2 characters')
    .max(50, 'Cardholder name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Cardholder name should only contain letters and spaces')
    .transform(str => str.trim()),

  cardNumber: z.string()
    .min(1, 'Card number is required')
    .regex(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/, 'Please enter a valid 16-digit card number'),

  expirationDate: z.string()
    .min(1, 'Expiration date is required')
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Please enter date in MM/YY format')
    .refine((date) => {
      const [monthStr, yearStr] = date.split('/');
      const month = parseInt(monthStr, 10);
      const year = 2000 + parseInt(yearStr, 10);
      const expDate = new Date(year, month - 1, 1);
      const now = new Date();
      expDate.setMonth(expDate.getMonth() + 1); 
      return expDate > now;
    }, 'Card has expired'),

  cvv: z.string()
    .length(3, 'CVV must be exactly 3 digits')
    .regex(/^\d{3}$/, 'CVV should only contain 3 digits'),
});


export const eventRegistrationSchema = personalDetailsSchema
  .merge(addressDetailsSchema)
  .merge(eventPreferencesSchema)
  .merge(paymentDetailsSchema);

// Types
export type PersonalDetailsInput = z.infer<typeof personalDetailsSchema>;
export type AddressDetailsInput = z.infer<typeof addressDetailsSchema>;
export type EventPreferencesInput = z.infer<typeof eventPreferencesSchema>;
export type PaymentDetailsInput = z.infer<typeof paymentDetailsSchema>;
export type EventRegistrationInput = z.infer<typeof eventRegistrationSchema>;
