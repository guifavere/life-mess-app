import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { AlertCircle } from 'lucide-react';
import { z } from 'zod';
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { Form, json, useActionData } from '@remix-run/react';
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { login, requireGuest } from '~/features/auth.server';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { FormMessage, FormItem } from '~/components/ui/form';
import { get } from 'lodash-es';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  await requireGuest(request);

  const submission = parseWithZod(await request.formData(), { schema });

  if (submission.status !== 'success') {
    return json({ submission: submission.reply() }, { status: 400 });
  }

  const { redirector, errors } = await login({ request, ...submission.value });

  return redirector || json({ error: errors[0] }, { status: 400 });
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireGuest(request);

  return {};
}

export const meta = () => [{
  title: 'Sign in - Life Mess App',
}];

export default function Login() {
  const actionData = useActionData<typeof action>();

  const error = get(actionData, 'error');

  const [form, fields] = useForm({
    onValidate: ({ formData }) => parseWithZod(formData, { schema } ),
    lastResult: get(actionData, 'submission'),
    shouldValidate: 'onSubmit',
    shouldRevalidate: 'onBlur',
  });

  return (
    <main className="container flex flex-col h-screen justify-center justify-self-center md:max-w-96">
      <h1 className="text-teal-300 font-bold leading-none text-lg mb-10">
        Login to
        <strong className="block text-gray-800 text-2xl">life mess app</strong>
      </h1>
      <Form className="flex flex-col gap-y-4" id={form.id} method="post" onSubmit={form.onSubmit} noValidate>
        {error && (
          <Alert variant="destructive">
            <AlertCircle size={24} />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <FormItem>
          <Input
            autoFocus
            defaultValue={fields.email.initialValue}
            key={fields.email.key}
            name={fields.email.name}
            placeholder="email"
            type="email"
          />
          <FormMessage>{fields.email.errors}</FormMessage>
        </FormItem>
        <FormItem>
          <Input
            defaultValue={fields.password.initialValue}
            key={fields.password.key}
            name={fields.password.name}
            placeholder="password"
            type="password"
          />
          <FormMessage>{fields.password.errors}</FormMessage>
        </FormItem>
        <Button title="Login" size="lg" type="submit">Login</Button>
      </Form>
    </main>
  )
}
