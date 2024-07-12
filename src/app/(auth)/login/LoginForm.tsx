import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import React from 'react';
import { GiPadlock } from 'react-icons/gi';

export default function LoginForm() {
  return (
    <Card className='w-2/4 mx-auto '>
      <CardHeader className='flex flex-col items-center justify-center'>
        <div className='flex flex-col gap-2 items-center text-secondary py-2'>
          <div className="flex flex-row items-center gap-3">

          <GiPadlock size={30} className='text-tinder-400'/>
          <h2 className='text-3xl font-semibold text-tinder-400'>Login</h2>
          </div>
          <p className='text-neutral-500 py-2 font-medium text-medium'>Welcome back to NextMatch</p>
        </div>
      </CardHeader>
      <CardBody>
        <form action="">
          <div className="space-y-4">
            <Input label='Email' variant='bordered'/>
            <Input label='password' variant='bordered' type='password'/>
            <Button fullWidth className='bg-tinder-400 text-white' type='submit'>
              Login
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
