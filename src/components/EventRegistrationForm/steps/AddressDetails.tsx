import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AddressDetailsInput } from '@/lib/validations/eventRegistration';
import { states, countries } from '@/lib/utils';

interface AddressDetailsProps {
  form: UseFormReturn<AddressDetailsInput>;
}

const AddressDetails: React.FC<AddressDetailsProps> = ({ form }) => {
  const { register, formState: { errors }, setValue, watch } = form;

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setValue('zipCode', value);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="streetAddress">Street Address *</Label>
        <Textarea
          id="streetAddress"
          placeholder="Enter your complete street address"
          rows={3}
          {...register('streetAddress')}
          className={errors.streetAddress ? 'border-red-500' : ''}
        />
        {errors.streetAddress && (
          <p className="text-sm text-red-500">{errors.streetAddress.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            placeholder="Enter your city"
            {...register('city')}
            className={errors.city ? 'border-red-500' : ''}
          />
          {errors.city && (
            <p className="text-sm text-red-500">{errors.city.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>State *</Label>
          <Select
            value={watch('state') || ''}
            onValueChange={(value) => setValue('state', value)}
          >
            <SelectTrigger className={errors.state ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state.value} value={state.value}>
                  {state.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.state && (
            <p className="text-sm text-red-500">{errors.state.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="zipCode">ZIP Code *</Label>
          <Input
            id="zipCode"
            placeholder="Enter ZIP code"
            value={watch('zipCode') || ''}
            onChange={handleZipCodeChange}
            className={errors.zipCode ? 'border-red-500' : ''}
          />
          {errors.zipCode && (
            <p className="text-sm text-red-500">{errors.zipCode.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Country *</Label>
          <Select
            value={watch('country') || ''}
            onValueChange={(value) => setValue('country', value)}
          >
            <SelectTrigger className={errors.country ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.country && (
            <p className="text-sm text-red-500">{errors.country.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressDetails;
