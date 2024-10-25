import { ActionFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/react';
import { logout } from '~/features/auth.server';

export const action = async ({ request }: ActionFunctionArgs) => logout(request);

export const loader = async () => redirect('/');
