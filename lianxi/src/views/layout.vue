<template>
    <el-row class="tac">
        <el-col :span="12">
            <el-button type="text" @click="dialogmallVisible  = true">添加节点</el-button>
            <el-menu default-active="2"
                     class="el-menu-vertical-demo"
                     @open="handleOpen"
                     @close="handleClose">
                <el-submenu index="1">
                    <template slot="title">

                        <el-tree :data="data"
                                 :props="defaultProps"
                                 accordion
                                 @node-click="handleNodeClick">
                        </el-tree>
                    </template>
                </el-submenu>

            </el-menu>
        </el-col>
        <router-view v-if="isRouterAlive"></router-view>

        <template>

            <el-button type="primary" @click="dialogTableVisible  = true">新增</el-button>
            <el-button type="primary" @click="deleteUsers(delUsers)">删除</el-button>
            <div id="users">
                <Users @return-value="getVal" :title="tilevar" @return-bj="getBj" />
            </div>
            <!-- 添加用户弹框 -->
            <el-dialog title="添加用户"
                       @close="addDialogClose"
                       :visible.sync="dialogTableVisible"
                       :close-on-click-modal="false">
                <!-- 添加用户的表单 -->
                <el-form ref="addFormRef" :rules="rulesAddUser" :model="addUser" label-width="100px">
                    <el-form-item prop="name" label="姓名">
                        <el-input v-model="addUser.name"></el-input>
                    </el-form-item>
                   
                    <el-form-item prop="mid" label="分组">
                        <el-input v-model="addUser.mname" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item prop="sex" label="性别">
                        <el-select v-model="addUser.sex" clearable placeholder="请选择">
                            <el-option  label="男"  value="男"> </el-option>
                            <el-option  label="女"  value="女"> </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="tellphone" label="手机号">
                        <el-input v-model="addUser.tellphone"></el-input>
                    </el-form-item>
                    <el-form-item prop="deptid" label="部门">
                        <el-select v-model="addUser.deptid" clearable placeholder="请选择">
                            <el-option v-for="item in options"
                                       :key="item.deptid"
                                       :label="item.deptname"
                                       :value="item.deptid">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="dialogTableVisible = false">取消</el-button>
                        <el-button type="primary" @click="onAddUser">确定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>

            <!-- 添加节点 -->
            <el-dialog title="通讯录分组"
                       @close="addDialogClose"
                       :visible.sync="dialogmallVisible"
                       :close-on-click-modal="false">
                <!-- 添加通讯录分组的表单 -->
                <el-form ref="addForm" :model="addmall" label-width="100px">
                    <el-form-item prop="fname" label="父级节点">
                        <el-input v-model="addmall.fname" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item prop="mname" label="分组名称">
                        <el-input v-model="addmall.mname"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="dialogmallVisible = false">取消</el-button>
                        <el-button type="primary" @click="onaddmall">确定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>


        </template>

    </el-row>

</template>

