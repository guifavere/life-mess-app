import { Form, useActionData } from '@remix-run/react';

import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { login, requireGuest } from '~/features/auth.server';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export const action = async ({ request }: ActionFunctionArgs) => {
  await requireGuest(request);

  const formData = await request.formData();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { redirector, errors } = await login({ request, email, password });

  return redirector || { error: errors[0] };
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireGuest(request);

  return {};
}

export const meta = () => [{
  title: 'Sign in - Life Mess App',
}];

export default function Login() {
  const data = useActionData<typeof action>();

  const error = data !== undefined && 'error' in data ? data.error : null;

  return (
    <main className="container flex flex-col h-screen justify-center justify-self-center md:max-w-96">
      <h1 className="text-teal-300 font-bold leading-none text-lg mb-10">
        Login to
        <strong className="block text-gray-800 text-2xl">life mess app</strong>
      </h1>
      <Form className="flex flex-col gap-y-4" method="post" noValidate>
        {error && (
          <Alert variant="destructive">
            <AlertCircle size={24} />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Input autoFocus type="email" id="email" name="email" placeholder="email" />
        <Input type="password" id="password" name="password" placeholder="password" />
        <Button title="Login" size="lg" type="submit">Login</Button>
      </Form>
    </main>
  )
}
