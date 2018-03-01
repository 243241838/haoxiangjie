<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <span>订单号:</span>
      <el-input v-model="listQuery.params.orderNo" placeholder="输入订单号" style="width:200px;margin-right: 50px;"></el-input>
      <span>用户ID:</span>
      <el-input v-model="listQuery.params.userId" placeholder="用户ID" style="width:200px;margin-right: 50px;"></el-input>
      <span>姓名:</span>
      <el-input v-model="listQuery.params.realName" placeholder="输入姓名" style="width:200px;margin-right: 50px;"></el-input>
      <span>手机号:</span>
      <el-input v-model="listQuery.params.mobile" placeholder="输入手机号" style="width:200px;margin-right: 50px;"></el-input>
    </div>
    <div class="filter-container">
      <span>应还款时间</span>
      <el-date-picker v-model="pickTimeStart" type="date" placeholder="起始时间" :editable="false" @change="dateChange">
      </el-date-picker>-
      <el-date-picker v-model="pickTimeEnd" type="date" placeholder="结束时间" :editable="false" @change="dateChange">
      </el-date-picker>
      <el-button class="filter-item" style="margin-left: 50px;" @click="reset" type="primary" icon="reset">重置</el-button>
      <el-button class="filter-item" style="margin-left: 50px;" type="primary" v-waves icon="search" @click="getApplyList">查询</el-button>
      <el-button class="filter-item" style="margin-left: 50px;" type="primary" v-waves @click="handleExcel">导出Excel表</el-button>
    </div>
    <div class="filter-container">
      <el-table :data="dataList" v-loading="listLoading" border fit highlight-current-row style="width: 100%" @selection-change="handleSelectionChange" ref="multipleTable">
        <el-table-column align="center" label="序号" width="100">
          <template scope="scope">
            <span>{{(listQuery.params.page-1)*listQuery.params.size+parseInt(scope.$index) + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="订单号">
          <template scope="scope">
            <el-button @click="goDetail(scope.row.orderNo)" type="text" size="small">
              {{scope.row.orderNo}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="用户ID">
          <template scope="scope">
            <span>{{scope.row.userId}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="姓名">
          <template scope="scope">
            <span>{{scope.row.realName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="处理状态">
          <template scope="scope">
            <span>{{scope.row.paymentStatus | paymentStatusFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="手机号">
          <template scope="scope">
            <span>{{scope.row.mobile}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="身份证号">
          <template scope="scope">
            <span>{{scope.row.idenNo}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="放款金额（元）">
          <template scope="scope">
            <span>{{scope.row.amount}}</span>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <div v-show="total" class="pagination-container">
      <el-pagination 
      @size-change="handleSizeChange"
            @current-change="handleCurrentPageChange"
            :current-page.sync="listQuery.params.page"
            :page-sizes="[10,20,30, 50]"
            :page-size="listQuery.params.size"
            layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import * as constants from '@api/constants';
import ajax from '@api/config';
import { downloadExecl } from '@api/excel.js';
import { trim } from '@src/utils/util';
import { praseMoney, parseTime, sourceFilter, creditApplyStatus, auditStatusTagFilter, repaymentMethodFilter, applyStatusTagFilter, caoZuoStatusTagFilter, praseBankCard } from '@src/filters';
export default {
  data() {
    return {
      listLoading: true, //列表加载状态
      currentRow: null,
      current: 1, // 默认显示第一页
      total: 0,
      input: '',
      pickTimeStart: "",
      pickTimeEnd: "",
      listQuery: { params: { url: 'lendOrder/listManMade', size: 10, page: 1, orderNo: '', endDate: "", startDate: "", mobile: "", realName: "", userId: "" } },
      operationStyle: constants.operationStyle,
      billStatus: [{ code: 0, text: '未到期', tag: 'wanner' }, { code: -10, text: '已到期', tag: 'danger' }],
      dataList: null,
      multipleSelection: []
    }
  },
  created() {
    this.getApplyList(1);
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
    reset() {
      this.listQuery.params.orderNo = "";
      this.pickTimeEnd = "";
      this.pickTimeStart = "";
      this.listQuery.params.mobile = "";
      this.listQuery.params.realName = "";
      this.listQuery.params.userId = "";
    },
    // 查询条件改变
    changeQuery(cur) {
      if (cur && typeof cur === 'number') {
        this.listQuery.params.page = cur;
      }
    },
    // handleCurrentChange(val) {
    //   this.currentRow = val;
    // },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 改变每一页的条数
    handleSizeChange(val) {
      this.listQuery.params.size = val;
      this.getApplyList();
    },
    // 切换页码
    handleCurrentPageChange(val) {
      //this.listQuery.params.page = val;
      this.getApplyList(val);
    },
    /*搜索列表信息*/
    getApplyList(cur) {
      this.changeQuery(cur);
      this.listQuery.params.mobile = trim(this.listQuery.params.mobile);
      ajax(this.listQuery.params).then(response => {
        this.total = response.data.totalItems;
        this.listLoading = false;
        this.dataList = response.data.lendOrders;
      }).catch(err => {
        this.listLoading = true;
      })
    },
    handleExcel() {
      downloadExecl({ url: 'lendOrder/exportLendOrderExcel', input: { applyNo: this.listQuery.params.applyNo, endDateStr: this.listQuery.params.endDate, startDateStr: this.listQuery.params.startDate, mobile: this.listQuery.params.mobile, realName: this.listQuery.params.realName, userId: this.listQuery.params.userId, excelType: 3 } });
    },
    goDetail(orderNo) {
      this.$router.push({ path: "/billManage/handledOrderDetails", query: { orderNo: orderNo } });
    }
  },
  filters:{
    paymentStatusFilter(value) {
      if(value===20){
        return '放款成功';
      }else if(value===-10) {
        return '订单关闭';
      }else{
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


