<template>
  <b-navbar toggleable="sm" type="dark" variant="info">
    <b-navbar-brand href="#">Draw-Sequence</b-navbar-brand>

    <b-navbar-toggle target="nav_collapse" />

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <router-link to="/counter" class="nav-link">Counter</router-link>
        <router-link to="/add" class="nav-link">Contribute</router-link>
        <router-link to="/about" class="nav-link">About</router-link>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {};
</script>
