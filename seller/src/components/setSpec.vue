<!--设置规格-->
<template>
  <div class="addGoods">
    <div class="row">
      <div class="col-xs-9">
        <form class="form-horizontal" v-for="(spec, index) in specs">
          <fieldset>
            <div class="form-group row">
              <label class="control-label col-xs-3" >分类名称{{index + 1}}</label>
              <div class="col-xs-6 good-name">
                <input type="text" v-model="spec.sortName" placeholder="请输入分类名称" class="form-control col-xs-3">
              </div>
            </div>
            <div class="form-group row">
              <label class="control-label col-xs-3" >分类类型{{index + 1}}</label>
              <el-tag
                :key="tag"
                v-for="(tag, order) in spec.types"
                closable
                :disable-transitions="false"
                @close="handleClose(tag, index, order)">
                {{tag}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="index == inputIndex"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(index)"
                @blur="handleInputConfirm(index)"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput(index)">+ New Tag</el-button>
            </div>
          </fieldset>
        </form>
        <el-button
          class="col-xs-offset-3"
          @click="goTwo"
          type="primary">
          上一步
        </el-button>
        <el-button @click="goLast"
                   class="col-xs-offset-7"
                   :disabled="!judgeSpec"
                   type="primary">下一步</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  export default {
    data() {
      return {
        specs: [
          {
            sortName: '颜色',
            types: []
          },
          {
            sortName: '尺寸',
            types: []
          }
        ],
        inputValue: '',
        inputIndex: -1
      };
    },
    methods: {
      handleClose(tag, index) {
        this.specs[index].types.splice(this.specs[index].types.indexOf(tag), 1);
      },
      showInput(index) {
        this.inputIndex = index; // 判断当前点击的是哪一个添加按钮
      },
      handleInputConfirm(index) {
        let inputValue = this.inputValue;
        if (!inputValue.trim()) { // 过滤空值
          return;
        }
        if (this.specs[index].types.indexOf(inputValue) == -1) { // 过滤掉相同的值
          this.specs[index].types.push(inputValue);
        }
        this.inputIndex = -1;
        this.inputValue = '';
      },
      goLast() {
        this.$emit('goLast',1);
        this.$emit('spec', this.specs);
      },
      goTwo() {
        this.$emit('goTwo',1);
      }
    },
    computed: {
      judgeSpec() {
        let num = 0;
        for (let i = 0; i < 2; i++) {
          if(this.specs[i].sortName!= '' && this.specs[i].types.length != 0) {
            num++;
          }
        }
        if (num > 0) {
         return true;
        }
      }
    }
  }
</script>
