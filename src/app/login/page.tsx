"use client"
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { LoginType } from '@/types/login.type'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from "next-auth/react";
import { loginSchema } from "@/schemas/auth.schemas";

export default function page() {
    const form = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    resolver : zodResolver(loginSchema)
  })

async function handeilogin(valuse : LoginType){
  console.log(valuse);

signIn("credentials", {...valuse , redirect : true , callbackUrl : "/"})

  
} return <>

  <h1>login ...</h1>

<div className='max-w-5xl bg-blue-300 p-5 mx-auto'>
<form onSubmit={form.handleSubmit(handeilogin)} action="">
  <Controller
  name="email"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>email</FieldLabel>
      <Input
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder="Login button not working on mobile"
        autoComplete="off"
      />
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
<Controller
  name="password"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
      <Input
      type='password'
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder="Login button not working on mobile"
        autoComplete="off"
      />
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
<Button className="bg-green-500 text-white p-2 rounded-md mt-4 cursor-pointer"> LOG IN NOW </Button>
</form>
</div>

  </>
}

