<template>
  <div class="app-container calendar-list-container">
    <el-tabs v-model="tabName" type="card" @tab-click="handleClick">
      <el-tab-pane label="审批信息" name="first">
        <div class="filter-container">
          <h3>电核历史记录</h3>
          <el-table :data="dataList" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="序号" width="100">
              <template scope="scope">
                <span>{{ parseInt(scope.$index) + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="电核时间">
              <template scope="scope">
                <span>{{scope.row.createTime}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="电核人员">
              <template scope="scope">
                <span>{{scope.row.operatorName}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="电核详情">
              <template scope="scope">
                <span>{{scope.row.memo}}</span>
              </template>
            </el-table-column>

          </el-table>
        </div>
        <div class="filter-container">
          <h3>额度调整</h3>
          <el-row>
            <el-col :span="20" :offset="1">
              <el-form label-width="100px" class="credit-aplly-form" v-if="shenpilist">

                <el-form-item label="调整结果:">
                  {{shenpilist.result}}
                </el-form-item>
                <el-form-item label="原授信额度:">
                  {{shenpilist.oldCredit}}元
                </el-form-item>
                <el-form-item label="调整后额度:">
                  {{shenpilist.newCredit}}元
                </el-form-item>
              </el-form>
              <el-form v-else>
                <el-form-item label="调整结果:">
                </el-form-item>
                <el-form-item label="原授信额度:">
                </el-form-item>
                <el-form-item label="调整后额度:">
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </div>
        <div class="filter-container">
          <h3>审批意见</h3>
          <el-row>
            <el-col :span="20" :offset="1">
              <el-form label-width="100px" class="credit-aplly-form" v-if="shenpiAdvice">
                <el-form-item label="审批结果:" v-if="shenpiAdvice.status===10">
                  通过
                </el-form-item>
                <el-form-item label="审批结果:" v-else-if="shenpiAdvice.status===-10">
                  <span v-if="isBlackUser===0">驳回,{{shenpiAdvice.refuseReason}}</span>
                  <span v-else>拒绝并加入黑名单</span>
                </el-form-item>
                <el-form-item label="审批结果:" v-else>
                  <span></span>
                </el-form-item>
                <el-form-item label="业务意见:">
                  {{shenpiAdvice.memo}}
                </el-form-item>
              </el-form>
              <el-form v-else>
                <el-form label-width="100px" class="credit-aplly-form">
                  <el-form-item label="审批结果:">
                  </el-form-item>
                  <el-form-item label="业务意见:">
                  </el-form-item>
                </el-form>
              </el-form>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="基本信息" name="second">
        <el-collapse v-model="collapse">
          <el-collapse-item v-if="customerDetail.commonUserPo" title="申请信息" name="1">
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
            <span v-if="customerDetail.userAuthenticationApplyPo">
              <el-input v-model="customerDetail.userAuthenticationApplyPo.status" class="www-el-label-input" readonly>
                <template slot="prepend">
                  <span class="www-el-label-text">授信状态</span>
                </template>
              </el-input>
              <el-input v-model="customerDetail.userAuthenticationApplyPo.applyTime" class="www-el-label-input" readonly>
                <template slot="prepend">
                  <span class="www-el-label-text">申请时间</span>
                </template>
              </el-input>
              <el-input v-model="customerDetail.userAuthenticationApplyPo.authType" class="www-el-label-input" readonly>
                <template slot="prepend">
                  <span class="www-el-label-text">审批类型</span>
                </template>
              </el-input>
            </span>
            <span v-else>
              <el-input value="暂无数据" class="www-el-label-input" readonly>
                <template slot="prepend">
                  <span class="www-el-label-text">授信状态</span>
                </template>
              </el-input>
              <el-input value="暂无数据" class="www-el-label-input" readonly>
                <template slot="prepend">
                  <span class="www-el-label-text">申请时间</span>
                </template>
              </el-input>
              <el-input value="暂无数据" class="www-el-label-input" readonly>
                <template slot="prepend">
                  <span class="www-el-label-text">审批类型</span>
                </template>
              </el-input>
            </span>
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
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="银行卡信息" name="third">
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
              <el-form v-else>
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
              <el-form v-else>
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
      <el-tab-pane label="通讯录信息" name="fourth">
        <div class="filter-container">
          <h3>通话记录明细</h3>
          <el-table :data="dataList1" v-loading="listLoading1" border fit highlight-current-row style="width: 100%">
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
              <el-form label-width="250px" class="credit-aplly-form" v-else>
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
      <el-tab-pane label="征信信息" name="fifth">
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
      listLoading: false, //列表加载状态
      listLoading1: false,
      dataList3: null,
      dataList: null,
      listLoading3: false,
      listQuery: { params: { url: 'authenticationApply/auditInfo', applyNo: this.$route.query.applyNo } },
      bankCardQuery: { params: { url: 'bankCard/detailInfo', applyNo: this.$route.query.applyNo } },
      //运营商数据

      //通讯录信息
      dataList2: { operatorPhoneNumCnt: null, addressBookCnt: null, operatorInAddressBookCnt: null, proportion: null },
      dataList3: null,
      dataList1: null,
      userCommunicationInfoPo: { joinTime: null, mobile: null, networkAttribution: null, userName: null, networkOperator: null },
      AddressBookQuery: { params: { url: 'contact/detailInfo', applyNo: this.$route.query.applyNo } },
      input3: '1',
      currentRow: null,
      listUserOftenContactsRegionalPo: null,//归属地统计
      RegionalPo: { params: { url: 'userOftenContactsRegional/list', size: 10, page: 1, applyNo: this.$route.query.applyNo } },
      total1: null,
      listUserRiskContactDetailPo: null,//风险联系人明细
      RiskContactDetailPo: { params: { url: 'userRiskContactDetail/list', size: 10, page: 1, applyNo: this.$route.query.applyNo } },
      total2: null,
      listUserTravelRecordStatisticsPo: null,//用户出行记录统计
      TravelRecordStatisticsPo: { params: { url: 'userTravelRecordStatistics/list', size: 10, page: 1, applyNo: this.$route.query.applyNo } },
      total3: null,
      //征信信息
      creditQuery: { params: { url: 'creditReporting/detailInfo', applyNo: this.$route.query.applyNo } },
      creditInvestigation: { creditPoint: null, hit: null, installLoanAppCnt: null, isAttention: null, report: null, score: null, ruleFinalDecision: null },
      listZhimaWatchinfoPo: null,

      isBlackUser: null,
      shenpiResult: null,
      bankCardList: [{ realName: null, mobile: null, bankName: null, cardNo: null, idenNo: null, createTime: null }, { bankName: null, cardNo: null, createTime: null, creditLimit: null }],

      //userCommunicationInfoPo: { joinTime: null, mobile: null, networkAttribution: null, userName: null, networkOperator: null },
      applyNo: null,
      shenpilist: null,
      shenpiAdvice: null,
      userCommunicationInfoPo: null,
      auditForm: null,
      imageUrl: require('@res/img/background.jpg'),
      loading: false,
      tabName: 'first',
      collapse: ['1', '2', '3', '4'],
      query: {
        url: 'customer/basicInfo',
        applyNo: this.$route.query.applyNo
      },
      customerDetail: {
        commonUserPo: null,
        listUserUploadPicInfoPo: null,
        listUserEmergencyContactPo: null,
        userExtendsPo: null,
        productPo: null,
        userAuthenticationApplyPo: null,
        userAccountPo: null
      },
      devicePoList: null,
      input3: '1'
    };
  },
  created() {
    this.applyNo = this.$route.query.applyNo;
    this.getshenpiList();
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
        }
      })
    },
    //获取审批基本信息

    getshenpiList() {
      this.listQuery.params.applyNo = this.applyNo;

      config(this.listQuery.params).then(response => {
        if (response.respCode === '000000') {
          this.listLoading = false;
          this.dataList = response.data.listTelAuditLogPo;
          this.isBlackUser = response.data.isBlackUser;
          this.shenpilist = response.data.userLineOfCreditLogPo;
          this.shenpiAdvice = response.data.userAuthenticationApplyPo;

          /*判断是否要调整*/
          if (this.shenpilist.newCredit === this.shenpilist.oldCredit) {
            this.shenpilist.result = "状态未调整";
          }
          else if (this.shenpilist.newCredit > this.shenpilist.oldCredit) {
            this.shenpilist.result = this.shenpilist.newCredit - this.shenpilist.oldCredit;
            this.shenpilist.result = "提额" + this.shenpilist.result + "元";
          } else {
            this.shenpilist.result = this.shenpilist.oldCredit - this.shenpilist.newCredit;
            this.shenpilist.result = "降额" + this.shenpilist.result + "元";
          }
        }
      }).catch(err => {
        this.listLoading = true;
      })

    },
    //获取银行卡信息
    getbankcardList() {
      this.bankCardQuery.params.applyNo = this.applyNo;

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
    //获取征信信息
    getCreditList() {
      config(this.creditQuery.params).then(response => {
        if (response.respCode === '000000') {
          this.creditInvestigation = response.data;
          this.listZhimaWatchinfoPo = response.data.listZhimaWatchinfoPo;
        }
      }).catch(err => {
      })

    },
    handleClick() {
      if (this.tabName == 'first') {
        this.getshenpiList();
      }
      if (this.tabName == 'second') {
        this.getBaseInfo('customer/basicInfo', data => {
          this.customerDetail = data;
          if (this.customerDetail.userExtendsPo) {
            this.customerDetail.userExtendsPo.annualIncome += '万';
          }
          if (this.customerDetail.userAuthenticationApplyPo.status !== null) {
            if (this.customerDetail.userAuthenticationApplyPo.status === 1) {
              this.customerDetail.userAuthenticationApplyPo.status = "待审核";
            }
            if (this.customerDetail.userAuthenticationApplyPo.status === 10) {
              this.customerDetail.userAuthenticationApplyPo.status = "已审批";
            }
            if (this.customerDetail.userAuthenticationApplyPo.status === -10) {
              this.customerDetail.userAuthenticationApplyPo.status = "已拒绝";
            }
            if (this.customerDetail.userAuthenticationApplyPo.status === 0) {
              this.customerDetail.userAuthenticationApplyPo.status = "完善资料中";
            }
          } else {
            this.customerDetail.userAuthenticationApplyPo.status = '';
          }
          if (this.customerDetail.userAuthenticationApplyPo.authType !== null) {
            if (this.customerDetail.userAuthenticationApplyPo.authType === 0) {
              this.customerDetail.userAuthenticationApplyPo.authType = "自动审批";
            } else {
              this.customerDetail.userAuthenticationApplyPo.authType = '人工审批';
            }
          } else {
            this.customerDetail.userAuthenticationApplyPo.authType = '';
          }
        });
      }
      if (this.tabName == 'third') {
        this.getbankcardList();
      }
      if (this.tabName == 'fourth') {
        this.getAddressBookList();
        this.getRegionalPo();
        this.getRiskContactDetailPo();
        this.getTravelRecordStatisticsPo();
      }
      if (this.tabName == 'fifth') {
        this.getCreditList();
      }
    }
  },
  filters: {
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

