import React, { useEffect, useMemo } from 'react';
import { UseFormReturn, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PersonalDetailsInput } from '@/lib/validations/eventRegistration';
import { formatPhoneNumber } from '@/lib/utils';
import phoneCodes from '@/app/data/phone_codes.json';

interface PersonalDetailsProps {
  form: UseFormReturn<PersonalDetailsInput>;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ form }) => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
    control,
  } = form;

  const watchedPhoneCode = watch('phoneCode');
  const watchedGender = watch('gender');
  const watchedTshirtSize = watch('tshirtSize');

  useEffect(() => {
    if (!watchedPhoneCode) {
      setValue('phoneCode', 'IN +91', { shouldValidate: true });
    }
  }, [watchedPhoneCode, setValue]);

  const getAllowedLengths = (code: string) => {
    const found = phoneCodes.find((pc) => pc.phoneCode === code);
    return found?.phoneLengths || [];
  };

  const validatePhoneNumberLength = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '');
    const allowedLengths = getAllowedLengths(watchedPhoneCode);
    if (allowedLengths.length === 0) return 'Please select a valid country code';
    if (!allowedLengths.includes(digitsOnly.length)) {
      return `Phone number must be ${allowedLengths.join(' or ')} digits for ${watchedPhoneCode}`;
    }
    return true;
  };

  const today = new Date().toISOString().split('T')[0];

  const sortedPhoneCodes = useMemo(() => {
    return [
      ...phoneCodes.filter((p) => p.phoneCode === 'IN +91'),
      ...phoneCodes
        .filter((p) => p.phoneCode !== 'IN +91')
       
    ];
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            placeholder="Enter your full name"
            {...register('fullName', { required: 'Full Name is required' })}
            className={errors.fullName ? 'border-red-500' : ''}
          />
          {errors.fullName && (
            <p className="text-sm text-red-500">{errors.fullName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Invalid email format',
              },
            })}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Phone Number *</Label>
        <div className="flex gap-2">
          <Select
            value={watchedPhoneCode || ''}
            onValueChange={(value) =>
              setValue('phoneCode', value, { shouldValidate: true })
            }
          >
            <SelectTrigger
              className={`w-[220px] rounded-md border border-gray-300 bg-white shadow-sm hover:border-blue-500 focus:ring-2 focus:ring-blue-400 transition-colors ${errors.phoneCode ? 'border-red-500' : ''}`}
            >
              <SelectValue placeholder="Select code" />
            </SelectTrigger>
            <SelectContent
              className="z-50 max-h-64 overflow-auto min-w-[240px] rounded-md border border-gray-200 bg-white shadow-xl p-1"
            >
              {sortedPhoneCodes.map((phoneCode) => (
                <SelectItem
                  key={phoneCode.phoneCode}
                  value={phoneCode.phoneCode}
                  className="flex items-center justify-between gap-2 py-2 px-3 rounded hover:bg-blue-50 focus:bg-blue-100 transition-colors cursor-pointer"
                >
                  <span className="min-w-[56px] font-mono text-sm">{phoneCode.phoneCode}</span>
           
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Controller
            control={control}
            name="phoneNumber"
            rules={{
              required: 'Phone number is required',
              validate: validatePhoneNumberLength,
            }}
            render={({ field }) => (
              <Input
                placeholder="Enter phone number"
                value={field.value || ''}
                onChange={(e) => {
                  const digitsOnly = e.target.value.replace(/\D/g, '');
                  const formatted = formatPhoneNumber(digitsOnly);
                  field.onChange(formatted);
                }}
                className={`flex-1 ${errors.phoneNumber ? 'border-red-500' : ''}`}
              />
            )}
          />
        </div>
        {errors.phoneCode && (
          <p className="text-sm text-red-500">{errors.phoneCode.message}</p>
        )}
        {errors.phoneNumber && (
          <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label>Gender *</Label>
          <RadioGroup
            value={watchedGender || ''}
            onValueChange={(value) =>
              setValue('gender', value as 'male' | 'female' | 'other', {
                shouldValidate: true,
              })
            }
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other">Other</Label>
            </div>
          </RadioGroup>
          {errors.gender && (
            <p className="text-sm text-red-500">{errors.gender.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
          <Input
            id="dateOfBirth"
            type="date"
            max={today}
            {...register('dateOfBirth', {
              required: 'Date of Birth is required',
              validate: (value) => {
                if (new Date(value) > new Date()) {
                  return 'Date of Birth cannot be in the future';
                }
                return true;
              },
            })}
            className={errors.dateOfBirth ? 'border-red-500' : ''}
          />
          {errors.dateOfBirth && (
            <p className="text-sm text-red-500">{errors.dateOfBirth.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>T-shirt Size (Optional)</Label>
        <Select
          value={watchedTshirtSize || ''}
          onValueChange={(value) =>
            setValue('tshirtSize', value as 'S' | 'M' | 'L' | 'XL')
          }
        >
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="S">Small (S)</SelectItem>
            <SelectItem value="M">Medium (M)</SelectItem>
            <SelectItem value="L">Large (L)</SelectItem>
            <SelectItem value="XL">Extra Large (XL)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PersonalDetails;
