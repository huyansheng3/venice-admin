webpackJsonp([13],{"1Jya":function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,"",""])},FwBd:function(t,e,a){var n=a("ORc7");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a("rjj0")("0ed27a12",n,!0)},Lh2j:function(t,e,a){var n=a("1Jya");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a("rjj0")("85aeb5d4",n,!0)},ORc7:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,"\n.table-container[data-v-5b65a099] {\n  padding: 10px;\n}\n",""])},y6BA:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("Xxa5"),i=a.n(n),r=a("exGp"),o=a.n(r),l=a("Dd8w"),s=a.n(l),c=a("0xDb"),d=a("NYxO"),u=a("TIfe"),p={data:function(){return{fullscreenLoading:!1,tableData:[],adminDialog:{dialogVisible:!1,dialogImageUrl:""}}},watch:{},components:{},computed:s()({},Object(d.b)(["userData","adminData"])),methods:{AuthorizedAdmin:function(t){var e=this;this.$confirm("是否要审核该管理员(将获得对应的权限), 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var a={rootId:e.userData._id,othersId:t,status:1};e.fullscreenLoading=!0,e.$store.dispatch("AuthorizedAdmin",a).then(function(t){e.fullscreenLoading=!1,e.updatedData()},function(t){e.fullscreenLoading=!1})})},deleteAdmin:function(t){var e=this;this.$confirm("此操作将删除该管理员账户全部信息, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.fullscreenLoading=!0,e.$store.dispatch("DeleteAdmin",{AdminToken:t}).then(function(t){e.fullscreenLoading=!1,e.updatedData()},function(t){e.fullscreenLoading=!1})})},updatedData:function(){var t=this;return o()(i.a.mark(function e(){var a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("AdminList",{AdminToken:Object(u.a)()});case 2:return a=e.sent,e.abrupt("return",t.setData(a));case 4:case"end":return e.stop()}},e,t)}))()},initData:function(){var t=this;return o()(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.fullscreenLoading=!0,t.adminData){e.next=3;break}return e.abrupt("return",t.updatedData());case 3:t.setData(t.adminData);case 4:case"end":return e.stop()}},e,t)}))()},setData:function(t){var e=this;this.tableData=[],t.Data.map(function(t){switch(t.roles){case"admin":t.rolesName="普通管理员[admin]";break;case"root":t.rolesName="超级管理员[root]";break;case"test":t.rolesName="测试员[test]";break;default:t.rolesName="未知[null]"}e.tableData.push({Id:t._id,avatar:t.photo_url,name:t.username,phone:t.phone||"-",roles:t.roles,permissions:t.rolesName,address:t.province+t.city+t.area+t.address||"-",createTime:Object(c.a)(t.create_date,"{y}-{m}-{d}"),status:1===t.status?"已审核":"未审核"})}),this.fullscreenLoading=!1}},mounted:function(){this.initData()}},f={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:t.fullscreenLoading,expression:"fullscreenLoading",modifiers:{fullscreen:!0,lock:!0}}],staticClass:"table-container"},[a("el-table",{staticStyle:{width:"100%"},attrs:{"highlight-current-row":"","header-align":"center",align:"center",data:t.tableData,border:""}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),t._v(" "),a("el-table-column",{attrs:{prop:"avatar",label:"用户头像",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("img",{staticStyle:{width:"80px",height:"80px",cursor:"pointer"},attrs:{src:e.row.avatar},on:{click:function(){t.adminDialog.dialogVisible=!0,t.adminDialog.dialogImageUrl=e.row.avatar}}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"用户名",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"phone",label:"手机",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"permissions",label:"权限",width:"130"}}),t._v(" "),a("el-table-column",{attrs:{prop:"address",label:"地址",width:"220"}}),t._v(" "),a("el-table-column",{attrs:{prop:"createTime",label:"创建时间",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"status",label:"状态",width:"80"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return["root"!==e.row.roles?a("el-button",{attrs:{size:"mini",type:"default"},on:{click:function(){return t.$router.push("/senior/editAdmin/"+e.row.Id)}}},[t._v("编辑")]):t._e(),t._v(" "),"未审核"===e.row.status?a("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(a){t.AuthorizedAdmin(e.row.Id)}}},[t._v("审核")]):t._e(),t._v(" "),"root"!==e.row.roles?a("el-button",{attrs:{size:"mini",type:"danger",plain:""},on:{click:function(a){t.deleteAdmin(e.row.Id)}}},[t._v("删除")]):t._e()]}}])})],1),t._v(" "),a("el-dialog",{attrs:{visible:t.adminDialog.dialogVisible,size:"tiny"},on:{"update:visible":function(e){t.$set(t.adminDialog,"dialogVisible",e)}}},[a("img",{attrs:{width:"100%",src:t.adminDialog.dialogImageUrl,alt:""}})])],1)},staticRenderFns:[]};var m=a("VU/8")(p,f,!1,function(t){a("FwBd"),a("Lh2j")},"data-v-5b65a099",null);e.default=m.exports}});