<template>
  <div>
  <el-dialog title="系统注册" width="35%" :visible.sync="registerForm" :modal-append-to-body="false" :append-to-body="false">
  <el-form :model="ruleForm2" status-icon label-width="100px" :rules="rules2" ref="ruleForm2" label-position="left" class="demo-ruleForm login-container">
    <el-form-item label="账号" prop="account">
    <el-input type="text" v-model="ruleForm2.account" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
    </el-form-item>
      <el-form-item label="确认密码" prop="pass">
    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item
      prop="email"
      label="邮箱"
      :rules="[
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
      ]">
      <el-input v-model="ruleForm2.email"></el-input>
    </el-form-item>
    <el-form-item
        label="联系电话"
        prop="tel"
        :rules="[
          { required: true, message: '联系电话不能为空'},
          { type: 'number', message: '联系电话必须为数字值'}
        ]"
      >
      <el-input type="text" v-model.number="ruleForm2.tel" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="registerForm = false">取 消</el-button>
    <el-button type="primary" @click="register1('ruleForm2')">注册</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        registerForm: false,
        ruleForm2: {
          account: '',
          checkPass: '',
          passs: '',
          email: '',
          tel: ''
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ],
          pass: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { message:'两次输入密码不一致', trigger:'blur, change'}
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    props: [
      'register'
    ],
    methods:{
      register1(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$http.post('/api/v1/user',{
              user_name:this.ruleForm2.account,
              password:this.ruleForm2.checkPass,
              email: this.ruleForm2.email,
              tel: this.ruleForm2.tel
            }).then( ()=> {
              this.success();
              this.registerForm = false;
              this.$refs[formName].resetFields();
            }, (err) => {
              console.log(err);
            });
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
      success() {
        this.$notify({
          title: '成功',
          message: '注册成功',
          type: 'success'
        });
      }
    },
    watch: {
      register() {
        this.registerForm = !this.registerForm;
      }
    }
  }
</script>
<style scoped>
  .remember {
    float: left;
  }
</style>