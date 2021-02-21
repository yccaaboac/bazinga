<template>
    <div>
        <el-menu-item>
            <item :icon="'message'" :title="'abc'" />
        </el-menu-item>
    </div>
</template>
<script>
import Item from './Item'
export default {
    name: 'SidebarItem',
    components:{
        Item
    },
    props:{
        item:{
            type: Object,
            required: true
        },
        basePath: {
            type: String,
            default: ''
        }
    },
    data(){
        this.onlyOneChild = null
        return {}
    },
    methods:{
        hasOneShowingChild(children=[],parent){
            const showingChildren = children.filter(item=>{
                if(item.hidden){
                    return false
                }else{
                    this.onlyOneChild = item
                    return true
                }
            })

            if(showingChildren.length ===1){
                return true
            }
            if(showingChildren.length ===0){
                this.onlyOneChild = {...parent,path:'',noShowingChildren:true}
                return true
            }
            return false
        }
    }
}
</script>
<style scoped>

</style>