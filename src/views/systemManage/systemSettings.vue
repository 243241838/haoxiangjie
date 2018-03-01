<template>
    <div class="www-page">
        <el-form :inline="true" :model="information" v-loading="Loading">
            <el-form-item label="关于我们:" label-width="140">
                <el-input type="textarea" :rows="6" v-model="information.dictValue" style="position:relative;width:407px;height:122px;margin-bottom:20px;"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="onSubmit" style="margin-top:44px;">确定</el-button>
            </el-form-item>
        </el-form>
        <el-form :inline="true" :model="query">
            <el-form-item label="首页跑马灯:" label-width="140">
                <el-input type="textarea" :rows="6" v-model="query.marqueeContent" style="width:407px;height:122px;margin-bottom:20px;"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="search" style="margin-top:44px;">确定</el-button>
            </el-form-item>
        </el-form>
        <div style="margin-left:140px;">
            <el-table ref="multipleTable" :data="data.homeMarqueeLogPoList" border style="width:1200px;" v-loading="listLoading">
                <el-table-column label="序号" width="120" align="center">
                    <template scope="scope">
                        <span>{{(query.page-1)*query.size + parseInt(scope.$index) + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="时间" width="190" align="center"> </el-table-column>
                <el-table-column label="内容" min-width="170" align="center">
                    <template scope="scope"><span style="display:inline-block;width:100%;text-align:justify;text-indent:2px; ">{{scope.row.marqueeContent}}</span></template>
                </el-table-column>
                <el-table-column prop="realName" label="操作人" width="120" align="center"></el-table-column>
            </el-table>
            <div v-if="data.homeMarqueeLogTotalItems" class="pagination-container" style="padding:10px 0;">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="query.page"
                    :page-sizes="[10,20,30,50]" :page-size="query.size" layout="total, sizes, prev, pager, next, jumper" :total="data.homeMarqueeLogTotalItems">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import '@res/css/wjq/style.less';
    import config from '@api/config';
    import {
        trim
    } from '@src/utils/util';

    export default {
        data() {
            return {
                listLoading: true,
                Loading:true,
                information: {
                    dictValue: "",
                },
                data: {
                    homeMarqueeLogPoList: null,
                    homeMarqueeLogTotalItems: ""
                },
                query: {
                    url: 'homeMarquee/list',
                    page: 1,
                    size: 10,
                    marqueeContent: ''
                }
            }
        },
        created() {
            this.getData();
        },
        methods: {
            changeQuery(cur) {
                if (cur && typeof cur === 'number') {
                    this.query.page = cur;
                }
                this.listLoading = true
                config(this.query).then(response => {
                    if (response.respCode === '000000') {
                        this.data = response.data;
                    }
                    this.listLoading = false
                })
            },
            search() {
                let value = trim(this.query.marqueeContent);
                if (value=='') {
                    this.$message({
                        message: '内容不能为空',
                        type: 'warning'
                    })
                    return false
                }
                if (value.length > 120) {
                    this.$message({
                        message: '最多输入128个文字；不支持图片',
                        type: 'warning'
                    })
                    return false
                }
                this.listLoading = true
                let obj = {
                    url: 'homeMarquee/addHomeMarqueelog',
                    marqueeContent: value,
}
                config(obj).then(response => {
                    if (response.respCode === '000000') {
                        this.$message.success(response.respMsg);
                        this.query.marqueeContent="";
                        this.query.page=1;
                        this.query.size=10;
                        this.getData()
                    } else {
                        this.$message.error(response.respMsg)
                    }
                    this.listLoading = false
                })

            },
            onSubmit() {
                let value = trim(this.information.dictValue);
                if (value=='') {
                    this.$message({
                        message: '内容不能为空',
                        type: 'warning'
                    })
                    return false
                } 
                if (value.length > 120) {
                    this.$message({
                        message: '最多输入128个文字；不支持图片',
                        type: 'warning'
                    })
                    return false
                }
                let obj = {
                    url: 'systemDict/updateSystemDict',
                    sts: '1',
                    id: '49',
                    dictValue: value
                };
               config(obj).then(response => {
                   if (response.respCode === '000000') {
                        this.$message.success(response.respMsg)
                    } else {
                        this.$message.error(response.respMsg)
                    }
                   
                })
            },
            getData() {
                config({
                    url: 'systemDict/querySystemDictByDictName'
                }).then(response => {
                    this.Loading=false
                    if (response.respCode === '000000') {
                        this.information.dictValue = response.data.systemDictPo.dictValue
                       }
                    this.listLoading = true;
                    let obj={}
                     config({
                        url: 'homeMarquee/list',
                        page:1,
                        size:10
                    }).then(response => {
                        if (response.respCode === '000000') {
                            this.data = response.data;
                            }
                        this.listLoading = false
                    })
                })
            },
            handleCurrentPageChange(val) {
                 this.changeQuery(val);
                
            },
            handleSizeChange(val) {
                this.query.size = val;
                this.changeQuery()
                
            }
        }


    }
</script>
