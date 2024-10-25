<?php

namespace Infra\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Infra\Http\Controllers\Controller;

final class LogoutUserController extends Controller
{
    public function __invoke(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->noContent();
    }
}
