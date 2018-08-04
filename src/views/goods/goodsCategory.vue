<!--  -->
<style lang="scss" scoped>
  .goodsCategory-container {
    padding: 15px;
  }

</style>
<template>
  <div class="goodsCategory-container" v-loading.fullscreen.lock="fullscreenLoading">
    <el-row type="flex" justify="left" align="center">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-tree ref="categoryTree" node-key="id" highlight-current :default-checked-keys="categoryData.defaultCategory.Id" :data="categoryData.categoryTree"
            accordion @node-click="handleNodeClick"
            :render-content="renderCategoryControl">
          </el-tree>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content bg-purple-light">
          <el-form :model="Form" ref="ruleForm" label-position="left" class="card-box admin-form">
            <el-form-item label="节点Id" prop="id" label-width="80px">
              <el-input :readonly="true" :disabled="true" v-model="Form.id"></el-input>
            </el-form-item>
            <el-form-item :rules="[
                { required: true, message: '名称不能为空'}
              ]" label="名称" prop="name" label-width="80px">
              <el-input v-model="Form.name"></el-input>
            </el-form-item>
            <el-form-item :rules="[
                { required: true, message: 'Id不能为空'}
              ]" label="父节点Id" prop="parentId" label-width="80px">
              <el-input v-model="Form.parentId"></el-input>
            </el-form-item>
            <el-form-item :rules="[
                { required: true, message: '描述不能为空'}
              ]" label="描述" prop="desc" label-width="80px">
              <el-input v-model="Form.desc"></el-input>
            </el-form-item>
            <el-form-item label="轮播图" prop="avatar" label-width="80px">
              <el-upload action="http://awei.fun:3333/Unit/uploadfile" list-type="picture-card" ref="uploadImages" :multiple="true" :limit="3"
                :file-list="uploadFile.uploadImageList" :autoUpload="false" :on-remove="handleUploadRemove" :onPreview="handlePictureCardPreview"
                :onSuccess="handleUploadSuccess" :onExceed="()=>{$message.error('商品轮播图不能超过三张')}">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button style="width:100%;" v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="editCategory">修改</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="uploadFile.dialogVisible" size="tiny">
      <img width="100%" :src="uploadFile.dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import { getToken } from '@/utils/auth' // 验权
  
  export default {
    data() {
      return {
        fullscreenLoading: false,
        Form: {
          id: '',
          name: '',
          parentId: '',
          desc: ''
        },
        uploadFile: {
          dialogImageUrl: '',
          dialogVisible: false,
          uploadImageList: [],
        },
        categoryData: { //商品分类
          categoryTree: [],
          defaultCategory: {
            Id: [],
            label: ''
          },
          dialogTreeVisible: false
        },
      };
    },

    watch: {},

    components: {},

    computed: {},

    methods: {
      handleNodeClick(data) {
        this.Form.id = data.id;
        this.Form.name = data.label;
        this.Form.parentId = data.parentId;
        this.Form.desc = data.desc;
        this.uploadFile.uploadImageList = data.img_url;
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
      async editCategory() {
        this.fullscreenLoading = true;
        const formData = {
          Id: this.Form.id,
          AdminToken: getToken(),
          name: this.Form.name,
          image_url: this.uploadFile.uploadImageList,
          parentId: this.Form.parentId,
          desc: this.Form.desc,
        };
        let readyImgList = window.document.getElementsByClassName('el-upload-list__item is-ready'); //准备上传的图片
        let successImgList = window.document.getElementsByClassName('el-upload-list__item is-success'); //已经上传完后的图片
        if (readyImgList.length > 0) { //判断用户有没有上传新的图片  有的话就上传，没有就用默认的图片
          await this.successUploadFile(readyImgList, successImgList);
          formData.image_url = [];
          this.uploadFile.uploadImageList.map((item, index, array) => {
            formData.image_url.push({
              name: item.name,
              url: item.url.indexOf('blob') > -1 ? item.response.Data[0].filename : item.url
            })
          })
        }
        this.$store.dispatch('EeditCategory',formData).then(response=>{
          this.fullscreenLoading = false;
          this.$message.success('修改成功');
          this.initData();
        }, err => {
            this.fullscreenLoading = false
        })
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
      renderCategoryControl(h, { node, data, store }){
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
              <span>{node.label}</span>
            </span>
            <span>
              <el-button style="font-size: 12px;" type="text" on-click={ () => this.addCategoryTree(data) }>添加</el-button>
              { data.parentId!=0 ? <el-button style="font-size: 12px;" type="text" on-click={ () => this.removeCategoryTree(data) }>删除</el-button> :'' }
            </span>
          </span>
        )
      },
      addCategoryTree(data){
        this.$confirm(`确认再${data.label} 节点下添加一个新节点吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.fullscreenLoading = true;
          this.$store.dispatch('CreatedCategory',{
            name: '新的节点',
            parentId: data.id,
            image_url: [],
            desc: '新的节点'
          }).then(response=>{
            this.fullscreenLoading = false;
            this.$message.success('添加成功');
            this.initData();
          }, err => {
            this.fullscreenLoading = false
          })
        })
      },
      removeCategoryTree(data){
        this.$confirm(`此操作将删除${data.label} 节点下的全部信息, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.fullscreenLoading = true;
          this.$store.dispatch('DeleteCategory',{
            Id: data.id,
            AdminToken: getToken()
          }).then(response=>{
            this.fullscreenLoading = false;
            this.$message.success('添加成功');
            this.initData();
          }, err => {
            this.fullscreenLoading = false
          })
        })
      },
      async initData() {
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
              img_url: item.image_url,
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
                img_url: children1.image_url,
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
                  img_url: children3.image_url,
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

    mounted: function () {
      this.initData()
    }
  }

</script>
<style lang="scss" scoped>


</style>
