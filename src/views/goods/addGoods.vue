<!-- 编辑商品 -->
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
      <el-form-item label="店铺Id" prop="shopId" label-width="80px" v-if="$route.params.shopId && $route.params.shopId!==':shopId'">
        <el-input :disabled="true" v-model="Form.shopId"></el-input>
      </el-form-item>
      <el-form-item :rules="[
      { required: true, message: '商品名称不能为空'},
      { min: 5, message: '商品名称不能小于5位'},
    ]" label="商品名称" prop="productName" label-width="80px">
        <el-input v-model="Form.productName"></el-input>
      </el-form-item>
      <el-form-item :rules="[
      { required: true, message: '商品简介不能为空'},
      { min: 5, message: '商品简介不能小于5位'},
    ]" label="商品简介" prop="summary" label-width="80px">
        <el-input v-model="Form.summary"></el-input>
      </el-form-item>
      <el-form-item :rules="[
      { required: true, message: '商品库存不能为空'}
    ]" label="商品库存" prop="stocks" label-width="80px">
        <el-input v-model.mumber="Form.stocks"></el-input>
      </el-form-item>
      <el-form-item :rules="[
      { required: true, message: '商品价格不能为空'}
    ]" label="商品价格" prop="price" label-width="80px">
        <el-input v-model.mumber="Form.price"></el-input>
      </el-form-item>
      <el-form-item label="商品状态" prop="status" label-width="80px">
        <el-select v-model="Form.status" placeholder="请选择">
          <el-option v-for="item in Form.GoodsStatus" :key="item.value" :label="item.label" :value="item.value">
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品目录" prop="content" label-width="80px">
        <div class="selectedCategory el-select" @click="()=>categoryData.dialogTreeVisible=true">
          <div class="el-input el-input--suffix">
            <input autocomplete="off" v-model="categoryData.defaultCategory.label" placeholder="请选择" size="" readonly="readonly" type="text"
              rows="2" class="el-input__inner">
            <span class="el-input__suffix">
              <span class="el-input__suffix-inner">
                <i class="el-select__caret el-input__icon el-icon-arrow-up"></i>
              </span>
            </span>
          </div>
          <div class="resize-triggers">
            <div class="expand-trigger">
              <div style="width: 201px; height: 42px;"></div>
            </div>
            <div class="contract-trigger"></div>
          </div>
        </div>
        <el-dialog style="text-align:left;" title="商品根目录" :visible.sync="categoryData.dialogTreeVisible">
          <el-tree ref="categoryTree" node-key="id" :default-expanded-keys="[1,2,3]" highlight-current :default-checked-keys="categoryData.defaultCategory.Id"
            :data="categoryData.categoryTree" accordion @node-click="handleNodeClick">
          </el-tree>
          <el-button style="width:100%;margin-top:30px;" type="primary" @click="()=>categoryData.dialogTreeVisible=false">确定</el-button>
        </el-dialog>
      </el-form-item>
      <el-form-item label="商品内容" prop="content" label-width="80px">
        <vue-html5-editor style="margin: 30px 0;" :content="Form.content" :auto-height="true" @change="content=>Form.newContent = content"
        />
      </el-form-item>
      <el-form-item label="轮播图" prop="avatar" label-width="80px">
        <el-upload action="http://awei.fun:3333/Unit/uploadfile" list-type="picture-card" ref="uploadImages" :multiple="true" :limit="5"
          :file-list="uploadFile.uploadImageList" :autoUpload="false" :on-remove="handleUploadRemove" :onPreview="handlePictureCardPreview"
          :onSuccess="handleUploadSuccess" :onExceed="()=>{$message.error('商品轮播图不能超过五张')}">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button style="width:100%;" v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="addGoods">添加</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="uploadFile.dialogVisible" size="tiny">
      <img width="100%" :src="uploadFile.dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import VDistpicker from 'v-distpicker'

  export default {
    data() {
      return {
        fullscreenLoading: false,
        uploadFile: {
          dialogImageUrl: '',
          dialogVisible: false,
          uploadImageList: [],
        },
        categoryData: { //商品分类
          categoryTree: [{
            label: '一级 1',
            children: [{
              label: '二级 1-1',
              children: [{
                label: '三级 1-1-1'
              }]
            }]
          }],
          defaultCategory: {
            Id: [],
            label: ''
          },
          dialogTreeVisible: false
        },
        Form: {
          shopId: '',
          productName: '',
          content: '',
          newContent: '',
          summary: '',
          stocks: '',
          price: '',
          imageUrl: [],
          status: '',
          GoodsStatus: [{
            value: '1',
            label: '上架中'
          }, {
            value: '9',
            label: '已下架'
          }],
        }
      };
    },

    watch: {},

    components: {
      VDistpicker
    },

    computed: {},

    methods: {
      handleNodeClick(data) {
        this.$refs.categoryTree.setCheckedKeys([data.id]);
        this.categoryData.defaultCategory.label = `${data.label}  [${data.id}]`;
        this.categoryData.defaultCategory.Id = [data.id];
      },
      handleUploadSuccess(response, file, fileList) { //上传图片成功后的回调
        this.uploadFile.uploadImageList = fileList;
      },
      handleUploadRemove(file, fileList) { //删除图片callback
        this.uploadFile.uploadImageList = fileList;
      },
      handlePictureCardPreview(file) { //预览图片
        this.uploadFile.dialogImageUrl = file.url;
        this.uploadFile.dialogVisible = true;
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
      async addGoods() {
        if (!this.Form.status) return this.$message.error('请选择商品状态');
        if (!this.Form.imageUrl) return this.$message.error('请至少上传一张商品轮播图');
        if (!this.Form.productName) return this.$message.error('请填写商品名称');
        if (!this.Form.summary) return this.$message.error('请填写商品详情');
        if (!this.Form.stocks) return this.$message.error('请填写商品库存');
        if (!this.Form.price) return this.$message.error('请填写商品价格');
        this.fullscreenLoading = true;
        const FromData = {
          status: this.Form.status,
          productName: this.Form.productName,
          categoryId: this.categoryData.defaultCategory.Id[0],
          shopId: this.Form.shopId,
          image_url: this.uploadFile.uploadImageList,
          content: this.Form.newContent,
          summary: this.Form.summary,
          stocks: this.Form.stocks,
          price: this.Form.price
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
        }
        this.$store.dispatch('CreatedGoods', FromData).then(res => {
          this.fullscreenLoading = false;
          this.$message.success('添加成功');
          this.$store.dispatch('GoodsList', {
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
        if(!this.$route.params.shopId){
          Message({
            message: '店铺id不能为空',
            type: 'error',
            duration: 2000
          })
          return this.$router.go(-1)
        }
        this.Form.shopId = this.$route.params.shopId;
        let categoryData = await this.$store.dispatch('GetAllCategory');
        let List = [];
        categoryData.Data.map((item, index, array) => {
          if (item.Id == this.categoryData.defaultCategory.Id) {
            this.categoryData.defaultCategory.label = `${item.name}  [${item.Id}]`;
          }
          if (item.parentId == 0) {
            List.push({
              label: item.name,
              id: item.Id,
              parentId: item.parentId,
              desc: item.desc,
              children: []
            })
          }
        });
        List.map((item, index, array) => {
          categoryData.Data.map((children1, index, array) => {
            if (children1.parentId == item.id) {
              item.children.push({
                label: children1.name,
                id: children1.Id,
                parentId: children1.parentId,
                desc: children1.desc,
                children: []
              })
            }
          });
          item.children.map(children2 => {
            categoryData.Data.map((children3, index, array) => {
              if (children3.parentId == children2.id) {
                children2.children.push({
                  label: children3.name,
                  parentId: children3.parentId,
                  id: children3.Id,
                  desc: children3.desc,
                  children: []
                })
              }
            })
          })
        });
        this.categoryData.categoryTree = List;
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
