<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <span>今日授信申请:</span>
      <span class="rightData">{{applyCnt}}</span>
      <span>今日通过授信:</span>
      <span class="rightData">{{applyApprovedCnt}}</span>
      <span>今日拒绝授信:</span>
      <span class="rightData">{{applyRefusedCnt}}</span>
    </div>
    <div class="filter-container">
      <span>订单号:</span>
      <el-input v-model="listQuery.params.applyNo" placeholder="输入订单号" :maxlength=30 style="width:200px;margin-right: 50px;"></el-input>
      <span>手机号:</span>
      <el-input v-model="listQuery.params.mobile" placeholder="输入手机号" :maxlength=30 style="width:200px;margin-right: 50px;"></el-input>
      <span>身份证号:</span>
      <el-input v-model="listQuery.params.idenNo" placeholder="身份证号" :maxlength=30 style="width:200px;margin-right: 50px;"></el-input>
      <span>姓名:</span>
      <el-input v-model="listQuery.params.realName" placeholder="输入姓名" :maxlength=30 style="width:200px;margin-right: 50px;"></el-input>
    </div>
    <div class="filter-container">
      <span>申请时间:</span>
      <el-date-picker v-model="pickTimeStart" type="date" placeholder="还款起始时间" :editable="false"  @change="dateChange">
      </el-date-picker>
      <el-date-picker v-model="pickTimeEnd" type="date" placeholder="还款结束时间" :editable="false"  @change="dateChange">
      </el-date-picker>
      <el-button class="filter-item" style="margin-left: 50px;" @click="reset" type="primary" icon="search">重置</el-button>
      <el-button class="filter-item" style="margin-left: 50px;" type="primary" v-waves icon="search" @click="getApplyList">查询</el-button>
       <el-select clearable style="width:150px;margin-left: 50px;" class="filter-item" v-model="orderQuery.params.grabAuditNum" placeholder="抢单数量" v-if="roleId!==1">
        <el-option v-for="item in billStatus" :key="item.code" :label="item.text" :value="item.code">
        </el-option>
      </el-select>
      <!-- <el-input v-model="listQuery.params.grabAuditNum" placeholder="可输入1-10的抢单数" :maxlength=30 style="width:200px;margin-left: 50px;"></el-input> -->
      <el-button class="filter-item" style="margin-left: 50px;" type="primary" v-waves icon="search" @click="grabOrder" v-if="roleId!==1">{{orderQuery.params.grabAuditNum}}条订单获取</el-button>
      <span style="margin-left: 50px;" v-if="roleId!==1">当前共有{{remainRecordCnt}}条订单可抢</span>
    </div>
    <div class="filter-container">
      <el-table :data="dataList"  @current-change="handleCurrentChange" border fit highlight-current-row style="width: 100%">
        <el-table-column align="center" label="序号" width="100">
          <template scope="scope">
            <span>{{(listQuery.params.page-1)*listQuery.params.size+parseInt(scope.$index) + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="订单号">
          <template scope="scope">
            <el-button @click="goDetail(scope.row.applyNo)" type="text" size="small">
              {{scope.row.applyNo}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态">
          <template scope="scope">
            <span>待审核</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="姓名">
          <template scope="scope">
            <el-button @click="goCustomerDetail(scope.row.userId)" type="text" size="small">
              {{scope.row.realName}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="身份证号">
          <template scope="scope">
            <span>{{scope.row.idenNo}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="手机">
          <template scope="scope">
            <span>{{scope.row.mobile}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="订单生成时间">
          <template scope="scope">
            <span>{{scope.row.applyTime}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template scope="scope">
            <!-- <el-button @click="dianhe(scope.row.applyNo)" type="text" size="small">
                电核
              </el-button>  | -->
            <el-button @click="shenpi(scope.row.applyNo)" type="text" size="small">
              审批
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="total" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="listQuery.params.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.params.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import * as constants from '@api/constants';
import ajax from '@api/config';
import {trim} from '@src/utils/util';
import { praseMoney, parseTime, sourceFilter, creditApplyStatusFilter, repaymentMethodFilter, applyStatusTagFilter, caoZuoStatusTagFilter, praseBankCard } from '@src/filters';
export default {
  data() {
    return {
      listLoading: true, //列表加载状态
      total: 0,
      current: 1, // 默认显示第一页
      currentRow: null,
      input: '',
      remainRecordCnt:null,//可抢的订单数
      dataList: null,
      applyApprovedCnt: "",
      roleId:'',//判断是不是管理员  为1是admin
      applyCnt: "",
      applyRefusedCnt: "",
      pickTimeStart: "",
      pickTimeEnd: "",
      listQuery: {  params: { url: 'authenticationApply/listAudit',size: 10, page: 1, applyNo: '', endDate: "", startDate: "",  realName: "", idenNo: "",mobile:"" } },
      creditApplyStatus: constants.creditApplyStatus,
      tabName0: 'first',
      //抢单
      orderQuery: { params: { url: 'authenticationApply/grabAudit', applyNo: "", endDate: "", startDate: "",  realName: "", idenNo: "",mobile:"",grabAuditNum:"" }},
      billStatus: [{ code: 1, text: '1' }, { code: 2, text: '2' }, { code: 3, text:'3' }, { code: 4, text: '4' }, { code: 5, text: '5' }, { code: 6, text: '6' }, { code: 7, text: '7' }, { code: 8, text: '8' }, { code: 9, text: '9' }, { code: 10, text: '10' }],
    }
  },
  created() {
     this.getApplyList();
  },
  methods: {
    dateChange() {
      if (this.pickTimeStart === "") {
        this.listQuery.params.startDate = "";
      } else {
        this.listQuery.params.startDate = parseTime(this.pickTimeStart, '{y}-{m}-{d}');
      }
      if (this.pickTimeEnd === "") {
        this.listQuery.params.endDate = "";
      } else {
        this.listQuery.params.endDate = parseTime(this.pickTimeEnd, '{y}-{m}-{d}');
      }
    },
    //重置所有过滤信息
    reset() {
      this.listQuery.params.applyNo = "";
      this.pickTimeEnd = "";
      this.pickTimeStart = "";
      this.listQuery.params.mobile=""
      this.listQuery.params.realName = "";
      this.listQuery.params.idenNo = "";
      this.orderQuery.params.grabAuditNum = "";
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    // 改变每一页的条数
    handleSizeChange(val) {
      this.listQuery.params.size = val;
      this.getApplyList();
    },
    // 切换页码
    handleCurrentPageChange(val) {
      this.listQuery.params.page = val;
      this.getApplyList();
    },
    goDetail(applyNo) {
      this.$router.push({ path: "/loanManage/auditDetails", query: { applyNo: applyNo } });
    },
    /*搜索列表信息*/
    getApplyList() {
       this.listQuery.params.mobile=trim(this.listQuery.params.mobile);
      ajax(this.listQuery.params).then(response => {
        this.total = response.data.totalItems;
        this.applyApprovedCnt = response.data.applyApprovedCnt;
        this.applyCnt = response.data.applyCnt;
        this.applyRefusedCnt = response.data.applyRefusedCnt;
        this.listLoading = false;
        this.remainRecordCnt=response.data.remainRecordCnt;
        this.dataList = response.data.recordList;
        this.roleId=response.data.roleId;
      }).catch(err => {
        this.listLoading = true;
      })
    },
    //跳转到客户详情页
    goCustomerDetail(userId) {
      this.$router.push({ path: "/loanManage/customerDetails", query: { userId: userId } });
    },
    // /*电核*/
    // dianhe(applyNo){
    //   this.$router.push({path:"/loanManage/auditDetails",query:{ applyNo: applyNo,tabName1:'first'}});
    // },
    /*审批*/
    shenpi(applyNo) {
      this.$router.push({ path: "/loanManage/auditDetails", query: { applyNo: applyNo } });
    },
    //抢单
    grabOrder() {
      
      if(!this.orderQuery.params.grabAuditNum){
        this.$message({
            message: '请选择抢单的单数！',
            type: 'warning'
          });
        return false;
      }
      ajax(this.orderQuery.params).then(response => {
        if (response.respCode === '000000') {
          this.dataList = response.data.recordlist;
          this.remainRecordCnt=response.data.remainRecordCnt;
          this.getApplyList();
          this.$message({
            message: response.respMsg,
            type: 'success'
          });
        } else {
          this.$message({
            message: response.respMsg,
            type: 'warning'
          });
          this.remainRecordCnt=response.data.remainRecordCnt;
        }

      }).catch(err => {

      })
    }
  }

}
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

