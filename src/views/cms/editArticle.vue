<!-- editArticle -->
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
      <el-form-item label="文章Id" prop="id" label-width="150px">
        <el-input v-model="Form.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item :rules="[
      { required: true, message: '标题不能为空'}
    ]" label="标题" prop="article_title" label-width="150px">
        <el-input v-model="Form.article_title"></el-input>
      </el-form-item>
      <el-form-item :rules="[
      { required: true, message: '简介不能为空'}
    ]" label="简介" prop="summary" label-width="150px">
        <el-input v-model.mumber="Form.summary"></el-input>
      </el-form-item>
      <el-form-item :rules="[{required: true, message: '资讯类型不能为空'}]" label="资讯类型" prop="type" label-width="150px">
        <el-input v-model="Form.type"></el-input>
      </el-form-item>
      <el-form-item label="资讯链接" prop="article_url" label-width="150px">
        <el-input v-model.mumber="Form.article_url"></el-input>
      </el-form-item>
      <el-form-item label="开始结束时间" label-width="150px">
        <el-date-picker v-model="dateTimePicker.selectDate" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
          align="right">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="状态" prop="status" label-width="150px">
        <el-select v-model="Form.status" placeholder="请选择">
          <el-option v-for="item in Form.ArticleStatus" :key="item.value" :label="item.label" :value="item.value">
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容" prop="content" label-width="150px">
        <vue-html5-editor style="margin: 30px 0;" :content="Form.content" :auto-height="true" @change="content=>Form.newContent = content"
        />
      </el-form-item>
      <el-form-item label="文章图片" prop="avatar" label-width="150px">
        <el-upload action="http://awei.fun:3333/Unit/uploadfile" list-type="picture-card" ref="uploadImages" :multiple="true" :limit="5"
          :file-list="uploadFile.uploadImageList" :autoUpload="false" :on-remove="handleUploadRemove" :onPreview="handlePictureCardPreview"
          :onSuccess="handleUploadSuccess" :onExceed="()=>{$message.error('商品轮播图不能超过五张')}">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="媒体信息" prop="media_video" label-width="150px">
        <el-upload :before-upload="beforeMediaUpload" ref="uploadMedia" action="http://awei.fun:3333/Unit/uploadfile" :on-remove="handleMediaRemove" :onSuccess="handleMidiaUploadSuccess"
          :limit="1" :multiple="false" :onExceed="()=>{$message.error('媒体视频不能超过一个')}" :file-list="uploadFile.uploadMedia" :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="()=>$refs.uploadMedia.submit()">上传</el-button>
        </el-upload>
        <div class="dplayer" style="width: 500px" v-if="uploadFile.uploadMedia && uploadFile.uploadMedia[0]">
          <d-player :autoplay="false" theme="#FADFA3" :loop="false" lang="zh" :contextmenu="['12实打实打算','啊大大撒旦撒']"
            :screenshot="true" :video="uploadFile.uploadMedia[0]" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button style="width:100%;" v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="editArticle">修改</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="uploadFile.dialogVisible" size="tiny">
      <img width="100%" :src="uploadFile.dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import VDistpicker from 'v-distpicker'
  import VueDPlayer from 'vue-dplayer'
  import { getToken } from '@/utils/auth' // 验权
  
  export default {
    data() {
      return {
        fullscreenLoading: false,
        dateTimePicker: {
          selectDate: []
        },
        uploadFile: {
          dialogVisible: false,
          uploadImageList: [],
          uploadMedia: [],
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
      handleUploadSuccess(response, file, fileList) { //上传图片成功后的回调
        this.uploadFile.uploadImageList = fileList;
      },
      handleMidiaUploadSuccess(response, file, fileList) { //上传媒体成功后的回调
        this.uploadFile.uploadMedia = fileList
      },
      handleUploadRemove(file, fileList) { //删除图片callback
        this.uploadFile.uploadImageList = fileList;
      },
      handleMediaRemove(response, file, fileList) {
        this.uploadFile.uploadMedia = fileList;
      },
      handlePictureCardPreview(file) { //预览图片
        this.uploadFile.dialogImageUrl = file.url;
        this.uploadFile.dialogVisible = true;
      },
      beforeMediaUpload(file){
        // const ifVideo = file.type == 'video/*';
        const fileSize = file.size / 1024 / 1024 < 200;
        // if(!ifVideo){
        //   this.$message.error('上传的视频格式只能是 视频 格式!');
        // }
        if(!fileSize){
          this.$message.error('上传视频不能大于200MB！');
        }
        // ifVideo &&
        return fileSize;
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
      async editArticle() {
        if (!this.Form.status) return this.$message.error('请选择状态');
        if (!this.Form.article_title) return this.$message.error('请填写标题');
        if (!this.Form.summary) return this.$message.error('请填写商品详情');
        if (!this.Form.type) return this.$message.error('请填写资讯类型');
        if (!this.dateTimePicker.selectDate) return this.$message.error('请填写开始结束时间');
        this.fullscreenLoading = true;
        const FromData = {
          Id: this.Form.id,
          AdminToken: getToken(),
          article_title: this.Form.article_title,
          article_url: this.Form.article_url,
          type: this.Form.type,
          media_video: this.uploadFile.uploadMedia,
          summary: this.Form.summary,
          content: this.Form.content,
          start_date: this.dateTimePicker.selectDate[0],
          end_date: this.dateTimePicker.selectDate[1],
          status: this.Form.status,
        };
        let readyImgList = window.document.getElementsByClassName('el-upload-list__item is-ready'); //准备上传的图片
        let successImgList = window.document.getElementsByClassName('el-upload-list__item is-success'); //已经上传完后的图片
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
        try{
          FromData.media_video = [{
            url: this.uploadFile.uploadMedia[0].response.Data[0].filename,
            name: this.uploadFile.uploadMedia[0].response.Data[0].originalname
          }];
        }catch(err){
          FromData.media_video = null;
        }
        this.$store.dispatch('EditArticle', FromData).then(res => {
          this.fullscreenLoading = false;
          this.$message.success('修改成功');
          this.$store.dispatch('GetArticleList', {
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
        if (!this.$route.params.id) return this.$message.error('资讯文章Id有误');
        this.fullscreenLoading = true;
        this.$store.dispatch('GetArticle', {
          Id: this.$route.params.id
        }).then(res => {
          this.Form.id = res.Data.id;
          this.Form.article_title = res.Data.article_title;
          this.Form.type = res.Data.type;
          this.Form.summary = res.Data.summary;
          this.Form.article_url = res.Data.article_url;
          this.dateTimePicker.selectDate = [new Date(res.Data.start_date), new Date(res.Data.end_date)];
          this.Form.status = res.Data.status;
          this.Form.content = res.Data.content;
          this.uploadFile.uploadImageList = res.Data.image_url;
          this.uploadFile.uploadMedia = res.Data.media_video || [];
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
