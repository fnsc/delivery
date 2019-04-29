<template>
    <div class="container">
        <div class="row d-flex">
            <div class="col-lg-12">
                <navbar></navbar>
            </div>
        </div>
        <router-view></router-view>
        <footer-component></footer-component>
    </div>
</template>
<script>
import Navbar from "./components/Navbar";
import FooterComponent from "./components/Footer";

export default {
    components: { Navbar, FooterComponent }
};
</script>

<style lang="scss">
body {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
    font-family: "Roboto", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #373737;
    background-size: cover;
    background-position: top;
    // width: 100vw;
    // min-height: 100vh;
}
router-view {
    min-height: 95vh;
}
</style>
