"use client"
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { registerForminput } from '@/constants/register-inputs';
import { registerSchema } from '@/schemas/auth.schemas';
import { RegisterType } from '@/types/register.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { register } from '../api/register';


export default function Register() {
  const router = useRouter();
 const [loading, setLoading] = useState(false);
  const { handleSubmit, control } = useForm({
    defaultValues:  {
  name: '',
  email: '',
  password: '',
  rePassword: '',
  phone: '',
},

    resolver: zodResolver(registerSchema),
  });
  const onSubmit = async (data: RegisterType) => {
    setLoading(true);
     const res = await register(data);
     if(res) {
      router.push("/login");
     }
      setLoading(false);
  }

  return (
    <>
  <h1>Register Page</h1>
  <form onSubmit={handleSubmit(onSubmit)} className='w-1/2 mx-auto'>
    <FieldGroup>
      {registerForminput.map(({ name, placeholder }) => (
        <Controller
          key={name}
          name={name as "name" | "email" | "password" | "rePassword" | "phone"}
          control={control} 
    render={({fieldState , field})=> (
      <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>{name}</FieldLabel>
      <Input
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder={placeholder}
        autoComplete="off"
      />
       {fieldState.invalid && (
        <FieldError errors={[fieldState.error]} />
        )}  
    </Field>
    )}
    />
   ))}
     <Button disabled={loading} className='disabled:opacity-50'>submit</Button>
    </FieldGroup>
  </form>
  </>
  );
}
