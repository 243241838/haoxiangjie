<template>
  <div>
    <div class="www-page" v-loading="loading">
        <div>
            <div style="margin-bottom:20px;">
                <template v-for="(item,index) in poList">
                    <el-button :class="{'www-el-success': currentTab==index}" :plain="true" type="success" @click="tabChange(index)">{{item.agreementTitle}}</el-button>
                </template>
            </div>
            <div v-if="poList" v-loading="commitLoading">
                <div v-for="(item,index) in poList" v-show="index == currentTab">
                    <weditor ref="broadcast" v-bind:loanid="item.agreementContent" v-bind:editorName="editorNameList[index]" v-on:listenWEditorChange="wEditorChange"></weditor>
                </div>
            </div>
        </div>
        <div style="padding-top:20px;">
            <el-button v-waves icon="setting" @click="getData">重置</el-button>
            <el-button icon="edit" type="info" @click="save">保存</el-button>
        </div>
    </div>
  </div>
</template>
<script>
 
import config from '@api/config';
import weditor from '@components/WEditor.vue';

export default {
    components: {
        weditor
    },
    data() {
        return {
            loading: false,
            commitLoading: false,
            query: {
                url: 'agreementTemplateList'
            },
            poList: null,
            editorNameList: [],
            currentTab: 0,
            content: ''
        }
    },
    computed: {
    },
    created () {  
        this.getData();
       
    },
    mounted () {
    },
    methods: {
        getData () {
            this.loading = true;
            config(this.query).then(response => {
                if (response.respCode === '000000') {
                    this.poList = response.data.poList;
                    this.createEditor();
                }
                this.loading = false;
            })
        },
        createEditor () {
            this.poList.map((item, index) => {
                // 初始化
                this.content = this.poList[0].agreementContent;
                this.editorNameList.push('editorName__' + index);
               
                this.$nextTick(() => {
                    // Object => Array
                    Array.prototype.slice.call(this.$refs.broadcast);
                    this.$refs.broadcast[index].defaultValue(item.agreementContent)

                    Array.prototype.slice.call(document.querySelectorAll('.w-e-text-container')).map(item => {
                        item.style.height = '500px';
                    })
                })
            })
        },
        wEditorChange(html){
            this.content = html;
        },
        // 切换tab
        tabChange (index) {
            this.currentTab = index;
            this.content = this.poList[index].agreementContent;
        },
        // 保存修改
        save () {
            if (!this.poList) {
                return;
            }
            if (this.poList.length === 0) {
                return;
            }
            let obj = {
                url: 'updateAgreementTemplate',
                id: this.poList[this.currentTab].id,
                agreementContent: this.content
            }
            this.commitLoading = true;
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.$message.success(response.respMsg);
                } else {
                    this.$message.error(response.respMsg);
                }
                this.commitLoading = false;
            })
        }
    }
}
</script>
</template>