<template>
    <div>
        <div class="www-page" v-loading="loading">
            <div style="font-size:12px;color:#666666;padding-bottom:20px;">配置分流至算话的订单属性</div>
            <div>
                <el-form v-show="!modify3">
                    <el-form-item label="算话分流通道:" label-width="210">
                        <template>
                            <el-switch class="www-big-switch" v-model="data.suanhua_rule_switch.sts" on-color="#13ce66" off-color="#ff4949" @change="change('suanhua_rule_switch')">
                            </el-switch><span style="color:#333;" v-if="data.suanhua_rule_switch.sts"> 已启用</span><span style="color:#333;"
                                v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
            </div>
            <div>
                <el-form v-show="!modify1">
                    <el-form-item label="授信订单号尾号:" label-width="210">
                        <span style="display:inline-block;width:200px;">{{data.apply_no_tail_no.dictValue}}</span>
                        <el-button type="primary" :plain="true" v-waves @click="modify1=true">修改</el-button>
                        <template>
                            <el-switch class="www-big-switch" v-model="data.apply_no_tail_no.sts" on-color="#13ce66" off-color="#ff4949" @change="send('apply_no_tail_no')">
                            </el-switch><span style="color:#333;" v-if="data.apply_no_tail_no.sts"> 已启用</span><span style="color:#333;"
                                v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
                <el-form v-show="modify1" v-if="data.apply_no_tail_no" v-bind:model="data.apply_no_tail_no" ref="rules1">
                    <el-form-item label="授信订单号尾号:" label-width="210" required>
                        <el-input v-model="data.apply_no_tail_no.dictValue" :maxlength=30 style="width:260px;margin-bottom:10px;" placeholder="授信订单号最后两位，多个用逗号隔开"></el-input>
                        <el-button type="primary" :plain="true" v-waves @click="commit('apply_no_tail_no')">保存</el-button>
                        <template>
                            <el-switch class="www-big-switch" v-model="data.apply_no_tail_no.sts" on-color="#13ce66" off-color="#ff4949" @change="change('apply_no_tail_no')">
                            </el-switch><span style="color:#333;" v-if="data.apply_no_tail_no.sts"> 已启用</span><span style="color:#333;"
                                v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
            </div>
            <div>
                <el-form v-show="!modify2">
                    <el-form-item label="申请时间阈值（到＊H＊分）:" label-width="210">
                        <div style="display:inline-block; min-width:200px;">
                            <span>{{data.suanhua_start_time.dictValue}}</span>
                            <span v-if="data.suanhua_start_time.dictValue"> ~ </span>
                            <span>{{data.suanhua_end_time.dictValue}}</span>
                        </div>
                        <el-button type="primary" :plain="true" v-waves @click="modify2=true">修改</el-button>
                        <template>
                            <el-switch class="www-big-switch" v-model="data.suanhua_start_time.sts" on-color="#13ce66" off-color="#ff4949" @change="sendtime('suanhua_start_time')">
                            </el-switch><span style="color:#333;" v-if="data.suanhua_start_time.sts"> 已启用</span><span style="color:#333;"
                                v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
                <el-form v-show="modify2" v-if="data.suanhua_start_time" v-bind:model="data.suanhua_start_time" ref="rules1">
                    <el-form-item label="申请时间阈值（到＊H＊分）:" label-width="210" >
                       <el-date-picker v-model="timearr"   :editable="false" type="datetimerange"  range-separator="至"  start-placeholder="开始日期"  end-placeholder="结束日期"></el-date-picker>
                       <el-button type="primary" :plain="true" v-waves @click="check('suanhua_start_time')">保存</el-button>
                        <template>
                            <el-switch class="www-big-switch" v-model="data.suanhua_start_time.sts" on-color="#13ce66" off-color="#ff4949" @change="changeinfo('suanhua_start_time')">
                            </el-switch><span style="color:#333;" v-if="data.suanhua_start_time.sts"> 已启用</span><span style="color:#333;"
                                v-else> 已关闭</span>
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
    import {
        mobile
    } from '@utils/validate.js';
    import {
        trim
    } from '@src/utils/util';

    export default {
        components: {},
        data() {
            return {
                systemDictPoList: null,
                modify1: false,
                modify2: false,
                modify3: false,
                loading: false,
                timearr: [],
                pickstart: "",
                pickend: "",
                data: {
                    suanhua_rule_switch: "",
                    apply_no_tail_no: "",
                    suanhua_start_time: "",
                    suanhua_end_time: ""
                }
            }
        },
        computed: {},
        created() {
            this.getData();
             
        },
        mounted() {
          
        },
        methods: {
             ClearNullArr(arr) {
                for (var i = 0, len = arr.length; i < len; i++) {
                    if (!arr[i] || arr[i] == '' || arr[i] === undefined) {
                        arr.splice(i, 1);
                        len--;
                        i--;
                    }
                }
                return arr;
            },
       commit(name) {
                if (this.data[name].dictValue == "") {
                    this.change(name);
                } else {
                    let arr = this.data[name].dictValue.split(",");
                    let reg = /^\d{2}$/;
                    for (let i = 0; i < arr.length; i++) {
                        let newvalue = trim(arr[i]);
                        if (!reg.test(newvalue)) {
                            this.$message({
                                message: '授信订单号最后2位必须是两位整数，多个用逗号隔开',
                                type: 'warning'
                            })
                            return false
                        }
                    };
                    //验证订单尾号是否有重复的数字
                    let newarr = [];
                    for (let j = 0; j < arr.length; j++) {
                        let newvalue = trim(arr[j]);
                        newarr.push(newvalue);
                    }
                    let str = newarr.join(",") + ",";
                    for (let i = 0; i < newarr.length; i++) {
                        if (str.replace(newarr[i] + ",", "").indexOf(newarr[i] + ",") > -1) {
                            this.$message({
                                message: '授信订单号最后2位有重复的数字',
                                type: 'warning'
                            })
                            return false
                        }
                    };


                    this.change(name)
                };

            },
            check(name) {
                  this.timearr = this.ClearNullArr(this.timearr);
                  if(this.timearr.length>0){
                    this.pickstart = this.passagetime(this.timearr[0]);
                    this.pickend = this.passagetime(this.timearr[1]);
                    this.changetime(name)
                    }else{
                    this.pickstart = "";
                    this.pickend = "";
                    this.changetime(name)
                    
                }
            },
            passagetime(time) {
                let year= new Date(time).getFullYear();
                let month=new Date(time).getMonth()+1;
                let dayd= new Date(time).getDate();
                let hour = new Date(time).getHours();
                let minute = new Date(time).getMinutes();
                let second = new Date(time).getSeconds();
                return   year+"-"+this.add(month)+"-"+this.add(dayd)+" "+this.add(hour) + ":" + this.add(minute) + ":" + this.add(second)
            },
            add(s) {
                return s < 10 ? '0' + s : s;
            },
            getData() {
                config({
                    url: 'systemDict/list'
                }).then(response => {
                    if (response.respCode === '000000') {
                        let obj = {}
                        this.systemDictPoList = response.data.systemDictPoList.map(item => {
                            obj[item.dictName] = {};
                            if (item.dictName == 'apply_no_tail_no' ||
                                item.dictName=='suanhua_rule_switch') {
                                obj[item.dictName].dictValue = item.dictValue;
                                obj[item.dictName].sts = !!item.sts;
                                obj[item.dictName].id = item.id;
                            }
                            if(item.dictName =='suanhua_start_time'|| item.dictName == 'suanhua_end_time'){
                                obj[item.dictName].dictValue = item.dictValue.substring(0,16);
                                obj[item.dictName].sts = !!item.sts;
                                obj[item.dictName].id = item.id;
                            }
                               
                        });
                        this.data = obj;
                     
                        this.timearr = [];
                        if(this.data.suanhua_start_time.dictValue!=""){
                             this.timearr.push(new Date(Date.parse(this.data.suanhua_start_time.dictValue.replace(/-/g,   "/"))));
                        }
                        if(this.data.suanhua_end_time.dictValue!=""){
                             this.timearr.push(new Date(Date.parse(this.data.suanhua_end_time.dictValue.replace(/-/g,   "/"))));
                        }
                      
                       

                    }
                })
            },
            send(param) {

                let obj = {
                    url: 'systemDict/updateSystemDict',
                    sts: this.data[param].sts ? '1' : '0',
                    id: this.data[param].id,
                    dictValue: ""
                };
                if (param == 'apply_no_tail_no') {
                    obj.dictValue = this.data[param].dictValue;
                };
                this.loading = true;
                config(obj).then(response => {
                    if (response.respCode === '000000') {
                        this.$message.success(response.respMsg);
                    } else {
                        this.$message.error(response.respMsg);
                    }
                    this.loading = false;
                })

            },
            sendtime(param) {
                if (param == 'suanhua_start_time') {
                    let obj1 = {
                        url: 'systemDict/updateSystemDict',
                        sts: this.data[param].sts ? '1' : '0',
                        id: this.data[param].id,
                        dictValue: this.data[param].dictValue
                    }
                    let obj2 = {
                        url: 'systemDict/updateSystemDict',
                        sts: this.data.suanhua_start_time.sts ? '1' : '0',
                        id: this.data.suanhua_end_time.id,
                        dictValue: this.data.suanhua_end_time.dictValue
                    }
                    this.loading = true;
                    config(obj1).then(response => {
                        if (response.respCode === '000000') {
                            config(obj2).then(response => {
                                if (response.respCode === '000000') {
                                    this.$message.success(response.respMsg);
                                    this.modify2 = false;
                                    this.getData();
                                } else {
                                    this.$message.error(response.respMsg);
                                }
                            })
                        } else {
                            this.$message.error(response.respMsg);
                        }
                        this.loading = false;
                    })




                }

            },
            change(param) {
                let obj = {
                    url: 'systemDict/updateSystemDict',
                    sts: this.data[param].sts ? '1' : '0',
                    id: this.data[param].id,
                    dictValue: ""
                }
                if (param == 'apply_no_tail_no') {
                    let str = this.data[param].dictValue;
                    if (str == "") {
                        obj.dictValue = "";
                    } else {
                        let arr = this.data[param].dictValue.split(",");
                        let newarr = [];
                        for (let i = 0; i < arr.length; i++) {
                            newarr.push(trim(arr[i]))
                        }
                        obj.dictValue = newarr.join(",")
                    }
                }
                if(param =='suanhua_rule_switch'){
                    obj.dictValue=this.data[param].dictValue
                }
                this.loading = true;
                config(obj).then(response => {
                    if (response.respCode === '000000') {
                        this.$message.success(response.respMsg);
                        if (param == 'apply_no_tail_no') {
                            this.modify1 = false;
                        } else if (param == 'suanhau_zmxy_score') {
                            this.modify2 = false;
                        } else if (param == 'suanhua_age') {
                            this.modify3 = false;

                        }
                    } else {
                        this.$message.error(response.respMsg);
                    }
                    this.loading = false;
                })
            },
            changetime(param) {
                if (param=='suanhua_start_time') {
                    let obj1 = {
                        url: 'systemDict/updateSystemDict',
                        sts: this.data[param].sts ? '1' : '0',
                        id: this.data[param].id,
                        dictValue: this.pickstart
                    }
                    let obj2 = {
                        url: 'systemDict/updateSystemDict',
                        sts: this.data.suanhua_start_time.sts ? '1' : '0',
                        id: this.data.suanhua_end_time.id,
                        dictValue: this.pickend
                    }
                    this.loading = true;
                    config(obj1).then(response => {
                        if (response.respCode === '000000') {
                            config(obj2).then(response => {
                                if (response.respCode === '000000') {
                                    this.$message.success(response.respMsg);
                                    this.modify2 = false;
                                    this.getData();
                                } else {
                                    this.$message.error(response.respMsg);
                                }
                            })
                        } else {
                            this.$message.error(response.respMsg);
                        }
                        this.loading = false;
                    })

                }
            },
            changeinfo(param) {
                if (this.pickstart == "" || this.pickend == "") {
                    let obj1 = {
                        url: 'systemDict/updateSystemDict',
                        sts: this.data[param].sts ? '1' : '0',
                        id: this.data[param].id,
                        dictValue: this.data[param].dictValue
                    }
                    let obj2 = {
                        url: 'systemDict/updateSystemDict',
                        sts: this.data.suanhua_start_time.sts ? '1' : '0',
                        id: this.data.suanhua_end_time.id,
                        dictValue: this.data.suanhua_end_time.dictValue
                    }
                    this.loading = true;
                    config(obj1).then(response => {
                        if (response.respCode === '000000') {
                            config(obj2).then(response => {
                                if (response.respCode === '000000') {
                                    this.$message.success(response.respMsg);
                                    this.modify2 = false;
                                    this.getData();
                                } else {
                                    this.$message.error(response.respMsg);
                                }
                            })
                        } else {
                            this.$message.error(response.respMsg);
                        }
                        this.loading = false;
                    })



                } else {
                    let obj1 = {
                        url: 'systemDict/updateSystemDict',
                        sts: this.data[param].sts ? '1' : '0',
                        id: this.data[param].id,
                        dictValue: this.pickstart
                    }
                    let obj2 = {
                        url: 'systemDict/updateSystemDict',
                        sts: this.data.suanhua_start_time.sts ? '1' : '0',
                        id: this.data.suanhua_end_time.id,
                        dictValue: this.pickend
                    }
                    this.loading = true;
                    config(obj1).then(response => {
                        if (response.respCode === '000000') {
                            config(obj2).then(response => {
                                if (response.respCode === '000000') {
                                    this.$message.success(response.respMsg);
                                    this.modify2 = false;
                                    this.getData();
                                } else {
                                    this.$message.error(response.respMsg);
                                }
                            })
                        } else {
                            this.$message.error(response.respMsg);
                        }
                        this.loading = false;
                    })




                }

            }
        }
    }
</script>
<style scoped>

</style>