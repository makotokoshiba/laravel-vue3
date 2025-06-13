<template>
    <v-app>
        <div>
            <nav class="p-4 bg-gray-100">
                <router-link to="/" class="mr-4">Home</router-link>
                <router-link to="/todo">Todo</router-link>
                <router-link to="/counter" class="mr-4">Counter</router-link>

            </nav>

            <main class="p-4">
                <!-- ルーティングによって切り替わる画面 -->
                <router-view />
            </main>
        </div>
    </v-app>
</template>

<script>
export default {
    name: 'AppLayout',
};
</script>