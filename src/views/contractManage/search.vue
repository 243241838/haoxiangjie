<template>
  <div>
    <div class="www-page" v-loading="loading">
        <div style="margin-bottom:20px;">
            <template v-for="(item,index) in poList">
                <el-button :class="{'www-el-success': currentTab==index}" :plain="true" type="success" @click="currentTab=index;">{{item.agreementTitle}}</el-button>
            </template>
        </div>
        <div v-if="poList">
            <div v-for="(item,index) in poList" v-show="index == currentTab">
                <weditor ref="broadcast" v-bind:loanid="item.agreementContent" v-bind:editorName="editorNameList[index]" v-on:listenWEditorChange="wEditorChange(item)"></weditor>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
 
import '@res/css/wjq/style.less';
import config from '@api/config';
import weditor from '@components/WEditor.vue';

export default {
    components: {
        weditor
    },
    data() {
        return {
            loading: true,
            query: {
                url: 'agreementTemplateList'
            },
            poList: null,
            editorNameList: [],
            currentTab: 0
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
                this.editorNameList.push('editorName__' + index);
                this.$nextTick(() => {
                    // Object => Array
                    Array.prototype.slice.call(this.$refs.broadcast);
                    this.$refs.broadcast[index].defaultValue(item.agreementContent);
                    
                    Array.prototype.slice.call(document.querySelectorAll('.w-e-text-container')).map(item => {
                        item.style.height = '500px';
                    })
                })
            })
        },
        wEditorChange(html){
        }
    }
}
</script>
