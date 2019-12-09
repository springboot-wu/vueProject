<template>
    <!-- 添加用户弹框 -->
    <el-dialog title="添加用户"
               @close="addDialogClose"
               :visible.sync="dialogTableVisible"
               :close-on-click-modal="false">
        <!-- 添加用户的表单 -->
        <el-form ref="addFormRef" :rules="rulesAddUser" :model="addUser" label-width="100px">
            <el-form-item prop="username" label="用户姓名">
                <el-input v-model="addUser.username"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="用户密码">
                <el-input v-model="addUser.password"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="用户邮箱">
                <el-input v-model="addUser.email"></el-input>
            </el-form-item>
            <el-form-item prop="mobile" label="用户手机号">
                <el-input v-model="addUser.mobile"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="dialogTableVisible = false">取消</el-button>
                <el-button type="primary" @click="onAddUser">确定</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
</script>

<style scoped>
</style>