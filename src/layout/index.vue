<template>
  <div>
    <sidebar />
    <div>
      <div>
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import {AppMain,Navbar,Sidebar} from './components'
// import AppMain from './components/AppMain'
// import Navbar from './components/Navbar'
// import Sidebar from './components/Sidebar'
// ...
export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    Sidebar
  }
}
</script>