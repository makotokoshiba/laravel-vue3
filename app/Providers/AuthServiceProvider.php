<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * アプリケーションのポリシーマップ
     *
     * @var array
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * サービスの登録
     */
    public function boot()
    {
        $this->registerPolicies();

        // 追加の Gate 設定もここに書けます
    }
}
