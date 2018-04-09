<!--用户地址-->
<template>
  <div>
    <el-button type="primary" plain @click="dialog = true"> <i class="el-icon-circle-plus"></i>添加地址</el-button>
    <el-dialog title="添加地址" width="30%" :visible.sync="dialog"  :append-to-body="true">
      <el-form :model="address" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <el-form-item prop="account">
          <el-input type="text" auto-complete="off" placeholder="收件人姓名"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" auto-complete="off" placeholder="联系方式"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" auto-complete="off" placeholder="电子邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <addre></addre>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" auto-complete="off" placeholder="详细地址"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary">添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import Addre from '../components/addre'
  export default {
    data() {
      return {
        address: {
          name: '',
          tel: '',
          email: '',
          provience: '',
          city: '',
          block: '',
          datail: ''
        },
        dialog: false
      };
    },
    components: {
      Addre
    }
  }
</script>
<!-- <style lang="stylus" scoped>
  .city-select select
    outline 0
</style> -->
