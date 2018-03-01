<template>
    <div class="app-container">
        <el-button class="www-v-button" @click="dialog=true;">修改</el-button>
        <div class="filter-container">
            <el-row>
                <el-col :span="20" :offset="1" >
                    <el-form label-width="150px" class="credit-aplly-form">
                        <div v-if="channelCodeDetail && channelCodeDetail.channelCode"><el-form-item label="渠道编号:">{{channelCodeDetail.channelCode}}</el-form-item></div>
                        <div v-else><el-form-item label="渠道编号:"></el-form-item></div>
                        
                        <div v-if="channelCodeDetail && channelCodeDetail.channelName"><el-form-item label="渠道名称:">{{channelCodeDetail.channelName}}</el-form-item></div>
                        <div v-else><el-form-item label="渠道名称:"></el-form-item></div>

                        <div v-if="channelCodeDetail && channelCodeDetail.contact"><el-form-item label="联系人:">{{channelCodeDetail.contact}}</el-form-item></div>
                        <div v-else><el-form-item label="联系人:"></el-form-item></div>

                        <div v-if="channelCodeDetail && channelCodeDetail.mobile"><el-form-item label="联系方式:">{{channelCodeDetail.mobile}}</el-form-item></div>
                        <div v-else><el-form-item label="联系方式:"></el-form-item></div>

                        <div v-if="channelCodeDetail && channelCodeDetail.address"><el-form-item label="地址:">{{channelCodeDetail.address}}</el-form-item></div>
                        <div v-else><el-form-item label="地址:"></el-form-item></div>

                        <div v-if="channelCodeDetail && channelCodeDetail.contractNo"><el-form-item label="合同号:">{{channelCodeDetail.contractNo}}</el-form-item></div>
                        <div v-else><el-form-item label="合同号:"></el-form-item></div>

                        <div v-if="channelCodeDetail && channelCodeDetail.payMode"><el-form-item label="结算方式:">{{channelCodeDetail.payMode}}</el-form-item></div>
                        <div v-else><el-form-item label="结算方式:"></el-form-item></div>

                        <div v-if="channelCodeDetail && channelCodeDetail.remark"><el-form-item label="备注:">{{channelCodeDetail.remark}}</el-form-item></div>
                        <div v-else><el-form-item label="备注:"></el-form-item></div>

                        <div v-if="channelCodeDetail && channelCodeDetail.channelLink"><el-form-item label="渠道链接:">{{channelCodeDetail.channelLink}}</el-form-item></div>
                        <div v-else><el-form-item label="渠道链接:"></el-form-item></div>

                        <div v-if="channelCodeDetail && channelCodeDetail.status">
                            <el-form-item label="状态:">
                                <span v-if="channelCodeDetail.status==1">启用</span>
                                <span v-else>禁用</span>
                            </el-form-item>
                        </div>
                        <div v-else><el-form-item label="状态:"></el-form-item></div>
                    </el-form>
                </el-col>
            </el-row>
        </div>
        <el-dialog title="渠道修改" :visible.sync="dialog">
            <el-form v-if="secondDetail" :model="secondDetail" :rules="rules" ref="secondDetail">
                <el-form-item label="渠道编号" label-width="120">
                    <el-input v-model="secondDetail.channelCode" :maxlength=30 style="width:300px;margin-bottom:10px" disabled></el-input>
                </el-form-item>

                <el-form-item prop="channelName" label="渠道名称" label-width="120">
                    <el-input v-model="secondDetail.channelName" :maxlength=30 style="width:300px;margin-bottom:10px;" placeholder="渠道名称"></el-input>
                </el-form-item>

                <el-form-item prop="contact" label="联系人" label-width="120">
                    <el-input v-model="secondDetail.contact" :maxlength=30 style="width:300px;margin-bottom:10px;" placeholder="联系人"></el-input>
                </el-form-item>

                <el-form-item prop="mobile" label="联系方式" label-width="120">
                    <el-input v-model="secondDetail.mobile" :maxlength=30 style="width:300px;margin-bottom:10px;" placeholder="联系方式"></el-input>
                </el-form-item>

                <el-form-item prop="address" label="地址" label-width="120">
                    <el-input v-model="secondDetail.address" :maxlength=30 style="width:300px;margin-bottom:10px;" placeholder="地址"></el-input>
                </el-form-item>

                <el-form-item prop="contractNo" label="合同号" label-width="120">
                    <el-input v-model="secondDetail.contractNo" :maxlength=30 style="width:300px;margin-bottom:10px;" placeholder="合同号"></el-input>
                </el-form-item>

                <el-form-item prop="payMode" label="结算方式" label-width="120">
                    <el-input v-model="secondDetail.payMode" :maxlength=30 style="width:300px;margin-bottom:10px;" placeholder="结算方式"></el-input>
                </el-form-item>

                <el-form-item prop="remark" label="备注" label-width="120">
                    <el-input type="textarea" :rows="4" v-model="secondDetail.remark" :maxlength=30 style="width:400px;margin-bottom:10px;" placeholder="备注"></el-input>
                </el-form-item>
                <el-form-item prop="channelLink" label="渠道链接" label-width="120">
                    <el-input type="textarea" :rows="4" v-model="secondDetail.channelLink" :maxlength=30 style="width:400px;margin-bottom:10px;" placeholder="渠道链接"></el-input>
                </el-form-item>
                <el-form-item prop="mobile" label="" label-width="120">
                    <el-button @click="commit('secondDetail')">提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
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
            query: {
                url: 'channelCode/detail',
                id: this.$route.query.id
            },
            dialog: false,
            channelCodeDetail: null,
            secondDetail: null,
            rules: {
                mobile,
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
    watch: {
        dialog () {
            if (!this.dialog) {
                this.secondDetail = Object.assign({}, this.channelCodeDetail);
            }
            return this.dialog;
        }
    },
    created() {
        this.getDetail();
    },
    mounted() {
    },
    methods: {
        getDetail () {
            config(this.query).then(response => {
                if (response.respCode === '000000') {
                    this.channelCodeDetail = response.data.channelCodeDetail;
                    this.secondDetail = Object.assign({}, this.channelCodeDetail);
                }
            })
        },
        commit (formName) {
            this.$refs[formName].validate((valid) => {
                if (!valid) {
                    return false;
                }
                this.secondDetail.url = 'channelCode/update';
                config(this.secondDetail).then(response => {
                    if (response.respCode === '000000') {
                        this.$message.success(response.respMsg)
                        this.dialog = false;
                        this.getDetail();
                    } else {
                        this.$message.error(response.respMsg)
                    }
                })
            });   
        }
    }
}
</script>
<style lang="less" scoped>
.app-container {
    position: relative;
    margin: 10px 10px 0 10px;
}

.app-container .filter-container {
    margin-top: 20px;
}

.app-container .filter-container .rightData {
    margin-right: 100px;
}
.www-v-button{
    position:absolute;
    left: 500px;
    z-index:1;
}
</style>
