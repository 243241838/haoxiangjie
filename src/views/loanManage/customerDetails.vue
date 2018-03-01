<template>
    <div class="app-container calendar-list-container">
        <el-tabs v-model="tabsName" type="card" @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="first">
                <el-collapse v-model="collapse">
                    <el-collapse-item v-if="customerDetail.commonUserPo" title="用户信息" name="1">
                        <el-input v-model="customerDetail.commonUserPo.userId" class="www-el-label-input" readonly>
                            <template slot="prepend">
                                <span class="www-el-label-text">用户ID</span>
                            </template>
                        </el-input>
                        <el-input v-model="customerDetail.commonUserPo.realName" class="www-el-label-input" readonly>
                            <template slot="prepend">
                                <span class="www-el-label-text">申请人</span>
                            </template>
                        </el-input>
                        <el-input v-model="customerDetail.commonUserPo.gender" class="www-el-label-input" readonly>
                            <template slot="prepend">
                                <span class="www-el-label-text">性别</span>
                            </template>
                        </el-input>
                        <el-input v-model="customerDetail.commonUserPo.age" class="www-el-label-input" readonly>
                            <template slot="prepend">
                                <span class="www-el-label-text">年龄(岁)</span>
                            </template>
                        </el-input>
                        <el-input v-model="customerDetail.commonUserPo.createTime" class="www-el-label-input" readonly>
                            <template slot="prepend">
                                <span class="www-el-label-text">注册时间</span>
                            </template>
                        </el-input>
                        <el-input v-model="customerDetail.commonUserPo.mobile" class="www-el-label-input" readonly>
                            <template slot="prepend">
                                <span class="www-el-label-text">电话</span>
                            </template>
                        </el-input>
                        <el-input v-model="customerDetail.commonUserPo.authLevel" class="www-el-label-input" readonly>
                            <template slot="prepend">
                                <span class="www-el-label-text">信用等级</span>
                            </template>
                        </el-input>
                        <el-input v-model="customerDetail.commonUserPo.channelCode" class="www-el-label-input" readonly>
                            <template slot="prepend">
                                <span class="www-el-label-text">进件渠道</span>
                            </template>
                        </el-input>

                    </el-collapse-item>
                    <el-collapse-item title="身份信息" name="2">
                        <div class="www-clearfix">
                            <template v-if="customerDetail.userUploadPicturePo">
                                <div class="www-img-box">
                                    <img v-if="customerDetail.userUploadPicturePo.url10" :src="customerDetail.userUploadPicturePo.url10" class="www-img-content">
                                    <img v-else class="www-img-content">
                                    <div class="www-img-text">身份证正面（人像面）</div>
                                </div>
                                <div class="www-img-box">
                                    <img v-if="customerDetail.userUploadPicturePo.url20" :src="customerDetail.userUploadPicturePo.url20" class="www-img-content">
                                    <img v-else class="www-img-content">
                                    <div class="www-img-text">身份证反面（国徽面）</div>
                                </div>
                                <div class="www-img-box">
                                    <img v-if="customerDetail.userUploadPicturePo.url30" :src="customerDetail.userUploadPicturePo.url30" class="www-img-content">
                                    <img v-else class="www-img-content">
                                    <div class="www-img-text">人脸识别照片</div>
                                </div>
                            </template>
                        </div>
                        <div v-if="customerDetail.commonUserPo">
                            <el-input v-model="customerDetail.commonUserPo.realName" class="www-el-label-input" readonly>
                                <template slot="prepend">
                                    <span class="www-el-label-text">身份证姓名</span>
                                </template>
                            </el-input>
                            <el-input v-model="customerDetail.commonUserPo.idenAddress" class="www-el-label-input" readonly>
                                <template slot="prepend">
                                    <span class="www-el-label-text">身份证地址</span>
                                </template>
                            </el-input>
                            <el-input v-model="customerDetail.commonUserPo.idenNo" class="www-el-label-input" readonly>
                                <template slot="prepend">
                                    <span class="www-el-label-text">认证身份证号</span>
                                </template>
                            </el-input>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="个人信息" name="3">
                        <div v-if="customerDetail.userExtendsPo">
                            <el-input v-model="customerDetail.userExtendsPo.educationCodeName" class="www-el-label-input" readonly>
                                <template slot="prepend">
                                    <span class="www-el-label-text">学历</span>
                                </template>
                            </el-input>
                            <el-input v-model="customerDetail.userExtendsPo.userAreaIdName" class="www-el-label-input" readonly>
                                <template slot="prepend">
                                    <span class="www-el-label-text">所在地</span>
                                </template>
                            </el-input>
                            <el-input v-model="customerDetail.userExtendsPo.marriageCodeName" class="www-el-label-input" readonly>
                                <template slot="prepend">
                                    <span class="www-el-label-text">婚姻</span>
                                </template>
                            </el-input>
                        </div>
                        <div v-if="customerDetail.commonUserPo">
                            <el-input v-model="customerDetail.commonUserPo.email" class="www-el-label-input" readonly>
                                <template slot="prepend">
                                    <span class="www-el-label-text">邮箱</span>
                                </template>
                            </el-input>
                        </div>
                        <div v-if="customerDetail.userExtendsPo" style="margin-top:20px;">
                            <el-input v-model="customerDetail.userExtendsPo.occupationName" class="www-el-label-input" readonly>
                                <template slot="prepend">
                                    <span class="www-el-label-text">职业类型</span>
                                </template>
                            </el-input>
                            <el-input v-model="customerDetail.userExtendsPo.annualIncome" class="www-el-label-input" readonly>
                                <template slot="prepend">
                                    <span class="www-el-label-text">年收入</span>
                                </template>
                            </el-input>
                            <el-input v-model="customerDetail.userExtendsPo.companyAreaIdName" class="www-el-label-input" readonly>
                                <template slot="prepend">
                                    <span class="www-el-label-text">单位地址</span>
                                </template>
                            </el-input>
                            <el-input v-model="customerDetail.userExtendsPo.companyName" class="www-el-label-input" readonly>
                                <template slot="prepend">
                                    <span class="www-el-label-text">单位名称</span>
                                </template>
                            </el-input>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="联系人信息" name="4">
                        <div>
                            <el-table :data="customerDetail.listUserEmergencyContactPo" border style="width: 100%">
                                <el-table-column prop="name" label="姓名"></el-table-column>
                                <el-table-column prop="mobile" label="手机号码"></el-table-column>
                                <el-table-column prop="relationTypeName" label="关系"></el-table-column>
                                <el-table-column prop="dialTotalCount" label="通话次数"></el-table-column>
                                <el-table-column prop="lastCallTime" label="最后通话时间"></el-table-column>
                            </el-table>
                        </div>
                    </el-collapse-item>
                    <!-- <el-collapse-item title="我司贷款历史" name="5">
                                                <el-table :data="customerDetail.lendOrderPoList" border style="width: 100%">
                                                    <el-table-column prop="orderNo" label="订单号"></el-table-column>
                                                    <el-table-column prop="amount" label="借款金额(元)"></el-table-column>
                                                    <el-table-column prop="periodCntName" label="借款期限"></el-table-column>
                                                    <el-table-column prop="createTime" label="申请时间"></el-table-column>
                                                    <el-table-column prop="delayDays" label="逾期天数"></el-table-column>
                                                    <el-table-column prop="overdueServiceCharge" label="逾期费用"></el-table-column>
                                                    <el-table-column prop="actualRepayTime" label="实际还款时间"></el-table-column>
                                                    <el-table-column prop="actualRepayAmount" label="实际还款金额"></el-table-column>
                                                    <el-table-column label="订单状态">
                                                        <template scope="scope">
                                                            <span>{{scope.row.refundStatus|stateFilter}}</span>
                                                        </template>
                                                    </el-table-column>
                                                </el-table>
                                            </el-collapse-item> -->
                </el-collapse>

            </el-tab-pane>
            <el-tab-pane label="银行卡信息" name="second">
                <div class="filter-container">
                    <h3>借记卡信息</h3>
                    <el-row>
                        <el-col :span="20" :offset="1">
                            <el-form label-width="100px" class="credit-aplly-form" v-if="bankCardList[0]">
                                <el-form-item label="姓名:">
                                    {{bankCardList[0].realName}}
                                </el-form-item>
                                <el-form-item label="开户银行:">
                                    {{bankCardList[0].bankName}}
                                </el-form-item>
                                <el-form-item label="卡号:">
                                    {{bankCardList[0].cardNo}}
                                </el-form-item>
                                <el-form-item label="身份证号:">
                                    {{bankCardList[0].idenNo}}
                                </el-form-item>
                                <el-form-item label="绑定时间:">
                                    {{bankCardList[0].createTime}}
                                </el-form-item>
                            </el-form>
                            <el-form label-width="100px" class="credit-aplly-form" v-else>
                                <el-form-item label="姓名:">
                                </el-form-item>
                                <el-form-item label="开户银行:">
                                </el-form-item>
                                <el-form-item label="卡号:">
                                </el-form-item>
                                <el-form-item label="身份证号:">
                                </el-form-item>
                                <el-form-item label="绑定时间:">
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                </div>
                <div class="filter-container">
                    <h3>信用卡信息</h3>
                    <el-row>
                        <el-col :span="20" :offset="1">
                            <el-form label-width="100px" class="credit-aplly-form" v-if="bankCardList[1]">
                                <el-form-item label="开户银行:">
                                    {{bankCardList[1].bankName}}
                                </el-form-item>
                                <el-form-item label="卡号:">
                                    {{bankCardList[1].cardNo}}
                                </el-form-item>
                                <el-form-item label="额度(元):">
                                    {{bankCardList[1].creditLimit}}
                                </el-form-item>
                                <el-form-item label="绑卡时间:">
                                    {{bankCardList[1].createTime}}
                                </el-form-item>
                            </el-form>
                            <el-form label-width="100px" class="credit-aplly-form" v-else>
                                <el-form-item label="开户银行:">
                                </el-form-item>
                                <el-form-item label="卡号:">
                                </el-form-item>
                                <el-form-item label="额度(元):">
                                </el-form-item>
                                <el-form-item label="绑卡时间:">
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                </div>
            </el-tab-pane>
            <el-tab-pane label="通讯录信息" name="third">
                <div class="filter-container">
                    <h3>通话记录明细</h3>
                    <el-table :data="dataList1" v-loading="listLoading" border fit highlight-current-row style="width: 100%">
                        <el-table-column align="center" label="电话号码">
                            <template scope="scope">
                                <span>{{scope.row.mobile}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="通讯录名称">
                            <template scope="scope">
                                <span>{{scope.row.name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="来源">
                            <template scope="scope">
                                <span v-if="scope.row.source===0">运营商</span>
                                <span v-else>通讯录</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="通话频次总和">
                            <template scope="scope">
                                <span>{{scope.row.totalTimes}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="接听/拨打/短信">
                            <template scope="scope">
                                <span>{{scope.row.dialed}}/{{scope.row.dialing}}/{{scope.row.smsCount}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="最后通话时间">
                            <template scope="scope">
                                <span>{{scope.row.lastCallTime}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="平均通话时间">
                            <template scope="scope">
                                <span>{{scope.row.avgTime}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="filter-container">
                    <h3>运营商
                        <span v-if="userCommunicationInfoPo">（号码
                            <el-button type="text" size="small">
                                {{userCommunicationInfoPo.mobile}}
                            </el-button>运营商
                            <el-button type="text" size="small">
                                {{userCommunicationInfoPo.networkOperator}}
                            </el-button>入网
                            <el-button type="text" size="small">
                                {{userCommunicationInfoPo.joinTime}}
                            </el-button>归属地
                            <el-button type="text" size="small">
                                {{userCommunicationInfoPo.networkAttribution}}
                            </el-button>
                            ）姓名
                            <el-button type="text" size="small">
                                {{userCommunicationInfoPo.userName}}
                            </el-button>
                        </span>
                        <span v-else>
                            （号码
                            <el-button type="text" size="small">
                            </el-button>运营商
                            <el-button type="text" size="small">
                            </el-button>入网
                            <el-button type="text" size="small">
                            </el-button>归属地
                            <el-button type="text" size="small">
                            </el-button>
                            ）姓名
                            <el-button type="text" size="small">
                            </el-button>
                        </span>
                    </h3>
                    <el-table :data="dataList3" v-loading="listLoading3" border fit highlight-current-row style="width: 100%">
                        <el-table-column align="center" label="月份">
                            <template scope="scope">
                                <span>{{scope.row.month}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="短信">
                            <template scope="scope">
                                <span>{{scope.row.smsCount}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="拨打/接听">
                            <template scope="scope">
                                <span>{{scope.row.dialingCount}}/{{scope.row.dialedCount}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="filter-container">
                    <h3>通讯录</h3>
                    <el-row>
                        <el-col :span="20" :offset="1">
                            <el-form label-width="250px" class="credit-aplly-form" v-if="dataList2">
                                <el-form-item label="运营商号码总数:">
                                    {{dataList2.operatorPhoneNumCnt}}
                                </el-form-item>
                                <el-form-item label="通讯录号码总数:">
                                    {{dataList2.addressBookCnt}}
                                </el-form-item>
                                <el-form-item label="通讯录包含运营商号码总数:">
                                    {{dataList2.operatorInAddressBookCnt}}
                                </el-form-item>
                                <el-form-item label="运营商号码在通讯录中占比(%):">
                                    {{dataList2.proportion}}
                                </el-form-item>
                            </el-form>
                            <el-form v-else>
                                <el-form-item label="运营商号码总数:">
                                </el-form-item>
                                <el-form-item label="通讯录号码总数:">
                                </el-form-item>
                                <el-form-item label="通讯录包含运营商号码总数:">
                                </el-form-item>
                                <el-form-item label="运营商号码在通讯录中占比(%):">
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                </div>
                <div class="filter-container">
                    <h3>归属地统计</h3>
                    <el-table :data="listUserOftenContactsRegionalPo" border fit highlight-current-row style="width: 100%">
                        <el-table-column align="center" label="归属地">
                            <template scope="scope">
                                {{scope.row.regional}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="近3月通话号码数量">
                            <template scope="scope">
                                {{scope.row.contactsSum3month}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="近3月通话次数（次）">
                            <template scope="scope">
                                {{scope.row.callCount3month}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="近3月通话时长（秒）">
                            <template scope="scope">
                                {{scope.row.dialing3month}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="近6月通话号码数量">
                            <template scope="scope">
                                {{scope.row.contactsSum6month}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="近6月通话次数（次）">
                            <template scope="scope">
                                {{scope.row.callCount6month}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="近6月通话时长（秒）">
                            <template scope="scope">
                                {{scope.row.dialing6month}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="近6月主叫通话号码次数（次）">
                            <template scope="scope">
                                {{scope.row.dialingCount6month}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="近6月被叫通话号码次数（次）">
                            <template scope="scope">
                                {{scope.row.dialedCount6month}}
                            </template>
                        </el-table-column>
                    </el-table>
                    <div v-show="total1" class="pagination-container">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="RegionalPo.params.page" :page-sizes="[10,20,30, 50]" :page-size="RegionalPo.params.size" layout="total, sizes, prev, pager, next, jumper" :total="total1">
                        </el-pagination>
                    </div>
                </div>
                <div class="filter-container">
                    <h3>风险联系人明细</h3>
                    <el-table :data="listUserRiskContactDetailPo" border fit highlight-current-row style="width: 100%">
                        <el-table-column align="center" label="号码">
                            <template scope="scope">
                                {{scope.row.contactMobile}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="号码标签">
                            <template scope="scope">
                                {{scope.row.mobileLable}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="号码归属地">
                            <template scope="scope">
                                {{scope.row.mobileRegion}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="近3月通话号码数量">
                            <template scope="scope">
                                {{scope.row.callCount3month}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="近3月通话时长（秒）">
                            <template scope="scope">
                                {{scope.row.dialing3month}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="近6月通话次数（次）">
                            <template scope="scope">
                                {{scope.row.callCount6month}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="近6月通话时长（秒）">
                            <template scope="scope">
                                {{scope.row.dialing6month}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="近6月主叫通话号码次数（次）">
                            <template scope="scope">
                                {{scope.row.dialingCount6month}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="近6月被叫通话号码次数（次）">
                            <template scope="scope">
                                {{scope.row.dialedCount6month}}
                            </template>
                        </el-table-column>
                    </el-table>
                    <div v-show="total2" class="pagination-container">
                        <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentPageChange1" :current-page.sync="RiskContactDetailPo.params.page" :page-sizes="[10,20,30, 50]" :page-size="RiskContactDetailPo.params.size" layout="total, sizes, prev, pager, next, jumper" :total="total2">
                        </el-pagination>
                    </div>
                </div>
                <div class="filter-container">
                    <h3>出行记录统计</h3>
                    <el-table :data="listUserTravelRecordStatisticsPo" border fit highlight-current-row style="width: 100%">
                        <el-table-column align="center" label="出发城市">
                            <template scope="scope">
                                {{scope.row.departureCity}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="出发日期">
                            <template scope="scope">
                                {{scope.row.departureTime}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="到达城市">
                            <template scope="scope">
                                {{scope.row.arriveCity}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="到达日期">
                            <template scope="scope">
                                {{scope.row.arriveTime}}
                            </template>
                        </el-table-column>
                    </el-table>
                    <div v-show="total3" class="pagination-container">
                        <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentPageChange2" :current-page.sync="TravelRecordStatisticsPo.params.page" :page-sizes="[10,20,30, 50]" :page-size="TravelRecordStatisticsPo.params.size" layout="total, sizes, prev, pager, next, jumper" :total="total3">
                        </el-pagination>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="征信信息" name="fourth">
                    <div class="filter-container" v-if="listZhimaWatchinfoPo">
                        <el-table :data="listZhimaWatchinfoPo" border fit highlight-current-row style="width: 100%">
                            <el-table-column align="center" label="行业关注名单">
                                <template scope="scope">
                                    <span v-if="scope.row.attention===1">yes</span>
                                    <span v-else-if="scope.row.attention===0">no</span>
                                    <span v-else></span>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="风险等级">
                                <template scope="scope">
                                    <span v-if="scope.row.level===1">低风险</span>
                                    <span v-else-if="scope.row.level===2">中风险</span>
                                    <span v-else-if="scope.row.level===3">高风险</span>
                                    <span v-else></span>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="风险类型">
                                <template scope="scope">
                                    {{scope.row.type}}
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="当前状态">
                                <template scope="scope">
                                    {{scope.row.settlement | currentStatusFilter}}
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="filter-container" v-else>
                        <el-table :data="listZhimaWatchinfoPo" fit highlight-current-row style="width: 100%" height="120">
                            <el-table-column align="center" label="行业关注名单">
                                <template scope="scope">
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="风险等级">
                                <template scope="scope">
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="风险类型">
                                <template scope="scope">
                                    {{scope.row.type}}
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="当前状态">
                                <template scope="scope">
                                    {{scope.row.settlement | currentStatusFilter}}
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="filter-container">
                        <el-row>
                            <el-col :span="20" :offset="1">
                                <el-form label-width="150px" class="credit-aplly-form" v-if="creditInvestigation">
                                    <el-form-item label="安装的小贷软件数量:">
                                        {{creditInvestigation.installLoanAppCnt}}
                                    </el-form-item>
                                    <el-form-item label="芝麻分:">
                                        {{creditInvestigation.score}}
                                    </el-form-item>
                                    <el-form-item label="芝麻反欺诈分:">
                                        {{creditInvestigation.cheatScore}}
                                    </el-form-item>
                                    <el-form-item label="欺诈名单:">
                                        {{creditInvestigation.hit}}
                                    </el-form-item>
                                    <el-form-item label="风险代码:">
                                        {{creditInvestigation.riskCode}}
                                    </el-form-item>
                                    <el-form-item label="百融分:">
                                        {{creditInvestigation.creditPoint}}
                                    </el-form-item>
                                    <el-form-item label="意见:">
                                        {{creditInvestigation.ruleFinalDecision}}
                                    </el-form-item>
                                    <div style="width:800px;">
                                        <el-form-item label="报文:" style="word-wrap:break-word;">
                                            {{creditInvestigation.report}}
                                        </el-form-item>
                                    </div>
                                </el-form>
                                <el-form label-width="150px" class="credit-aplly-form" v-else>
                                    <el-form-item label="安装的小贷软件数量:">
                                    </el-form-item>
                                    <el-form-item label="芝麻分:">
                                    </el-form-item>
                                    <el-form-item label="芝麻反欺诈分:">
                                    </el-form-item>
                                    <el-form-item label="欺诈名单:">
                                    </el-form-item>
                                    <el-form-item label="风险代码:">
                                    </el-form-item>
                                    <el-form-item label="百融分:">
                                    </el-form-item>
                                    <el-form-item label="意见:">
                                    </el-form-item>
                                    <el-form-item label="报文:" style="word-wrap:break-word;">
                                    </el-form-item>
                                </el-form>
                            </el-col>
                        </el-row>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="设备信息" name="fifth" v-loading="loading">
                    <template v-if="devicePoList&&devicePoList.length>0">
                        <el-collapse v-model="deviceCollapse">
                            <el-collapse-item v-for="(device,index) in devicePoList" :key="index" :title="device.loginTime" :name="index">
                                <el-input v-model="device.loginIp" class="www-el-label-input" readonly>
                                    <template slot="prepend">
                                        <span class="www-el-label-text">IP</span>
                                    </template>
                                </el-input>
                                <el-input v-model="device.mac" class="www-el-label-input" readonly>
                                    <template slot="prepend">
                                        <span class="www-el-label-text">MAC</span>
                                    </template>
                                </el-input>
                                <el-input v-model="device.sourceName" class="www-el-label-input" readonly>
                                    <template slot="prepend">
                                        <span class="www-el-label-text">终端型号</span>
                                    </template>
                                </el-input>
                                <el-input v-model="device.loginAddress" class="www-el-label-input" readonly>
                                    <template slot="prepend">
                                        <span class="www-el-label-text">登录位置</span>
                                    </template>
                                </el-input>
                                <el-input v-model="device.imei" class="www-el-label-input" readonly>
                                    <template slot="prepend">
                                        <span class="www-el-label-text">IMEI</span>
                                    </template>
                                </el-input>
                                <el-input v-model="device.imsi" class="www-el-label-input" readonly>
                                    <template slot="prepend">
                                        <span class="www-el-label-text">IMSI</span>
                                    </template>
                                </el-input>
                            </el-collapse-item>
                        </el-collapse>
                    </template>
                    <template v-else>
                        <div style="text-align:center;color:#333;">暂无数据</div>
                    </template>
                </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import '@res/css/wjq/style.less';
import config from '@api/config';
import { downloadExecl } from '@api/excel.js';
import { parseTime } from '@filters/index.js';
export default {
    data() {
        return {
            tabsName: 'first',
            listLoading: false, //列表加载状态
            dataList3: null,
            listLoading3: false,
            userId: this.$route.query.userId,
            dataList: null,
            auditForm: {
                auditOpinion: null,
                repaymentType: null
            },
            imageUrl: require('@res/img/background.jpg'),
            loading: false,
            collapse: ['1', '2', '3', '4', '5'],
            query: {
                url: 'customer/basicInfo',
                userId: this.$route.query.userId
                //userId: 28
            },
            customerDetail: {
                commonUserPo: null,
                listUserUploadPicInfoPo: null,
                listUserEmergencyContactPo: null,
                userExtendsPo: null
            },
            //银行卡信息
            bankCardQuery: { params: { url: 'bankCard/detailInfo', userId: this.$route.query.userId } },
            bankCardList: [{ realName: null, mobile: null, bankName: null, cardNo: null, idenNo: null, createTime: null }, { bankName: null, cardNo: null, createTime: null, creditLimit: null }],
            //征信信息
            creditQuery: { params: { url: 'creditReporting/detailInfo', userId: this.$route.query.userId } },
            creditInvestigation: { creditPoint: null, hit: null, installLoanAppCnt: null, isAttention: null, report: null, score: null, ruleFinalDecision: null },
            listZhimaWatchinfoPo: null,
            //通讯录信息
            dataList2: { operatorPhoneNumCnt: null, addressBookCnt: null, operatorInAddressBookCnt: null, proportion: null },
            dataList3: null,
            dataList1: null,
            AddressBookQuery: { params: { url: 'contact/detailInfo', userId: this.$route.query.userId } },
            userCommunicationInfoPo: { joinTime: null, mobile: null, networkAttribution: null, userName: null, networkOperator: null },
            input3: '1',
            currentRow: null,
            listUserOftenContactsRegionalPo: null,//归属地统计
            RegionalPo: { params: { url: 'userOftenContactsRegional/list', size: 10, page: 1, userId: this.$route.query.userId } },
            total1: null,
            listUserRiskContactDetailPo: null,//风险联系人明细
            RiskContactDetailPo: { params: { url: 'userRiskContactDetail/list', size: 10, page: 1, userId: this.$route.query.userId } },
            total2: null,
            listUserTravelRecordStatisticsPo: null,//用户出行记录统计
            TravelRecordStatisticsPo: { params: { url: 'userTravelRecordStatistics/list', size: 10, page: 1, userId: this.$route.query.userId } },
            total3: null,
            //设备信息
            devicePoList: null,
            deviceCollapse: []
        };
    },
    created() {

        this.getBaseInfo('customer/basicInfo', data => {
            this.customerDetail = data;
        });
    },
    computed: {
    },
    methods: {
        changeQuery(url) {
            if (!url) {
                return;
            }
            this.query.url = url;
        },
        // 获取基本信息
        getBaseInfo(url, callback) {
            this.changeQuery(url);
            this.loading = true;
            config(this.query).then(response => {
                this.loading = false;
                if (response.respCode === '000000') {
                    callback(response.data);
                    if (this.customerDetail.userExtendsPo) {
                        this.customerDetail.userExtendsPo.annualIncome += '万';
                    } else {
                        this.customerDetail.userExtendsPo.annualIncome = '';
                    }
                }
            })
        },
        //获取征信信息
        getCreditList() {
            this.creditQuery.params.userId = this.userId;
            config(this.creditQuery.params).then(response => {
                if (response.respCode === '000000') {
                    this.creditInvestigation = response.data;
                    this.listZhimaWatchinfoPo = response.data.listZhimaWatchinfoPo;
                }
            }).catch(err => {
            })

        },
        //获取银行卡信息
        getbankcardList() {
            this.bankCardQuery.params.userId = this.userId;

            config(this.bankCardQuery.params).then(response => {
                if (response.respCode === '000000') {
                    this.bankCardList = response.data.listUserBankcardPo;
                }
            }).catch(err => {
            })

        },
        handleCurrentChange(val) {
            this.currentRow = val;
        },
        // 改变每一页的条数
        handleSizeChange(val) {
            this.RegionalPo.params.size = val;
            this.getRegionalPo();
        },
        // 切换页码
        handleCurrentPageChange(val) {
            this.RegionalPo.params.page = val;
            this.getRegionalPo();
        },
        //获取通讯录信息
        getAddressBookList() {
            config(this.AddressBookQuery.params).then(response => {
                //this.dataList1 = response.data.listUserOftenContactPo;
                this.dataList2.operatorPhoneNumCnt = response.data.operatorPhoneNumCnt;
                this.dataList2.addressBookCnt = response.data.addressBookCnt;
                this.dataList2.operatorInAddressBookCnt = response.data.operatorInAddressBookCnt;
                this.dataList2.proportion = response.data.proportion;
                this.dataList3 = response.data.listOperatorDataStatisticsPo;
                if (response.data.userCommunicationInfoPo) {
                    this.userCommunicationInfoPo = response.data.userCommunicationInfoPo;
                }
                this.listLoading3 = false;
                this.dataList1 = response.data.listUserOftenContactPo;
            }).catch(err => {

            })
        },
        //获取归属地统计信息RiskContactDetailPo
        getRegionalPo() {
            config(this.RegionalPo.params).then(response => {
                if (response.respCode === '000000') {
                    this.listUserOftenContactsRegionalPo = response.data.listUserOftenContactsRegionalPo;
                    this.total1 = response.data.userOftenContactsRegionalTotalItems;
                }
            })
        },
        // 改变每一页的条数
        handleSizeChange1(val) {
            this.RiskContactDetailPo.params.size = val;
            this.getRiskContactDetailPo();
        },
        // 切换页码
        handleCurrentPageChange1(val) {
            this.RiskContactDetailPo.params.page = val;
            this.getRiskContactDetailPo();
        },
        //获取风险联系人明细RiskContactDetailPo     
        getRiskContactDetailPo() {
            config(this.RiskContactDetailPo.params).then(response => {
                if (response.respCode === '000000') {
                    this.listUserRiskContactDetailPo = response.data.listUserRiskContactDetailPo;
                    this.total2 = response.data.userRiskContactDetailTotalItems;
                }
            })
        },
        // 改变每一页的条数  listUserTravelRecordStatisticsPo: null,//用户出行记录统计
        handleSizeChange2(val) {
            this.TravelRecordStatisticsPo.params.size = val;
            this.getTravelRecordStatisticsPo();
        },
        // 切换页码
        handleCurrentPageChange2(val) {
            this.TravelRecordStatisticsPo.params.page = val;
            this.getTravelRecordStatisticsPo();
        },
        //获取风险联系人明细RiskContactDetailPo     
        getTravelRecordStatisticsPo() {
            config(this.TravelRecordStatisticsPo.params).then(response => {
                if (response.respCode === '000000') {
                    this.listUserTravelRecordStatisticsPo = response.data.listUserTravelRecordStatisticsPo;
                    this.total3 = response.data.userTravelRecordStatisticsTotalItems;
                }
            })
        },
        handleClick() {
            if (this.tabsName == 'first') {
                this.getBaseInfo('customer/basicInfo', data => {
                    this.customerDetail = data;

                });
            }
            if (this.tabsName == 'second') {
                this.getbankcardList();
            }
            if (this.tabsName == 'third') {
                this.getAddressBookList();
                this.getRegionalPo();
                this.getRiskContactDetailPo();
                this.getTravelRecordStatisticsPo();
            }
            if (this.tabsName == 'fourth') {
                this.getCreditList();
            }
            if (this.tabsName == 'fifth') {
                this.getBaseInfo('deviceInfoList.html', data => {
                    this.devicePoList = data.devicePoList;
                    if (this.devicePoList && this.devicePoList.length > 0) {
                        this.devicePoList.map((item, index) => {
                            item.loginTime = '登录时间：' + item.loginTime;
                            this.deviceCollapse[index] = index;
                            item.loginAddress = '纬度：' + item.latitude + ' 经度：' + item.longitude;
                        })
                    }
                });
            }
        }
    },
    filters: {
        filterZhimaRiskListPo(value) {
            return value ? '是' : '否';
        },
        percentFilter(value) {
            if (!value) {
                return '0%'
            }
            return value * 100 + '%';
        },
        stateFilter(value) {
            if (value == 10) {
                return '待还款'
            } else if (value == 20) {
                return '还款成功'
            } else if (value == 30) {
                return '还款失败'
            } else {
                return value
            }
        },
        currentStatusFilter(value) {
            if (value === 0) {
                return "未结清";
            } else if (value === 1) {
                return '结清';
            } else {
                return value;
            }
        }
    }
};
</script>
<style lang="less" scoped>
.app-container {
    margin: 10px 10px 0 10px;
}

.app-container .filter-container {
    margin-top: 20px;
}

.app-container .filter-container .rightData {
    margin-right: 100px;
}
</style>

