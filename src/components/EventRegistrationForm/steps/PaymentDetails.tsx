import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PaymentDetailsInput } from '@/lib/validations/eventRegistration';

interface PaymentDetailsProps {
  form: UseFormReturn<PaymentDetailsInput>;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ form }) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-6 max-w-md mx-auto">
      {/* Cardholder Name */}
      <div className="space-y-2">
        <Label htmlFor="cardholderName">Cardholder Name *</Label>
        <Input
          id="cardholderName"
          placeholder="Enter cardholder name"
          {...register('cardholderName')}
          className={errors.cardholderName ? 'border-red-500' : ''}
        />
        {errors.cardholderName && (
          <p className="text-sm text-red-500">{errors.cardholderName.message}</p>
        )}
      </div>

      {/* Card Number */}
      <div className="space-y-2">
        <Label htmlFor="cardNumber">Card Number *</Label>
        <Input
          id="cardNumber"
          placeholder="XXXX XXXX XXXX XXXX"
          maxLength={19} // 16 digits + 3 spaces optionally
          {...register('cardNumber')}
          className={errors.cardNumber ? 'border-red-500' : ''}
          onInput={(e: React.FormEvent<HTMLInputElement>) => {
            // Optional: format as xxxx xxxx xxxx xxxx while typing
            const input = e.currentTarget;
            let value = input.value.replace(/\D/g, '');
            if (value.length > 16) value = value.slice(0, 16);
            const formatted = value.replace(/(.{4})/g, '$1 ').trim();
            input.value = formatted;
          }}
        />
        {errors.cardNumber && (
          <p className="text-sm text-red-500">{errors.cardNumber.message}</p>
        )}
      </div>

      {/* Expiration Date */}
      <div className="space-y-2">
        <Label htmlFor="expirationDate">Expiration Date (MM/YY) *</Label>
        <Input
          id="expirationDate"
          placeholder="MM/YY"
          maxLength={5}
          {...register('expirationDate')}
          className={errors.expirationDate ? 'border-red-500' : ''}
          onInput={(e: React.FormEvent<HTMLInputElement>) => {
            const input = e.currentTarget;
            let value = input.value.replace(/[^\d]/g, '');
            if (value.length > 4) value = value.slice(0, 4);

            // Add slash after first two digits
            if (value.length > 2) {
              value = value.slice(0, 2) + '/' + value.slice(2);
            }
            input.value = value;
          }}
        />
        {errors.expirationDate && (
          <p className="text-sm text-red-500">{errors.expirationDate.message}</p>
        )}
      </div>

      {/* CVV */}
      <div className="space-y-2">
        <Label htmlFor="cvv">CVV *</Label>
        <Input
          id="cvv"
          placeholder="XXX"
          maxLength={3}
          {...register('cvv')}
          className={errors.cvv ? 'border-red-500' : ''}
          onInput={(e: React.FormEvent<HTMLInputElement>) => {
            const input = e.currentTarget;
            let value = input.value.replace(/\D/g, '');
            if (value.length > 3) value = value.slice(0, 3);
            input.value = value;
          }}
        />
        {errors.cvv && (
          <p className="text-sm text-red-500">{errors.cvv.message}</p>
        )}
      </div>
    </div>
  );
};

export default PaymentDetails;
