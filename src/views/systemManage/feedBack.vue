<template>
    <div class="www-page">
        <div style="padding-bottom:20px;">
            姓名：
            <el-input v-model="query.realName" :maxlength=30 style="width:200px;margin-bottom:10px;" placeholder="姓名"></el-input>
            手机号：
            <el-input v-model="query.mobile" :maxlength=30 style="width:200px;margin-bottom:10px" placeholder="手机号"></el-input>
            身份证号：
            <el-input v-model="query.idenNo" :maxlength=30 style="width:200px;margin-bottom:10px" placeholder="身份证号"></el-input>
            日期：
            <el-date-picker style="width:200px;margin-bottom:10px;" v-model="query.createTimeStart" type="date" placeholder="开始时间" :editable="false"
                @change="dateStartChange"></el-date-picker>
            <el-date-picker style="width:200px;margin-bottom:10px;" v-model="query.createTimeEnd" type="date" placeholder="结束时间" :editable="false"
                @change="dateEndChange"></el-date-picker>
            <el-button v-waves style="margin-bottom:10px;margin-left:8px;" icon="setting" @click="reset">重置</el-button>
            <el-button type="primary" v-waves style="margin-bottom:10px;" icon="search" @click="search">查询</el-button>
        </div>
        <div class="www-table-box">
            <el-table ref="multipleTable" :data="data.feedbackPoList" border style="width:2000px;" v-loading="listLoading">
                <el-table-column label="序号" min-width="100" align="center">
                    <template scope="scope">
                        <span>{{(query.page-1)*query.size + parseInt(scope.$index) + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="日期" min-width="160" align="center"> </el-table-column>
                <el-table-column prop="realName" label="姓名" min-width="120" align="center"></el-table-column>
                <el-table-column prop="idenNo" label="身份证号" min-width="180" align="center"></el-table-column>
                <el-table-column prop="mobile" label="手机号" min-width="120" align="center"></el-table-column>
                <el-table-column prop="feedbackContent" label="意见内容" min-width="388" align="center">
                     <template scope="scope"><span style=" display:inline-block;width:100%;text-indent:2px;text-align:justify;">{{scope.row.feedbackContent}}</span></template>
                </el-table-column>
                <el-table-column label="图片" min-width="300" align="center">
                    <template scope="scope">
                        <span v-if="scope.row.imgarr.length>0" style="display:inline-block;padding:10px 0px;white-space:nowrap;text-overflow:clip;overflow:hidden; ">
                        <a :href="voucherImgUrl" target="_blank"><img :src="item" style="width:100px;height:100px; margin-right:12px; line-height:100px;" v-for="(item ,index) in scope.row.imgarr" :index="index" @click="preview(item)" alt="图片已损坏"/></a>
                       </span>
                        <span v-else style="display:inline-block;height:100px; line-height:100px;">暂无图片</span>
                    </template>
                </el-table-column>
            </el-table>
            </div>
        <div v-if="data.totalItems" class="pagination-container" style="padding:10px 0;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="query.page"
                :page-sizes="[10,20,30,50]" :page-size="query.size" layout="total, sizes, prev, pager, next, jumper" :total="data.totalItems">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import '@res/css/wjq/style.less';
    import config from '@api/config';
    import {
        parseTime
    } from '@filters/index.js';
    import {
        trim
    } from '@src/utils/util';
    export default {
        data() {
            return {
                listLoading: true,
                query: {
                    url: 'feeBack/list',
                    page: 1,
                    size: 10,
                    mobile: '',
                    realName: '',
                    idenNo: '',
                    createTimeStart: '',
                    createTimeEnd: "",
                },
                data: {
                    feedbackPoList: null,
                    totalItems: 0,
                    
                },
                voucherImgUrl:""

            }
        },
        created() {
            this.search(1)
        },
        methods: {
            preview(url) {
               this. voucherImgUrl=url
               console.log(this. voucherImgUrl)
            },
            changeQuery(cur) {
                if (cur && typeof cur === 'number') {
                    this.query.page = cur;
                }

            },
            dateStartChange() {
                if (this.query.createTimeStart === '') {
                    return
                } else {
                    this.query.createTimeStart = parseTime(this.query.createTimeStart, '{y}-{m}-{d}')
                }
            },
            dateEndChange() {
                if (this.query.createTimeEnd === '') {
                    return
                } else {
                    this.query.createTimeEnd = parseTime(this.query.createTimeEnd, '{y}-{m}-{d}')
                }
            },
            reset() {
                this.query = {
                    url: 'feeBack/list',
                    page: this.query.page,
                    size: this.query.size,
                    mobile: '',
                    realName: '',
                    idenNo: '',
                    createTimeStart: '',
                    createTimeEnd: "",
                }

            },
            search(cur) {
                this.changeQuery(cur);
                this.listLoading = true;
                this.query.mobile = trim(this.query.mobile);
                config(this.query).then(response => {
                    this.listLoading = false;
                    if (response.respCode == '000000') {
                     if(response.data.feedbackPoList!=null){
                      for(let i=0;i<response.data.feedbackPoList.length;i++){
                          let obj=[];
                          if(response.data.feedbackPoList[i].imgUrlOne!=""){obj.push(response.data.feedbackPoList[i].imgUrlOne)};
                          if(response.data.feedbackPoList[i].imgUrlThree!=""){obj.push(response.data.feedbackPoList[i].imgUrlThree)};
                          if(response.data.feedbackPoList[i].imgUrlTwo!=""){obj.push(response.data.feedbackPoList[i].imgUrlTwo)}
                          response.data.feedbackPoList[i].imgarr=obj
                      }
                         this.data=response.data;
                         console.log(this.data)
                       
                     }else{
                          this.data=response.data
                     }
                    
                    }
                })
            },
            handleSizeChange(val) {
                this.query.size = val;
                this.search();
            },
            handleCurrentPageChange(val) {
                this.search(val);
            }
        }
    }
</script>