<template>
  <div class="addGoods">
    <div class="row">
      <div class="col-xs-9">
        <form class="form-horizontal">
          <fieldset>
            <div class="form-group row">
              <label class="control-label col-xs-3">商品类别</label>
              <el-tag
                :key="tag"
                v-for="tag in dynamicTags"
                closable
                :disable-transitions="false"
                @keyup.enter="handleClose(tag, dynamicTags)"
                @close="handleClose(tag, dynamicTags)">
                {{tag}}
              </el-tag>
              <el-select
                          v-if="inputVisible"
                          v-model="inputValue"
                          ref="saveTagInput"
                          size="small"
                          @change="handleInputConfirm(inputValue,dynamicTags)"  class="input-new-tag" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新增类别</el-button>
            </div>
            <div class="form-group row">
              <label class="control-label col-xs-3" >关键字</label>
                <el-tag
                  :key="tag"
                  v-for="tag in keyValue"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag, keyValue)">
                  {{tag}}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputKey"
                  v-model="goodKey"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(goodKey, keyValue)"
                  @blur="handleInputConfirm(goodKey, keyValue)"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput1">+ 新增关键字</el-button>
              </div>
            <div class="form-group row">
              <label class="control-label col-xs-3" >商品名称</label>
              <div class="col-xs-6 good-name">
                <input v-model="goodName" type="text" placeholder="请输入商品名称" class="form-control col-xs-3">
              </div>
            </div>
            <div class="form-group row">
              <label class="control-label col-xs-3" >商品卖点</label>
              <div class="col-xs-6 good-name">
                <input type="text" v-model="light" placeholder="请输入商品卖点" class="form-control col-xs-3">
              </div>
            </div>
            <div class="form-group row">
              <label class="control-label col-xs-3" >商品头图</label>
              <upload ref="uploadThumb"></upload>
            </div>
          </fieldset>
        </form>
        <el-button  class="col-xs-offset-7"
                    :disabled="!(dynamicTags[0] && keyValue[0] && goodName && light && thumb[0])"
                    @click="goToNext"
                    type="primary">下一步</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import upload from '../components/upload'
  export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        dynamicTags: [], // 商品类别标签
        inputVisible: false,
        inputValue: '', // 绑定选择器的值
        keyValue: [], // 关键字标签
        inputKey: false,
        goodKey: '', // 绑定输入的关键字的值
        goodName: '',
        light: '' // 商品的卖点描述
      };
    },
    components: {
      upload
    },
    methods: {
      handleClose(tag, dynamicTag) {
        dynamicTag.splice(dynamicTag.indexOf(tag), 1);
      },
      showInput() {
        this.inputVisible = true;
      },
      showInput1() {
        this.inputKey = true;
      },
      handleInputConfirm(inputValue,dynamicTag) {
        if (inputValue) {
          if(dynamicTag.length == 0) { // 对选择相同的类别进行过滤
             dynamicTag.push(inputValue);
          } else {
            for (var i = 0; i < dynamicTag.length; i++)
            {
              if (dynamicTag.indexOf(inputValue) == -1)
              {
                dynamicTag.push(inputValue);
              }
            }
          }
        }
        this.inputVisible = false;
        this.inputKey = false;
        this.inputValue = '';
        this.goodKey = '';
      },
      goToNext() {
        this.$emit('nextStep',1);
        this.$emit('transfer',this.dynamicTags,this.keyValue,this.goodName, this.light,this.thumb[0])
      }
    },
    computed: {
      thumb: {
        get() {
          return this.$refs.uploadThumb.img;
        }
      },
//      judgeKey: {
//        get() {
////          return Boolean(this.thumb[0]);
////          return Boolean(this.dynamicTags[0] && this.keyValue[0] && this.goodName && this.light);
//        }
//      }
    }
  }
</script>
<style>
  .button-new-tag {
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    vertical-align: bottom;
  }
  .good-name {
    padding: 0;
  }
  .addGoods {
    width: 1200px;
  }
</style>
