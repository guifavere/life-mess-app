<?php

use Domain\Models\Users\User;

test('should not login user with invalid credentials', function (string $email, string $password) {
    User::factory()->create([
        'email' => 'user@userland.com',
        'password' => bcrypt('password123'),
    ]);

    $response = $this->postJson('api/login', [
        'email' => $email,
        'password' => $password,
    ]);

    $response->assertJsonStructure(['message'])->assertStatus(400);
})->with([
    ['incorrect@email.com', 'password123'],
    ['user@userland.com', 'incorrect-password'],
]);

test('should login user', function () {
    User::factory()->create([
        'email' => 'user@userland.com',
        'password' => bcrypt('password123'),
    ]);

    $response = $this->postJson('api/login', [
        'email' => 'user@userland.com',
        'password' => 'password123',
    ]);

    $response->assertStatus(200)->assertJsonStructure(['auth_token']);
});
