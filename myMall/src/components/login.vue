<template>
  <div>
    <el-dialog title="系统登录" width="35%" :visible.sync="dialogin" :modal-append-to-body="false" :append-to-body="false">
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <el-form-item prop="account">
          <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" checked class="remember">
          <span style="margin-left: 10px">记住密码</span>
        </el-checkbox>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="login('ruleForm2')">登 录</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        dialogin: false,
        ruleForm2: {
          account: '',
          checkPass: ''
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    props:[
    'dialogFormVisible'
    ],
    methods:{
      login(formName) {
          this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$http.get('/api/v1' + '/' + this.ruleForm2.account  + '/' + this.ruleForm2.checkPass)
            .then((res)=>{
              const result = res.data;
              if(result != '') {
                this.$message({
                  message:'登录成功',
                  type: 'success',
                  center: true
                });
//                this.$router.push('index/recommend')
                this.$emit('openDialog', false);
                if(this.checked == true) {
                  this.setCookie(this.ruleForm2.account,this.ruleForm2.checkPass,7);
                }
                this.$emit('dialogUser', res.data.user_name);
                window.sessionStorage["user"] = res.data.user_name;
                window.sessionStorage["user_id"] = res.data._id;
              } else{
                this.open();
              }
            }, (err)=> {
              console.log(err);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      setCookie(c_name,c_pwd,exdays) {
        var exdate=new Date();//获取时间
        exdate.setTime(exdate.getTime() + 24*60*60*1000*exdays);//保存的天数
        //字符串拼接cookie
        document.cookie="user_name"+ "=" +c_name+";path=/;expires="+exdate.toGMTString();
        document.cookie="password"+"="+c_pwd+";path=/;expires="+exdate.toGMTString();
      },
      getCookie:function () {
        if (document.cookie.length>0) {
          var arr=document.cookie.split('; ');// cookie用‘;'隔开
          console.log(arr);
          for(var i=0;i<arr.length;i++){
            var arr2=arr[i].split('=');//再次切割
            //判断查找相对应的值
            if(arr2[0]=='user_name'){
              this.ruleForm2.account=arr2[1];//保存到保存数据的地方
            }else if(arr2[0]=='password'){
              this.ruleForm2.checkPass=arr2[1];
            }
          }
        }
      },
      open() {
        const h = this.$createElement;
        this.$notify({
          message: h('i', { style: 'color: teal'}, '账号或密码错误！'),
          duration: 2000
        });
      }
    },
    watch: {
      dialogFormVisible() {
        this.dialogin = !this.dialogin;
      }
    },
    mounted() {
      this.getCookie();
    }
  }
</script>
<style scoped>
  .remember {
    float: left;
  }
</style>
