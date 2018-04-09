<template>
  <div>
    <el-upload
      list-type="picture-card"
      class="upload-demo"
      drag
      :class="{disabled:uploadDisabled}"
      action="//up.qbox.me/"
      v-bind:data="form"
      v-bind:before-upload="handleBeforeUpload"
      v-bind:on-success="handleSuccess"
      :on-remove="removeImg"
      ref="uploadFiles"
      :limit="1"
      :auto-upload="true">
      <i class="el-icon-plus"></i>
      <!--<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过1M</div>-->
    </el-upload>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        form: null,
        img: [],
        key: '',
        files: '',
        len: '',
        uploadSuccess: false
      }
    },
    methods: {
      /** @argument
       * 上传文件前处理
       * @param {file} file
       */
      handleBeforeUpload (file) {
        let params = {
          fileName: file.name
        }
        if (file.size / 1024 > 1024) {
          this.$message.error('您上传的某些图片过大,超过1M的图片将上传失败');
          return;
        }
        return this.$http.get('/manage/upload', {params})
          .then((res) => {
            if (res.data.code === '1') {
              this.form = {
                key: res.data.result.fileName,
                token: res.data.result.uploadToken
              };
            } else {
              this.$message.error('上传图片失败')
            }
          })
          .catch(() => {
            this.$message.error('上传图片失败')
          })
      },
      /** @argument
       * 文件上传成功后处理
       * @param {Object} response
       * @param {file} file
       * @param {fileList}
       */
      handleSuccess (response, file, fileList) {
        this.img.push(`http://p5gyilsur.bkt.clouddn.com/${response.key}`)
        console.log(this.img);
//        console.log(this.$refs.uploadFiles.uploadFiles);
      },
      removeImg() {
        let imgInclude = [];
        this.len = this.$refs.uploadFiles.uploadFiles.length;
        for(let i = 0; i < this.len; i++) {
          imgInclude.push(`http://p5gyilsur.bkt.clouddn.com/${this.$refs.uploadFiles.uploadFiles[i].response.key}`)
        }
        this.img = imgInclude;
        this.form = null;
      }
    },
    computed: {
      uploadDisabled:function() {
        return (this.form);
      },
    },
  }
</script>

<style>
  .el-upload-dragger {
    height: 148px;
    width: 148px;
  }
  .img {
    width: 100%
  }
  input[type=file] {
    display: none;
  }
  .disabled .el-upload--picture-card {
    display: none;
  }
</style>
