import Vue from "vue";
import Router from "vue-router";
import Search from "./components/Search.vue";
import Movie from "./views/Movie.vue";
import MovieInfo from "./components/MovieInfo.vue";
import Home from "./components/Home.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/movie",
            component: Movie,
            children: [
                {
                    path: ":id",
                    component: MovieInfo,
                    beforeEnter: (to, from, next) => {
                        next();
                    }
                },
            ]
        },
        {
            path: "/search",
            name: "search",
            component: Search
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
});
