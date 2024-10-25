<?php

use Domain\Models\Users\User;
use Laravel\Sanctum\Sanctum;

test('should logout the user', function () {
    Sanctum::actingAs(User::factory()->create());

    $response = $this->postJson('api/logout');

    $response->assertNoContent();
});
