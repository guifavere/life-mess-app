<?php

namespace Infra\Http\Controllers\Auth;

use Illuminate\Support\Facades\Auth;
use Infra\Http\Controllers\Controller;
use Infra\Http\Requests\Auth\LoginUserRequest;

final class LoginUserController extends Controller
{
    public function __invoke(LoginUserRequest $request)
    {
        if (! Auth::attempt($request->validated())) {
            return back()
                ->withErrors(['email' => 'The provided credentials do not match our records.'])
                ->onlyInput('email');
        }

        $request->session()->regenerate();

        return response()->noContent();
    }
}
