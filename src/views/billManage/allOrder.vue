<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <span>订单号:</span>
      <el-input v-model="listQuery.params.orderNo" placeholder="输入订单号" style="width:200px;margin-right: 50px;"></el-input>
      <span>用户ID:</span>
      <el-input v-model="listQuery.params.userId" placeholder="用户ID" style="width:200px;margin-right: 50px;"></el-input>
      <span>输入姓名:</span>
      <el-input v-model="listQuery.params.realName" placeholder="输入姓名" style="width:200px;margin-right: 50px;"></el-input>
      <span>输入手机号:</span>
      <el-input v-model="listQuery.params.mobile" placeholder="输入手机号" style="width:200px;margin-right: 50px;"></el-input>
    </div>
    <div class="filter-container">
      <span>申请时间:</span>
      <el-date-picker v-model="pickTimeStart" type="date" placeholder="起始时间" :editable="false" @change="dateChange">
      </el-date-picker>-
      <el-date-picker v-model="pickTimeEnd" type="date" placeholder="结束时间" :editable="false" @change="dateChange">
      </el-date-picker>
      <span>放款状态:</span>
      <el-select clearable style="width:200px" class="filter-item" v-model="listQuery.params.paymentStatus" placeholder="放款状态">
        <el-option v-for="item in billStatus" :key="item.code" :label="item.text" :value="item.code">
        </el-option>
      </el-select>
      <el-button class="filter-item" style="margin-left: 50px;" @click="reset" type="primary" icon="reset">重置</el-button>
      <el-button class="filter-item" style="margin-left: 50px;" type="primary" v-waves icon="search" @click="getApplyList">查询</el-button>

    </div>
    <div class="filter-container">
      <el-table :data="dataList" v-loading="listLoading" border fit highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
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
        <el-table-column align="center" label="订单状态">
          <template scope="scope">
            <span>放款</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="姓名">
          <template scope="scope">
            <el-button @click="gocustomerDetail(scope.row.userId)" type="text" size="small" v-if="financePowerControl!==5">
              {{scope.row.realName}}
            </el-button>
            <span v-else>
              {{scope.row.realName}}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="手机号">
          <template scope="scope">
            <span>{{scope.row.mobile}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="合同号">
          <template scope="scope">
            <el-button @click="goContact(scope.row.contractNo)" type="text" size="small">
              {{scope.row.contractNo}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="借款金额（元）">
          <template scope="scope">
            <span>{{scope.row.amount}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="订单生成时间">
          <template scope="scope">
            <span>{{scope.row.createTime}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="放款状态">
          <template scope="scope">
            <span>{{scope.row.paymentStatus | paymentStatusFilter}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="total" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="listQuery.params.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.params.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog title="合同详情" :visible.sync="dialogVisible" size="full">
      <div class="text-box" v-html="receipt">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as constants from '@api/constants';
import ajax from '@api/config';
import { trim } from '@src/utils/util';
import { praseMoney, parseTime, sourceFilter, creditApplyStatus, auditStatusTagFilter, repaymentMethodFilter, applyStatusTagFilter, caoZuoStatusTagFilter, praseBankCard } from '@src/filters';
export default {
  data() {
    return {
      listLoading: true, //列表加载状态
      total: 0,
      currentRow: null,
      input: '',
      receipt: '',
      dialogVisible: false,
      contactDetail: null,
      pickTimeStart: "",
      pickTimeEnd: "",
      listQuery: { params: { url: 'lendOrder/listPayment', page: 1, size: 10, orderNo: '', endDate: "", startDate: "", mobile: "", realName: "", userId: "", paymentStatus: '' } },
      contractQuery: { params: { url: 'lendOrder/agreement', contractNo: '' } },
      billStatus: [{ code: -10, text: '订单关闭' },{ code: 10, text: '待放款' }, { code: 20, text: '已放款' }, { code: 30, text: '放款失败' }],
      dataList: null,
      multipleSelection: [],
      //财务权限控制
      financePowerControl:null,
    }
  },
  created() {
     //财务权限控制  roleId为5的在tab页看不到基本信息和通讯录信息
    this.financePowerControl = this.$store.getters.user.roleId;
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
    // 查询条件改变
    changeQuery(cur) {
      if (cur && typeof cur === 'number') {
        this.listQuery.params.page = cur;
      }

    },
    reset() {
      this.listQuery.params.orderNo = "";
      this.pickTimeEnd = "";
      this.pickTimeStart = "";
      this.listQuery.params.mobile = "";
      this.listQuery.params.realName = "";
      this.listQuery.params.userId = "";
      this.listQuery.params.paymentStatus = "";
    },
    handleCurrentChange(val) {
      this.currentRow = 1;
    },
    handleSizeChange(val) {
      this.listQuery.params.size = val;
      this.getApplyList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCurrentPageChange(val) {
      //this.listQuery.params.page = val;
      this.getApplyList(val);
    },
    /*搜索列表信息*/
    getApplyList(cur) {
      this.listQuery.params.mobile = trim(this.listQuery.params.mobile);
      this.changeQuery(cur);
      ajax(this.listQuery.params).then(response => {
        this.total = response.data.totalItems;
        this.listLoading = false;
        this.dataList = response.data.lendOrders;
      }).catch(err => {
        this.listLoading = true;
      })
    },
    //合同弹窗
    goContact(contractNo) {
      this.contractQuery.params.contractNo = contractNo;
      ajax(this.contractQuery.params).then(response => {
        //this.contactDetail=response.data.orderAgreementPo.content;
        this.dialogVisible = true;
        this.receipt = response.data.orderAgreementPo.content;
      }).catch(err => {

      })
    },
    goDetail(orderNo) {
      this.$router.push({ path: "/billManage/allOrderDetails", query: { orderNo: orderNo } });
    },
    gocustomerDetail(userId) {
      this.$router.push({ path: "/billManage/billcustomerDetails", query: { userId: userId } });
    }
  },
  filters: {
    paymentStatusFilter(value) {
      if (value === 10) {
        return '待放款';
      } else if (value === 20) {
        return '已放款';
      } else if (value === 30) {
        return '放款失败';
      } else if (value === -10) {
        return '订单关闭';
      }else {
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


