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
                            {{lendOrderPo.realLeadTime}}
                        </el-form-item>
                        <el-form-item label="放款状态:">
                            <span>{{lendOrderPo.paymentStatus | paymentStatusFilter}}</span>
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
                    </el-form>
                </el-col>
            </el-row>
        </div>
        <div class="filter-container">
            <h2>冲账收款凭证</h2>
            <el-row>
                <el-col :span="20" :offset="1">
                    <el-form label-width="150px" class="credit-aplly-form" v-if="listPaymentCapitalPo[0]">
                        <el-form-item label="收款金额(元):" required="">
                            <span>{{listPaymentCapitalPo[0].amount}}</span>
                        </el-form-item>
                        <el-form-item label="收款时间:" required="">
                            <span>{{listPaymentCapitalPo[0].createTime}}</span>
                        </el-form-item>
                        <el-form-item label="交易流水号:" required="">
                            <span>{{listPaymentCapitalPo[0].thirdPartyCapitalNo}}</span>
                        </el-form-item>
                    </el-form>
                    <el-form label-width="150px" class="credit-aplly-form" v-else>
                        <el-form-item label="收款金额(元):" required="">
                            <span></span>
                        </el-form-item>
                        <el-form-item label="收款时间:" required="">
                            <span></span>
                        </el-form-item>
                        <el-form-item label="交易流水号: " required="">
                            <span></span>
                        </el-form-item>
                    </el-form>

                    <div v-if="listPaymentCapitalPo[0]">
                        <img :src="listPaymentCapitalPo[0].voucherImgUrl" class="avatar">
                        <el-button @click="goDetail()" type="text" size="small">
                            预览
                        </el-button>
                        <a target="_blank" :href="listPaymentCapitalPo[0].voucherImgUrl" download="图片" style="color:#4db3ff;">下载</a>
                    </div>
                    <div v-else>
                        <span>暂无图片</span>
                        <el-button @click="goDetail()" type="text" size="small">
                            预览
                        </el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-dialog title="" :visible.sync="dialogVisible" size="full">
            <div class="text-box">
                <div>
                    <img v-if="listPaymentCapitalPo[0].voucherImgUrl" :src="listPaymentCapitalPo[0].voucherImgUrl" class="avatar" style="width:100%;height:100%;">
                </div>
                <!-- <div v-else>
              暂无图片
            </div> -->
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import config from '@api/config';
import { parseTime } from '@filters/index.js';
export default {
    data() {
        return {
            listQuery: { params: { url: 'lendOrder/detailInfo', orderNo: this.$route.query.orderNo } },
            lendOrderPo: null,
            listPaymentCapitalPo: [{}],
            listPaymentCapitalPo: [{}],
            productPo: null,
            dialogVisible: false,
            value3: '',
            value4: '',
            //imageUrl: '',
            list: [],
            fileList: [],
            base64: ""
        };
    },
    created() {
        this.getlist();
    },
    methods: {
        //提交
        getlist() {
            //this. listQuery.params.voucherImgUrl = this.base64;
            this.listQuery.params.realLeadTime = parseTime(this.listQuery.params.realLeadTime, '{y}-{m}-{d} {h}:{i}:{s}');
            config(this.listQuery.params).then(response => {
                this.lendOrderPo = response.data.lendOrderPo;
                this.productPo = response.data.productPo;
                this.listPaymentCapitalPo = response.data.listPaymentCapitalPo;
                this.listPaymentCapitalPo = response.data.listPaymentCapitalPo;

            }).catch(err => {

            })
        },
        goDetail() {
            this.dialogVisible = true;
        }


    },
    filters:{
        paymentStatusFilter(value){
            if(value===10){
                return "放款处理中";
            }else if(value===20){
                return '放款成功';
            }else if(value===30){
                return '放款失败';
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
