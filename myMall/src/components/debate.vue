<!-- 商品评论页面 -->
<template>
	<div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		  <el-form-item label="使用感受" prop="desc">
		    <el-input class="area" type="textarea" v-model="ruleForm.desc"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="submitForm('ruleForm')">发表</el-button>
		    <el-button @click="resetForm('ruleForm')">重置</el-button>
		  </el-form-item>
		</el-form>
		<!-- <el-card class="box-card"> -->
			<div v-for="debate in debates" class="text item">
				<el-card>
					<div class="content">{{debate.content}}</div>
					 <div class="user_name">{{debate.user_name}}</div>
				 	<div class="time">{{debate.debate_date}}</div>
				 	<div class="admire"><i class="glyphicon glyphicon-thumbs-up"> {{debate.admire}}</i></div>
				</el-card>
			</div>
		<!-- </el-card> -->
	</div>
</template>
<script>
  export default {
    data() {
      return {
        ruleForm: {
          desc: ''
        },
        rules: {
          desc: [
            { required: true, message: '请填写使用感受', trigger: 'blur' }
          ]
        }
      };
    },
    props: [
    	'debates'
    ],
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('/api/v2/debate/' + this.$route.params.id, {
            	user_id: window.sessionStorage['user_id'],
            	user_name: window.sessionStorage['user'],
            	content: this.ruleForm.desc,
            	debate_date: Date.parse(new Date())
            }).then((res) => {
            	this.$refs[formName].resetFields();
            	 this.$emit('submit', '');
            	const h = this.$createElement;
            	 this.$notify({
		          message: h('i', { style: 'color: teal'}, '商品评论发表成功！')
		        });
            }, (err) => {
            	console.log(err);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },  
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted() {
    	for (var i = 0; i < this.debates.length; i++) {
    		console.log(this.debates[i].debate_date);
    	}
    }
  }
</script>
<style>
  .text {
    font-size: 14px;
  }
  .item {
    padding: 5px 0;
  }
  .el-card {
  	border: 1px solid #ADADAD;
  }
  .area {
  	word-wrap: break-word;
  }
  .content {
  	float: left;
  	width: 80%;
  	height: auto;
  	white-space:pre-wrap;
  }
  .user_name {
  	width: 20%;
  	float: left;
  	text-align: center;
  }
  .time {
  	clear: both;
  	position: relative;
  	bottom: -20px;
  	left: 20px;
  	color:	#ADADAD;
  }
  .admire {
  	position: relative;
  	left: 610px;
  }
</style>