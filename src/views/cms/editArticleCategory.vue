<!-- editGoodsKill -->
<style lang="scss">
  .edit-container {
    padding: 15px;
    width: 100%;
  }

  #editor {
    min-height: 350px;
  }

  .is-checked {
    background: #f0f7ff!important;
  }

</style>
<template>
  <div class="edit-container" v-loading.fullscreen.lock="fullscreenLoading">
    <el-form :model="Form" ref="ruleForm" label-position="left" class="card-box admin-form">
      <el-form-item label="文章Id" prop="id" label-width="120px">
        <el-input v-model="Form.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: '简介不能为空'}
      ]" label="简介" prop="summary" label-width="120px">
        <el-input v-model.mumber="Form.summary"></el-input>
      </el-form-item>
      <el-form-item :rules="[{required: true, message: '资讯类型不能为空'}]" label="资讯类型" prop="type" label-width="120px">
        <el-input v-model="Form.type"></el-input>
      </el-form-item>
      <el-form-item label="开始结束时间" label-width="120px">
        <el-date-picker v-model="dateTimePicker.selectDate" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
          align="right">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="状态" prop="status" label-width="120px">
        <el-select v-model="Form.status" placeholder="请选择">
          <el-option v-for="item in Form.ArticleStatus" :key="item.value" :label="item.label" :value="item.value">
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容" prop="content" label-width="120px">
        <vue-html5-editor style="margin: 30px 0;" :content="Form.content" :auto-height="true" @change="content=>Form.newContent = content"
        />
      </el-form-item>
      <el-form-item id="uploadImges" label="封面" prop="avatar" label-width="120px">
        <el-upload action="http://awei.fun:3333/Unit/uploadfile" list-type="picture-card" ref="uploadImages" :multiple="true" :limit="5"
          :file-list="uploadFile.uploadImageList" :autoUpload="false" :on-remove="handleUploadRemove" :onPreview="handlePictureCardPreview"
          :onSuccess="handleUploadSuccess" :onExceed="()=>{$message.error('图片不能超过五张')}">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品列表" label-width="120px">
        <el-table highlight-current-row header-align="center" align="center" :data="Form.product_list" border style="width: 100%">
          <el-table-column prop="image_url" label="商品图片" width="100">
            <template slot-scope="scope">
              <img style="width:80px;height:80px;cursor:pointer;" :src="scope.row.image_url[0].url" @click="()=>{
                dialog.dialogVisible = true;
                dialog.dialogImageUrl = scope.row.image_url[0].url
          }" />
            </template>
          </el-table-column>
          <el-table-column prop="productName" label="商品名称">
          </el-table-column>
          <el-table-column prop="productNo" label="商品编号">
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable>
          </el-table-column>
          <el-table-column prop="categoryId" label="所属分类" sortable>
          </el-table-column>
          <el-table-column prop="price" label="商品单价" sortable>
          </el-table-column>
          <el-table-column prop="stocks" label="商品库存" sortable>
          </el-table-column>
        </el-table>
        <el-button style="width:100%;" type="default" @click="()=>dialog.addGoodsVisible=true">添加商品</el-button>
      </el-form-item>
      <el-form-item>
        <el-button style="width:100%;" v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="editGoodsKill">修改</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="dialog.dialogVisible" size="tiny">
      <img width="100%" :src="dialog.dialogImageUrl" alt="">
    </el-dialog>
    <el-dialog title="添加商品" :visible.sync="dialog.addGoodsVisible">
      <div class="search-container" @keyup.enter="searchGoods">
        <el-input style="width:85%;" v-model="Form.keyWords" placeholder="输入要搜索的产品关键字、编号、店家编号等"></el-input>
        <el-button type="default" @click="searchGoods">搜索</el-button>
      </div>
      <div class="goods-container" style="padding: 15px 0;">
        <el-table @select="selectGoodsData" empty-text="暂无数据" highlight-current-row header-align="center" align="center" :data="Form.search.searchResult" border
          style="width: 100%">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="image_url" label="商品图片" width="100">
            <template slot-scope="scope">
              <img style="width:80px;height:80px;cursor:pointer;" :src="scope.row.image_url[0].url" @click="()=>{
                        dialog.dialogVisible = true;
                        dialog.dialogImageUrl = scope.row.image_url[0].url
                }" />
            </template>
          </el-table-column>
          <el-table-column prop="productName" label="商品名称">
          </el-table-column>
          <el-table-column prop="productNo" label="商品编号">
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable>
          </el-table-column>
          <el-table-column prop="categoryId" label="所属分类" sortable>
          </el-table-column>
          <el-table-column prop="price" label="商品单价" sortable>
          </el-table-column>
          <el-table-column prop="stocks" label="商品库存" sortable>
          </el-table-column>
        </el-table>
      </div>
    <el-button style="width:100%" type="primary" @click="addGoods">添加</el-button>
    </el-dialog>
  </div>
</template>

