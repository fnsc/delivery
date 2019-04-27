<template>
    <div class="container-fluid">
        <div class="row d-flex">
            <div class="col-lg-12">
                <nav class="navbar justify-content-center">
                    <ul class="navbar--list">
                        <router-link tag="li" class="navbar--item" to='/' active-class='active' exact><a class="navbar--link">Home</a></router-link>
                    </ul>
                </nav>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-lg-12">
                <img src="./assets/star_wars_logo.png" alt="" class="mx-auto d-block">
            </div>
        </div>
        <div class="row mt-5 justify-content-center">
            <div class="col-lg-6">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.container-fluid {
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-image: url('./assets/background.png');
    background-size: cover;
    background-position: top;
    height: 100vh;
}
.navbar {
    &--list {
        list-style-type: none;
        margin: 0;
        padding: 10px;

    }
    &--item {
        display: inline;
        &:not(:last-child) {
            margin-right: 35px;
        }
    }
    &--link {
        &:visited, &:link {
            color: #f1f1f1;
            font-weight: bold;
            text-decoration: none;
            text-transform: uppercase;
            transition: all .2s;
            text-decoration: none;
        }
        &:hover, &:active {
            color: #edec51;
            text-decoration: none;
        }
    }
}
.active {
    color: #edec51;
}
</style>
