<template>
	<div class="row">
		<div class="col-xs-offset-2 col-xs-8">
			<h3>添加商品</h3>
			<div class="store">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				  <el-form-item label="商店名称" prop="name">
				    <el-input v-model="ruleForm.name"></el-input>
				  </el-form-item>
				  <el-form-item label="商品名称" prop="goodName">
				    <el-input v-model="ruleForm.goodName"></el-input>
				  </el-form-item>
				  <el-form-item label="商品价格" size="20" prop="price">
				    <el-input type="number" v-model="ruleForm.price"></el-input>
				  </el-form-item>
				  <el-form-item label="商品类型" prop="type">
				  <el-select v-model="ruleForm.type" placeholder="请选择活动区域">
				      <el-option label="美食/餐厅" value="美食/餐厅"></el-option>
				      <el-option label="电子产品" value="电子产品"></el-option>
				      <el-option label="日常用品" value="日常用品"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="商品描述" prop="desc">
				    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
				    <el-button @click="resetForm('ruleForm')">重置</el-button>
				  </el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          goodName: '',
          price: '',
          type: '',
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入商铺名称', trigger: 'blur' },
            { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur,change' }
          ],
          goodName: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
            { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur,change' }
          ],
          price: [
          	{ required: true, message: '请输入商品价格', trigger: 'blur' },
          	// { type: 'number', message: '价格必须为数字值'}
          ],
          // type: [
          // 	{ required: true, message: '请选择商品类型', trigger: 'change' },
          // ],
          desc: [
            { required: true, message: '请填写商品描述', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	this.$http.post('/api/v1/addGoods',{
          		seller: this.ruleForm.name,
          		name: this.ruleForm.goodName,
          		price: this.ruleForm.price,
          		type: this.ruleForm.type,
          		describe: this.ruleForm.desc
          	}).then((res)=>{
          		this.open();
          		this.resetForm('ruleForm')
          	}, (err) =>{
          		console.log(err);
          	})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      open() {
        const h = this.$createElement;
        this.$notify({
          message: h('i', { style: 'color: teal'}, '商品添加成功！')
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style scoped>
	h3 {
		text-align: center;
	}
</style>