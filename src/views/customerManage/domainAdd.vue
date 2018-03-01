<template>
    <div>
        <div class="www-page">
            <el-form :model="query" :rules="rules" ref="query">
                <el-form-item label="渠道编号" label-width="120" prop="channelCode">
                    <el-input v-model="query.channelCode" :maxlength=40 style="width:300px;margin-bottom:10px" placeholder="渠道编号" ></el-input>
                </el-form-item>

                <el-form-item prop="channelName" label="渠道名称" label-width="120">
                    <el-input v-model="query.channelName" :maxlength=30 style="width:300px;margin-bottom:10px;" placeholder="渠道名称"></el-input>
                </el-form-item>

                <el-form-item prop="contact" label="联系人" label-width="120">
                    <el-input v-model="query.contact" :maxlength=30 style="width:300px;margin-bottom:10px;" placeholder="联系人"></el-input>
                </el-form-item>

                <el-form-item prop="mobile" label="联系方式" label-width="120">
                    <el-input v-model="query.mobile" :maxlength=30 style="width:300px;margin-bottom:10px;" placeholder="联系方式"></el-input>
                </el-form-item>

                <el-form-item prop="address" label="地址" label-width="120">
                    <el-input v-model="query.address" :maxlength=30 style="width:300px;margin-bottom:10px;" placeholder="地址"></el-input>
                </el-form-item>

                <el-form-item prop="contractNo" label="合同号" label-width="120">
                    <el-input v-model="query.contractNo" :maxlength=30 style="width:300px;margin-bottom:10px;" placeholder="合同号"></el-input>
                </el-form-item>

                <el-form-item prop="payMode" label="结算方式" label-width="120">
                    <el-input v-model="query.payMode" :maxlength=30 style="width:300px;margin-bottom:10px;" placeholder="结算方式"></el-input>
                </el-form-item>

                <el-form-item prop="remark" label="备注" label-width="120">
                    <el-input type="textarea" :rows="4" v-model="query.remark" :maxlength=30 style="width:400px;margin-bottom:10px;" placeholder="备注"></el-input>
                </el-form-item>
                <el-form-item prop="channelLink" label="渠道链接" label-width="120">
                    <el-input type="textarea" :rows="4" v-model="query.channelLink" :maxlength=100 style="width:400px;margin-bottom:10px;" placeholder="渠道链接"></el-input>
                </el-form-item>
                <el-form-item prop="mobile" label="" label-width="120">
                    <el-button @click="commit('query')">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import '@res/css/wjq/style.less';
import config from '@api/config';
import {mobile} from '@utils/validate.js';
import {trim} from '@src/utils/util';

export default {
    components: {
    },
    data() {
        return {
            query: {
                url: 'channelCode/insert',
                channelCode: '',
                channelName: '',
                contact: '',
                mobile: '',
                address: '',
                contractNo: '',
                payMode: '',
                remark: '',
                channelLink: ''
            },
            rules: {
                mobile,
                channelCode: [{required: true, message: '渠道编号不能为空', trigger: 'blur'},{ pattern:/(^\s*)(.{1,9})(\s*$)/, message: '字符长度不能超过10个',trigger:'blur'}],
                channelName: [{required: true, message: '渠道名称不能为空', trigger: 'blur'}],
                contact: [{required: true, message: '联系人不能为空', trigger: 'blur'}],
                address: [{required: true, message: '地址不能为空', trigger: 'blur'}],
                contractNo: [{required: true, message: '合同号不能为空', trigger: 'blur'}],
                payMode: [{required: true, message: '结算方式不能为空', trigger: 'blur'}]
            }
        }
    },
    computed: {
    },
    created() {
        
    },
    mounted() {
    },
    methods: {
        commit (formName) {
            this.$refs[formName].validate((valid) => {
                if (!valid) {
                    return false;
                }
                this.query.channelCode=trim(this.query.channelCode);
                config(this.query).then(response => {
                    if (response.respCode === '000000') {
                        this.$message.success(response.respMsg)
                        this.reset();
                    } else {
                        this.$message.error(response.respMsg)
                    }
                })
            });   
        },
        reset () {
            this.query = {
                url: 'channelCode/insert',
                channelCode: '',
                channelName: '',
                contact: '',
                mobile: '',
                address: '',
                contractNo: '',
                payMode: '',
                remark: '',
                channelLink: ''
            }
            
        },
        getCode () {
            config({url: 'channelCode/generateChannelCode'}).then(response => {
                if (response.respCode === '000000') {
                    this.query.channelCode = response.data;
                }
            })
        }
    }
}
</script>
<style scoped>
    
</style>
