webpackJsonp([3],{Am0a:function(e,t,a){(e.exports=a("FZ+f")(!1)).push([e.i,"",""])},"EF+f":function(e,t,a){var l=a("ghw1");"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);a("rjj0")("88c6a516",l,!0)},IydO:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("Xxa5"),r=a.n(l),i=a("exGp"),o=a.n(i),n=a("//Fk"),s=a.n(n),u=a("95YI"),d=a.n(u),c=a("u+Ax"),p=a.n(c),m={data:function(){return{fullscreenLoading:!1,dateTimePicker:{selectDate:[]},uploadFile:{dialogVisible:!1,uploadImageList:[],uploadMedia:[]},Form:{ArticleStatus:[{value:"1",label:"开启"},{value:"9",label:"关闭"}]}}},watch:{},components:{VDistpicker:d.a,"d-player":p.a},computed:{},methods:{handleUploadSuccess:function(e,t,a){this.uploadFile.uploadImageList=a},handleMidiaUploadSuccess:function(e,t,a){this.uploadFile.uploadMedia=a},handleUploadRemove:function(e,t){this.uploadFile.uploadImageList=t},handleMediaRemove:function(e,t,a){this.uploadFile.uploadMedia=a},handlePictureCardPreview:function(e){this.uploadFile.dialogImageUrl=e.url,this.uploadFile.dialogVisible=!0},beforeMediaUpload:function(e){var t=e.size/1024/1024<200;return t||this.$message.error("上传视频不能大于200MB！"),t},successUploadFile:function(e,t){var a=this;return new s.a(function(l,r){a.$refs.uploadImages.submit();var i=setInterval(function(){if(console.log("nmb"),e.length===a.uploadFile.uploadImageList.length-t.length)return clearInterval(i),l()},1e3)})},addArticle:function(){var e=this;return o()(r.a.mark(function t(){var a,l,i;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.Form.status){t.next=2;break}return t.abrupt("return",e.$message.error("请选择状态"));case 2:if(e.Form.article_title){t.next=4;break}return t.abrupt("return",e.$message.error("请填写标题"));case 4:if(e.Form.summary){t.next=6;break}return t.abrupt("return",e.$message.error("请填写商品详情"));case 6:if(e.Form.type){t.next=8;break}return t.abrupt("return",e.$message.error("请填写资讯类型"));case 8:if(e.dateTimePicker.selectDate){t.next=10;break}return t.abrupt("return",e.$message.error("请填写开始结束时间"));case 10:if(e.fullscreenLoading=!0,a={article_title:e.Form.article_title,article_url:e.Form.article_url,type:e.Form.type,media_video:e.uploadFile.uploadMedia,summary:e.Form.summary,content:e.Form.content,start_date:e.dateTimePicker.selectDate[0],end_date:e.dateTimePicker.selectDate[1],status:e.Form.status},l=window.document.getElementById("uploadImges").getElementsByClassName("el-upload-list__item is-ready"),i=document.getElementById("uploadImges").getElementsByClassName("el-upload-list__item is-success"),!(l.length>0)){t.next=21;break}return t.next=17,e.successUploadFile(l,i);case 17:a.image_url=[],e.uploadFile.uploadImageList.map(function(e,t,l){a.image_url.push({name:e.name,url:e.url.indexOf("blob")>-1?e.response.Data[0].filename:e.url})}),t.next=22;break;case 21:a.image_url=e.uploadFile.uploadImageList;case 22:e.Form.newContent&&(a.content=e.Form.newContent);try{a.media_video=[{url:e.uploadFile.uploadMedia[0].response.Data[0].filename,name:e.uploadFile.uploadMedia[0].response.Data[0].originalname}]}catch(e){a.media_video=null}e.$store.dispatch("CreatedArticle",a).then(function(t){e.fullscreenLoading=!1,e.$message.success("修改成功"),e.$store.dispatch("GetArticleList",{pageIndex:1,pageSize:100}),setTimeout(function(){e.$router.go(-1)},1e3)},function(t){e.fullscreenLoading=!1});case 26:case"end":return t.stop()}},t,e)}))()}},beforeDestroy:function(){},mounted:function(){}},f={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:e.fullscreenLoading,expression:"fullscreenLoading",modifiers:{fullscreen:!0,lock:!0}}],staticClass:"edit-container"},[a("el-form",{ref:"ruleForm",staticClass:"card-box admin-form",attrs:{model:e.Form,"label-position":"left"}},[a("el-form-item",{attrs:{rules:[{required:!0,message:"标题不能为空"}],label:"标题",prop:"article_title","label-width":"150px"}},[a("el-input",{model:{value:e.Form.article_title,callback:function(t){e.$set(e.Form,"article_title",t)},expression:"Form.article_title"}})],1),e._v(" "),a("el-form-item",{attrs:{rules:[{required:!0,message:"简介不能为空"}],label:"简介",prop:"summary","label-width":"150px"}},[a("el-input",{model:{value:e.Form.summary,callback:function(t){e.$set(e.Form,"summary",t)},expression:"Form.summary"}})],1),e._v(" "),a("el-form-item",{attrs:{rules:[{required:!0,message:"资讯类型不能为空"}],label:"资讯类型",prop:"type","label-width":"150px"}},[a("el-input",{model:{value:e.Form.type,callback:function(t){e.$set(e.Form,"type",t)},expression:"Form.type"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"资讯链接",prop:"article_url","label-width":"150px"}},[a("el-input",{model:{value:e.Form.article_url,callback:function(t){e.$set(e.Form,"article_url",t)},expression:"Form.article_url"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"开始结束时间","label-width":"150px"}},[a("el-date-picker",{attrs:{type:"datetimerange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",align:"right"},model:{value:e.dateTimePicker.selectDate,callback:function(t){e.$set(e.dateTimePicker,"selectDate",t)},expression:"dateTimePicker.selectDate"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"状态",prop:"status","label-width":"150px"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.Form.status,callback:function(t){e.$set(e.Form,"status",t)},expression:"Form.status"}},e._l(e.Form.ArticleStatus,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}},[a("span",{staticStyle:{float:"left"}},[e._v(e._s(t.label))]),e._v(" "),a("span",{staticStyle:{float:"right",color:"#8492a6","font-size":"13px"}},[e._v(e._s(t.value))])])}))],1),e._v(" "),a("el-form-item",{attrs:{label:"内容",prop:"content","label-width":"150px"}},[a("vue-html5-editor",{staticStyle:{margin:"30px 0"},attrs:{content:e.Form.content,"auto-height":!0},on:{change:function(t){return e.Form.newContent=t}}})],1),e._v(" "),a("el-form-item",{attrs:{id:"uploadImges",label:"文章图片",prop:"avatar","label-width":"150px"}},[a("el-upload",{ref:"uploadImages",attrs:{action:"http://awei.fun:3333/Unit/uploadfile","list-type":"picture-card",multiple:!0,limit:5,"file-list":e.uploadFile.uploadImageList,autoUpload:!1,"on-remove":e.handleUploadRemove,onPreview:e.handlePictureCardPreview,onSuccess:e.handleUploadSuccess,onExceed:function(){e.$message.error("商品轮播图不能超过五张")}}},[a("i",{staticClass:"el-icon-plus"})])],1),e._v(" "),a("el-form-item",{attrs:{label:"媒体信息",prop:"media_video","label-width":"150px"}},[a("el-upload",{ref:"uploadMedia",attrs:{"before-upload":e.beforeMediaUpload,action:"http://awei.fun:3333/Unit/uploadfile","on-remove":e.handleMediaRemove,onSuccess:e.handleMidiaUploadSuccess,limit:1,multiple:!1,onExceed:function(){e.$message.error("媒体视频不能超过一个")},"file-list":e.uploadFile.uploadMedia,"auto-upload":!1}},[a("el-button",{attrs:{slot:"trigger",size:"small",type:"primary"},slot:"trigger"},[e._v("选取文件")]),e._v(" "),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{size:"small",type:"success"},on:{click:function(){return e.$refs.uploadMedia.submit()}}},[e._v("上传")])],1),e._v(" "),e.uploadFile.uploadMedia&&e.uploadFile.uploadMedia[0]?a("div",{staticClass:"dplayer",staticStyle:{width:"500px"}},[a("d-player",{attrs:{autoplay:!1,theme:"#FADFA3",loop:!1,lang:"zh",contextmenu:["12实打实打算","啊大大撒旦撒"],screenshot:!0,video:e.uploadFile.uploadMedia[0]}})],1):e._e()],1),e._v(" "),a("el-form-item",[a("el-button",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:e.fullscreenLoading,expression:"fullscreenLoading",modifiers:{fullscreen:!0,lock:!0}}],staticStyle:{width:"100%"},attrs:{type:"primary"},on:{click:e.addArticle}},[e._v("修改")])],1)],1),e._v(" "),a("el-dialog",{attrs:{visible:e.uploadFile.dialogVisible,size:"tiny"},on:{"update:visible":function(t){e.$set(e.uploadFile,"dialogVisible",t)}}},[a("img",{attrs:{width:"100%",src:e.uploadFile.dialogImageUrl,alt:""}})])],1)},staticRenderFns:[]};var g=a("VU/8")(m,f,!1,function(e){a("EF+f"),a("ouXb")},"data-v-f234b100",null);t.default=g.exports},ghw1:function(e,t,a){(e.exports=a("FZ+f")(!1)).push([e.i,"\n.edit-container {\n  padding: 15px;\n  width: 100%;\n}\n#editor {\n  min-height: 350px;\n}\n.is-checked {\n  background: #f0f7ff !important;\n}\n",""])},ouXb:function(e,t,a){var l=a("Am0a");"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);a("rjj0")("3572bd8d",l,!0)}});