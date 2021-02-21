<template>
    <div>aaa
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu>
            <sidebar-item v-for="route in sidebarRouters" :key="route.path" :item="route" :base-path="route.path"></sidebar-item>
        </el-menu> 
      </el-scrollbar>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import SidebarItem from './SidebarItem'
export default {
    components:{
        SidebarItem
    },
    computed:{
      ...mapGetters([
        'sidebarRouters'
      ])
    }
}
</script>
<style>

</style>