webpackJsonp([14],{"+5my":function(e,s,a){(e.exports=a("FZ+f")(!1)).push([e.i,"",""])},OT1W:function(e,s,a){var r=a("+5my");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a("rjj0")("75117152",r,!0)},RnHo:function(e,s,a){var r=a("o1ZO");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a("rjj0")("00e56538",r,!0)},exOC:function(e,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var r=a("95YI"),t=a.n(r),i=a("TIfe"),o={data:function(){return{fullscreenLoading:!1,Form:{phone:"",imageUrl:"",addressParams:{province:"",city:"",area:"",address:""},rules:{password:[{required:!0,message:"请输入密码",trigger:"change"}],phone:[{required:!0,message:"请输入手机号码",trigger:"change"}],address:[{required:!0,message:"请输入地址",trigger:"change"}]},selectedAddress:"",selectedOptions:[],status:"",statusData:[{value:"1",label:"已审核"},{value:"9",label:"未审核"}],cities:[{value:"admin",label:"普通管理员"},{value:"test",label:"测试"},{value:"root",label:"超级管理员"}],selectedPermission:""}}},watch:{},components:{VDistpicker:t.a},computed:{},methods:{handleAvatarSuccess:function(e,s){this.Form.imageUrl="http://awei.fun/api/resouces/"+s.response.Data[0].filename},onDistpickerSelected:function(e){this.Form.addressParams.province=e.province.value,this.Form.addressParams.city=e.city.value,this.Form.addressParams.area=e.area.value},changeAddress:function(e){this.Form.addressParams.address=e},beforeAvatarUpload:function(e){var s="image/jpeg"===e.type,a=e.size/1024/1024<2;return s||this.$message.error("上传头像图片只能是 JPG 格式!"),a||this.$message.error("上传头像图片大小不能超过 2MB!"),s&&a},EditAdmin:function(){var e=this;if(!this.Form.selectedPermission)return this.$message.error("请选择权限");if(!this.Form.addressParams.province||!this.Form.addressParams.city||!this.Form.addressParams.area)return this.$message.error("请完善地址信息");if(!this.Form.imageUrl)return this.$message.error("请上传用户头像");if(!this.Form.status)return this.$message.error("请选择审核状态");this.fullscreenLoading=!0;var s={AdminToken:Object(i.a)(),TargetId:this.$route.params.id,phone:this.Form.phone,roles:this.Form.selectedPermission,photo_url:this.Form.imageUrl,province:this.Form.addressParams.province,city:this.Form.addressParams.city,area:this.Form.addressParams.area,status:this.Form.status,address:this.Form.addressParams.address};this.$store.dispatch("EditAdminInfo",s).then(function(s){e.fullscreenLoading=!1,e.$message.success("修改成功"),e.$store.dispatch("AdminList"),setTimeout(function(){e.$router.go(-1)},1e3)},function(s){e.fullscreenLoading=!1})}},mounted:function(){var e=this;if(!this.$route.params.id)return this.$message.error("用户标识错误");var s=this.$route.params.id;this.fullscreenLoading=!0,this.$store.dispatch("AdminInfo",{token:s}).then(function(s){e.Form.phone=s.Data.phone||"",e.Form.selectedPermission=s.Data.roles||"",e.Form.imageUrl=s.Data.photo_url||"",e.Form.addressParams.province=s.Data.province||"",e.Form.addressParams.city=s.Data.city||"",e.Form.addressParams.area=s.Data.area||"",e.Form.addressParams.address=s.Data.address||"",e.Form.status=s.Data.status||"",e.fullscreenLoading=!1},function(e){})}},l={render:function(){var e=this,s=e.$createElement,a=e._self._c||s;return a("div",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:e.fullscreenLoading,expression:"fullscreenLoading",modifiers:{fullscreen:!0,lock:!0}}],staticClass:"edit-container"},[a("el-form",{ref:"ruleForm",staticClass:"card-box admin-form",attrs:{model:e.Form,rules:e.Form.rules,"label-position":"left"}},[a("el-form-item",{attrs:{rules:[{required:!0,message:"手机号码不能为空"},{min:11,message:"手机号码是11位"}],label:"手机号码",prop:"phone","label-width":"80px"}},[a("el-input",{model:{value:e.Form.phone,callback:function(s){e.$set(e.Form,"phone",s)},expression:"Form.phone"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"权限",prop:"permission","label-width":"80px"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.Form.selectedPermission,callback:function(s){e.$set(e.Form,"selectedPermission",s)},expression:"Form.selectedPermission"}},e._l(e.Form.cities,function(s){return a("el-option",{key:s.value,attrs:{label:s.label,value:s.value}},[a("span",{staticStyle:{float:"left"}},[e._v(e._s(s.label))]),e._v(" "),a("span",{staticStyle:{float:"right",color:"#8492a6","font-size":"13px"}},[e._v(e._s(s.value))])])}))],1),e._v(" "),a("el-form-item",{attrs:{label:"审核状态",prop:"permission","label-width":"80px"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.Form.status,callback:function(s){e.$set(e.Form,"status",s)},expression:"Form.status"}},e._l(e.Form.statusData,function(s){return a("el-option",{key:s.value,attrs:{label:s.label,value:s.value}},[a("span",{staticStyle:{float:"left"}},[e._v(e._s(s.label))]),e._v(" "),a("span",{staticStyle:{float:"right",color:"#8492a6","font-size":"13px"}},[e._v(e._s(s.value))])])}))],1),e._v(" "),a("el-form-item",{attrs:{label:"地区",prop:"region","label-width":"80px"}},[a("v-distpicker",{on:{selected:e.onDistpickerSelected}})],1),e._v(" "),a("el-form-item",{attrs:{rules:[{required:!0,message:"地址不能为空"},{min:5,message:"地址不能小于5未"}],label:"详细地址",prop:"addressParams.address","label-width":"80px"}},[a("el-input",{model:{value:e.Form.addressParams.address,callback:function(s){e.$set(e.Form.addressParams,"address",s)},expression:"Form.addressParams.address"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"用户头像",prop:"avatar","label-width":"80px"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:"http://awei.fun:3333/Unit/uploadfile","show-file-list":!1,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload}},[e.Form.imageUrl?a("img",{staticClass:"avatar",attrs:{src:e.Form.imageUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),e._v(" "),a("el-form-item",[a("el-button",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:e.fullscreenLoading,expression:"fullscreenLoading",modifiers:{fullscreen:!0,lock:!0}}],staticStyle:{width:"100%"},attrs:{type:"primary"},on:{click:e.EditAdmin}},[e._v("修改")])],1)],1)],1)},staticRenderFns:[]};var n=a("VU/8")(o,l,!1,function(e){a("RnHo"),a("OT1W")},"data-v-45f4d73c",null);s.default=n.exports},o1ZO:function(e,s,a){(e.exports=a("FZ+f")(!1)).push([e.i,"\n.edit-container[data-v-45f4d73c] {\n  padding: 15px;\n  width: 450px;\n}\n",""])}});