<script>
  import VDistpicker from 'v-distpicker'
  import VueDPlayer from 'vue-dplayer'
  import {
    parseTime
  } from '@/utils'
  import { getToken } from '@/utils/auth' // 验权
  
  export default {
    data() {
      return {
        fullscreenLoading: false,
        dialog: {
          dialogVisible: false,
          addGoodsVisible: false,
          dialogImageUrl: ''
        },
        dateTimePicker: {
          selectDate: []
        },
        uploadFile: {
          uploadImageList: [],
        },
        Form: {
          search: {
            searchParam: {
              pageIndex: 1,
              pageSize: 100
            },
            searchResult: [],
          },
          ArticleStatus: [{
            value: '1',
            label: '开启'
          }, {
            value: '9',
            label: '关闭'
          }],
        }
      };
    },

    watch: {},

    components: {
      VDistpicker,
      'd-player': VueDPlayer
    },

    computed: {},

    methods: {
      handleUploadSuccess(response, file, fileList) { //上传图片成功后的回调
        this.uploadFile.uploadImageList = fileList;
      },
      handleUploadRemove(file, fileList) { //删除图片callback
        this.uploadFile.uploadImageList = fileList;
      },
      handlePictureCardPreview(file) { //预览图片
        this.dialog.dialogImageUrl = file.url;
        this.dialog.dialogVisible = true;
      },
      successUploadFile(readyImgList, successImgList) {
        return new Promise((resolve, reject) => {
          this.$refs.uploadImages.submit(); //提交上传全部图片
          let times = setInterval(() => {
            if (readyImgList.length === (this.uploadFile.uploadImageList.length - successImgList.length)) {
              clearInterval(times);
              return resolve();
            }
          }, 1000)
        })
      },
      addGoods() {
        if(!this.Form.search.selectGoodsData||this.Form.search.selectGoodsData=='')return this.$message.error('请选择要添加的商品');
        this.Form.search.selectGoodsData.map(i=>this.Form.product_list.push(i))
        this.dialog.addGoodsVisible = false;
      },
      selectGoodsData(selection, row){
          this.Form.search.selectGoodsData = selection;
      },
      searchGoods() {
        if (!this.Form.keyWords) return;
        let formData = this.Form.search.searchParam;
        formData.Keywords = this.Form.keyWords;
        this.fullscreenLoading = true;
        this.$store.dispatch('GetSearchGoodsData', formData).then(response => {
          this.Form.search.searchResult = response.Data;
          this.Form.search.searchCount = response.total;
          this.fullscreenLoading = false;
        })
      },
      async editGoodsKill() {
        if (!this.Form.status) return this.$message.error('请选择状态');
        if (!this.Form.summary) return this.$message.error('请填写商品详情');
        if (!this.Form.type) return this.$message.error('请填写资讯类型');
        if (!this.dateTimePicker.selectDate) return this.$message.error('请填写开始结束时间');
        this.fullscreenLoading = true;
        const FromData = {
          Id: this.Form.id,
          type: this.Form.type,
          summary: this.Form.summary,
          AdminToken: getToken(),
          content: this.Form.content,
          product_list: this.Form.product_list,
          start_date: this.dateTimePicker.selectDate[0],
          end_date: this.dateTimePicker.selectDate[1],
          status: this.Form.status,
        };
        let readyImgList = window.document.getElementById("uploadImges").getElementsByClassName(
          "el-upload-list__item is-ready"); //准备上传的图片
        let successImgList = document.getElementById("uploadImges").getElementsByClassName(
          'el-upload-list__item is-success'); //已经上传完后的图片
        if (readyImgList.length > 0) { //判断用户有没有上传新的图片  有的话就上传，没有就用默认的图片
          await this.successUploadFile(readyImgList, successImgList);
          FromData.image_url = [];
          this.uploadFile.uploadImageList.map((item, index, array) => {
            FromData.image_url.push({
              name: item.name,
              url: item.url.indexOf('blob') > -1 ? item.response.Data[0].filename : item.url
            })
          })
        } else {
          FromData.image_url = this.uploadFile.uploadImageList;
        }
        if (this.Form.newContent) {
          FromData.content = this.Form.newContent
        };
        this.$store.dispatch('EditGoodsCategory', FromData).then(res => {
          this.fullscreenLoading = false;
          this.$message.success('修改成功');
          this.$store.dispatch('GetGoodsCategoryList', {
            pageIndex: 1,
            pageSize: 100
          });
          setTimeout(() => {
            this.$router.go(-1);
          }, 1000)
        }, err => {
          this.fullscreenLoading = false
        })
      },
      async initData() {
        if (!this.$route.params.id) return this.$message.error('Id有误');
        this.fullscreenLoading = true;
        this.$store.dispatch('GetGoodsCategory', {
          Id: this.$route.params.id
        }).then(res => {　
          res.Data.product_list.map(i => i.createTime = parseTime(i.createTime, '{y}-{m}-{d}'))
          this.Form.id = res.Data.id;
          this.Form.type = res.Data.type;
          this.Form.summary = res.Data.summary;
          this.dateTimePicker.selectDate = [new Date(res.Data.start_date), new Date(res.Data.end_date)];
          this.Form.status = res.Data.status;
          this.Form.product_list = res.Data.product_list;
          this.Form.content = res.Data.content;
          this.Form.product_list = res.Data.product_list;
          this.uploadFile.uploadImageList = res.Data.image_url;
          this.fullscreenLoading = false;
        }, err => {});
      }
    },
    beforeDestroy() {},
    mounted: function () {
      this.initData();
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>


</style>
