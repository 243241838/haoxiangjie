<template>
    <div>
        <div class="www-page" v-loading="loading">
         <div>
            <el-form v-show="!modify">
                <el-form-item label="放款总额：" label-width="140">
                    <span style="display:inline-block;width:200px;">{{data.can_lend_amount_current_day.dictValue}}万</span>
                    <el-button type="primary" :plain="true" v-waves @click="modify=true;">修改</el-button>
                    <template>
                        <el-switch
                        class="www-big-switch"
                        v-model="data.can_lend_amount_current_day.sts"
                        on-color="#13ce66"
                        off-color="#ff4949"
                        @change="change('can_lend_amount_current_day')">
                        </el-switch><span style="color:#333;" v-if="data.can_lend_amount_current_day.sts">已开启</span><span style="color:#333;" v-else>已关闭</span>
                    </template>
                </el-form-item>
            </el-form>
            <el-form v-show="modify" v-if="data.can_lend_amount_current_day" v-bind:model="data.can_lend_amount_current_day" :rules="rules1" ref="query">
                <el-form-item prop="dictValue" label="放款总额" label-width="140">
                    <el-input v-model="data.can_lend_amount_current_day.dictValue" :maxlength=30 style="width:100px;margin-bottom:10px;" placeholder="放款总额"></el-input>&nbsp;万&nbsp;
                    <el-button type="primary" :plain="true" v-waves @click="commit('query','can_lend_amount_current_day')">保存</el-button>
                    <template>
                        <el-switch
                        class="www-big-switch"
                        v-model="data.can_lend_amount_current_day.sts"
                        on-color="#13ce66"
                        off-color="#ff4949"
                        @change="change('can_lend_amount_current_day')">
                        </el-switch><span style="color:#333;" v-if="data.can_lend_amount_current_day.sts">已启用</span><span style="color:#333;" v-else>已关闭</span>
                    </template>
                </el-form-item>
            </el-form>
          </div>
          <div>
            <el-form v-show="!modify1">
                <el-form-item label="对应日放款倍数：" label-width="140">
                    <span style="display:inline-block;width:200px;">{{data.corresponding_day_lend_times.dictValue}}倍</span>
                    <el-button type="primary" :plain="true" v-waves @click="modify1=true;">修改</el-button>
                    <template>
                        <el-switch
                        class="www-big-switch"
                        v-model="data.corresponding_day_lend_times.sts"
                        on-color="#13ce66"
                        off-color="#ff4949"
                        @change="change('corresponding_day_lend_times')">
                        </el-switch><span style="color:#333;" v-if="data.corresponding_day_lend_times.sts">已开启</span><span style="color:#333;" v-else>已关闭</span>
                    </template>
                </el-form-item>
            </el-form>
            <el-form v-show="modify1" v-if="data.corresponding_day_lend_times" v-bind:model="data.corresponding_day_lend_times" :rules="rules2" ref="query1">
                <el-form-item prop="dictValue" label="对应日放款倍数：" label-width="140">
                    <el-input v-model="data.corresponding_day_lend_times.dictValue" :maxlength=30 style="width:100px;margin-bottom:10px;" placeholder="放款倍数"></el-input>&nbsp;倍&nbsp;
                    <el-button type="primary" :plain="true" v-waves @click="commit('query1','corresponding_day_lend_times')">保存</el-button>
                    <template>
                        <el-switch
                        class="www-big-switch"
                        v-model="data.corresponding_day_lend_times.sts"
                        on-color="#13ce66"
                        off-color="#ff4949"
                        @change="change('corresponding_day_lend_times')">
                        </el-switch><span style="color:#333;" v-if="data.corresponding_day_lend_times.sts">已启用</span><span style="color:#333;" v-else>已关闭</span>
                    </template>
                </el-form-item>
            </el-form>
          </div>
            <el-form>
                <el-form-item label="放款通道："label-width="140">
                    <el-switch
                        class="www-big-switch"
                        v-model="data.lend_switch.sts"
                        on-color="#13ce66"
                        off-color="#ff4949"
                        @change="change('lend_switch')">
                    </el-switch><span style="color:#333;" v-if="data.lend_switch.sts">已启用</span><span style="color:#333;" v-else>已关闭</span>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import '@res/css/wjq/style.less';
import config from '@api/config';
import {mobile} from '@utils/validate.js';
import { trim } from '@src/utils/util';

export default {
    components: {
    },
    data() {
        return {
           
            systemDictPoList: null,
            modify: false,
            modify1: false,
            loading: false,
            rules1: {
                dictValue: [{required: true, pattern: /^[0-9]+$/, message: '金额必须是整数', trigger: 'blur'}]
            },
             rules2: {
                dictValue: [{required: true, pattern: /^[1-9]+$/, message: '放款倍数必须是大于零的整数', trigger: 'blur'}]
            },
            data: {
                can_lend_amount_current_day: '',
                lend_switch: '',
                audit_pass_percent: '',
                max_audit_current_day: '',
                max_lend_amount_current_day: '',
                max_number_companyName_that_day: '',
                max_number_register_that_day: '',
                sjmh_date_lose: '',
                sjmh_exception: '',
                sjmh_null_percent: '',
                corresponding_day_lend_times:""
            }
        }
    },
    computed: {
    },
    created() {
        this.getData();
        
    },
    mounted() {
    },
    methods: {
       commit (formName,name) {
            this.$refs[formName].validate((valid) => {
                if (!valid) {
                    return false;
                }
                this.change(name);
            });   
        },
        getData () {
            config({url: 'systemDict/list'}).then(response => {
                if (response.respCode === '000000') {
                    let obj = {}
                    this.systemDictPoList = response.data.systemDictPoList.map(item => {
                        obj[item.dictName] = {};
                        if (item.dictName == 'can_lend_amount_current_day') {
                            item.dictValue /= 10000;
                           }
                        if (item.dictName == 'lend_switch') {
                            item.dictValue = !!parseInt(item.dictValue);
                        }
                        obj[item.dictName].dictValue = item.dictValue;
                        
                        obj[item.dictName].sts = !!item.sts;
                        obj[item.dictName].id = item.id;
                    });
                    this.data = obj;
                    
                }
            })
        },
        change (param) {
            let obj = {
                url: 'systemDict/updateSystemDict',
                sts: this.data[param].sts ? '1' : '0',
                id: this.data[param].id
            }
            if (param == 'can_lend_amount_current_day') {
                obj.dictValue = parseInt(this.data[param].dictValue) * 10000;
                
            }
            if (param == 'lend_switch') {
                obj.dictValue = this.data[param].dictValue ? '1' : '0';
            }
            if(param == 'corresponding_day_lend_times'){
                obj.dictValue=this.data[param].dictValue;
               
            }
            this.loading = true;
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.$message.success(response.respMsg);
                    if(param=="can_lend_amount_current_day"){
                        this.modify=false
                    }else if(param=="corresponding_day_lend_times"){
                         this.modify1=false
                    }
                } else {
                    this.$message.error(response.respMsg);
                }
                this.loading = false;
            })
        }
    }
}
</script>
<style scoped>

</style>
