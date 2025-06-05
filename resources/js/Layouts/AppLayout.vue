<template>
    <div>
        <nav class="p-4 bg-gray-100">
            <router-link to="/" class="mr-4">Home</router-link>
            <router-link to="/todo">Todo</router-link>
        </nav>

        <main class="p-4">
            <!-- ルーティングによって切り替わる画面 -->
            <router-view />
        </main>
    </div>
</template>

<script>
export default {
    name: 'AppLayout',
};
</script>