import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { EventPreferencesInput } from '@/lib/validations/eventRegistration';
import { formatPhoneNumber, eventOptions } from '@/lib/utils';
import phoneCodesData from '@/app/data/phone_codes.json';
import { PhoneCode } from '@/types/eventRegistration';

interface EventPreferencesProps {
  form: UseFormReturn<EventPreferencesInput>;
}

const phoneCodes = phoneCodesData as unknown as PhoneCode[];

const EventPreferences: React.FC<EventPreferencesProps> = ({ form }) => {
  const { register, formState: { errors }, setValue, watch } = form;
  const watchedSelectedEvents = watch('selectedEvents') || [];
  const watchedEmergencyContactPhoneCode = watch('emergencyContactPhoneCode');
  const watchedEmergencyContactPhone = watch('emergencyContactPhone');

  const handleEventSelection = (eventId: string, checked: boolean) => {
    const currentEvents = watchedSelectedEvents || [];
    if (checked) {
      setValue('selectedEvents', [...currentEvents, eventId]);
    } else {
      setValue('selectedEvents', currentEvents.filter(id => id !== eventId));
    }
  };

  const handleEmergencyPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setValue('emergencyContactPhone', formatted);
  };

  return (
    <div className="space-y-6">
      {/* Select Events */}
      <div className="space-y-3">
        <Label>Select Events *</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {eventOptions.map((event) => (
            <div key={event.id} className="flex items-center space-x-2">
              <Checkbox
                id={event.id}
                checked={watchedSelectedEvents.includes(event.id)}
                onCheckedChange={(checked) => handleEventSelection(event.id, checked as boolean)}
              />
              <Label htmlFor={event.id} className="text-sm font-normal cursor-pointer">
                {event.label}
              </Label>
            </div>
          ))}
        </div>
        {errors.selectedEvents && (
          <p className="text-sm text-red-500">{errors.selectedEvents.message}</p>
        )}
      </div>

      {/* Meal Preference */}
      <div className="space-y-2">
        <Label>Meal Preference *</Label>
        <Select
          value={watch('mealPreference') || ''}
          onValueChange={(value) => setValue('mealPreference', value as 'veg' | 'non-veg' | 'vegan')}
        >
          <SelectTrigger className={`w-full md:w-[200px] ${errors.mealPreference ? 'border-red-500' : ''}`}>
            <SelectValue placeholder="Select meal preference" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="veg">Vegetarian</SelectItem>
            <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
            <SelectItem value="vegan">Vegan</SelectItem>
          </SelectContent>
        </Select>
        {errors.mealPreference && (
          <p className="text-sm text-red-500">{errors.mealPreference.message}</p>
        )}
      </div>

      {/* Emergency Contact Name */}
      <div className="space-y-2">
        <Label htmlFor="emergencyContactName">Emergency Contact Name *</Label>
        <Input
          id="emergencyContactName"
          placeholder="Enter emergency contact name"
          {...register('emergencyContactName')}
          className={errors.emergencyContactName ? 'border-red-500' : ''}
        />
        {errors.emergencyContactName && (
          <p className="text-sm text-red-500">{errors.emergencyContactName.message}</p>
        )}
      </div>

      {/* Emergency Contact Phone */}
      <div className="space-y-2">
        <Label>Emergency Contact Phone *</Label>
        <div className="flex gap-2">
        <Select
  value={watchedEmergencyContactPhoneCode || ''}
  onValueChange={(value) => setValue('emergencyContactPhoneCode', value)}
>
  <SelectTrigger className={`w-[180px] ${errors.emergencyContactPhoneCode ? 'border-red-500' : ''}`}>
    <SelectValue placeholder="Select code" />
  </SelectTrigger>
  <SelectContent>
    {phoneCodes.map((phoneCode) => (
      <SelectItem key={phoneCode.phoneCode} value={phoneCode.phoneCode}>
        <span>{phoneCode.phoneCode}</span>
        {/* Optionally add other fields if available */}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

          <Input
            placeholder="Enter emergency contact phone"
            value={watchedEmergencyContactPhone || ''}
            onChange={handleEmergencyPhoneChange}
            className={`flex-1 ${errors.emergencyContactPhone ? 'border-red-500' : ''}`}
          />
        </div>
        {errors.emergencyContactPhoneCode && (
          <p className="text-sm text-red-500">{errors.emergencyContactPhoneCode.message}</p>
        )}
        {errors.emergencyContactPhone && (
          <p className="text-sm text-red-500">{errors.emergencyContactPhone.message}</p>
        )}
      </div>
    </div>
  );
};

export default EventPreferences;