'use client';

import { signInUser } from '@/app/actions/authActions';
import { loginSchema, LoginSchema } from '@/lib/schemas/loginSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import { revalidatePath } from 'next/cache';
import { redirect, useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { GiPadlock } from 'react-icons/gi';
import { toast } from 'react-toastify';

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  });
  const onSubmit = async (data: LoginSchema) => {
    const result = await signInUser(data);

    if (result.status === 'success') {
      router.push('/members');
      router.refresh();
    } else {
      toast.error(result.error as string);
    }
  };
  return (
    <Card className='w-2/4 mx-auto '>
      <CardHeader className='flex flex-col items-center justify-center'>
        <div className='flex flex-col gap-2 items-center text-secondary py-2'>
          <div className='flex flex-row items-center gap-3'>
            <GiPadlock size={30} className='text-tinder-400' />
            <h2 className='text-3xl font-semibold text-tinder-400'>Login</h2>
          </div>
          <p className='text-neutral-500 py-2 font-medium text-medium'>
            Welcome back to NextMatch
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            <Input
              defaultValue=''
              label='Email'
              variant='bordered'
              {...register('email')}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message as string}
            />
            <Input
              defaultValue=''
              label='password'
              variant='bordered'
              type='password'
              {...register('password')}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message as string}
            />
            <Button
              isLoading={isSubmitting}
              isDisabled={!isValid}
              fullWidth
              className='bg-tinder-400 text-white'
              type='submit'
            >
              Login
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
