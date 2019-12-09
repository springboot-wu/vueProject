
<template>

    <el-table ref="multipleTable"
              :data="title"
              tooltip-effect="dark"
              border
              style="width: 75%"
              @selection-change="handleSelectionChange">

        <el-table-column type="selection"
                         width="55">
        </el-table-column>

            <el-table-column prop="id"
                             label="序号"
                             width="120">
                <template slot-scope ="scope">
                    {{scope.$index + 1}}
               </template>
            </el-table-column>
        <el-table-column prop="name"
                         label="姓名"
                         width="180">
        </el-table-column>
        <el-table-column prop="mname"
                         label="分组">
           
        </el-table-column>
        <el-table-column prop="sex"
                         label="性别">
        </el-table-column>
        <el-table-column prop="tellphone"
                         label="手机号">
        </el-table-column>
        <el-table-column prop="deptname"
                         label="部门">
        </el-table-column>
          <el-table-column prop="edit"
                         label="操作">
              <template slot-scope ="scope">
                 <el-link type ="primary"  @click="editUser(scope.row,scope.$index)"  icon="el-icon-edit">
                     编辑</el-link>
                   </template>
            </el-table-column>
        </el-table>
  </template>

<script>
    //import UserApi from '../../api/UserApi'

    export default {
        props: ["title"],
        name: 'userInfo',
        inject:['reload'],
        data() {
            return {
            
                userList: []
            }
        },
        mounted: function () { //钩子函数
            this.get();
        },
        methods: {
            get: function () {
                this.$http.get('http://localhost:8081/userListBymid', {
                    params: { id: 1 }
                }).then(
                    function (res) {
                        //alert(title)
                        console.log(res);
                        this.userList = res.data;
                        console.log(this.userList);

                    })
            },

            handleSelectionChange(val) {
                var newList = [];
                val.forEach(val => {
                    if (val.id) {
                        newList.push(val.id)
                    }
                })
                // console.log(newList)

                // this.$emit('return-value',this.hello)  //  触发my-event 自定义事件，传递参数 hello
                //  Val () {
                     this.$emit('return-value', newList);
                // }

            },
            editUser(obj,index) {
                console.log(obj)
                 this.$emit('return-bj', obj);
            }

        }
    }
</script>

<style scoped>
</style>