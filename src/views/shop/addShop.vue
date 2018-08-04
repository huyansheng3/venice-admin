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
    background: #f0f7ff !important;
  }

</style>
<template>
  <div class="edit-container" v-loading.fullscreen.lock="fullscreenLoading">
    <el-form :model="Form" ref="ruleForm" label-position="left" class="card-box admin-form">
      <el-form-item :rules="[{ required: true, message: '名称不能为空'}]" label="店铺名称" prop="shop_name" label-width="120px">
        <el-input v-model.trim="Form.shop_name"></el-input>
      </el-form-item>
      <el-form-item :rules="[{ required: true, message: '简介不能为空'}]" label="店铺简介" prop="shop_summary" label-width="120px">
        <el-input v-model.mumber="Form.shop_summary"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="cms_content" label-width="120px">
        <vue-html5-editor style="margin: 30px 0;" :content="Form.cms_content" :auto-height="true" @change="content=>Form.newContent = content"
        />
      </el-form-item>
      <el-form-item id="uploadLogo" label="店铺Logo" label-width="120px">
        <el-upload action="http://awei.fun:3333/Unit/uploadfile" list-type="picture-card" ref="uploadLogo" :multiple="false" :limit="1"
          :file-list="uploadFile.uploadLogo" :autoUpload="false" :on-remove="(file, fileList)=>{
            this.uploadFile.uploadLogo = fileList
          }" :onPreview="handlePictureCardPreview" :onSuccess="(response, file, fileList)=>{
            this.uploadFile.uploadLogo = fileList;
          }" :onExceed="()=>{$message.error('图片不能超过一张')}">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item id="uploadBanner" label="店铺轮播图" label-width="120px">
        <el-upload action="http://awei.fun:3333/Unit/uploadfile" list-type="picture-card" ref="uploadBanner" :multiple="true" :limit="5"
          :file-list="uploadFile.uploadBanner" :autoUpload="false" :on-remove="(file, fileList)=>{
            this.uploadFile.uploadBanner = fileList
          }" :onPreview="handlePictureCardPreview" :onSuccess="(response, file, fileList)=>{
            this.uploadFile.uploadBanner = fileList;
          }" :onExceed="()=>{$message.error('图片不能超过五张')}">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button style="width:100%;" v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="editGoodsKill">添加</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="dialog.dialogVisible" size="tiny">
      <img width="100%" :src="dialog.dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import img_404 from '@/assets/404_images/image404.png'
  import {
    parseTime
  } from '@/utils'
  export default {
    data() {
      return {
        img_404,
        fullscreenLoading: false,
        dialog: {
          dialogVisible: false,
          dialogImageUrl: ''
        },
        dateTimePicker: {
          selectDate: []
        },
        uploadFile: {
          uploadImageList: [],
        },
        Form: {}
      };
    },

    watch: {},

    components: {},

    computed: {},

    methods: {
      handlePictureCardPreview(file) { //预览图片
        this.dialog.dialogImageUrl = file.url;
        this.dialog.dialogVisible = true;
      },
      successUploadFile(readyImgList, successImgList) {
        return new Promise((resolve, reject) => {
          this.$refs.uploadLogo.submit(); //提交上传全部图片
          this.$refs.uploadBanner.submit(); //提交上传全部图片
          let times = setInterval(() => {
            if (readyImgList.length === ((this.uploadFile.uploadLogo.length + this.uploadFile.uploadBanner.length) - successImgList.length)) {
              clearInterval(times);
              return resolve();
            }
          }, 1000)
        })
      },
      async editGoodsKill() {
        if (!this.Form.shop_name) return this.$message.error('请填写店铺名字');
        if (!this.Form.shop_summary) return this.$message.error('请填写简介');
        this.fullscreenLoading = true;
        const FromData = {
          shop_name: this.Form.shop_name,
          cms_content: this.Form.cms_content,
          shop_summary: this.Form.shop_summary
        };
        let readyImgList = window.document.getElementsByClassName(
          "el-upload-list__item is-ready"); //准备上传的图片
        let successImgList = document.getElementsByClassName(
          'el-upload-list__item is-success'); //已经上传完后的图片
        if (readyImgList.length > 0) { //判断用户有没有上传新的图片  有的话就上传，没有就用默认的图片
          await this.successUploadFile(readyImgList, successImgList);
          FromData.cms_banner = [];
          FromData.shop_logo = [];
          this.uploadFile.uploadLogo.map((item, index, array) => {
            FromData.shop_logo.push({
              name: item.name,
              url: item.url.indexOf('blob') > -1 ? item.response.Data[0].filename : item.url
            })
          })
          this.uploadFile.uploadBanner.map((item, index, array) => {
            FromData.cms_banner.push({
              name: item.name,
              url: item.url.indexOf('blob') > -1 ? item.response.Data[0].filename : item.url
            })
          })
        } else {
          FromData.shop_logo = this.uploadFile.uploadLogo;
          FromData.cms_banner = this.uploadFile.uploadBanner;
        }
        if (this.Form.newContent) {
          FromData.cms_content = this.Form.newContent
        };
        this.$store.dispatch('CreatedShop', FromData).then(res => {
          this.fullscreenLoading = false;
          this.$message.success('添加成功');
          setTimeout(() => {
            // this.$router.go(-1);
          }, 1000)
        }, err => {
          this.fullscreenLoading = false
        })
      },
      async initData() {

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
