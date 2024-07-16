'use client';
import { registerUser } from '@/app/actions/authActions';
import { registerSchema, RegisterSchema } from '@/lib/schemas/registerSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { GiPadlock } from 'react-icons/gi';

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterSchema>({
    // resolver: zodResolver(registerSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: RegisterSchema) => {
    const result = await registerUser(data);
    if (result.status === 'success') {
      console.log('User registered successfully');
    } else {
      if (Array.isArray(result.error)) {
        result.error.forEach((e) => {
          const fieldName = e.path.join('.') as 'email' | 'name' | 'password';
          setError(fieldName, { message: e.message });
        });
      } else {
        setError('root.serverError', { message: result.error });
      }
    }
  };
  return (
    <Card className='w-2/4 mx-auto '>
      <CardHeader className='flex flex-col items-center justify-center'>
        <div className='flex flex-col gap-2 items-center text-secondary py-2'>
          <div className='flex flex-row items-center gap-3'>
            <GiPadlock size={30} className='text-tinder-400' />
            <h2 className='text-3xl font-semibold text-tinder-400'>Register</h2>
          </div>
          <p className='text-neutral-500 py-2 font-medium text-medium'>
            Welcome to NextMatch
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            <Input
              defaultValue=''
              label='name'
              variant='bordered'
              {...register('name')}
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message as string}
            />
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
            {errors.root?.serverError && (
              <p className='text-danger text-sm'>
                {errors.root.severError.message}
              </p>
            )}
            <Button
              isLoading={isSubmitting}
              isDisabled={!isValid}
              fullWidth
              className='bg-tinder-400 text-white'
              type='submit'
            >
              Register
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
