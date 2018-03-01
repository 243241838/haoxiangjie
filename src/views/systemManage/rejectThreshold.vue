<template>
    <div>
        <div class="www-page" v-loading="loading">
            <div>
                <el-form v-show="!modify1">
                    <el-form-item label="年龄范围：" label-width="140">
                        <span style="display:inline-block;width:200px;"><span><{{data.age_range.dictValuefirst}}&nbsp;OR&nbsp;</span><span>>{{data.age_range.dictValuesecond}}</span></span>
                        <el-button type="primary" :plain="true" v-waves @click="modify1=true;">修改</el-button>
                        <template>
                            <el-switch class="www-big-switch" v-model="data.age_range.sts" on-color="#13ce66" off-color="#ff4949" @change="change('age_range')">
                            </el-switch><span style="color:#333;" v-if="data.age_range.sts"> 已启用</span><span style="color:#333;" v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                    </el-form>
                <el-form v-show="modify1" v-if="data.age_range" v-bind:model="data.age_range" :rules="rules1" ref="rules1" style="padding-bottom:5px;">
                    <el-form-item prop="dictValuefirst" label="年龄范围：" label-width="140" style="display:inline-block;">
                        小于
                        <el-input v-model="data.age_range.dictValuefirst" :maxlength=30 style="width:100px;margin-bottom:10px;margin:0px 24px;"
                            placeholder="18"></el-input>
                    </el-form-item>
                    <el-form-item prop="dictValuesecond" style="display:inline-block;">
                        大于
                        <el-input v-model="data.age_range.dictValuesecond" :maxlength=30 style="width:100px;margin-bottom:10px;margin:0px 24px;"
                            placeholder="50"></el-input>
                    </el-form-item>
                    <el-button type="primary" :plain="true" v-waves @click="commit('rules1', 'age_range')">保存</el-button>
                    <template>
                        <el-switch class="www-big-switch" v-model="data.age_range.sts" on-color="#13ce66" off-color="#ff4949" @change="change('age_range')">
                        </el-switch><span style="color:#333;" v-if="data.age_range.sts"> 已启用</span><span style="color:#333;" v-else> 已关闭</span>
                    </template>
                </el-form>
            </div>
            <div>
                <el-form v-show="!modify2">
                    <el-form-item label="芝麻信用分：" label-width="140">
                        <span style="display:inline-block;width:200px;"><span><{{data.zhima_score_range.dictValuefirst}}&nbsp;OR&nbsp;</span><span>>{{data.zhima_score_range.dictValuesecond}}</span></span>
                        <el-button type="primary" :plain="true" v-waves @click="modify2=true;">修改</el-button>
                        <template>
                            <el-switch class="www-big-switch" v-model="data.zhima_score_range.sts" on-color="#13ce66" off-color="#ff4949" @change="change('zhima_score_range')">
                            </el-switch><span style="color:#333;" v-if="data.zhima_score_range.sts"> 已启用</span><span style="color:#333;"
                                v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
                <el-form v-show="modify2" v-if="data.zhima_score_range" v-bind:model="data.zhima_score_range" :rules="rules2" ref="rules2" style="padding-bottom:5px;">
                    <el-form-item prop="dictValuefirst" label="芝麻信用分：" label-width="140" style="display:inline-block;">
                        小于
                        <el-input v-model="data.zhima_score_range.dictValuefirst" :maxlength=30 style="width:100px;margin-bottom:10px;margin:0px 24px;"
                            placeholder="580"></el-input>
                    </el-form-item>
                    <el-form-item prop="dictValuesecond" style="display:inline-block;">
                        大于
                        <el-input v-model="data.zhima_score_range.dictValuesecond" :maxlength=30 style="width:100px;margin-bottom:10px;margin:0px 24px;"
                            placeholder="10000"></el-input>
                    </el-form-item>
                    <el-button type="primary" :plain="true" v-waves @click="commit('rules2', 'zhima_score_range')">保存</el-button>
                    <template>
                        <el-switch class="www-big-switch" v-model="data.zhima_score_range.sts" on-color="#13ce66" off-color="#ff4949" @change="change('zhima_score_range')">
                        </el-switch><span style="color:#333;" v-if="data.zhima_score_range.sts"> 已启用</span><span style="color:#333;"
                            v-else> 已关闭</span>
                    </template>
                </el-form>
            </div>
            <div>
                <el-form v-show="!modify3">
                    <el-form-item label="百融分:" label-width="140">
                        <span style="display:inline-block;width:200px;"><span>>{{data.bairong_score_range.dictValuefirst}}&nbsp;And&nbsp;</span><span><{{data.bairong_score_range.dictValuesecond}}</span></span>
                        <el-button type="primary" :plain="true" v-waves @click="modify3=true;">修改</el-button>
                        <template>
                            <el-switch class="www-big-switch" v-model="data.bairong_score_range.sts" on-color="#13ce66" off-color="#ff4949" @change="change('bairong_score_range')">
                            </el-switch><span style="color:#333;" v-if="data.bairong_score_range.sts"> 已启用</span><span style="color:#333;"
                                v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
                <el-form v-show="modify3" v-if="data.bairong_score_range" v-bind:model="data.bairong_score_range" :rules="rules3" ref="rules3" style="padding-bottom:5px;">
                    <el-form-item prop="dictValuefirst" label="百融分：" label-width="140" style="display:inline-block;">
                        大于
                        <el-input v-model="data.bairong_score_range.dictValuefirst" :maxlength=30 style="width:100px;margin-bottom:10px;margin:0px 24px;"
                            ></el-input>
                    </el-form-item>
                    <el-form-item prop="dictValuesecond" style="display:inline-block;">
                        小于
                        <el-input v-model="data.bairong_score_range.dictValuesecond" :maxlength=30 style="width:100px;margin-bottom:10px;margin:0px 24px;"
                            ></el-input>
                    </el-form-item>
                    <el-button type="primary" :plain="true" v-waves @click="commit('rules3', 'bairong_score_range')">保存</el-button>
                    <template>
                        <el-switch class="www-big-switch" v-model="data.bairong_score_range.sts" on-color="#13ce66" off-color="#ff4949" @change="change('bairong_score_range')">
                        </el-switch><span style="color:#333;" v-if="data.bairong_score_range.sts"> 已启用</span><span style="color:#333;"
                            v-else> 已关闭</span>
                    </template>
                </el-form>
            </div>
            <div>
                <el-form v-show="!modify4">
                    <el-form-item label="身份证前3位:" label-width="140">
                        <ul style="display:inline-block;width:200px;">
                            <li style="line-height:1;margin-bottom:4px;" v-for="item in data.id_card_no_pre3.dictValue" :key="item">{{item}}</li>
                        </ul>
                        <el-button type="primary" :plain="true" v-waves @click="modification('id_card_no_pre3')" style="vertical-align:top;">修改</el-button>
                        <template>
                            <el-switch class="www-big-switch" v-model="data.id_card_no_pre3.sts" on-color="#13ce66" off-color="#ff4949" @change="send('id_card_no_pre3')"
                                style="vertical-align:top;margin-top:7px;">
                            </el-switch><span style="color:#333;vertical-align:top;" v-if="data.id_card_no_pre3.sts"> 已启用</span>
                            <span style="color:#333;vertical-align:top;" v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
                <el-form v-show="modify4" v-if="data.id_card_no_pre3" v-bind:model="data.id_card_no_pre3">
                   <el-form-item label="身份证前3位：" label-width="140" style="display:inline-block;">
                        <el-input @keypress.native="aaptivewidth('input1','1')" v-model="data.id_card_no_pre3.newValue" ref="input1" :style="{width:firstwidth+'px' }" style="margin-bottom:10px;margin:0px 24px;"
                            placeholder="输入身份证前3位，多个地区用空格隔开"></el-input>
                    </el-form-item>
                    <el-button type="primary" :plain="true" v-waves @click="check('id_card_no_pre3')">保存</el-button>
                    <template>
                        <el-switch class="www-big-switch" v-model="data.id_card_no_pre3.sts" on-color="#13ce66" off-color="#ff4949" @change="change('id_card_no_pre3')">
                        </el-switch><span style="color:#333;" v-if="data.id_card_no_pre6.sts"> 已启用</span><span style="color:#333;" v-else> 已关闭</span>
                    </template>
                </el-form>
            </div>
            <div>
                <el-form v-show="!modify5">
                    <el-form-item label="身份证前6位:" label-width="140">
                        <ul style="display:inline-block;width:200px;">
                            <li style="line-height:1;margin-bottom:4px;" v-for="item in data.id_card_no_pre6.dictValue" :key="item">{{item}}</li>
                        </ul>
                        <el-button type="primary" :plain="true" v-waves @click="modification1('id_card_no_pre6')" style="vertical-align:top;">修改</el-button>
                        <template>
                            <el-switch class="www-big-switch" v-model="data.id_card_no_pre6.sts" on-color="#13ce66" off-color="#ff4949" @change="send('id_card_no_pre6')"
                                style="vertical-align:top;margin-top:7px;">
                            </el-switch><span style="color:#333;vertical-align:top;" v-if="data.id_card_no_pre6.sts"> 已启用</span>
                            <span style="color:#333;vertical-align:top;" v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
                <el-form v-show="modify5" v-if="data.id_card_no_pre6" v-bind:model="data.id_card_no_pre6">
                    <el-form-item label="身份证前6位：" label-width="140" style="display:inline-block;">
                        <el-input  v-model="data.id_card_no_pre6.newValue" @keypress.native="aaptivewidth('input2','2')" ref="input2" :style="{width:secondwidth+'px' }"style="margin-bottom:10px;margin:0px 24px;"
                            placeholder="输入身份证前6位,多个地区用空格隔开"></el-input>
                    </el-form-item>
                    <el-button type="primary" :plain="true" v-waves @click="Idcard('id_card_no_pre6')">保存</el-button>
                    <template>
                        <el-switch class="www-big-switch" v-model="data.id_card_no_pre6.sts" on-color="#13ce66" off-color="#ff4949" @change="change('id_card_no_pre6')">
                        </el-switch><span style="color:#333;" v-if="data.id_card_no_pre6.sts"> 已启用</span><span style="color:#333;" v-else> 已关闭</span>
                    </template>
                </el-form>
            </div>
            <div>
                <el-form v-show="!modify6">
                    <el-form-item label="职业类型：" label-width="140">
                        <ul style="display:inline-block;width:200px;"><li v-for="item in data.occupation.dictValue" style="line-height:1;margin-bottom:4px;">{{item.name}}<span>-{{item.job}}</span></li></ul>
                        <el-button type="primary" :plain="true" v-waves @click="modify6=true;">修改</el-button>
                        <template>
                            <el-switch class="www-big-switch" v-model="data.occupation.sts" on-color="#13ce66" off-color="#ff4949" @change="witch('occupation')">
                            </el-switch><span style="color:#333;" v-if="data.occupation.sts"> 已启用</span><span style="color:#333;" v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
                <el-form v-show="modify6" v-if="data.occupation" :model="data.occupation" ref="rules5">
                    <el-form-item label="职业类型：" label-width="140">
                        <el-radio-group v-model="radio" style="width:420px;">
                            <el-radio :label="1">自由职业</el-radio>
                            <el-radio :label="2">工薪族</el-radio>
                            <el-radio :label="3">私营业主</el-radio>
                            <el-radio :label="4">网店卖家</el-radio>
                            <el-radio :label="5">学生</el-radio>
                        </el-radio-group>
                        <el-button type="primary" :plain="true" v-waves @click="jobInfo('occupation')" style="vertical-align:top;">保存</el-button>
                        <template>
                            <el-switch style="vertical-align:top;margin-top:7px;" class="www-big-switch" v-model="data.occupation.sts" on-color="#13ce66"
                                off-color="#ff4949" @change="witch('occupation')">
                            </el-switch><span style="color:#333;vertical-align:top;margin-top:7px;" v-if="data.occupation.sts"> 已启用</span>
                            <span style="color:#333;vertical-align:top;margin-top:7px;" v-else> 已关闭</span>
                        </template>
                        <el-checkbox-group v-model="checklist1" v-show="1==radio" style="width:420px;">
                            <el-checkbox label="100" style="width:80px;margin-left:0px;">无业</el-checkbox>
                            <el-checkbox label="101" style="width:80px;margin-left:0px;">务农</el-checkbox>
                            <el-checkbox label="102" style="width:80px;margin-left:0px;">家庭主妇</el-checkbox>
                            <el-checkbox label="103" style="width:80px;margin-left:0px;">钟点工</el-checkbox>
                            <el-checkbox label="104" style="width:80px;margin-left:0px;">临时工</el-checkbox>
                            <el-checkbox label="105" style="width:80px;margin-left:0px;">证券投资</el-checkbox>
                            <el-checkbox label="106" style="width:80px;margin-left:0px;">个体运输</el-checkbox>
                            <el-checkbox label="107" style="width:80px;margin-left:0px;">流动摊贩</el-checkbox>
                            <el-checkbox label="108" style="width:80px;margin-left:0px;">游戏代练</el-checkbox>
                            <el-checkbox label="109" style="width:80px;margin-left:0px;">其他</el-checkbox>
                        </el-checkbox-group>
                        <el-checkbox-group v-model="checklist2" v-show="2==radio" style="width:420px;">
                            <el-checkbox label="200" style="width:90px;margin-left:0px;">政府机关</el-checkbox>
                            <el-checkbox label="201" style="width:90px;margin-left:0px;">学校</el-checkbox>
                            <el-checkbox label="202" style="width:90px;margin-left:0px;">医院(民办)</el-checkbox>
                            <el-checkbox label="203" style="width:90px;margin-left:0px;">医院(1级)</el-checkbox>
                            <el-checkbox label="204" style="width:90px;margin-left:0px;">医院(2级)</el-checkbox>
                            <el-checkbox label="205" style="width:90px;margin-left:0px;">医院(3级)</el-checkbox>
                            <el-checkbox label="206" style="width:90px;margin-left:0px;">医院(其他)</el-checkbox>
                            <el-checkbox label="207" style="width:90px;margin-left:0px;">企业(国有)</el-checkbox>
                            <el-checkbox label="208" style="width:90px;margin-left:0px;">企业(股份)</el-checkbox>
                            <el-checkbox label="209" style="width:90px;margin-left:0px;">企业(私营)</el-checkbox>
                            <el-checkbox label="210" style="width:90px;margin-left:0px;">企业(外资)</el-checkbox>
                            <el-checkbox label="211" style="width:90px;margin-left:0px;">企业(合资)</el-checkbox>
                            <el-checkbox label="212" style="width:90px;margin-left:0px;">企业(其他)</el-checkbox>
                            <el-checkbox label="213" style="width:90px;margin-left:0px;">私营商铺</el-checkbox>
                        </el-checkbox-group>
                        <el-checkbox-group v-model="checklist3" v-show="3==radio" style="width:420px;">
                            <el-checkbox label="300" style="width:90px;margin-left:0px;">个体工商户</el-checkbox>
                            <el-checkbox label="301" style="width:90px;margin-left:0px;">企业法人</el-checkbox>
                        </el-checkbox-group>
                        <el-checkbox-group v-model="checklist4" v-show="4==radio" style="width:420px;">
                            <el-checkbox label="400" style="width:80px;margin-left:0px;">淘宝店主</el-checkbox>
                            <el-checkbox label="401" style="width:80px;margin-left:0px;">微店</el-checkbox>
                            <el-checkbox label="402" style="width:80px;margin-left:0px;">其他网店</el-checkbox>
                        </el-checkbox-group>
                        <el-checkbox-group v-model="checklist5" v-show="5==radio" style="width:420px;">
                            <el-checkbox label="500" style="width:80px;margin-left:0px;">学生</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-form>
            </div>
            <div>
                <el-form v-show="!modify7">
                    <el-form-item label="学历：" label-width="140">
                        <ul style="display:inline-block;width:200px;">
                            <li v-for="item in data.education.dictValue" :key="item" style="line-height:1;margin-bottom:4px;">{{item}}</li>
                        </ul>
                        <el-button type="primary" :plain="true" v-waves @click="modify7=true;">修改</el-button>
                        <template>
                            <el-switch class="www-big-switch" v-model="data.education.sts" on-color="#13ce66" off-color="#ff4949" @change="change('education')">
                            </el-switch><span style="color:#333;" v-if="data.education.sts"> 已启用</span><span style="color:#333;" v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
                <el-form v-show="modify7" v-if="data.education" :model="data.education" ref="rules6">
                    <el-form-item label="学历：" label-width="140">
                            <el-checkbox-group style="display:inline-block;width:236px;margin-right:124px;" v-model="educationalList">
                            <el-checkbox label="1">小学</el-checkbox>
                            <el-checkbox label="2">初中</el-checkbox>
                            <el-checkbox label="3">高中/中专</el-checkbox>
                            <el-checkbox label="4" style="margin-left:0px;">大专</el-checkbox>
                            <el-checkbox label="5">本科</el-checkbox>
                            <el-checkbox label="6">硕士及以上</el-checkbox>
                        </el-checkbox-group>
                        <el-button type="primary" :plain="true" v-waves @click="educationalInfo('education')" style="vertical-align:top;">保存</el-button>
                        <template>
                            <el-switch style="vertical-align:top;margin-top:7px;" class="www-big-switch" v-model="data.education.sts" on-color="#13ce66"
                                off-color="#ff4949" @change="change('education')">
                            </el-switch><span style="color:#333;vertical-align:top;margin-top:7px;" v-if="data.education.sts"> 已启用</span>
                            <span style="color:#333;vertical-align:top;margin-top:7px;" v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
            </div>
            <div>
                <el-form v-show="!modify8">
                    <el-form-item label="通讯录信息读取：" label-width="140">
                        <span style="display:inline-block;width:200px;">{{data.contact_flag.dictValue |  filters}}</span>
                        <el-button type="primary" :plain="true" v-waves @click="modify8=true;">修改</el-button>
                        <template>
                            <el-switch class="www-big-switch" v-model="data.contact_flag.sts" on-color="#13ce66" off-color="#ff4949" @change="change('contact_flag')">
                            </el-switch><span style="color:#333;" v-if="data.contact_flag.sts"> 已启用</span><span style="color:#333;" v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
                <el-form v-show="modify8" v-if="data.contact_flag" :model="data.contact_flag" :rules="rules7" ref="rules7">
                    <el-form-item prop="dictValue" label="通讯录信息读取：" label-width="140">
                        <el-radio v-model="data.contact_flag.dictValue" label="1" style="display:inline-block;margin-right:108px;margin-bottom:10px;">Yes</el-radio>
                        <el-radio v-model="data.contact_flag.dictValue" label="0" style="display:inline-block;margin-right:142px;margin-bottom:10px;">No</el-radio>
                        <el-button type="primary" :plain="true" v-waves @click="info('rules7', 'contact_flag')">保存</el-button>
                        <template>
                            <el-switch class="www-big-switch" v-model="data.contact_flag.sts" on-color="#13ce66" off-color="#ff4949" @change="change('contact_flag')">
                            </el-switch><span style="color:#333;" v-if="data.contact_flag.sts"> 已启用</span><span style="color:#333;" v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
            </div>
            <div>
                <el-form v-show="!modify9">
                    <el-form-item label="位置信息读取：" label-width="140">
                        <span style="display:inline-block;width:200px;">{{data.position_flag.dictValue |  filters}}</span>
                        <el-button type="primary" :plain="true" v-waves @click="modify9=true;">修改</el-button>
                        <template>
                            <el-switch class="www-big-switch" v-model="data.position_flag.sts" on-color="#13ce66" off-color="#ff4949" @change="change('position_flag')">
                            </el-switch><span style="color:#333;" v-if="data.position_flag.sts"> 已启用</span><span style="color:#333;"
                                v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
                <el-form v-show="modify9" v-if="data.position_flag" :model="data.position_flag" :rules="rules8" ref="rules8">
                    <el-form-item prop="dictValue" label="位置信息读取：" label-width="140">
                        <el-radio v-model="data.position_flag.dictValue" label="1" style="display:inline-block;margin-right:108px;margin-bottom:10px;">Yes</el-radio>
                        <el-radio v-model="data.position_flag.dictValue" label="0" style="display:inline-block;margin-right:142px;margin-bottom:10px;">No</el-radio>
                        <el-button type="primary" :plain="true" v-waves @click="info('rules8', 'position_flag')">保存</el-button>
                        <template>
                            <el-switch class="www-big-switch" v-model="data.position_flag.sts" on-color="#13ce66" off-color="#ff4949" @change="change('position_flag')">
                            </el-switch><span style="color:#333;" v-if="data.position_flag.sts"> 已启用</span><span style="color:#333;"
                                v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
            </div>
            <div>
                <el-form v-show="!modify10">
                    <el-form-item label="机读信息读取：" label-width="140">
                        <span style="display:inline-block;width:200px;">{{data.machine_flag.dictValue |  filters}}</span>
                        <el-button type="primary" :plain="true" v-waves @click="modify10=true;">修改</el-button>
                        <template>
                            <el-switch class="www-big-switch" v-model="data.machine_flag.sts" on-color="#13ce66" off-color="#ff4949" @change="change('machine_flag')">
                            </el-switch><span style="color:#333;" v-if="data.machine_flag.sts"> 已启用</span><span style="color:#333;" v-else> 已关闭</span>
                        </template>
                    </el-form-item>
                </el-form>
                <el-form v-show="modify10" v-if="data.machine_flag" :model="data.machine_flag" :rules="rules9" ref="rules9">
                    <el-form-item prop="dictValue" label="机读信息读取：" label-width="140">
                        <el-radio v-model="data.machine_flag.dictValue" label="1" style="display:inline-block;margin-right:108px;margin-bottom:10px;">Yes</el-radio>
                        <el-radio v-model="data.machine_flag.dictValue" label="0" style="display:inline-block;margin-right:142px;margin-bottom:10px;">No</el-radio>
                        <el-button type="primary" :plain="true" v-waves @click="info('rules9', 'machine_flag')">保存</el-button>
                        <template>
                            <el-switch class="www-big-switch" v-model="data.machine_flag.sts" on-color="#13ce66" off-color="#ff4949" @change="change('machine_flag')">
                            </el-switch><span style="color:#333;" v-if="data.machine_flag.sts"> 已启用</span><span style="color:#333;" v-else> 已关闭</span>
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
                modify4: false,
                modify5: false,
                modify6: false,
                modify7: false,
                modify8: false,
                modify9: false,
                modify10: false,
                loading: false,
                firstwidth:'',
                secondwidth:'',
                checklist1: [],
                checklist2: [],
                checklist3: [],
                checklist4: [],
                checklist5: [],
                educationalList: [],
                radio: 1,
                rules1: {
                    'dictValuefirst': {
                        required: true,
                        pattern: /(^[1-9]([0-9]*)$|^[0-9]$)/,
                        message: '年龄不能为空且必须是整数,多个数字第一位不能是零',
                        trigger: 'blur'
                    },
                    'dictValuesecond': {
                        required: true,
                        pattern:/(^[1-9]([0-9]*)$|^[0-9]$)/,
                        message: '年龄不能为空且必须是整数,多个数字第一位不能是零',
                        trigger: 'blur'
                    }

                },
                rules2: {
                    'dictValuefirst': {
                        required: true,
                        pattern: /(^[1-9]([0-9]*)$|^[0-9]$)/,
                        message: '芝麻信用分不能为空且必须是整数,多个数字第一位不能是零',
                        trigger: 'blur'
                    },
                    'dictValuesecond': {
                        required: true,
                        pattern: /(^[1-9]([0-9]*)$|^[0-9]$)/,
                        message: '芝麻信用分不能为空且必须是整数,多个数字第一位不能是零',
                        trigger: 'blur'
                    }

                },

                rules3: {
                    'dictValuefirst': {
                        required: true,
                        pattern: /(^[1-9]([0-9]*)$|^[0-9]$)/,
                        message: '百融分不能为空且必须是整数,多个数字第一位不能是零',
                        trigger: 'blur'
                    },
                    'dictValuesecond': {
                        required: true,
                        pattern: /(^[1-9]([0-9]*)$|^[0-9]$)/,
                        message: '百融分不能为空且必须是整数,多个数字第一位不能是零',
                        trigger: 'blur'
                    }

                },
                rules7: {
                    dictValue: [{
                        required: true,
                        message: '请选择一个通讯录读取信息',
                        trigger: 'change'
                    }]
                },
                rules8: {
                    dictValue: [{
                        required: true,
                        message: '请选择一个位置读取信息',
                        trigger: 'change'
                    }]
                },
                rules9: {
                    dictValue: [{
                        required: true,
                        message: '请选择一个机读读取信息',
                        trigger: 'change'
                    }]
                },
                data: {
                    age_range: '',
                    zhima_score_range: '',
                    bairong_score_range: '',
                    id_card_no_pre3: '',
                    id_card_no_pre6: '',
                    age_range: '',
                    contact_flag: '',
                    position_flag: '',
                    machine_flag: '',
                    education: '',
                    occupation: ''


                }
            }
        },
        computed: {},
        created() {
            this.getData();
        },
        mounted() {
              
        },
        destroyed(){
            
        },
        // 信息读取提取
        filters: {
            filters: function (value) {
                if (value == "0") {
                    return "No"
                } else {
                    return "Yes"
                }
            }
        },
        methods: {
     aaptivewidth(ref,number){
              let dom=this.$refs[ref].$el.getElementsByTagName("input")[0];
             let length=dom.value.length;
               let totallength=length*10;
               if (totallength<540){
                this.$refs[ref].$el.style.width="540px";
              }
               else if(totallength>900){
                  
                      this.$refs[ref].$el.style.width="900px";
                     if(number==1){
                         this.firstwidth=900;
                         
                     }
                     if(number==2){
                          secondwidth
                     }
                  
               }else{
                    this.$refs[ref].$el.style.width=totallength+"px"
                          if(number==1){
                         this.firstwidth=totallength;
                         
                         }
                        if(number==2){
                            this.secondwidth=totallength;
                        }
                    };
               
                   
                   
        },
        //职业信息按钮传真
           witch(param){
                    let obj = {
                    url: 'systemDict/updateSystemDict',
                    sts: this.data[param].sts ? '1' : '0',
                    id: this.data[param].id,
                    dictValue: this.data[param].dictValue
                };
                let array=[];
                for(let i=0;i<this.data[param].dictValue.length;i++){
                      array.push(this.data[param].dictValue[i].index)
                }
                obj.dictValue=array.join(",")
                  this.loading = true;
                config(obj).then(response => {
                    if (response.respCode === '000000') {
                    this.$message.success(response.respMsg);
                    this.modify6 = false;
                    }else{
                        this.$message.error(response.respMsg);
                    }
                    this.loading = false;
                })

           },
          
            info (formName, name) {
            this.$refs[formName].validate((valid) => {
                if (!valid) {
                    return false;
                }
                this.change(name);
            })
            },
            //验证后面的是否大于前面的
            commit(formName, name) {
                let firstValue=this.data[name].dictValuefirst;
                let secondValue=this.data[name].dictValuesecond;
                let through=secondValue-firstValue>0?true:false;
                this.$refs[formName].validate((valid) => {
                    if (!valid) {
                        return false;
                    }else if(!through){
                        this.$message({
                            message: '后面的数必须大于前面的数！',
                            type: 'warning'
                        });
                         return false; 
                    }
                    this.change(name);
                });
            },
            //职业信息验证
            jobInfo(name) {
                let result = [];
                for (let i = 0; i < this.checklist1.length; i++) {
                    result.push(this.checklist1[i])
                }
                for (let i = 0; i < this.checklist2.length; i++) {
                    result.push(this.checklist2[i])
                }
                for (let i = 0; i < this.checklist3.length; i++) {
                    result.push(this.checklist3[i])
                }
                for (let i = 0; i < this.checklist4.length; i++) {
                    result.push(this.checklist4[i])
                }
                for (let i = 0; i < this.checklist5.length; i++) {
                    result.push(this.checklist5[i])
                }
                if (result.length == 0) {
                   this.data.occupation.dictValue="";
                }else{
                   this.data.occupation.dictValue = result.join(",");
                }
            

                this.change(name);
               },
            //学历信息
            educationalInfo(name) {
                 let obj = {
                    url:'systemDict/updateSystemDict',
                    sts: this.data[name].sts ? '1' : '0',
                    id: this.data[name].id,
                    dictValue: this.educationalList 
                };
                if(this.educationalList === undefined||this.educationalList.length == 0){
                   obj.dictValue="";
                   }else{
                   let result = this.educationalList.join(",");
                   obj.dictValue=result;
                 }
              
               this.loading = true;
               config(obj).then(response => { 
                    if (response.respCode === '000000') {
                    this.$message.success(response.respMsg);
                    this.modify7 = false;
                    this. getData();
                  }else {
                        this.$message.error(response.respMsg);
                    }
                    this.loading = false;
                 })
               
                
      },
            //验证身份证前3位
            check(name) {
                let reg = /^[1-9]\d{2}$/;
                let value=this.data[name].newValue;
                if(value==""){
                    this.change(name);
                }else{
                    
                   let value= this.data[name].newValue.split(" ");
                   let result=[];
                   for(let i=0;i<value.length;i++){
                       if(value[i]!=""){
                           result.push(value[i]);
                       }
                   }
                  for(let i=0;i<result.length;i++){
                      if(!reg.test(result[i])){
                           this.$message({
                        message: '身份证前3位不对！多个地区用空格隔开',
                        type: 'warning'
                       });
                       return false
                      }
                  }
                   this.change(name);
                }
               

                   
            },

            // 验证身份证前6位
            Idcard(name) {
                let reg = /^[1-9]\d{5}$/;
                let value=this.data[name].newValue;
               if(value==""){
                    this.change(name);
                }else{
                   let value= this.data[name].newValue.split(" ");
                   let result=[];
                   for(let i=0;i<value.length;i++){
                       if(value[i]!=""){
                           result.push(value[i]);
                       }
                   }
                  for(let i=0;i<result.length;i++){
                      if(!reg.test(result[i])){
                           this.$message({
                        message: '身份证前6位不对！多个地区用空格隔开',
                        type: 'warning'
                       });
                       return false
                      }
                  }
                   this.change(name);
                }
               
            },
            
        
            //身份证修改
       modification(name){
                  this.modify4=true;
                 if(this.data[name].dictValue==""){
                      this.data[name].dictValue=""
                 }else{
                     this.data[name].dictValue=this.data[name].dictValue.join(",").replace(/,/g," ")
                    
                  }
                 
              
            },
         modification1(name){
                  this.modify5=true;
                 if(this.data[name].dictValue==""){
                      this.data[name].dictValue=""
                 }else{
                     this.data[name].dictValue=this.data[name].dictValue.join(",").replace(/,/g," ")
                    
                  }
                 
              
            },
          //请求处理数据
            getData() {
                config({
                    url: 'systemDict/list'
                }).then(response => {
                    if (response.respCode === '000000') {
                        let obj = {}
                        this.systemDictPoList = response.data.systemDictPoList.map(item => {
                            obj[item.dictName] = {};
                            
                          if (item.dictName == 'age_range' || item.dictName == 'zhima_score_range' ||
                                item.dictName == 'bairong_score_range') {
                                let arr = item.dictValue.split(",");
                                item.newvaluefirst =  arr[0];
                                item.newvaluesecond = arr[1];
                                obj[item.dictName].dictValuefirst = item.newvaluefirst;
                                obj[item.dictName].dictValuesecond = item.newvaluesecond;
                                obj[item.dictName].sts = !!item.sts;
                                obj[item.dictName].id = item.id;
                            } else if (item.dictName == 'id_card_no_pre3' || item.dictName ==
                                'id_card_no_pre6') {
                                let value = item.dictValue;
                                if (value == "") {
                                    item.newValue="";
                                    obj[item.dictName].dictValue = [];
                                    obj[item.dictName].sts = !!item.sts;
                                    obj[item.dictName].id = item.id;
                                     obj[item.dictName].newValue="";
                                    this.firstwidth=540;
                                    this.secondwidth=540;
                                } else {
                                    item.newValue=item.dictValue;
                                    obj[item.dictName].dictValue = item.dictValue.split(",")
                                    obj[item.dictName].sts = !!item.sts;
                                    obj[item.dictName].id = item.id;
                                    obj[item.dictName].newValue=item.dictValue.replace(/,/g," ");
                                let totallength=item.dictValue.length*10;
                                 if(item.dictName=='id_card_no_pre3'){
                                       if(totallength<540){
                                            this.firstwidth=540
                                       }else if(totallength>900){
                                            this.firstwidth=900
                                       }else{
                                           this.firstwidth=totallength
                                       }
                                   }
                                if(item.dictName=='id_card_no_pre6'){
                                        if(totallength<540){
                                            this.secondwidth=540
                                       }else if(totallength>900){
                                            this.secondwidth=900
                                       }else{
                                           this.secondwidth=totallength
                                       }


                                }


                                }
                                   
                            } else if (item.dictName == 'occupation') {
                                 let value = item.dictValue
                                if (value == "") {
                                    obj[item.dictName].dictValue = [];
                                    obj[item.dictName].sts = !!item.sts;
                                    obj[item.dictName].id = item.id;
                                } else {
                                   obj[item.dictName].dictValue = item.dictValue.split(",");
                                    let arr = obj[item.dictName].dictValue;
                                    let arr1=[100,101,102,103,104,105,106,107,108,109];
                                    let arr2=[200,201,202,203,204,205,206,207,208,209,210,211,212,213];
                                    let arr3=[300,301];
                                    let arr4=[400,401,402];
                                    let arr5=[500]
                                    let index = [];
                                    this.checklist1=new Array;
                                    this.checklist2=new Array;
                                    this.checklist3=new Array;
                                    this.checklist4=new Array;
                                    this.checklist5=new Array;
                                 let result = [{
                                                name: "自由职业",
                                                job: "无业",
                                                index: "100"
                                            },
                                            {
                                                name: "自由职业",
                                                job: "务农",
                                                index: "101"
                                            },

                                            {
                                                name: "自由职业",
                                                job: "家庭主妇",
                                                index: "102"
                                            },
                                            {
                                                name: "自由职业",
                                                job: "钟点工",
                                                index: "103"
                                            },

                                            {
                                                name: "自由职业",
                                                job: "临时工",
                                                index: "104"
                                            },

                                            {
                                                name: "自由职业",
                                                job: "证券投资",
                                                index: "105"
                                            },

                                            {
                                                name: "自由职业",
                                                job: "个体运输",
                                                index: "106"
                                            },

                                            {
                                                name: "自由职业",
                                                job: "流动摊贩",
                                                index: "107"
                                            },

                                            {
                                                name: "自由职业",
                                                job: '游戏代练',
                                                index: "108"
                                            },

                                            {
                                                name: "自由职业",
                                                job: '其他',
                                                index: "109"
                                            },

                                            {
                                                name: "工薪族",
                                                job: '政府机关',
                                                index: "200"
                                            },

                                            {
                                                name: "工薪族",
                                                job: '学校',
                                                index: "201"
                                            },

                                            {
                                                name: "工薪族",
                                                job: '医院(民办)',
                                                index: "202"
                                            },

                                            {
                                                name: "工薪族",
                                                job: '医院(1级)',
                                                index: "203"
                                            },

                                            {
                                                name: "工薪族",
                                                job: '医院(2级)',
                                                index: "204"
                                            },

                                            {
                                                name: "工薪族",
                                                job: '医院(3级)',
                                                index: "205"
                                            },
                                            {
                                                name: "工薪族",
                                                job: '医院(其他)',
                                                index: "206"
                                            },
                                            {
                                                name: "工薪族",
                                                job: '企业(国有)',
                                                index: "207"
                                            },
                                            {
                                                name: "工薪族",
                                                job: '企业(股份)',
                                                index: "208"
                                            },
                                            {
                                                name: "工薪族",
                                                job: '企业(私营)',
                                                index: "209"
                                            },
                                            {
                                                name: "工薪族",
                                                job: '企业(私营)',
                                                index: "209"
                                            },
                                            {
                                                name: "工薪族",
                                                job: '企业(外资)',
                                                index: "210"
                                            },
                                            {
                                                name: "工薪族",
                                                job: '企业(合资)',
                                                index: "211"
                                            },
                                            {
                                                name: "工薪族",
                                                job: '企业(其他)',
                                                index: "212"
                                            },
                                            {
                                                name: "工薪族",
                                                job: '私营商铺',
                                                index: "213"
                                            },
                                            {
                                                name: "私营业主",
                                                job: '个体工商户',
                                                index: "300"
                                            },
                                            {
                                                name: "私营业主",
                                                job: '企业法人',
                                                index: "301"
                                            },
                                            {
                                                name: "网店卖家",
                                                job: '淘宝店主',
                                                index: "400"
                                            },
                                            {
                                                name: "网店卖家",
                                                job: '微店',
                                                index: "401"
                                            },
                                            {
                                                name: "网店卖家",
                                                job: '其他网店',
                                                index: "402"
                                            },
                                            {
                                                name: "学生",
                                                job: '学生',
                                                index: "500"
                                            }
                                        ];
                                   for(let i=0; i<arr.length;i++){
                                       for(let j=0 ;j<result.length;j++){
                                           let obj1=result[j];
                                         if(obj1.index==arr[i]){
                                           let obj2={};
                                           obj2.name=obj1.name;
                                           obj2.job=obj1.job;
                                           obj2.index=obj1.index;
                                           index.push(obj2)
                                           
                                       }
                                       }
                                    }
                                  for(let i=0;i<arr.length;i++){
                                         for(let j=0;j<arr1.length;j++){
                                             if(arr[i]==arr1[j]){
                                              
                                            this.checklist1.push(arr[i])
                                          
                                             }
                                          }
                                        for(let j=0;j<arr2.length;j++){
                                             if(arr[i]==arr2[j]){
                                            this.checklist2.push(arr[i])
                                             }
                                          }
                                       for(let j=0;j<arr3.length;j++){
                                             if(arr[i]==arr3[j]){
                                            this.checklist3.push(arr[i])
                                             }
                                          }
                                       for(let j=0;j<arr4.length;j++){
                                             if(arr[i]==arr4[j]){
                                            this.checklist4.push(arr[i])
                                             }
                                          }
                                         for(let j=0;j<arr5.length;j++){
                                             if(arr[i]==arr5[j]){
                                            this.checklist5.push(arr[i])
                                             }
                                          }

                                     
                                  }
                                    
                                    obj[item.dictName].dictValue =index;
                                    obj[item.dictName].sts = !!item.sts;
                                    obj[item.dictName].id = item.id;
                                 
                                }   
                            } else if (item.dictName == 'education') {
                                let value = item.dictValue;
                                if (value == "") {
                                    obj[item.dictName].dictValue = [];
                                    obj[item.dictName].sts = !!item.sts;
                                    obj[item.dictName].id = item.id;
                                } else {
                                    let array = item.dictValue.split(",");
                                    let result = [];
                                    for (let i = 0; i < array.length; i++) {
                                        if (array[i] == 1) {
                                            result.push('小学')
                                        };
                                        if (array[i] == 2) {
                                            result.push('初中')
                                        };
                                        if (array[i] == 3) {
                                            result.push('高中/中专')
                                        };
                                        if (array[i] == 4) {
                                            result.push('大专')
                                        };
                                        if (array[i] == 5) {
                                            result.push('本科')
                                        };
                                        if (array[i] == 6) {
                                            result.push('硕士及以上')
                                        }

                                    }
                                    obj[item.dictName].dictValue = result
                                    obj[item.dictName].sts = !!item.sts;
                                    obj[item.dictName].id = item.id;
                                    this.educationalList=item.dictValue.split(",");
                                 
                                }
                            } else {
                                obj[item.dictName].dictValue = item.dictValue;
                                obj[item.dictName].sts = !!item.sts;
                                obj[item.dictName].id = item.id;
                            }
                        });
                        this.data = obj;
                     

                    }
                })
            },
            //身份证发送信息
            send(param){
              let obj = {
                    url: 'systemDict/updateSystemDict',
                    sts: this.data[param].sts ? '1' : '0',
                    id: this.data[param].id,
                    dictValue: this.data[param].dictValue
                };
                if(param=='id_card_no_pre3'|| param =='id_card_no_pre6'){
                      if(this.data[param].dictValue==""){
                        obj.dictValue="";}
                      else{
                      obj.dictValue=this.data[param].dictValue.join(",")
                          
                    }
               };
               this.loading = true;
               config(obj).then(response => {
               if (response.respCode === '000000'){
                  this.$message.success(response.respMsg);
                  

             }else {
                 this.$message.error(response.respMsg);
                    }

             this.loading =false;
             

             })

            },
            //传数据
            change(param) {
                let obj = {
                    url:'systemDict/updateSystemDict',
                    sts: this.data[param].sts ? '1' : '0',
                    id: this.data[param].id,
                    dictValue: ""
                };
              
               if (param =='age_range' || param == 'zhima_score_range' || param == 'bairong_score_range') {
                   obj.dictValue = this.data[param].dictValuefirst+","+this.data[param].dictValuesecond;
                 };
                if (param=='id_card_no_pre3') {
                    if(this.data[param].newValue==""){
                          obj.dictValue="";
                        }
                    else{
                      let array = this.data[param].newValue.split(" ");
                           let result = [];
                         for (let i in array) {
                           if (array[i] != "") {
                                 result.push(array[i])
                              }
                        }
                       
                        obj.dictValue =result.join(",")
                       }
                   };
                if(param =='id_card_no_pre6'){
                 if(this.data[param].newValue==""){
                        
                        obj.dictValue="";}
                 else{
                      let array = this.data[param].newValue.split(" ");
                     let result = [];
                       for (let i in array) {
                           if (array[i] != "") {
                                 result.push(array[i])
                              }
                        }
                        obj.dictValue =result.join(",")
               }
                
            };
                if (param == 'occupation') {
                    obj.dictValue = this.data[param].dictValue;
                }
                if (param == 'education') {
                    let array=this.data[param].dictValue;
                    obj.dictValue = this.data[param].dictValue;
                    let result=[];
                    for(let i=0;i<array.length;i++){
                                        if (array[i] =='小学') {
                                            result.push(1)
                                        };
                                        if (array[i] =='初中') {
                                            result.push(2)
                                        };
                                        if (array[i] =='高中/中专') {
                                            result.push(3)
                                        };
                                        if (array[i] =='大专') {
                                            result.push(4)
                                        };
                                        if (array[i] =='本科') {
                                            result.push(5)
                                        };
                                        if (array[i] == '硕士及以上') {
                                            result.push(6)
                                        }

                    }
                     obj.dictValue = result.join(",")
                }
                if(param=='contact_flag'||param=='position_flag'||param=='machine_flag'){
                     obj.dictValue = this.data[param].dictValue;
                }
                this.loading = true;
                config(obj).then(response => {
                    if (response.respCode === '000000') {
                        this.$message.success(response.respMsg);
                        if (param == 'age_range') {
                            this.modify1 = false;
                        } else if (param == 'zhima_score_range') {
                            this.modify2 = false;
                        } else if (param == 'bairong_score_range') {
                            this.modify3 = false;
                        } else if (param == 'id_card_no_pre3') {
                            this.modify4 = false;
                            this. getData();
                        } else if (param == 'id_card_no_pre6') {
                            this.modify5 = false;
                            this. getData();
                        } else if (param == 'occupation') {
                            this.modify6 = false;
                            this. getData();
                        } else if (param == 'education') {
                            this.modify7 = false;
                            this. getData();
                        } else if (param == 'contact_flag') {
                            this.modify8 = false;
                        } else if (param == 'position_flag') {
                            this.modify9 = false;
                        } else if (param == 'machine_flag') {
                            this.modify10 = false;
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