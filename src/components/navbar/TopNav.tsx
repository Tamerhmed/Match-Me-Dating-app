import { Button, Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';
import { GiMatchTip } from 'react-icons/gi';
import NavLink from './NavLink';
import { auth } from '@/auth';
import UserMenu from './UserMenu';

const memberLinks = [
  { href: '/members', label: 'Matches' },
  { href: '/lists', label: 'Lists' },
  { href: '/messages', label: 'Messages' },
];

export default async function TopNav() {
  const session = await auth();
  return (
    <>
      <Navbar
        maxWidth='xl'
        className='bg-tinder-400'
        classNames={{
          item: [
            'text-lg',
            'text-white',
            'uppercase',
            'data-[active=true]:text-yellow-200',
          ],
        }}
      >
        <NavbarBrand as={Link} href='/'>
          <GiMatchTip size={40} className='text-white' />
          <div className='font-bold text-3xl flex'>
            <span className='text-white'>Next</span>
            <span className='text-white'>Match</span>
          </div>
        </NavbarBrand>
        <NavbarContent justify='center'>
          <NavLink href='/members' label='Matches' />
          <NavLink href='/lists' label='Lists' />
          <NavLink href='/messages' label='Messages' />
        </NavbarContent>
        <NavbarContent justify='end'>
          {session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <>
              <Button
                as={Link}
                href='/login'
                variant='bordered'
                className='text-white border-1 border-white'
              >
                Login
              </Button>
              <Button
                as={Link}
                href='/register'
                variant='bordered'
                className='text-white border-1 border-white'
              >
                Register
              </Button>
            </>
          )}
        </NavbarContent>
      </Navbar>
    </>
  );
}
