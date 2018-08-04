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
      <el-form-item label="店铺Id" prop="id" label-width="120px">
        <el-input v-model="Form.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: '简介不能为空'}
      ]" label="店铺简介" prop="shop_summary" label-width="120px">
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
      <el-form-item label="商品列表" label-width="120px">
        <el-table highlight-current-row header-align="center" align="center" :data="Form.goods_list" border style="width: 100%">
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
        <el-button style="width:100%;" type="default" @click="$router.push({name:'addGoods',params:{shopId:$route.params.id}})">添加商品</el-button>
      </el-form-item>
      <el-form-item>
        <el-button style="width:100%;" v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="editGoodsKill">修改</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="dialog.dialogVisible" size="tiny">
      <img width="100%" :src="dialog.dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import VDistpicker from 'v-distpicker'
  import VueDPlayer from 'vue-dplayer'
  import img_404 from '@/assets/404_images/image404.png'
  import { getToken } from '@/utils/auth' // 验权
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
        Form: {
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
      handlePictureCardPreview(file) { //预览图片
        this.dialog.dialogImageUrl = file.url;
        this.dialog.dialogVisible = true;
      },
      successUploadFile(readyImgList, successImgList) {
        return new Promise((resolve, reject) => {
          this.$refs.uploadLogo.submit(); //提交上传全部图片
          this.$refs.uploadBanner.submit(); //提交上传全部图片
          let times = setInterval(() => {
            if (readyImgList.length === ((this.uploadFile.uploadLogo.length + this.uploadFile.uploadBanner.length) -
                successImgList.length)) {
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
          Id: this.Form.id,
          shop_name: this.Form.shop_name,
          AdminToken: getToken(),
          cms_content: this.Form.cms_content,
          category_info: this.Form.category_info,
          goods_list: this.Form.goods_list,
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
            debugger;
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
          FromData.content = this.Form.newContent
        };
        this.$store.dispatch('EditShop', FromData).then(res => {
          this.fullscreenLoading = false;
          this.$message.success('修改成功');
          this.$store.dispatch('GetShopList', {
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
        this.$store.dispatch('GetShopInfo', {
          Id: this.$route.params.id
        }).then(res => {
          this.Form.id = res.Data.id;
          this.Form.shop_name = res.Data.shop_name;
          this.Form.cms_content = res.Data.cms_content;
          this.Form.category_info = res.Data.category_info;
          this.Form.goods_list = res.Data.goods_list;
          this.Form.shop_summary = res.Data.shop_summary;
          this.uploadFile.uploadLogo = res.Data.shop_logo;
          this.uploadFile.uploadBanner = res.Data.cms_banner;
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
