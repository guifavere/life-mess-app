<?php

namespace Infra\Http\Controllers\Auth;

use Domain\Models\Users\User;
use Illuminate\Support\Facades\Hash;
use Infra\Http\Controllers\Controller;
use Infra\Http\Requests\Auth\LoginUserRequest;

final class LoginUserController extends Controller
{
    public function __invoke(LoginUserRequest $request)
    {
        $user = User::firstWhere('email', $request->email);

        return ! is_null($user) && Hash::check($request->password, $user->password)
            ? response()->json(['auth_token' => $user->createToken('auth_token', ['*'], now()->addDay())->plainTextToken])
            : response()->json(['message' => __('Invalid credentials!')], 400);
    }
}
