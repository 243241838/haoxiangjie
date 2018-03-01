<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <h2>借款信息</h2>
      <el-row>
        <el-col :span="20" :offset="1">
          <el-form label-width="150px" class="credit-aplly-form" v-if="lendOrderPo">
            <el-form-item label="订单编号:">
              {{lendOrderPo.orderNo}}
            </el-form-item>
            <el-form-item label="客户ID:">
              {{lendOrderPo.userId}}
            </el-form-item>
            <el-form-item label="客户姓名:">
              {{lendOrderPo.realName}}
            </el-form-item>
            <el-form-item label="借款金额(元):">
              {{lendOrderPo.amount}}
            </el-form-item>
            <el-form-item label="借款利率(‱):" v-if="productPo">
              {{productPo.dailyInterest}}
            </el-form-item>
            <el-form-item label="借款利率(‱):" v-else>
            </el-form-item>
            <el-form-item label="申请期限(天):">
              {{lendOrderPo.periodCnt}}
            </el-form-item>
            <el-form-item label="借款时间:">
              {{lendOrderPo.createTime}}
            </el-form-item>
            <el-form-item label="放款状态：">
              <span v-if="lendOrderPo.paymentStatus===10">放款处理中</span>
              <span v-else-if="lendOrderPo.paymentStatus===20">放款成功</span>
              <span v-else-if="lendOrderPo.paymentStatus===30">放款失败</span>
            </el-form-item>
            <el-form-item label="实际放款金额(元):">
              {{lendOrderPo.actualPaymentAmount}}
            </el-form-item>
            <el-form-item label="服务费(元):">
              {{lendOrderPo.totalServiceCharge}}
            </el-form-item>
          </el-form>
          <el-form label-width="150px" class="credit-aplly-form" v-else>
            <el-form-item label="订单编号:">
            </el-form-item>
            <el-form-item label="客户ID:">
            </el-form-item>
            <el-form-item label="客户姓名:">
            </el-form-item>
            <el-form-item label="借款金额(元):">
            </el-form-item>
            <el-form-item label="借款利率(‱):">
            </el-form-item>
            <el-form-item label="申请期限(天):">
            </el-form-item>
            <el-form-item label="借款时间:">
            </el-form-item>
            <el-form-item label="放款状态:">
            </el-form-item>
            <el-form-item label="实际放款金额(元):">
            </el-form-item>
            <el-form-item label="服务费(元):">
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <div class="filter-container">
      <h2>代扣异常处理</h2>
      <el-row>
        <el-col :span="20" :offset="1">
          <el-form label-width="150px" class="credit-aplly-form">
            <el-form-item label="放款金额:" required="">
              <el-input placeholder="输入放款金额" v-model="submitQuery.params.amount" style="width:194px;"></el-input>
            </el-form-item>
            <el-form-item label="放款时间:" required="">
              <el-date-picker v-model="submitQuery.params.realLeadTime" type="datetime" placeholder="选择时间" :editable="false">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="交易流水号:">
              <el-input placeholder="输入交易流水号" v-model="submitQuery.params.thirdPartyCapitalNo" style="width:194px;"></el-input>
            </el-form-item>
            <el-form-item label="放款凭证" required="">
              <!--  action="https://jsonplaceholder.typicode.com/posts/"-->
              <!-- <el-upload class="avatar-uploader" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                      <img v-if="imageUrl" :src="imageUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload> -->
              <input class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="onFileChange()" ref="input" />
            </el-form-item>

            <el-form-item>
              <div @click="submit" type="text" style="height:40px;width:80px;background:#20a0ff;text-align:center;color:white;border-radius:4px;">提交</div>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import config from '@api/config';
import { parseTime } from '@filters/index.js';
export default {
  data() {
    return {
      submitQuery: { params: { url: 'lendOrder/handleExceptional', orderNo: this.$route.query.orderNo, amount: "", realLeadTime: '', thirdPartyCapitalNo: '', voucherImgUrl: '' } },
      value3: '',
      listQuery: { params: { url: 'lendOrder/detailInfo', orderNo: this.$route.query.orderNo } },
      value4: '',
      imageUrl: '',
      list: [],
      listPaymentCapitalPo: [{}],
      fileList: [],
      base64: "",
      lendOrderPo: null,
      productPo:null
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    getlist() {
      //this. listQuery.params.voucherImgUrl = this.base64;
      //console.log(this. listQuery.params.voucherImgUrl);

      config(this.listQuery.params).then(response => {
        this.lendOrderPo = response.data.lendOrderPo;
        this.productPo=response.data.productPo;
        this.listPaymentCapitalPo = response.data.listPaymentCapitalPo;
        //this.imageUrl = this.listPaymentCapitalPo[0].voucherImgUrl;
      }).catch(err => {

      })
    },
    //提交
    submit() {
      //this.submitQuery.params.voucherImgUrl = this.base64;
      console.log(this.submitQuery.params.voucherImgUrl);
      if(this.submitQuery.params.realLeadTime){
        this.submitQuery.params.realLeadTime = parseTime(this.submitQuery.params.realLeadTime, '{y}-{m}-{d} {h}:{i}:{s}');
      }else{
        this.submitQuery.params.realLeadTime='';
      }
      
      
      if (!this.submitQuery.params.amount){
        this.$message({
          message: '放款金额不能为空！',
          type: 'warning'
        });
        return;
      }
      if (!this.submitQuery.params.realLeadTime) {
        this.$message({
          message: '放款时间不能为空！',
          type: 'warning'
        });
        return;
      }
      if (!this.submitQuery.params.voucherImgUrl) {
        this.$message({
          message: '放款凭证不能为空！',
          type: 'warning'
        });
        return;
      }
      config(this.submitQuery.params).then(response => {
        if(response.respCode==='000000'){
          this.$router.push({ path: "/billManage/pendingOrder" });
          this.$message({
          message: response.respMsg,
          type: 'success'
          });

        }else{
          this.$message({
          message: response.respMsg,
          type: 'warning'
          });
        }
        
      }).catch(err => {
        this.$message({
          message: '提交失败',
          type: 'warning'
        });
        return;
      })
    },
    //上传图片
    onFileChange(){
      //console.log(this.$refs.input);
      const reader = new FileReader();
      //图片base64转码realLeadTime
      reader.readAsDataURL(this.$refs.input.files[0]);
      let that = this;
      reader.onload = function(e) {
        that.submitQuery.params.voucherImgUrl = this.result.split(',')[1];
        //console.log(this.result.split(',')[1]);// 这个就是base64编码了
        
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

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
