import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Movie from "./views/Movie.vue";
import MovieInfo from "./components/MovieInfo.vue";

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
            // component: () => import('./views/Movie.vue'),
            children: [
                {
                    path: ":id",
                    component: MovieInfo,
                    beforeEnter: (to, from, next) => {
                        next();
                    }
                },
            ]
        }
    ]
});
