<template>
  <div class="app-container calendar-list-container">
    <el-tabs v-model="tabsName" type="card" @tab-click="handleClick">
      <el-tab-pane label="订单信息" name="first">
        <div class="filter-container">
          <h2>借款信息</h2>
          <el-row>
            <el-col :span="10" :offset="1">
              <el-form label-width="110px" class="credit-aplly-form" v-if="lendOrderPo">
                <el-form-item label="姓名：">
                  {{lendOrderPo.realName}}
                </el-form-item>
                <el-form-item label="订单编号：">
                  {{lendOrderPo.orderNo}}
                </el-form-item>
                <el-form-item label="客户ID：">
                  {{lendOrderPo.userId}}
                </el-form-item>
                <el-form-item label="借款金额(元)：">
                  {{lendOrderPo.amount}}
                </el-form-item>
                <el-form-item label="借款利率(‱)：" v-if="productPo">
                  {{productPo.dailyInterest}}
                </el-form-item>
                <el-form-item label="借款利率(‱)：" v-else>
                </el-form-item>
              </el-form>
              <el-form label-width="110px" class="credit-aplly-form" v-else>
                <el-form-item label="姓名：">
                </el-form-item>
                <el-form-item label="订单编号：">
                </el-form-item>
                <el-form-item label="客户ID：">
                </el-form-item>
                <el-form-item label="借款金额(元)：">
                </el-form-item>
                <el-form-item label="借款利率(‱)：">
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="10" :offset="1">
              <el-form label-width="110px" class="credit-aplly-form" v-if="lendOrderPo">
                <el-form-item label="申请期限(天)：">
                  {{lendOrderPo.periodCnt}}
                </el-form-item>
                <el-form-item label="借款时间：">
                  {{lendOrderPo.createTime}}
                </el-form-item>
                <el-form-item label="放款状态：">
                  <span v-if="lendOrderPo.paymentStatus===10">放款处理中</span>
                  <span v-else-if="lendOrderPo.paymentStatus===20">放款成功</span>
                  <span v-else-if="lendOrderPo.paymentStatus===-10">订单关闭</span>
                  <span v-else-if="lendOrderPo.paymentStatus===30">放款失败</span>
                </el-form-item>
                <el-form-item label="放款方式：">
                  <span v-if="lendOrderPo.paySource===10">连连支付</span>
                  <span v-else-if="lendOrderPo.paySource===20">财务冲账</span>
                </el-form-item>
              </el-form>
              <el-form label-width="110px" class="credit-aplly-form" v-else>
                <el-form-item label="申请期限(天)：">
                </el-form-item>
                <el-form-item label="借款时间：">
                </el-form-item>
                <el-form-item label="放款状态：">
                </el-form-item>
                <el-form-item label="放款方式：">
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </div>
        <div class="filter-container">
          <h2>还款计划</h2>
          <el-row>
            <el-col :span="10" :offset="1">
              <el-form label-width="110px" class="credit-aplly-form" v-if="listRepaymentPo[0]">
                <el-form-item label="放款时间：">
                  {{lendOrderPo.realLeadTime}}
                </el-form-item>
                <el-form-item label="还款时间：">
                  {{listRepaymentPo[0].shouldRepayDate}}
                </el-form-item>
                <el-form-item label="还款总额(元)：">
                  {{lendOrderPo.totalAmount}}
                </el-form-item>
                <el-form-item label="还款本金(元)：">
                  {{listRepaymentPo[0].principal}}
                </el-form-item>
                <el-form-item label="还款利息(元)：">
                  {{listRepaymentPo[0].fee}}
                </el-form-item>
              </el-form>
              <el-form label-width="110px" class="credit-aplly-form" v-else>
                <el-form-item label="放款时间：">
                </el-form-item>
                <el-form-item label="还款时间：">
                </el-form-item>
                <el-form-item label="还款总额(元)：">
                </el-form-item>
                <el-form-item label="还款本金(元)：">
                </el-form-item>
                <el-form-item label="还款利息(元)：">
                </el-form-item>
              </el-form>
              <!--  -->
            </el-col>
            <el-col :span="10" :offset="1">
              <el-form label-width="110px" class="credit-aplly-form" v-if="listRepaymentPo[0]">
                <el-form-item label="服务费(元)：">
                  {{listRepaymentPo[0].serviceCharge}}
                </el-form-item>
                <el-form-item label="查询费(元)：">
                  {{listRepaymentPo[0].queryCharge}}
                </el-form-item>
                <el-form-item label="转账费(元)：">
                  {{listRepaymentPo[0].transferCharge}}
                </el-form-item>
                <el-form-item>
                  <!-- <el-button type="primary" @click.native.prevent="handleSubmit">
                                    提交
                                  </el-button> -->
                </el-form-item>

              </el-form>
              <el-form label-width="110px" class="credit-aplly-form" v-else>
                <el-form-item label="服务费(元)：">
                </el-form-item>
                <el-form-item label="查询费(元)：">
                </el-form-item>
                <el-form-item label="转账费(元)：">
                </el-form-item>
                <el-form-item>
                </el-form-item>

              </el-form>
            </el-col>
          </el-row>
        </div>
        <div class="filter-container">
          <h2>打款凭证</h2>
          <el-row >
            <el-col :span="10" :offset="1">
              <el-form label-width="110px" class="credit-aplly-form" v-if="listFKPaymentCapitalPo[0]">
                <el-form-item label="放款金额（元）：">
                  {{listFKPaymentCapitalPo[0].amount}}
                </el-form-item>
                <el-form-item label="放款时间：">
                  {{listFKPaymentCapitalPo[0].createTime}}
                </el-form-item>
                <el-form-item label="交易流水号：">
                  {{listFKPaymentCapitalPo[0].thirdPartyCapitalNo}}
                </el-form-item>
              </el-form>
              <el-form label-width="110px" class="credit-aplly-form" v-else>
                <el-form-item label="放款金额（元）：">
                </el-form-item>
                <el-form-item label="放款时间：">
                </el-form-item>
                <el-form-item label="交易流水号：">
                </el-form-item>
                <!-- -->
              </el-form>
            </el-col>
          </el-row>
          <div v-if="listFKPaymentCapitalPo[0]">
            <span>打款凭证:</span>
            <img v-bind:src="listFKPaymentCapitalPo[0].voucherImgUrl" class="www-img-content" style="width:150px;height:100px;" v-if="listFKPaymentCapitalPo[0]">
            <el-button @click="preview" type="text" size="small">
              预览
            </el-button>
            <a target="_blank" :href="listFKPaymentCapitalPo[0].voucherImgUrl" download="图片" style="color:#4db3ff;">下载</a>
            <el-dialog :visible.sync="dialogVisible" size="full" style="width:100%;height:100%;">
              <img v-bind:src="listFKPaymentCapitalPo[0].voucherImgUrl" class="www-img-content" style="width:100%;height:100%;">
            </el-dialog>
          </div>
          <div v-else>
            <span>打款凭证:</span><span>暂无图片</span>
          </div>
          
        </div>
        <div class="filter-container">
          <h2>还款信息</h2>
          <el-table :data="repaymentList" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="序号" width="100">
              <template scope="scope">
                <span>{{parseInt(scope.$index) + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="还款方式">
              <template scope="scope">
                <span v-if="scope.row.repaymentMode==='10'">代扣</span>
                <span v-else-if="scope.row.repaymentMode==='20'">支付</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="应还金额(元)">
              <template scope="scope">
                <span>{{scope.row.amount}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="已还金额(元)">
              <template scope="scope">
                <span>{{scope.row.actualRepayAmount}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="交易流水号">
              <template scope="scope">
                <span>{{scope.row.thirdPartyCapitalNo}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="还款日期">
              <template scope="scope">
                <span>{{scope.row.createTime}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="filter-container">
          <h2>逾期信息</h2>
          <el-row>
            <el-col :span="10" :offset="1">
              <el-form label-width="200px" class="credit-aplly-form" v-if="listRepaymentPo[0]">
                <el-form-item label="逾期天数(天)：">
                  {{listRepaymentPo[0].overDueDayCnt}}
                </el-form-item>
                <el-form-item label="逾期总费用(元)：">
                  {{listRepaymentPo[0].overdueCharge}}
                </el-form-item>
                <el-form-item label="逾期日息(元)：">
                  {{listRepaymentPo[0].overdueFee}}
                </el-form-item>
                <el-form-item label="滞纳金(元)：">
                  {{listRepaymentPo[0].overdueFine}}
                </el-form-item>
                <el-form-item label="逾期罚息(元)：">
                  {{listRepaymentPo[0].punishmentInterest}}
                </el-form-item>
                <el-form-item label="手续费(元)：">
                  {{listRepaymentPo[0].overdueServiceCharge}}
                </el-form-item>
              </el-form>
              <el-form label-width="200px" class="credit-aplly-form" v-else>
                <el-form-item label="逾期天数(天)：">
                </el-form-item>
                <el-form-item label="逾期总费用(元)：">
                </el-form-item>
                <el-form-item label="逾期日息(元)：">
                </el-form-item>
                <el-form-item label="滞纳金(元)：">
                </el-form-item>
                <el-form-item label="逾期罚息(元)：">
                </el-form-item>
                <el-form-item label="手续费(元)：">
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="基本信息" name="second" v-if="financePowerControl!==5">
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
            <span v-if="customerDetail.userAccountPo">
              <el-input v-model="customerDetail.userAccountPo.acctSum" class="www-el-label-input" readonly>
                <template slot="prepend">
                  <span class="www-el-label-text">授信额度(元)</span>
                </template>
              </el-input>
            </span>
            <span v-else>
              <el-input value="暂无数据" class="www-el-label-input" readonly>
                <template slot="prepend">
                  <span class="www-el-label-text">授信额度(元)</span>
                </template>
              </el-input>
            </span>
            <span v-if="customerDetail.productPo">
              <el-input v-model="customerDetail.productPo.dailyInterest" class="www-el-label-input" readonly>
                <template slot="prepend">
                  <span class="www-el-label-text">利率(‱)</span>
                </template>
              </el-input>
              <el-input v-model="customerDetail.productPo.serviceCharge" class="www-el-label-input" readonly>
                <template slot="prepend">
                  <span class="www-el-label-text">服务费率(%)</span>
                </template>
              </el-input>
            </span>
            <span v-else>
              <el-input class="www-el-label-input" readonly>
                <template slot="prepend">
                  <span class="www-el-label-text">利率(‱)</span>
                </template>
              </el-input>
              <el-input value="暂无数据" class="www-el-label-input" readonly>
                <template slot="prepend">
                  <span class="www-el-label-text">服务费率(%)</span>
                </template>
              </el-input>
            </span>
            <span v-if="customerDetail.lendOrderPo">

              <el-input v-model="customerDetail.lendOrderPo.queryCharge" class="www-el-label-input" readonly>
                <template slot="prepend">
                  <span class="www-el-label-text">查询费(元)</span>
                </template>
              </el-input>
              <el-input v-model="customerDetail.lendOrderPo.transferCharge" class="www-el-label-input" readonly>
                <template slot="prepend">
                  <span class="www-el-label-text">转账费(元)</span>
                </template>
              </el-input>
              <el-input v-model="customerDetail.lendOrderPo.periodCnt" class="www-el-label-input" readonly>
                <template slot="prepend">
                  <span class="www-el-label-text">期限(天)</span>
                </template>
              </el-input>
            </span>
            <span v-else>

              <el-input value="暂无数据" class="www-el-label-input" readonly>
                <template slot="prepend">
                  <span class="www-el-label-text">查询费(元)</span>
                </template>
              </el-input>
              <el-input value="暂无数据" class="www-el-label-input" readonly>
                <template slot="prepend">
                  <span class="www-el-label-text">转账费(元)</span>
                </template>
              </el-input>
              <el-input value="暂无数据" class="www-el-label-input" readonly>
                <template slot="prepend">
                  <span class="www-el-label-text">期限(天)</span>
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
                <el-form-item label="额度:">
                </el-form-item>
                <el-form-item label="绑卡时间:">
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="通讯录信息" name="fourth" v-if="financePowerControl!==5">
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import '@res/css/wjq/style.less';
import config from '@api/config';
import { downloadExecl } from '@api/excel.js';
import { parseTime } from '@filters/index.js';
import store from '@src/store';
export default {
  data() {
    return {
      tabsName: 'first',
      listLoading: false, //列表加载状态
      listLoading1: false,
      dataList3: null,
      listLoading3: true,
      listQuery: { params: { url: 'authenticationApply/auditInfo', orderNo:this.$route.query.orderNo } },
      bankCardQuery: { params: { url: 'bankCard/detailInfo', orderNo:this.$route.query.orderNo } },
      AddressBookQuery: { params: { url: 'contact/detailInfo', orderNo:this.$route.query.orderNo } },
      shenpilist: { oldCredit: "", result: "", newCredit: "" },
      shenpiAdvice: { refuseReason: "", memo: "" },
      shenpiResult: null,
      bankCardList: [{ realName: '', mobile: "", bankName: '', cardNo: '', idenNo: '', createTime: '' }, { bankName: '', cardNo: '', createTime: '', creditLimit: '' }],
      dataList: null,
      dataList1: null,
      dataList2: { operatorPhoneNumCnt: '', addressBookCnt: '', operatorInAddressBookCnt: '', proportion: '' },
      orderNo: '',
      auditForm: {
        auditOpinion: '',
        repaymentType: ''
      },
      imageUrl: require('@res/img/background.jpg'),
      loading: true,

      userCommunicationInfoPo: { joinTime: "", mobile: "", networkAttribution: "", userName: "", networkOperator: "" },
      collapse: ['1', '2', '3', '4'],
      query: {
        url: 'customer/basicInfo',
        //userId: this.$route.params.userId
        //userId: 28
        orderNo: this.$route.query.orderNo
      },
      customerDetail: {
        commonUserPo: null,
        listUserUploadPicInfoPo: null,
        listUserEmergencyContactPo: null,
        userExtendsPo: null,
        lendOrderPo: null,
        productPo: null,
        userAuthenticationApplyPo: null,
        userAccountPo: null
      },
      devicePoList: null,
      input3: '1',
      //订单详情
      billlistQuery: { params: { url: 'lendOrder/detailInfo', orderNo: this.$route.query.orderNo } },
      lendOrderPo: { realName: '', orderNo: '', userId: '', amount: '', yield: '', periodCnt: '', realLeadTime: '', paymentStatus: '', paymentStatus: '' },
      productPo: null,
      listRepaymentPo: [{}],
      listPaymentCapitalPo: [{}],
      listFKPaymentCapitalPo: [{}],
      repaymentList: null,
      dialogVisible: false,
      voucherImgUrl:"",
      //财务权限控制
      financePowerControl:null,
    };
  },
  created() {
    
    //财务权限控制  roleId为5的在tab页看不到基本信息和通讯录信息
    this.financePowerControl = this.$store.getters.user.roleId;
    this.handleClick();
    //console.log(this.lendOrderPo);
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
    //获取审批基本信息

    // getshenpiList() {
    //   config(this.listQuery.params).then(response => {
    //     this.listLoading = false;
    //     this.dataList = response.data.listTelAuditLogPo;
    //     this.shenpilist = response.data.userLineOfCreditLogPo;
    //     this.shenpiAdvice = response.data.userAuthenticationApplyPo;
    //     /*判断是否要调整*/
    //     if (this.shenpilist.newCredit === this.shenpilist.oldCredit) {
    //       this.shenpilist.result = "不调整";
    //     } else {
    //       this.shenpilist.result = "调整";
    //     }
    //   }).catch(err => {
    //     this.listLoading = true;
    //   })
    // },
    //获取银行卡信息
    getbankcardList() {
      config(this.bankCardQuery.params).then(response => {
        this.bankCardList = response.data.listUserBankcardPo;
        //this.bankCardList = response.data.lendOrderPo;
      }).catch(err => {
      })
    },
    //获取订单信息lendOrder/detailInfo
    getbillList() {
     config(this.billlistQuery.params).then(response => {
        if (response.respCode === '000000') {
        // this.voucherImgUrl = response.data.listFKPaymentCapitalPo[0].voucherImgUrl;
        this.lendOrderPo = response.data.lendOrderPo;
        this.productPo = response.data.productPo;
        this.listRepaymentPo = response.data.listRepaymentPo;
        //this.RepaymentPoList=response.data.listRepaymentPo;
        this.repaymentList = response.data.listPaymentCapitalPo;
        //this.listPaymentCapitalPo = response.data.listPaymentCapitalPo;
        this.listFKPaymentCapitalPo = response.data.listFKPaymentCapitalPo;
        }
      }).catch(err => {
      })
    },
    preview() {
      this.dialogVisible = true;
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
        response.data.listUserOftenContactPo.forEach((v, index) => {
          //通讯录来源格式化
          //v.avgTime=parseTime(v.avgTime,'{h}:{i}:{s}');//格式化时间
          //console.log(parseTime(v.avgTime, '{h}:{i}:{s}'));
        })
        this.dataList1 = response.data.listUserOftenContactPo;

      }).catch(err => {
        this.listLoading3 = true;
      })
    },
    //tab切换调接口
    handleClick() {
      if (this.tabsName == 'first') {
        this.getbillList();
        console.log(11111);
      }
      if (this.tabsName == 'second') {
        this.getBaseInfo('customer/basicInfo', data => {
          this.customerDetail = data;
          if (this.customerDetail.userAuthenticationApplyPo.status!==null) {
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
          if (this.customerDetail.userAuthenticationApplyPo.authType!==null) {
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
      if (this.tabsName == 'third') {
        this.getbankcardList();
      }
      if (this.tabsName == 'fourth') {
        this.getAddressBookList();
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

