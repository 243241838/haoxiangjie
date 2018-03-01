<template>
    <div>
        <div class="www-page" v-loading="loading">
            <div>
                <el-form v-show="!modify1">
                    <el-form-item label="审批通过率：" label-width="120">
                        <span style="display:inline-block;width:200px;">{{data.audit_pass_percent.dictValue}}%</span>
                        <el-button type="primary" :plain="true" v-waves @click="modify1=true;">修改</el-button>
                        <template>
                            <el-switch
                            class="www-big-switch"
                            v-model="data.audit_pass_percent.sts"
                            on-color="#13ce66"
                            off-color="#ff4949"
                            @change="change('audit_pass_percent')">
                            </el-switch><span style="color:#333;" v-if="data.audit_pass_percent.sts"> 已启用</span><span style="color:#333;" v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
                <el-form v-show="modify1" v-if="data.audit_pass_percent" v-bind:model="data.audit_pass_percent" :rules="rules1" ref="rules1">
                    <el-form-item prop="dictValue" label="审批通过率" label-width="120">
                        <el-input v-model="data.audit_pass_percent.dictValue" :maxlength=30 style="width:100px;margin-bottom:10px;" placeholder="审批通过率"></el-input>&nbsp;%&nbsp;
                        <el-button type="primary" :plain="true" v-waves @click="commit('rules1', 'audit_pass_percent')">保存</el-button>
                        <template>
                            <el-switch
                            class="www-big-switch"
                            v-model="data.audit_pass_percent.sts"
                            on-color="#13ce66"
                            off-color="#ff4949"
                            @change="change('audit_pass_percent')">
                            </el-switch><span style="color:#333;" v-if="data.audit_pass_percent.sts"> 已启用</span><span style="color:#333;" v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
            </div>
            <div>
                <el-form v-show="!modify2">
                    <el-form-item label="注册人数：" label-width="120">
                        <span style="display:inline-block;width:200px;">{{data.max_number_register_that_day.dictValue}}万</span>
                        <el-button type="primary" :plain="true" v-waves @click="modify2=true;">修改</el-button>
                        <template>
                            <el-switch
                            class="www-big-switch"
                            v-model="data.max_number_register_that_day.sts"
                            on-color="#13ce66"
                            off-color="#ff4949"
                            @change="change('max_number_register_that_day')">
                            </el-switch><span style="color:#333;" v-if="data.max_number_register_that_day.sts"> 已启用</span><span style="color:#333;" v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
                <el-form v-show="modify2" v-if="data.max_number_register_that_day" :model="data.max_number_register_that_day" :rules="rules2" ref="rules2">
                    <el-form-item prop="dictValue" label="注册人数" label-width="120">
                        <el-input v-model="data.max_number_register_that_day.dictValue" :maxlength=30 style="width:100px;margin-bottom:10px;" placeholder="注册人数"></el-input>&nbsp;万&nbsp;
                        <el-button type="primary" :plain="true" v-waves @click="commit('rules2', 'max_number_register_that_day')">保存</el-button>
                        <template>
                            <el-switch
                            class="www-big-switch"
                            v-model="data.max_number_register_that_day.sts"
                            on-color="#13ce66"
                            off-color="#ff4949"
                            @change="change('max_number_register_that_day')">
                            </el-switch><span style="color:#333;" v-if="data.max_number_register_that_day.sts"> 已启用</span><span style="color:#333;" v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
            </div>
            <div>
                <el-form v-show="!modify3">
                    <el-form-item label="放款总额：" label-width="120">
                        <span style="display:inline-block;width:200px;">{{data.max_lend_amount_current_day.dictValue}}万</span>
                        <el-button type="primary" :plain="true" v-waves @click="modify3=true;">修改</el-button>
                        <template>
                            <el-switch
                            class="www-big-switch"
                            v-model="data.max_lend_amount_current_day.sts"
                            on-color="#13ce66"
                            off-color="#ff4949"
                            @change="change('max_lend_amount_current_day')">
                            </el-switch><span style="color:#333;" v-if="data.max_lend_amount_current_day.sts"> 已启用</span><span style="color:#333;" v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
                <el-form v-show="modify3" v-if="data.max_lend_amount_current_day" :model="data.max_lend_amount_current_day" :rules="rules3" ref="rules3">
                    <el-form-item prop="dictValue" label="放款总额" label-width="120">
                        <el-input v-model="data.max_lend_amount_current_day.dictValue" :maxlength=30 style="width:100px;margin-bottom:10px;" placeholder="放款总额"></el-input>&nbsp;万&nbsp;
                        <el-button type="primary" :plain="true" v-waves @click="commit('rules3', 'max_lend_amount_current_day')">保存</el-button>
                        <template>
                            <el-switch
                            class="www-big-switch"
                            v-model="data.max_lend_amount_current_day.sts"
                            on-color="#13ce66"
                            off-color="#ff4949"
                            @change="change('max_lend_amount_current_day')">
                            </el-switch><span style="color:#333;" v-if="data.max_lend_amount_current_day.sts"> 已启用</span><span style="color:#333;" v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
            </div>
            <div>
                <el-form v-show="!modify4">
                    <el-form-item label="运营商空值比：" label-width="120">
                        <span style="display:inline-block;width:200px;">{{data.sjmh_null_percent.dictValue}}%</span>
                        <el-button type="primary" :plain="true" v-waves @click="modify4=true;">修改</el-button>
                        <template>
                            <el-switch
                            class="www-big-switch"
                            v-model="data.sjmh_null_percent.sts"
                            on-color="#13ce66"
                            off-color="#ff4949"
                            @change="change('sjmh_null_percent')">
                            </el-switch><span style="color:#333;" v-if="data.sjmh_null_percent.sts"> 已启用</span><span style="color:#333;" v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
                <el-form v-show="modify4" v-if="data.sjmh_null_percent" :model="data.sjmh_null_percent" :rules="rules4" ref="rules4">
                    <el-form-item prop="dictValue" label="运营商空值比" label-width="120">
                        <el-input v-model="data.sjmh_null_percent.dictValue" :maxlength=30 style="width:100px;margin-bottom:10px;" placeholder="运营商空值比"></el-input>&nbsp;%&nbsp;
                        <el-button type="primary" :plain="true" v-waves @click="commit('rules4', 'sjmh_null_percent')">保存</el-button>
                        <template>
                            <el-switch
                            class="www-big-switch"
                            v-model="data.sjmh_null_percent.sts"
                            on-color="#13ce66"
                            off-color="#ff4949"
                            @change="change('sjmh_null_percent')">
                            </el-switch><span style="color:#333;" v-if="data.sjmh_null_percent.sts"> 已启用</span><span style="color:#333;" v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
            </div>
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
            modify1: false,
            modify2: false,
            modify3: false,
            modify4: false,
            loading: false,
            rules1: {
                dictValue: [{required: true, pattern: /^(\d|[1-9]\d|100)(\.\d+)?$/, message: '审批通过率为0%-100%', trigger: 'blur'}]
            },
            rules2: {
                dictValue: [{required: true, pattern: /^[0-9]+$/, message: '注册人数必须是整数', trigger: 'blur'}]
            },
            rules3: {
                dictValue: [{required: true, pattern: /^[0-9]+$/, message: '放款总额必须是整数', trigger: 'blur'}]
            },
            rules4: {
                dictValue: [{required: true, pattern: /^(\d|[1-9]\d|100)(\.\d+)?$/, message: '运营商空值比为0%-100%', trigger: 'blur'}]
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
                age_range:'',
                zhima_score_range:'',
                bairong_score_range:'',
                id_card_no_pre3:'',
                id_card_no_pre6:''
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
        commit (formName, name) {
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
                        // 注册人数
                        if (item.dictName == 'max_number_register_that_day' || item.dictName == 'max_lend_amount_current_day') {
                            item.dictValue /= 10000;
                        }
                        if(item.dictName=='age_range'||item.dictName=='zhima_score_range'|| item.dictName=='bairong_score_range'){
                            item.dictValue=item.dictValue.split(",")
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
                id: this.data[param].id,
                dictValue: this.data[param].dictValue
            }
            if (param == 'max_number_register_that_day' || param == 'max_lend_amount_current_day') {
                obj.dictValue = this.data[param].dictValue * 10000;
            }
            this.loading = true;
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.$message.success(response.respMsg);
                    if (param == 'audit_pass_percent') {
                        this.modify1 = false;
                    } else if (param == 'max_number_register_that_day') {
                        this.modify2 = false;
                    } else if (param == 'max_lend_amount_current_day') {
                        this.modify3 = false;
                    } else if (param == 'sjmh_null_percent') {
                        this.modify4 = false;
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