<script>
    import Users from './list.vue';
    import qs from 'qs'
    //const delUsers=[];
    export default {
        name: 'users',
        components: {
            Users
        },
        data() {
             // 自定义一个手机号验证规则
                var checkMoblie = (rule, value, callback) => {
                  if (!value.trim()) {
                    return callback(new Error('请输入手机号'))
                  }
                  if (!/^1[34578]\d{9}$/.test(value)) {
                    return callback(new Error('手机号有误！请重填'))
                  } else {
                    callback()
                  }
                }
            return {
                isRouterAlive:true,
                dialogTableVisible: false,// 添加用户弹框
                 dialogmallVisible: false,
                data: [],
                delUsers: [],
                tilevar: [],
                options: [],
                defaultProps: {
                    children: 'popedomChildList',
                    label: 'mname'
                },
                 // 添加用户
                addUser: {
                   id:'',
                    name: '',
                    mid: '',
                    sex: '',
                    tellphone: '',
                    deptid:''
                },
                addmall: {
                    pid: '',
                   mname: ''
                },
                rulesAddUser: {
                      name: [
                               { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                     sex: [
                               { required: true, message: '请输入性别', trigger: 'blur' }
                          ],
                        tellphone: [
                            { required: true, message: '请输入手机号', trigger: 'blur' },
                            { validator: checkMoblie, trigger: 'blur' }
                        ]

                }

            };
            

        },
        mounted: function () { //钩子函数
            this.get();
            this.depts();
            this.inituserlist();
        },
        methods: {
            addDialogClose() {
                this.addUser={
                    id:'',
                    name: '',
                    mid: '',
                    sex: '',
                    tellphone: '',
                    deptid:''
                }
                //  this.$refs.addFormRef.resetFields() //  不好使待检查
                },
            get: function () {
                this.$http.get('http://localhost:8081/queryMaillist', {
                }).then(
                    function (res) {
                        console.log("=================allllll");
                        console.log(res.data);
                        this.data = res.data;
                    })
            },
             inituserlist: function () {
                this.$http.get('http://localhost:8081/userListBymid', {
                    params: { id: 1 }
                }).then(
                    function (res) {
                        //alert(title)
                        console.log(res);
                         this.tilevar = res.data;
                        console.log(this.userList);

                    })
            },
       depts: function () {
                this.$http.get('http://localhost:8081/deptlist', {
                }).then(
                    function (res) {
                        console.log("=================depts");
                        console.log(res.data);
                       // this.data = res.data;
                        this.options = res.data;
                    })
            },

            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            goTo(path) {
                this.$router.replace(path);
            },
            handleNodeClick(data) {
                //  添加通讯录赋值
                this.addmall.fname = data.mname;
                this.addmall.pid = data.mid;
                //添加用户赋值
                this.addUser.mname = data.mname;
                this.addUser.mid = data.mid;
                console.log(data)

              this.$http.get('http://localhost:8081/userListBymid', {
                  params:{id:data.mid}
                }).then(
                    function (res) {
                        console.log("==========");
                        console.log(res.data);
                        console.log("==============");
                        this.tilevar = res.data;
                        console.log(this.userList);
                    })

            }
            , deleteUsers(data) {
                let userDto = this.delUsers;
                //  执行删除的方法
                  this.$confirm('确认删除？')
                      .then(_ => {
                                 this.$http.post(
                            'http://localhost:8081/deleUserBatch',
                            userDto
                         ).then(
                            function (res) {
                                console.log(res);
                                this.reload();//刷新页面
                                location.reload();
                            })   
                      })
               


            },
            getVal(result) {
                console.log(result + "=====");
                this.delUsers = result;

            },
            getBj(result) {
                console.log(result + "==bj===");
                this.dialogTableVisible = true;
                console.log(result);
                this.addUser.id = result.id;
                this.addUser.name = result.name;
                this.addUser.mname = result.mname;
                this.addUser.mid= result.mid
                this.addUser.sex = result.sex;
                this.addUser.tellphone = result.tellphone;
                this.addUser.deptid = result.deptid;

               

            },

             // 点击添加用户
            onAddUser() {
                 //this.$refs.addFormRef.resetFields() // 清空表单
                this.$refs.addFormRef.validate(async valid => {
                    debugger;
                    if (!valid) return null  // 如果验证失败就不往下继续执行
                    const { data: res } = await this.$http.post('http://localhost:8081/addUser', this.addUser)
                   // this.addUser.name = '';
                   
                     this.$refs.addFormRef.resetFields() // 清空表单
                      //刷新页面
                       location.reload();
                    if (res!=true) return this.$message.error("添加失败")
                    this.$message.success('添加成功')
                    this.dialogTableVisible = false  // 关闭弹框
                      this.getUserList() // 重新调用，刷新表单
                    //  this.reload();//刷新页面
                      // location.reload();
                  })
            },
              // 添加通讯录
            onaddmall() {
                 console.log("-------------------------");
                console.log(this.addmall);
              console.log("-------------------------");
                 this.$http.post('http://localhost:8081/addmail',this.addmall).then(
                     function (res) {
                         this.dialogmallVisible = false;
                        //alert(title)
                        console.log(res);
                       location.reload();

                    })


            },
            reload() {
                this.isRouterAlive = false
                this.$nextTick(function () {
                     this.isRouterAlive = true
                })
            }

        }
    };
</script>

<style scoped>
    .el-col-12 {
        width: 25%;
    }
</style>