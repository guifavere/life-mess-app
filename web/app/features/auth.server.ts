import { createCookieSessionStorage, redirect } from "@remix-run/node";

import { api, isErrorResponse, isErrorResponseWithErrors } from "./api.server";

const storage = createCookieSessionStorage({
  cookie: {
    name: 'lma__session',
    secure: process.env.NODE_ENV === 'production',
    secrets: [process.env.SESSION_SECRET],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: true,
  },
});

export const login = async ({ request, email, password }:
  { request: Request; email: string; password: string }
) => {
  const session = await storage.getSession(request.headers.get('Cookie'));

  try {
    const { data: { auth_token } } = await api.post<{ auth_token: string }>(
      '/login',
      { email, password },
    );

    session.set('authToken', auth_token);

    return {
      redirector: redirect('/', {
        headers: { 'Set-Cookie': await storage.commitSession(session) },
      }),
    };
  } catch (error) {
    if (isErrorResponseWithErrors(error)) {
      return { errors: Object.values(error.data.errors).flat() };
    }

    return isErrorResponse(error)
      ? { errors: [error.data.message] }
      : { errors: ['Unexpected error'] };
  }
};

export const logout = async (request: Request) => {
  const session = await storage.getSession(request.headers.get('Cookie'));

  const token = session.get('authToken');

  api.post('/logout', {}, { headers: { 'Authorization': `Bearer ${token}` } });

  return redirect('/login', {
    headers: { 'Set-Cookie': await storage.destroySession(session) },
  });
};

export const getAuthTokenFrom = async (request: Request) => {
  const session = await storage.getSession(request.headers.get('Cookie'));

  return session.get('authToken');
};

export const getUserFrom = async (request: Request) => {
  const token = await getAuthTokenFrom(request);

  try {
    const { data } = await api.get('/user', {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    return null;
  }
};

export const requireGuest = async (request: Request) => {
  if (await getUserFrom(request)) throw redirect('/');
};

export const requireAuth = async (request: Request) => {
  if (! await getAuthTokenFrom(request)) throw redirect('/login');
};
