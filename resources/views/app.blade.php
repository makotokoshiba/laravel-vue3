<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        <!--@routes　-->
        <!-- inertiaHead -->
        @vite(['resources/js/app.js', 'resources/js/app.js'])
    </head>
    <body class="font-sans antialiased">
        <!-- 各ページがマウント -->
        <div id="app"></div>
    </body>
</html>
