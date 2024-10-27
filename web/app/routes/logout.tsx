import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { logout } from '~/features/auth.server';

export const action = ({ request }: ActionFunctionArgs) => logout(request);

export const loader = async () => redirect('/');
