<?php

use Domain\Models\Users\User;
use Illuminate\Support\Facades\Auth;

test('should logout the user', function () {
    $user = User::factory()->create();

    Auth::login($user);

    $response = $this->postJson('logout');

    $response->assertNoContent();
});
