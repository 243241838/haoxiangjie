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
        <span>姓名:</span>
        <el-input v-model="listQuery.params.realName" placeholder="输入姓名" :maxlength=30 style="width:200px;margin-right: 50px;"></el-input>
      </div>
      <div class="filter-container">
        <span>申请时间:</span>
        <el-date-picker v-model="pickTimeStart" type="date" placeholder="还款起始时间" :editable="false" @change="dateChange">
        </el-date-picker>-
        <el-date-picker v-model="pickTimeEnd" type="date" placeholder="还款结束时间" :editable="false" @change="dateChange">
        </el-date-picker>
        <el-select clearable style="width:200px" class="filter-item" v-model="listQuery.params.status" placeholder="授信申请状态">
          <el-option v-for="item in creditApplyStatus" :key="item.code" :label="item.text" :value="item.code">
          </el-option>
        </el-select>
        <el-button class="filter-item" style="margin-left: 50px;" @click="reset" type="primary" icon="search">重置</el-button>
        <el-button class="filter-item" style="margin-left: 50px;" type="primary" v-waves icon="search" @click="getApplyList">查询</el-button>

      </div>
      <div class="filter-container">
        <el-table :data="dataList" v-loading="listLoading" @current-change="handleCurrentChange" border fit highlight-current-row style="width: 100%">
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
              <span>{{scope.row.status | statusFilter}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="姓名">
            <template scope="scope">
              <el-button @click="goCustomerDetail(scope.row.userId)" type="text" size="small">
                {{scope.row.realName}}
              </el-button>
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
import { trim } from '@src/utils/util';
import { praseMoney, parseTime, sourceFilter, creditApplyStatusFilter, repaymentMethodFilter, applyStatusTagFilter, caoZuoStatusTagFilter, praseBankCard } from '@src/filters';
export default {
  data() {
    return {
      listLoading: true, //列表加载状态
      total: 0,
      current: 1, // 默认显示第一页
      currentRow: null,
      input: '',
      dataList: null,
      applyApprovedCnt: "",
      applyCnt: "",
      applyRefusedCnt: "",
      pickTimeStart: "",
      pickTimeEnd: "",
      listQuery: { params: { url: 'authenticationApply/list', size: 10, page: 1, applyNo: '', endDate: "", startDate: "", status: "", realName: "", mobile: "" } },
      operationStyle: constants.operationStyle,
      creditApplyStatus: constants.creditApplyStatus

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
      this.listQuery.params.status = "";
      this.listQuery.params.realName = "";
      this.listQuery.params.mobile = "";
    },
    handleCurrentChange(val) {
      this.currentRow = 1;
    },
    handleSizeChange(val) {
      this.listQuery.params.size = val;
      this.getApplyList();
    },
    handleCurrentPageChange(val) {
      this.listQuery.params.page = val;
      this.getApplyList();
    },
    //跳转至订单详情
    goDetail(applyNo) {
      this.$router.push({ path: "/loanManage/details", query: { applyNo: applyNo } });
    },
    //
    goCustomerDetail(userId) {
      this.$router.push({ path: "/loanManage/customerDetails", query: { userId: userId } });
    },
    /*搜索列表信息*/
    getApplyList() {
      this.listQuery.params.mobile = trim(this.listQuery.params.mobile);
      ajax(this.listQuery.params).then(response => {
        this.total = response.data.totalItems;
        this.applyApprovedCnt = response.data.applyApprovedCnt;
        this.applyCnt = response.data.applyCnt;
        this.applyRefusedCnt = response.data.applyRefusedCnt;
        this.listLoading = false;
        this.dataList = response.data.recordList;
      }).catch(err => {
        this.listLoading = true;
      })
    }
  },
  filters: {
    statusFilter(value) {
      if (value === 0) {
        return '完善资料中';
      } else if (value === 1) {
        return '待审批';
      } else if (value === 10) {
        return '已审批';
      } else if (value === -10) {
        return '已拒绝';
      } else {
        return value;
      }
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

