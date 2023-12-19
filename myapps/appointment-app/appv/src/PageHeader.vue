<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Employee App</a>    
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">        
        <li class="nav-item">
          <a class="nav-link" href="/employee/list">Search Employee</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/employee/create">New Employee</a>
        </li>
      </ul>
    </div>
    <div class="d-flex">    
        <span>User!!!</span>
        <button className="btn btn-info" type="button">Logout</button>
    </div>
  </div>
</nav>
    
</template>

<script>


export default {
  name: 'PageHeader'
}
</script>

<style scoped>

</style>
