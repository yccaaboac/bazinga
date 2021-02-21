<template>
    <el-row :gutter="40">
        <el-col :xs="12" :sm="12" :lg="6">
            <div>
                <div>
                    <svg-icon icon-class="peoples" />
                </div>
                <div>
                    <div>
                        New Visits
                    </div>
                    <count-to :start-val="0" :end-val="102400" :duration="2600"/>
                </div>
            </div>
        </el-col>

        <el-col :xs="12" :sm="12" :lg="6">
            <div>
                <div>
                    <svg-icon icon-class="message" />
                </div>
                <div>
                    <div>
                        Messages
                    </div>
                    <count-to :start-val="0" :end-val="81212" :duration="3000"/>
                </div>
            </div>
        </el-col>

        <el-col :xs="12" :sm="12" :lg="6">
            <div>
                <div>
                    <svg-icon icon-class="money"/>
                </div>
                <div>
                    <div>
                        Purchases
                    </div>
                    <count-to :start-val="0" :end-val="9280" :duration="3200"/>
                </div>
            </div>
        </el-col>

        <el-col :xs="12" :sm="12" :lg="6">
            <div>
                <div>
                    <svg-icon icon-class="shopping"/>
                </div>
                <div>
                    <div>
                        Shoppings
                    </div>
                    <count-to :start-val="0" :end-val="13600" :duration="3600"/>
                </div>
            </div>
        </el-col>

       
    </el-row>
</template>
<script>
import CountTo from 'vue-count-to'
export default {
    components: {
        CountTo
    }
}
</script>