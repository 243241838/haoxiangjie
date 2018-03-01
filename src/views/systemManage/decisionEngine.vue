<template>
    <div>
        <div class="www-page" v-loading="loading">
            <div>
                <el-form v-show="!modify0">
                    <el-form-item label="人工阈值通道" label-width="218">
                        <template>
                            <el-switch class="www-big-switch" v-model="data.manual_audit_switch.sts" on-color="#13ce66" off-color="#ff4949" @change="change('manual_audit_switch')">
                            </el-switch><span style="color:#333;" v-if="data.manual_audit_switch.sts"> 已启用</span><span style="color:#333;"
                                v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
            </div>
            <div>
                <el-form v-show="!modify1">
                    <el-form-item label="借据尾号最后1位" label-width="218">
                        
                        <span style="display:inline-block;width:200px;">{{data.order_no_tail1.dictValue}}</span>
                        <el-button type="primary" :plain="true" v-waves @click="modify1=true;">修改</el-button>
                        <template>
                            <el-switch class="www-big-switch" v-model="data.order_no_tail1.sts" on-color="#13ce66" off-color="#ff4949" @change="change('order_no_tail1')">
                            </el-switch><span style="color:#333;" v-if="data.order_no_tail1.sts"> 已启用</span><span style="color:#333;"
                                v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
                <el-form v-show="modify1" v-if="data.order_no_tail1" v-bind:model="data.order_no_tail1" style="padding-bottom:5px;">
                    <el-form-item prop="dictValue" label="借据尾号最后1位" label-width="202" style="display:inline-block;">
                        <el-input v-model="data.order_no_tail1.dictValue" :maxlength=30 style="width:250px;margin-bottom:10px;margin:0px 24px;" placeholder="借据尾号最后一位，多个用逗号隔开"></el-input>
                    </el-form-item>
                    <el-button type="primary" :plain="true" v-waves @click="commit('order_no_tail1')">保存</el-button>
                    <template>
                        <el-switch class="www-big-switch" v-model="data.order_no_tail1.sts" on-color="#13ce66" off-color="#ff4949" @change="change('order_no_tail1')">
                        </el-switch><span style="color:#333;" v-if="data.order_no_tail1.sts"> 已启用</span><span style="color:#333;" v-else> 已关闭</span>
                    </template>
                </el-form>
            </div>
            <div>
                <el-form v-show="!modify2">
                    <el-form-item label="借据尾号最后2位" label-width="218">
                        <span style="display:inline-block;width:200px;">{{data.order_no_tail2.dictValue}}</span>
                        <el-button type="primary" :plain="true" v-waves @click="modify2=true;">修改</el-button>
                        <template>
                            <el-switch class="www-big-switch" v-model="data.order_no_tail2.sts" on-color="#13ce66" off-color="#ff4949" @change="change('order_no_tail2')">
                            </el-switch><span style="color:#333;" v-if="data.order_no_tail2.sts"> 已启用</span><span style="color:#333;"
                                v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
                <el-form v-show="modify2" v-if="data.order_no_tail2" v-bind:model="data.order_no_tail2" ref="rules2" style="padding-bottom:5px;">
                    <el-form-item prop="dictValue" label="借据尾号最后2位" label-width="202" style="display:inline-block;">
                        <el-input v-model="data.order_no_tail2.dictValue" :maxlength=30 style="width:250px;margin-bottom:10px;margin:0px 24px;" placeholder="借据尾号最后两位，多个用逗号隔开"></el-input>
                    </el-form-item>
                    <el-button type="primary" :plain="true" v-waves @click="commit('order_no_tail2')">保存</el-button>
                    <template>
                        <el-switch class="www-big-switch" v-model="data.order_no_tail2.sts" on-color="#13ce66" off-color="#ff4949" @change="change('order_no_tail2')">
                        </el-switch><span style="color:#333;" v-if="data.order_no_tail2.sts"> 已启用</span><span style="color:#333;" v-else> 已关闭</span>
                    </template>
                </el-form>
            </div>
            <div>
                <el-form v-show="!modify3">
                    <el-form-item label="身份证前6位" label-width="218" style="display:inline-block;">
                        <span style="display:inline-block;min-width:200px;">{{data.manual_iden_no_pre6.dictValue}}</span>
                        <el-button type="primary" :plain="true" v-waves @click="modify3=true;">修改</el-button>
                        <template>
                            <el-switch class="www-big-switch" v-model="data.manual_iden_no_pre6.sts" on-color="#13ce66" off-color="#ff4949" @change="change('manual_iden_no_pre6')">
                            </el-switch><span style="color:#333;" v-if="data.manual_iden_no_pre6.sts"> 已启用</span><span style="color:#333;"
                                v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
                <el-form v-show="modify3" v-if="data.manual_iden_no_pre6" v-bind:model="data.manual_iden_no_pre6" ref="rules3" style="padding-bottom:5px;">
                    <el-form-item prop="dictValue" label="身份证前6位" label-width="202" style="display:inline-block;">
                        <el-input v-model="data.manual_iden_no_pre6.dictValue" :maxlength=70 style="width:540px;margin-bottom:10px;margin:0px 24px;"
                            placeholder="多个用逗号隔开"></el-input>
                    </el-form-item>
                    <el-button type="primary" :plain="true" v-waves @click="commit('manual_iden_no_pre6')">保存</el-button>
                    <template>
                        <el-switch class="www-big-switch" v-model="data.manual_iden_no_pre6.sts" on-color="#13ce66" off-color="#ff4949" @change="change('manual_iden_no_pre6')">
                        </el-switch><span style="color:#333;" v-if="data.manual_iden_no_pre6.sts"> 已启用</span><span style="color:#333;"
                            v-else> 已关闭</span>
                    </template>
                </el-form>
            </div>
            <div>
                <el-form v-show="!modify4">
                    <el-form-item label="芝麻信用分区间" label-width="218">
                        <div style="display:inline-block;width:200px;">
                            <span>{{data.manual_audit_zhima_score.dictValuefirst}}<i v-if="data.manual_audit_zhima_score.dictValuefirst">~</i></span>
                            <span>{{data.manual_audit_zhima_score.dictValuesecond}}</span>
                        </div>
                        <el-button type="primary" :plain="true" v-waves @click="modify4=true;">修改</el-button>
                        <template>
                            <el-switch class="www-big-switch" v-model="data.manual_audit_zhima_score.sts" on-color="#13ce66" off-color="#ff4949" @change="change('manual_audit_zhima_score')"
                                style="vertical-align:top;margin-top:7px;">
                            </el-switch><span style="color:#333;vertical-align:top;" v-if="data.manual_audit_zhima_score.sts"> 已启用</span>
                            <span style="color:#333;vertical-align:top;" v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
                <el-form v-show="modify4" v-if="data.manual_audit_zhima_score" v-bind:model="data.manual_audit_zhima_score" :rules="rules1"
                    ref="rules4">
                    <el-form-item label="芝麻信用分区间" label-width="202" style="display:inline-block;" prop='dictValuefirst'>
                        <el-input v-model="data.manual_audit_zhima_score.dictValuefirst" :maxlength=30 style="width:104px;margin-bottom:10px;margin-left:24px;"
                            placeholder="60"></el-input>
                        <span style="display:inline-block;padding:0px 10px;">~</span>
                    </el-form-item>
                    <el-form-item style="display:inline-block;" prop='dictValuesecond'>
                        <el-input v-model="data.manual_audit_zhima_score.dictValuesecond" :maxlength=30 style="width:104px;margin-bottom:10px;margin-right:24px;"
                            placeholder="90"></el-input>
                    </el-form-item>
                    <el-button type="primary" :plain="true" v-waves @click="check('rules4','manual_audit_zhima_score')">保存</el-button>
                    <template>
                        <el-switch class="www-big-switch" v-model="data.manual_audit_zhima_score.sts" on-color="#13ce66" off-color="#ff4949" @change="change('manual_audit_zhima_score')">
                        </el-switch><span style="color:#333;" v-if="data.manual_audit_zhima_score.sts"> 已启用</span><span style="color:#333;"
                            v-else> 已关闭</span>
                    </template>
                </el-form>
            </div>
            <div>
                <el-form v-show="!modify5">
                    <el-form-item label="芝麻欺诈分阈值" label-width="218">
                        <div style="display:inline-block;width:200px;">
                            <span>{{data.manual_audit_cheat_score.dictValuefirst}}<i v-if="data.manual_audit_cheat_score.dictValuefirst">~</i></span>
                            <span>{{data.manual_audit_cheat_score.dictValuesecond}}</span>
                        </div>
                        <el-button type="primary" :plain="true" v-waves @click="modify5=true;">修改</el-button>
                        <template>
                            <el-switch class="www-big-switch" v-model="data.manual_audit_cheat_score.sts" on-color="#13ce66" off-color="#ff4949" @change="change('manual_audit_cheat_score')"
                                style="vertical-align:top;margin-top:7px;">
                            </el-switch><span style="color:#333;vertical-align:top;" v-if="data.manual_audit_cheat_score.sts"> 已启用</span>
                            <span style="color:#333;vertical-align:top;" v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
                <el-form v-show="modify5" v-if="data.manual_audit_cheat_score" v-bind:model="data.manual_audit_cheat_score" :rules="rules2"
                    ref="rules5">
                    <el-form-item label="芝麻欺诈分阈值" label-width="202" style="display:inline-block;" prop='dictValuefirst'>
                        <el-input v-model="data.manual_audit_cheat_score.dictValuefirst" :maxlength=30 style="width:104px;margin-bottom:10px;margin-left:24px;"
                            placeholder="60"></el-input>
                        <span style="display:inline-block;padding:0px 10px;">~</span>
                    </el-form-item>
                    <el-form-item style="display:inline-block;" prop='dictValuesecond'>
                        <el-input v-model="data.manual_audit_cheat_score.dictValuesecond" :maxlength=30 style="width:104px;margin-bottom:10px;margin-right:24px;"
                            placeholder="90"></el-input>
                    </el-form-item>
                    <el-button type="primary" :plain="true" v-waves @click="check('rules5','manual_audit_cheat_score')">保存</el-button>
                    <template>
                        <el-switch class="www-big-switch" v-model="data.manual_audit_cheat_score.sts" on-color="#13ce66" off-color="#ff4949" @change="change('manual_audit_cheat_score')">
                        </el-switch><span style="color:#333;" v-if="data.manual_audit_cheat_score.sts"> 已启用</span><span style="color:#333;"
                            v-else> 已关闭</span>
                    </template>
                </el-form>
            </div>
            <div>
                <el-form v-show="!modify6">
                    <el-form-item label="年龄区间" label-width="218">
                        <div style="display:inline-block;width:200px;">
                            <span>{{data.manual_audit_age.dictValuefirst}}<i v-if="data.manual_audit_age.dictValuefirst">~</i></span>
                            <span>{{data.manual_audit_age.dictValuesecond}}</span>
                        </div>
                        <el-button type="primary" :plain="true" v-waves @click="modify6=true;">修改</el-button>
                        <template>
                            <el-switch class="www-big-switch" v-model="data.manual_audit_age.sts" on-color="#13ce66" off-color="#ff4949" @change="change('manual_audit_age')"
                                style="vertical-align:top;margin-top:7px;">
                            </el-switch><span style="color:#333;vertical-align:top;" v-if="data.manual_audit_age.sts"> 已启用</span>
                            <span style="color:#333;vertical-align:top;" v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
                <el-form v-show="modify6" v-if="data.manual_audit_age" v-bind:model="data.manual_audit_age" :rules="rules3" ref="rules6">
                    <el-form-item label="年龄区间" label-width="202" style="display:inline-block;" prop='dictValuefirst'>
                        <el-input v-model="data.manual_audit_age.dictValuefirst" :maxlength=30 style="width:104px;margin-bottom:10px;margin-left:24px;"
                            placeholder="60"></el-input>
                        <span style="display:inline-block;padding:0px 10px;">~</span>
                    </el-form-item>
                    <el-form-item style="display:inline-block;" prop='dictValuesecond'>
                        <el-input v-model="data.manual_audit_age.dictValuesecond" :maxlength=30 style="width:104px;margin-bottom:10px;margin-right:24px;"
                            placeholder="90"></el-input>
                    </el-form-item>
                    <el-button type="primary" :plain="true" v-waves @click="check('rules6','manual_audit_age')">保存</el-button>
                    <template>
                        <el-switch class="www-big-switch" v-model="data.manual_audit_age.sts" on-color="#13ce66" off-color="#ff4949" @change="change('manual_audit_age')">
                        </el-switch><span style="color:#333;" v-if="data.manual_audit_age.sts"> 已启用</span><span style="color:#333;" v-else> 已关闭</span>
                    </template>
                </el-form>
            </div>
            <div>
                <el-form v-show="!modify7">
                    <el-form-item label="百融分阈值" label-width="218">
                        <div style="display:inline-block;width:200px;">
                            <span>>{{data.manual_audit_br_score.dictValuefirst}}&nbsp;and</span>
                            <span><{{data.manual_audit_br_score.dictValuesecond}}</span>
                        </div>
                        <el-button type="primary" :plain="true" v-waves @click="modify7=true;">修改</el-button>
                        <template>
                            <el-switch class="www-big-switch" v-model="data.manual_audit_br_score.sts" on-color="#13ce66" off-color="#ff4949" @change="change('manual_audit_br_score')"
                                style="vertical-align:top;margin-top:7px;">
                            </el-switch><span style="color:#333;vertical-align:top;" v-if="data.manual_audit_br_score.sts"> 已启用</span>
                            <span style="color:#333;vertical-align:top;" v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
                <el-form v-show="modify7" v-if="data.manual_audit_br_score" v-bind:model="data.manual_audit_br_score" :rules="rules4" ref="rules7">
                    <el-form-item label="百融分阈值" label-width="202" style="display:inline-block;" prop="dictValuefirst">
                        大于
                        <el-input v-model="data.manual_audit_br_score.dictValuefirst" :maxlength=30 style="width:104px;margin-bottom:10px;" placeholder="60"></el-input>
                    </el-form-item>
                    <el-form-item style="display:inline-block;" prop="dictValuesecond">
                        小于
                        <el-input v-model="data.manual_audit_br_score.dictValuesecond" :maxlength=30 style="width:104px;margin-bottom:10px;margin-right:18px;"
                            placeholder="90"></el-input>
                    </el-form-item>
                    <el-button type="primary" :plain="true" v-waves @click="check('rules7','manual_audit_br_score')">保存</el-button>
                    <template>
                        <el-switch class="www-big-switch" v-model="data.manual_audit_br_score.sts" on-color="#13ce66" off-color="#ff4949" @change="change('manual_audit_br_score')">
                        </el-switch><span style="color:#333;" v-if="data.manual_audit_br_score.sts"> 已启用</span><span style="color:#333;"
                            v-else> 已关闭</span>
                    </template>
                </el-form>
            </div>
            <div>
                <el-form v-show="!modify8">
                    <el-form-item label="百融7天非银申请次数阈值" label-width="218">
                        <div style="display:inline-block;width:200px;">
                            <span>{{data.br7D_nonbank_time.dictValuefirst}}<i v-if="data.br7D_nonbank_time.dictValuefirst">~</i></span>
                            <span>{{data.br7D_nonbank_time.dictValuesecond}}</span>
                        </div>
                        <el-button type="primary" :plain="true" v-waves @click="modify8=true;">修改</el-button>
                        <template>
                            <el-switch class="www-big-switch" v-model="data.br7D_nonbank_time.sts" on-color="#13ce66" off-color="#ff4949" @change="change('br7D_nonbank_time')"
                                style="vertical-align:top;margin-top:7px;">
                            </el-switch><span style="color:#333;vertical-align:top;" v-if="data.br7D_nonbank_time.sts"> 已启用</span>
                            <span style="color:#333;vertical-align:top;" v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
                <el-form v-show="modify8" v-if="data.br7D_nonbank_time" v-bind:model="data.br7D_nonbank_time" :rules="rules5" ref="rules8">
                    <el-form-item label="百融7天非银申请次数阈值" label-width="202" style="display:inline-block;" prop="dictValuefirst">
                        <el-input v-model="data.br7D_nonbank_time.dictValuefirst" :maxlength=30 style="width:104px;margin-bottom:10px;margin-left:24px;"
                            placeholder="60"></el-input>
                        <span style="display:inline-block;padding:0px 10px;">~</span>
                    </el-form-item>
                    <el-form-item style="display:inline-block;" prop="dictValuesecond">
                        <el-input v-model="data.br7D_nonbank_time.dictValuesecond" :maxlength=30 style="width:104px;margin-bottom:10px;margin-right:24px;"
                            placeholder="90"></el-input>
                    </el-form-item>
                    <el-button type="primary" :plain="true" v-waves @click="check('rules8','br7D_nonbank_time')">保存</el-button>
                    <template>
                        <el-switch class="www-big-switch" v-model="data.br7D_nonbank_time.sts" on-color="#13ce66" off-color="#ff4949" @change="change('br7D_nonbank_time')">
                        </el-switch><span style="color:#333;" v-if="data.br7D_nonbank_time.sts"> 已启用</span><span style="color:#333;"
                            v-else> 已关闭</span>
                    </template>
                </el-form>
            </div>
            <div>
                <el-form v-show="!modify9">
                    <el-form-item label="百融15天非银申请次数阈值" label-width="218">
                        <div style="display:inline-block;width:200px;">
                            <span>{{data.br15D_nonbank_time.dictValuefirst}}<i v-if="data.br15D_nonbank_time.dictValuefirst">~</i></span>
                            <span>{{data.br15D_nonbank_time.dictValuesecond}}</span>
                        </div>
                        <el-button type="primary" :plain="true" v-waves @click="modify9=true;">修改</el-button>
                        <template>
                            <el-switch class="www-big-switch" v-model="data.br15D_nonbank_time.sts" on-color="#13ce66" off-color="#ff4949" @change="change('br15D_nonbank_time')"
                                style="vertical-align:top;margin-top:7px;">
                            </el-switch><span style="color:#333;vertical-align:top;" v-if="data.br15D_nonbank_time.sts"> 已启用</span>
                            <span style="color:#333;vertical-align:top;" v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
                <el-form v-show="modify9" v-if="data.br15D_nonbank_time" v-bind:model="data.br15D_nonbank_time" :rules="rules6" ref="rules9">
                    <el-form-item label="百融15天非银申请次数阈值" label-width="202" style="display:inline-block;" prop="dictValuefirst">
                        <el-input v-model="data.br15D_nonbank_time.dictValuefirst" :maxlength=30 style="width:104px;margin-bottom:10px;margin-left:24px;"
                            placeholder="60"></el-input>
                        <span style="display:inline-block;padding:0px 10px;">~</span>
                    </el-form-item>
                    <el-form-item style="display:inline-block;" prop="dictValuesecond">
                        <el-input v-model="data.br15D_nonbank_time.dictValuesecond" :maxlength=30 style="width:104px;margin-bottom:10px;margin-right:24px;"
                            placeholder="90"></el-input>

                    </el-form-item>
                    <el-button type="primary" :plain="true" v-waves @click="check('rules9','br15D_nonbank_time')">保存</el-button>
                    <template>
                        <el-switch class="www-big-switch" v-model="data.br15D_nonbank_time.sts" on-color="#13ce66" off-color="#ff4949" @change="change('br15D_nonbank_time')">
                        </el-switch><span style="color:#333;" v-if="data.br15D_nonbank_time.sts"> 已启用</span><span style="color:#333;"
                            v-else> 已关闭</span>
                    </template>
                </el-form>
            </div>
            <div>
                <el-form v-show="!modify10">
                    <el-form-item label="百融m1天非银申请次数阈值" label-width="218">
                        <div style="display:inline-block;width:200px;">
                            <span>{{data.br_M1_nonbank_time.dictValuefirst}}<i v-if="data.br_M1_nonbank_time.dictValuefirst">~</i></span>
                            <span>{{data.br_M1_nonbank_time.dictValuesecond}}</span>
                        </div>
                        <el-button type="primary" :plain="true" v-waves @click="modify10=true;">修改</el-button>
                        <template>
                            <el-switch class="www-big-switch" v-model="data.br_M1_nonbank_time.sts" on-color="#13ce66" off-color="#ff4949" @change="change('br_M1_nonbank_time')"
                                style="vertical-align:top;margin-top:7px;">
                            </el-switch><span style="color:#333;vertical-align:top;" v-if="data.br_M1_nonbank_time.sts"> 已启用</span>
                            <span style="color:#333;vertical-align:top;" v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
                <el-form v-show="modify10" v-if="data.br_M1_nonbank_time" v-bind:model="data.br_M1_nonbank_time" :rules="rules7" ref="rules10">
                    <el-form-item label="百融m1天非银申请次数阈值" label-width="202" style="display:inline-block;" prop="dictValuefirst">
                        <el-input v-model="data.br_M1_nonbank_time.dictValuefirst" :maxlength=30 style="width:104px;margin-bottom:10px;margin-left:24px;"
                            placeholder="60">~</el-input>
                        <span style="display:inline-block;padding:0px 10px;">~</span>
                    </el-form-item>
                    <el-form-item style="display:inline-block;" prop="dictValuesecond">
                        <el-input v-model="data.br_M1_nonbank_time.dictValuesecond" :maxlength=30 style="width:104px;margin-bottom:10px;margin-right:24px;"
                            placeholder="90"></el-input>
                    </el-form-item>
                    <el-button type="primary" :plain="true" v-waves @click="check('rules10','br_M1_nonbank_time')">保存</el-button>
                    <template>
                        <el-switch class="www-big-switch" v-model="data.br_M1_nonbank_time.sts" on-color="#13ce66" off-color="#ff4949" @change="change('br_M1_nonbank_time')">
                        </el-switch><span style="color:#333;" v-if="data.br_M1_nonbank_time.sts"> 已启用</span><span style="color:#333;"
                            v-else> 已关闭</span>
                    </template>
                </el-form>
            </div>
            <div>
                <el-form v-show="!modify11">
                    <el-form-item label="百融m2天非银申请次数阈值" label-width="218">
                        <div style="display:inline-block;width:200px;">
                            <span>{{data.br_M2_nonbank_time.dictValuefirst}}<i v-if="data.br_M2_nonbank_time.dictValuefirst">~</i></span>
                            <span>{{data.br_M2_nonbank_time.dictValuesecond}}</span>
                        </div>
                        <el-button type="primary" :plain="true" v-waves @click="modify11=true;">修改</el-button>
                        <template>
                            <el-switch class="www-big-switch" v-model="data.br_M2_nonbank_time.sts" on-color="#13ce66" off-color="#ff4949" @change="change('br_M2_nonbank_time')"
                                style="vertical-align:top;margin-top:7px;">
                            </el-switch><span style="color:#333;vertical-align:top;" v-if="data.br_M2_nonbank_time.sts"> 已启用</span>
                            <span style="color:#333;vertical-align:top;" v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
                <el-form v-show="modify11" v-if="data.br_M2_nonbank_time" v-bind:model="data.br_M2_nonbank_time" :rules="rules8" ref="rules11">
                    <el-form-item label="百融m2天非银申请次数阈值" label-width="202" style="display:inline-block;" prop="dictValuefirst">
                        <el-input v-model="data.br_M2_nonbank_time.dictValuefirst" :maxlength=30 style="width:104px;margin-bottom:10px;margin-left:24px;"
                            placeholder="60"></el-input>
                        <span style="display:inline-block;padding:0px 10px;">~</span>
                    </el-form-item>
                    <el-form-item style="display:inline-block;" prop="dictValuesecond">
                        <el-input v-model="data.br_M2_nonbank_time.dictValuesecond" :maxlength=30 style="width:104px;margin-bottom:10px;margin-right:24px;"
                            placeholder="90"></el-input>
                    </el-form-item>
                    <el-button type="primary" :plain="true" v-waves @click="check('rules11','br_M2_nonbank_time')">保存</el-button>
                    <template>
                        <el-switch class="www-big-switch" v-model="data.br_M2_nonbank_time.sts" on-color="#13ce66" off-color="#ff4949" @change="change('br_M2_nonbank_time')">
                        </el-switch><span style="color:#333;" v-if="data.br_M2_nonbank_time.sts"> 已启用</span><span style="color:#333;"
                            v-else> 已关闭</span>
                    </template>
                </el-form>
            </div>
            <div>
                <el-form v-show="!modify12">
                    <el-form-item label="百融m3天非银申请次数阈值" label-width="218" style="padding:9px 12px 9px 0;">
                        <div style="display:inline-block;width:200px;">
                            <span>{{data.br_M3_nonbank_time.dictValuefirst}}<i v-if="data.br_M3_nonbank_time.dictValuefirst">~</i></span>
                            <span>{{data.br_M3_nonbank_time.dictValuesecond}}</span>
                        </div>
                        <el-button type="primary" :plain="true" v-waves @click="modify12=true;">修改</el-button>
                        <template>
                            <el-switch class="www-big-switch" v-model="data.br_M3_nonbank_time.sts" on-color="#13ce66" off-color="#ff4949" @change="change('br_M3_nonbank_time')"
                                style="vertical-align:top;margin-top:7px;">
                            </el-switch><span style="color:#333;vertical-align:top;" v-if="data.br_M3_nonbank_time.sts"> 已启用</span>
                            <span style="color:#333;vertical-align:top;" v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
                <el-form v-show="modify12" v-if="data.br_M3_nonbank_time" v-bind:model="data.br_M3_nonbank_time" :rules="rules9" ref="rules12">
                    <el-form-item label="百融m3天非银申请次数阈值" label-width="202" style="display:inline-block;" prop="dictValuefirst">
                        <el-input v-model="data.br_M3_nonbank_time.dictValuefirst" :maxlength=30 style="width:104px;margin-bottom:10px;margin-left:24px;"
                            placeholder="60"></el-input>
                        <span style="display:inline-block;padding:0px 10px;">~</span>
                    </el-form-item>
                    <el-form-item style="display:inline-block;" prop="dictValuesecond">
                        <el-input v-model="data.br_M3_nonbank_time.dictValuesecond" :maxlength=30 style="width:104px;margin-bottom:10px;margin-right:24px;"
                            placeholder="90"></el-input>
                    </el-form-item>
                    <el-button type="primary" :plain="true" v-waves @click="check('rules12','br_M3_nonbank_time')">保存</el-button>
                    <template>
                        <el-switch class="www-big-switch" v-model="data.br_M3_nonbank_time.sts" on-color="#13ce66" off-color="#ff4949" @change="change('br_M3_nonbank_time')">
                        </el-switch><span style="color:#333;" v-if="data.br_M3_nonbank_time.sts"> 已启用</span><span style="color:#333;"
                            v-else> 已关闭</span>
                    </template>
                </el-form>
            </div>
            <div>
                <el-form v-show="!modify13">
                    <el-form-item label="百融15天非银申请次数／百融m1天非银申请次数的百分比阈值" label-width="218">
                        <div style="display:inline-block;width:200px;">
                            <span>{{data.br_15D_nonbank_in_M1_percent.dictValuefirst}}%<i v-if="data.br_15D_nonbank_in_M1_percent.dictValuefirst">~</i></span>
                            <span>{{data.br_15D_nonbank_in_M1_percent.dictValuesecond}}%</span>
                        </div>
                        <el-button type="primary" :plain="true" v-waves @click="modify13=true;">修改</el-button>
                        <template>
                            <el-switch class="www-big-switch" v-model="data.br_15D_nonbank_in_M1_percent.sts" on-color="#13ce66" off-color="#ff4949"
                                @change="change('br_15D_nonbank_in_M1_percent')" style="vertical-align:top;margin-top:7px;">
                            </el-switch><span style="color:#333;vertical-align:top;" v-if="data.br_15D_nonbank_in_M1_percent.sts"> 已启用</span>
                            <span style="color:#333;vertical-align:top;" v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
                <el-form v-show="modify13" v-if="data.br_15D_nonbank_in_M1_percent" v-bind:model="data.br_15D_nonbank_in_M1_percent"
                    :rules="rules10" ref="rules13">
                    <el-form-item label="百融15天非银申请次数／百融m1天非银申请次数的百分比阈值" label-width="202" style="display:inline-block;" prop="dictValuefirst">
                        <el-input v-model="data.br_15D_nonbank_in_M1_percent.dictValuefirst" :maxlength=30 style="width:104px;margin-bottom:10px;margin-left:24px;"
                            placeholder="60"></el-input>
                        <span>%</span>
                        <span style="display:inline-block;padding:0px 10px;">~</span>
                    </el-form-item>
                    <el-form-item style="display:inline-block;" prop="dictValuesecond">
                        <el-input v-model="data.br_15D_nonbank_in_M1_percent.dictValuesecond" :maxlength=30 style="width:104px;margin-bottom:26px;"
                            placeholder="90"></el-input>
                        <span style="margin-right:24px;">%</span>
                    </el-form-item>
                    <el-button type="primary" :plain="true" v-waves @click="check('rules13','br_15D_nonbank_in_M1_percent')">保存</el-button>
                    <template>
                        <el-switch class="www-big-switch" v-model="data.br_15D_nonbank_in_M1_percent.sts" on-color="#13ce66" off-color="#ff4949"
                            @change="change('br_15D_nonbank_in_M1_percent')">
                        </el-switch><span style="color:#333;" v-if="data.br_15D_nonbank_in_M1_percent.sts"> 已启用</span><span style="color:#333;"
                            v-else> 已关闭</span>
                    </template>
                </el-form>
            </div>
            <div>
                <el-form v-show="!modify14">
                    <el-form-item label="百融月度代偿机构申请次数阈值" label-width="218">
                        <div style="display:inline-block;width:200px;">
                            <span>{{data.br_monthly_compensatory_times.dictValuefirst}}<i v-if="data.br_monthly_compensatory_times.dictValuefirst">~</i></span>
                            <span>{{data.br_monthly_compensatory_times.dictValuesecond}}</span>
                        </div>
                        <el-button type="primary" :plain="true" v-waves @click="modify14=true;">修改</el-button>
                        <template>
                            <el-switch class="www-big-switch" v-model="data.br_monthly_compensatory_times.sts" on-color="#13ce66" off-color="#ff4949"
                                @change="change('br_monthly_compensatory_times')" style="vertical-align:top;margin-top:7px;">
                            </el-switch><span style="color:#333;vertical-align:top;" v-if="data.br_monthly_compensatory_times.sts"> 已启用</span>
                            <span style="color:#333;vertical-align:top;" v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
                <el-form v-show="modify14" v-if="data.br_monthly_compensatory_times" v-bind:model="data.br_monthly_compensatory_times"
                    :rules="rules11" ref="rules14">
                    <el-form-item label="百融月度代偿机构申请次数阈值" label-width="202" style="display:inline-block;" prop="dictValuefirst">
                        <el-input v-model="data.br_monthly_compensatory_times.dictValuefirst" :maxlength=30 style="width:104px;margin-bottom:10px;margin-left:24px;"
                            placeholder="60"></el-input>
                        <span style="display:inline-block;padding:0px 10px;">~</span>
                    </el-form-item>
                    <el-form-item style="display:inline-block;" prop="dictValuesecond">
                        <el-input v-model="data.br_monthly_compensatory_times.dictValuesecond" :maxlength=30 style="width:104px;margin-bottom:10px;margin-right:24px;"
                            placeholder="90"></el-input>
                    </el-form-item>
                    <el-button type="primary" :plain="true" v-waves @click="check('rules14','br_monthly_compensatory_times')">保存</el-button>
                    <template>
                        <el-switch class="www-big-switch" v-model="data.br_monthly_compensatory_times.sts" on-color="#13ce66" off-color="#ff4949"
                            @change="change('br_monthly_compensatory_times')">
                        </el-switch><span style="color:#333;" v-if="data.br_monthly_compensatory_times.sts"> 已启用</span><span style="color:#333;"
                            v-else> 已关闭</span>
                    </template>
                </el-form>
            </div>
            <!--<div>
                <el-form v-show="!modify15">
                    <el-form-item label="历史逾期天数" label-width="218">
                        <div style="display:inline-block;width:200px;">
                            <span>{{data.overdue_days_of_history.dictValuefirst}}<i v-if="data.overdue_days_of_history.dictValuefirst">~</i></span>
                            <span>{{data.overdue_days_of_history.dictValuesecond}}</span>
                        </div>
                        <el-button type="primary" :plain="true" v-waves @click="modify15=true;">修改</el-button>
                        <template>
                            <el-switch class="www-big-switch" v-model="data.overdue_days_of_history.sts" on-color="#13ce66" off-color="#ff4949" @change="change('overdue_days_of_history')"
                                style="vertical-align:top;margin-top:7px;">
                            </el-switch><span style="color:#333;vertical-align:top;" v-if="data.overdue_days_of_history.sts"> 已启用</span>
                            <span style="color:#333;vertical-align:top;" v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
                <el-form v-show="modify15" v-if="data.overdue_days_of_history" v-bind:model="data.overdue_days_of_history" :rules="rules12"
                    ref="rules15">
                    <el-form-item label="历史逾期天数" label-width="202" style="display:inline-block;" prop="dictValuefirst">
                        <el-input v-model="data.overdue_days_of_history.dictValuefirst" :maxlength=30 style="width:104px;margin-bottom:10px;margin-left:24px;"
                            placeholder="60"></el-input>
                        <span style="display:inline-block;padding:0px 10px;">~</span>
                    </el-form-item>
                    <el-form-item style="display:inline-block;" prop="dictValuesecond">
                        <el-input v-model="data.overdue_days_of_history.dictValuesecond" :maxlength=30 style="width:104px;margin-bottom:10px;margin-right:24px;"
                            placeholder="90"></el-input>
                    </el-form-item>
                    <el-button type="primary" :plain="true" v-waves @click="check('rules15','overdue_days_of_history')">保存</el-button>
                    <template>
                        <el-switch class="www-big-switch" v-model="data.overdue_days_of_history.sts" on-color="#13ce66" off-color="#ff4949" @change="change('overdue_days_of_history')">
                        </el-switch><span style="color:#333;" v-if="data.overdue_days_of_history.sts"> 已启用</span><span style="color:#333;"
                            v-else> 已关闭</span>
                    </template>
                </el-form>
            </div>-->
            <div>
                <el-form v-show="!modify16">
                    <el-form-item label="申请时间阈值（到＊H＊分）" label-width="218">
                        <div style="display:inline-block;min-width:288px;">
                            <span>{{data.apply_time_threshold.dictValuefirst}}<i v-if="data.apply_time_threshold.dictValuefirst">~</i></span>
                            <span>{{data.apply_time_threshold.dictValuesecond}}</span>
                        </div>
                        <el-button type="primary" :plain="true" v-waves @click="modify16=true;">修改</el-button>
                        <template>
                            <el-switch class="www-big-switch" v-model="data.apply_time_threshold.sts" on-color="#13ce66" off-color="#ff4949" @change="changetime('apply_time_threshold')"
                                style="vertical-align:top;margin-top:7px;">
                            </el-switch><span style="color:#333;vertical-align:top;" v-if="data.apply_time_threshold.sts"> 已启用</span>
                            <span style="color:#333;vertical-align:top;" v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
                <el-form v-show="modify16" v-if="data.apply_time_threshold" v-bind:model="data.apply_time_threshold" ref="rules16">
                    <el-form-item label="申请时间阈值（到＊H＊分）" label-width="202" style="display:inline-block;">
                        <el-date-picker v-model="value3" :editable="false" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                            @change='dataChange' style="width:330px;"></el-date-picker>
                    </el-form-item>
                    <el-button type="primary" :plain="true" v-waves @click="changetime('apply_time_threshold')">保存</el-button>
                    <template>
                        <el-switch class="www-big-switch" v-model="data.apply_time_threshold.sts" on-color="#13ce66" off-color="#ff4949" @change="changetime('apply_time_threshold')">
                        </el-switch><span style="color:#333;" v-if="data.apply_time_threshold.sts"> 已启用</span><span style="color:#333;"
                            v-else> 已关闭</span>
                    </template>
                </el-form>
            </div>
            <div>
                <el-form v-show="!modify17">
                    <el-form-item label="最近30天催收电话次数" label-width="218">
                        <div style="display:inline-block;width:200px;">
                            <span>{{data.last_30_days_urgent_call_num.dictValuefirst}}<i v-if="data.last_30_days_urgent_call_num.dictValuefirst">~</i></span>
                            <span>{{data.last_30_days_urgent_call_num.dictValuesecond}}</span>
                        </div>
                        <el-button type="primary" :plain="true" v-waves @click="modify17=true;">修改</el-button>
                        <template>
                            <el-switch class="www-big-switch" v-model="data.last_30_days_urgent_call_num.sts" on-color="#13ce66" off-color="#ff4949"
                                @change="change('last_30_days_urgent_call_num')" style="vertical-align:top;margin-top:7px;">
                            </el-switch><span style="color:#333;vertical-align:top;" v-if="data.last_30_days_urgent_call_num.sts"> 已启用</span>
                            <span style="color:#333;vertical-align:top;" v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
                <el-form v-show="modify17" v-if="data.last_30_days_urgent_call_num" v-bind:model="data.last_30_days_urgent_call_num" :rules="rules14"
                    ref="rules17">
                    <el-form-item label="最近30天催收电话次数" label-width="202" style="display:inline-block;" prop="dictValuefirst">
                        <el-input v-model="data.last_30_days_urgent_call_num.dictValuefirst" :maxlength=30 style="width:104px;margin-bottom:10px;margin-left:24px;"
                            placeholder="60"></el-input>
                        <span style="display:inline-block;padding:0px 10px;">~</span>
                    </el-form-item>
                    <el-form-item style="display:inline-block;" prop="dictValuesecond">
                        <el-input v-model="data.last_30_days_urgent_call_num.dictValuesecond" :maxlength=30 style="width:104px;margin-bottom:10px;margin-right:24px;"
                            placeholder="90"></el-input>
                    </el-form-item>
                    <el-button type="primary" :plain="true" v-waves @click="check('rules17','last_30_days_urgent_call_num')">保存</el-button>
                    <template>
                        <el-switch class="www-big-switch" v-model="data.last_30_days_urgent_call_num.sts" on-color="#13ce66" off-color="#ff4949"
                            @change="change('last_30_days_urgent_call_num')">
                        </el-switch><span style="color:#333;" v-if="data.last_30_days_urgent_call_num.sts"> 已启用</span><span style="color:#333;"
                            v-else> 已关闭</span>
                    </template>
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
        data() {
            return {
                loading: false,
                systemDictPoList: null,
                modify0: false,
                modify1: false,
                modify2: false,
                modify3: false,
                modify4: false,
                modify5: false,
                modify6: false,
                modify7: false,
                modify8: false,
                modify9: false,
                modify10: false,
                modify11: false,
                modify12: false,
                modify13: false,
                modify14: false,
                modify15: false,
                modify16: false,
                modify17: false,
                value3: [],
                timeStart: "",
                timeEnd: "",
                data: {
                    'manual_audit_switch':{},
                    'order_no_tail1': {},
                    'order_no_tail2': {},
                    'manual_iden_no_pre6': {},
                    'manual_audit_zhima_score': {},
                    'manual_audit_cheat_score': {},
                    'manual_audit_age': {},
                    'manual_audit_br_score': {},
                    'br7D_nonbank_time': {},
                    'br15D_nonbank_time': {},
                    'br_M1_nonbank_time': {},
                    'br_M2_nonbank_time': {},
                    'br_M3_nonbank_time': {},
                    'br_15D_nonbank_in_M1_percent': {},
                    'br_monthly_compensatory_times': {},
                    'overdue_days_of_history': {},
                    'apply_time_threshold': {},
                    'last_30_days_urgent_call_num': {}
                },
                rules1: {
                    'dictValuefirst': {
                        required: true,
                        pattern: /(^[1-9]([0-9]*)$|^[0-9]$)/,
                        message: '不能为空且是整数,多个数字第一位不能是零',
                        trigger: 'blur'
                    },
                    'dictValuesecond': {
                        required: true,
                        pattern: /(^[1-9]([0-9]*)$|^[0-9]$)/,
                        message: '不能为空且是整数,多个数字第一位不能是零',
                        trigger: 'blur'
                    }

                },
                rules2: {
                    'dictValuefirst': {
                        required: true,
                        pattern: /(^[1-9]([0-9]*)$|^[0-9]$)/,
                        message: '不能为空且是整数,多个数字第一位不能是零',
                        trigger: 'blur'
                    },
                    'dictValuesecond': {
                        required: true,
                        pattern: /(^[1-9]([0-9]*)$|^[0-9]$)/,
                        message: '不能为空且是整数,多个数字第一位不能是零',
                        trigger: 'blur'
                    }

                },
                rules3: {
                    'dictValuefirst': {
                        required: true,
                        pattern: /(^[1-9]([0-9]*)$|^[0-9]$)/,
                        message: '不能为空且是整数,多个数字第一位不能是零',
                        trigger: 'blur'
                    },
                    'dictValuesecond': {
                        required: true,
                        pattern: /(^[1-9]([0-9]*)$|^[0-9]$)/,
                        message: '不能为空且是整数,多个数字第一位不能是零',
                        trigger: 'blur'
                    }

                },
                rules4: {
                    'dictValuefirst': {
                        required: true,
                        pattern: /(^[1-9]([0-9]*)$|^[0-9]$)/,
                        message: '不能为空且是整数,多个数字第一位不能是零',
                        trigger: 'blur'
                    },
                    'dictValuesecond': {
                        required: true,
                        pattern: /(^[1-9]([0-9]*)$|^[0-9]$)/,
                        message: '不能为空且是整数,多个数字第一位不能是零',
                        trigger: 'blur'
                    }

                },
                rules5: {
                    'dictValuefirst': {
                        required: true,
                        pattern: /(^[1-9]([0-9]*)$|^[0-9]$)/,
                        message: '不能为空且是整数,多个数字第一位不能是零',
                        trigger: 'blur'
                    },
                    'dictValuesecond': {
                        required: true,
                        pattern: /(^[1-9]([0-9]*)$|^[0-9]$)/,
                        message: '不能为空且是整数,多个数字第一位不能是零',
                        trigger: 'blur'
                    }

                },
                rules6: {
                    'dictValuefirst': {
                        required: true,
                        pattern: /(^[1-9]([0-9]*)$|^[0-9]$)/,
                        message: '不能为空且是整数,多个数字第一位不能是零',
                        trigger: 'blur'
                    },
                    'dictValuesecond': {
                        required: true,
                        pattern: /(^[1-9]([0-9]*)$|^[0-9]$)/,
                        message: '不能为空且是整数,多个数字第一位不能是零',
                        trigger: 'blur'
                    }

                },
                rules7: {
                    'dictValuefirst': {
                        required: true,
                        pattern: /(^[1-9]([0-9]*)$|^[0-9]$)/,
                        message: '不能为空且是整数,多个数字第一位不能是零',
                        trigger: 'blur'
                    },
                    'dictValuesecond': {
                        required: true,
                        pattern: /(^[1-9]([0-9]*)$|^[0-9]$)/,
                        message: '不能为空且是整数,多个数字第一位不能是零',
                        trigger: 'blur'
                    }

                },
                rules8: {
                    'dictValuefirst': {
                        required: true,
                        pattern: /(^[1-9]([0-9]*)$|^[0-9]$)/,
                        message: '不能为空且是整数,多个数字第一位不能是零',
                        trigger: 'blur'
                    },
                    'dictValuesecond': {
                        required: true,
                        pattern: /(^[1-9]([0-9]*)$|^[0-9]$)/,
                        message: '不能为空且是整数,多个数字第一位不能是零',
                        trigger: 'blur'
                    }

                },
                rules9: {
                    'dictValuefirst': {
                        required: true,
                        pattern: /(^[1-9]([0-9]*)$|^[0-9]$)/,
                        message: '不能为空且是整数,多个数字第一位不能是零',
                        trigger: 'blur'
                    },
                    'dictValuesecond': {
                        required: true,
                        pattern: /(^[1-9]([0-9]*)$|^[0-9]$)/,
                        message: '不能为空且是整数,多个数字第一位不能是零',
                        trigger: 'blur'
                    }

                },
                rules10: {
                    'dictValuefirst': {
                        required: true,
                        pattern: /^100$|^[0-9]{1,2}$/,
                        message: '只能是0-100的整数',
                        trigger: 'blur'
                    },
                    'dictValuesecond': {
                        required: true,
                        pattern: /^100$|^[0-9]{1,2}$/,
                        message: '只能是0-100的整数',
                        trigger: 'blur'
                    }

                },
                rules11: {
                    'dictValuefirst': {
                        required: true,
                        pattern: /(^[1-9]([0-9]*)$|^[0-9]$)/,
                        message: '不能为空且是整数,多个数字第一位不能是零',
                        trigger: 'blur'
                    },
                    'dictValuesecond': {
                        required: true,
                        pattern: /(^[1-9]([0-9]*)$|^[0-9]$)/,
                        message: '不能为空且是整数,多个数字第一位不能是零',
                        trigger: 'blur'
                    }

                },
                rules12: {
                    'dictValuefirst': {
                        required: true,
                        pattern: /(^[1-9]([0-9]*)$|^[0-9]$)/,
                        message: '不能为空且是整数,多个数字第一位不能是零',
                        trigger: 'blur'
                    },
                    'dictValuesecond': {
                        required: true,
                        pattern: /(^[1-9]([0-9]*)$|^[0-9]$)/,
                        message: '不能为空且是整数,多个数字第一位不能是零',
                        trigger: 'blur'
                    }

                },
                rules13: {
                    'dictValuefirst': {
                        required: true,
                        message: '申请时间阈值（到＊H＊分）不能为空',
                        trigger: 'blur'
                    },
                    'dictValuesecond': {
                        required: true,
                        message: '申请时间阈值（到＊H＊分）不能为空',
                        trigger: 'blur'
                    }

                },
                rules14: {
                    'dictValuefirst': {
                        required: true,
                        pattern: /(^[1-9]([0-9]*)$|^[0-9]$)/,
                        message: '不能为空且是整数,多个数字第一位不能是零',
                        trigger: 'blur'
                    },
                    'dictValuesecond': {
                        required: true,
                        pattern: /(^[1-9]([0-9]*)$|^[0-9]$)/,
                        message: '不能为空且是整数,多个数字第一位不能是零',
                        trigger: 'blur'
                    }

                }

            }
        },
        created() {
            this.getData();
           
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
            check(formName, name) {
                let firstvalue = this.data[name].dictValuefirst;
                let secondvalue = this.data[name].dictValuesecond;
                let resultvalue = secondvalue - firstvalue;
                let reuslt = resultvalue > 0 ? true : false;
                this.$refs[formName].validate((valid) => {
                    if (!valid) {
                        return false;
                    } else if (!reuslt) {
                        this.$message({
                            message: '后面的数必须大于前面的数！',
                            type: 'warning'
                        });
                        return false;
                    }
                    this.change(name);
                });

            },
            conversionTime(time) {
                let timeValue = new Date(time);
                let arr = [timeValue.getMonth() + 1, timeValue.getDate(), timeValue.getHours(), timeValue.getMinutes(),
                    timeValue.getSeconds()
                ];
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i] < 10) {
                        arr[i] = "0" + arr[i]
                    }
                }
                timeValue = timeValue.getFullYear() + "-" + arr[0] + "-" + arr[1] + " " + arr[2] + ":" + arr[3] + ":" +
                    arr[4]
                return timeValue
            },
            dataChange() {
                this.value3 = this.ClearNullArr(this.value3)
                if (this.value3.length > 0) {
                    this.timeStart = this.conversionTime(this.value3[0]);
                    this.timeEnd = this.conversionTime(this.value3[1]);

                } else {
                    this.timeStart = "";
                    this.timeEnd = "";


                }
            },
            getData() {
                config({
                    url: 'systemDict/list'
                }).then(response => {
                    if (response.respCode === '000000') {
                        let obj = {};
                        this.systemDictPoList = response.data.systemDictPoList.map(item => {
                            this.$set(obj, item.dictName, {})
                            if (item.dictName =='br7D_nonbank_time'|| item.dictName==
                                'manual_audit_zhima_score' || item.dictName ==
                                'manual_audit_cheat_score' || item.dictName == 'manual_audit_age' ||
                                item.dictName == 'manual_audit_br_score' || item.dictName ==
                                'br15D_nonbank_time' || item.dictName == 'br_M1_nonbank_time' || item.dictName ==
                                'br_M2_nonbank_time' || item.dictName == 'br_M3_nonbank_time' ||item.dictName ==
                                'br_monthly_compensatory_times' || item.dictName ==
                                'overdue_days_of_history' || item.dictName ==
                                'last_30_days_urgent_call_num') {
                                if (item.dictValue== "") {
                                    item.dictValuefirst = "";
                                    item.dictValuesecond = "";
                                    obj[item.dictName].dictValuefirst = item.dictValuefirst;
                                    obj[item.dictName].dictValuesecond = item.dictValuesecond;
                                    obj[item.dictName].sts = !!item.sts;
                                    obj[item.dictName].id = item.id;
                                    
                                } else {
                                   
                                    item.dictValue = item.dictValue.split(",");
                                    item.dictValuefirst = item.dictValue[0];
                                    item.dictValuesecond = item.dictValue[1];
                                    obj[item.dictName].dictValuefirst = item.dictValuefirst;
                                    obj[item.dictName].dictValuesecond = item.dictValuesecond
                                    obj[item.dictName].sts = !!item.sts;
                                    obj[item.dictName].id = item.id;
                                   

                                }
                            } else if (item.dictName == 'order_no_tail1' || item.dictName ==
                                'order_no_tail2' || item.dictName == 'manual_iden_no_pre6') {
                                this.$set(obj[item.dictName], 'dictValue', item.dictValue)
                                // obj[item.dictName].dictValue = item.dictValue;
                                obj[item.dictName].sts = !!item.sts;
                                obj[item.dictName].id = item.id;
                                
                            } else if (item.dictName == 'apply_time_threshold') {
                                if (item.dictValue== "") {
                                    item.dictValuefirst = "";
                                    item.dictValuesecond = "";
                                    obj[item.dictName].dictValuefirst = item.dictValuefirst;
                                    obj[item.dictName].dictValuesecond = item.dictValuesecond
                                    obj[item.dictName].sts = !!item.sts;
                                    obj[item.dictName].id = item.id;
                                    this.value3 = [];
                                } else {
                                    this.value3 = [];
                                    item.dictValue = item.dictValue.split(",");
                                    item.dictValuefirst = item.dictValue[0];
                                    item.dictValuesecond = item.dictValue[1];
                                    obj[item.dictName].dictValuefirst = item.dictValuefirst.substring(0,
                                        16);
                                    obj[item.dictName].dictValuesecond = item.dictValuesecond.substring(
                                        0, 16);
                                    obj[item.dictName].sts = !!item.sts;
                                    obj[item.dictName].id = item.id;
                                    this.value3.push(new Date(Date.parse(item.dictValuefirst.replace(
                                        /-/g, "/"))));
                                    this.value3.push(new Date(Date.parse(item.dictValuesecond.replace(
                                        /-/g, "/"))));
                                }

                            }else if(item.dictName =='manual_audit_switch'){
                                 obj[item.dictName].dictValue = item.dictValue;
                                 obj[item.dictName].sts=!!item.sts;
                                 obj[item.dictName].id = item.id;
                                
                            }else if(item.dictName =='br_15D_nonbank_in_M1_percent'){
                                  if (item.dictValue== "") {
                                    item.dictValuefirst = "";
                                    item.dictValuesecond = "";
                                    obj[item.dictName].dictValuefirst = item.dictValuefirst;
                                    obj[item.dictName].dictValuesecond = item.dictValuesecond;
                                    obj[item.dictName].sts = !!item.sts;
                                    obj[item.dictName].id = item.id;
                                    
                                } else {
                                   
                                    item.dictValue = item.dictValue.split(",");
                                    item.dictValuefirst = item.dictValue[0];
                                    item.dictValuesecond = item.dictValue[1];
                                    obj[item.dictName].dictValuefirst = item.dictValuefirst*100;
                                    obj[item.dictName].dictValuesecond = item.dictValuesecond*100;
                                    obj[item.dictName].sts = !!item.sts;
                                    obj[item.dictName].id = item.id;
                                   }


                            }
                        })
                        this.data = obj;
                     
                    }
                })
            },
            //前面3个都行
            change(param) {
                let obj = {
                    url: 'systemDict/updateSystemDict',
                    sts: this.data[param].sts ? '1' : '0',
                    id: this.data[param].id,
                    dictValue: ''
                }
                if (param == 'br7D_nonbank_time' || param == 'manual_audit_zhima_score' || param ==
                    'manual_audit_cheat_score' || param == 'manual_audit_age' || param == 'manual_audit_br_score' ||
                    param == 'br15D_nonbank_time' || param == 'br_M1_nonbank_time' ||
                    param == 'br_M2_nonbank_time' || param == 'br_M3_nonbank_time' || 
                    param == 'br_monthly_compensatory_times' ||param==
                    'overdue_days_of_history' || param == 'last_30_days_urgent_call_num') {
                    obj.dictValue = this.data[param].dictValuefirst + "," + this.data[param].dictValuesecond;
                } else if (param == 'order_no_tail1' || param == 'order_no_tail2' || param == 'manual_iden_no_pre6'||param=='manual_audit_switch') {
                    obj.dictValue = this.data[param].dictValue
                }else if(param =='br_15D_nonbank_in_M1_percent'){
                  
                     obj.dictValue = this.data[param].dictValuefirst/100 + "," + this.data[param].dictValuesecond/100;
                }
                this.loading = true;
                 config(obj).then(response => {
                    if (response.respCode === '000000') {
                        this.$message.success(response.respMsg);
                        if (param == 'order_no_tail1') {
                            this.modify1 = false;
                        

                        } else if (param == 'order_no_tail2') {
                            this.modify2 = false;
                        } else if (param == 'manual_iden_no_pre6') {
                            this.modify3 = false;
                        } else if (param == 'manual_audit_zhima_score') {
                            this.modify4 = false;

                        } else if (param == 'manual_audit_cheat_score') {
                            this.modify5 = false;
                        } else if (param == 'manual_audit_age') {
                            this.modify6 = false;
                        } else if (param == 'manual_audit_br_score') {
                            this.modify7 = false;
                        } else if (param == 'br7D_nonbank_time') {
                            this.modify8 = false;
                        } else if (param == 'br15D_nonbank_time') {
                            this.modify9 = false;
                        } else if (param == 'br_M1_nonbank_time') {
                            this.modify10 = false;
                        } else if (param == 'br_M2_nonbank_time') {
                            this.modify11 = false;
                        } else if (param == 'br_M3_nonbank_time') {
                            this.modify12 = false;
                        } else if (param == 'br_15D_nonbank_in_M1_percent') {
                            this.modify13 = false;
                        } else if (param == 'br_monthly_compensatory_times') {
                            this.modify14 = false;
                        } else if (param == 'overdue_days_of_history') {
                            this.modify15 = false;
                        } else if (param == 'last_30_days_urgent_call_num') {
                            this.modify17 = false;
                        }
                    } else {
                        this.$message.success(response.respMsg);
                    }
                    this.loading = false;
                   this.getData() 
                })
            },
            commit(name) {
                let dictValue = this.data[name].dictValue;
                if (name == 'order_no_tail1') {
                    if (dictValue == "") {
                        this.change(name);
                    } else {
                        let arr = dictValue.split(",");
                        let reg = /^[0-9]$/;
                        for (let i = 0; i < arr.length; i++) {
                            if (!reg.test(arr[i])) {
                                this.$message({
                                    message: '0到9当中的任意一个，多个用逗号隔开',
                                    type: 'warning'
                                })
                                return false
                            }
                        };
                        let newArray = arr.sort();
                        for (let i = 0; i < newArray.length; i++) {
                            if (newArray[i] == newArray[i + 1]) {
                                this.$message({
                                    message: '有重复数字',
                                    type: 'warning'
                                })
                                return false
                            }
                        };
                        this.change(name);
                    }
                } else if (name == 'order_no_tail2') {
                    if (dictValue == '') {
                        this.change(name);
                    } else {
                        let arr = dictValue.split(",");
                        let reg = /^[0-9]\d{1}$/;
                        for (let i = 0; i < arr.length; i++) {
                            if (!reg.test(arr[i])) {
                                this.$message({
                                    message: '必须是两位数，多个用逗号隔开',
                                    type: 'warning'
                                })
                                return false
                            }
                        };
                        let newArray = arr.sort();
                        for (let i = 0; i < newArray.length; i++) {
                            if (newArray[i] == newArray[i + 1]) {
                                this.$message({
                                    message: '有重复的数字',
                                    type: 'warning'
                                })
                                return false
                            }
                        };
                        this.change(name);

                    }
                } else if (name == 'manual_iden_no_pre6') {

                    if (dictValue == '') {
                        this.change(name);

                    } else {
                        let arr = dictValue.split(",");

                        let reg = /^[1-9]\d{5}$/;
                        for (let i = 0; i < arr.length; i++) {
                            if (!reg.test(arr[i])) {
                                this.$message({
                                    message: '身份证前6位数字不对！多个用逗号隔开',
                                    type: 'warning'
                                })
                                return false;
                            }
                        };
                        this.change(name);
                    }
                }
            },
            changetime(param) {
                let obj = {
                    url: 'systemDict/updateSystemDict',
                    sts: this.data[param].sts ? '1' : '0',
                    id: this.data[param].id,
                    dictValue: ''
                }
                if (param == 'apply_time_threshold') {
                    if (this.timeStart != "" && this.timeEnd != "") {
                        obj.dictValue = this.timeStart + "," + this.timeEnd
                    } else {
                        obj.dictValue = ""
                    }
                }
                this.loading = true;
                config(obj).then(response => {
                    if (response.respCode === '000000') {
                        this.$message.success(response.respMsg);
                        this.modify16 = false;

                    }
                    this.loading = false;
                    this.getData();
                })


            }

        }

    }
</script>