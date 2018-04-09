<!--收藏商品-->
<template>
	<div class="row">
		<div>
      <div  class="delete">
        <el-button
         size="mini"
         type="danger"
         >批量删除</el-button>
      </div>
      <div>
        <el-card class="box-card">
        <el-table
          :data="collectList"
          @cell-click="getDetail"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            class="good_name"
            prop="good_name"
            label="商品名"
            width="280">
          </el-table-column>
          <el-table-column
            prop="good_price"
            label="商品价格"
            width="140">
          </el-table-column>
          <el-table-column
            label="操作"
            width="140">
             <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index)">删除</el-button>
            </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
		</div>
	</div>
</template>
<script>
  export default {
    data() {
      return {
      	collectList: []
      };
    },
    methods: {
    	getCollect() {
    		this.$http.post('/api/v1/getCollect/' + window.sessionStorage['user_id'])
    		.then((res) => {
    			this.collectList = res.data.myFavorite;
    		}, (err) => {
    			console.log(err);
    		})
    	},
      getDetail(row, column) {
        if (column.property == 'good_name') {
           this.$router.push({path: '/detail/'+ row.good_id});
        }
      },
      handleDelete(index) {
        this.$http.delete('/api/v1/deleteCollect/'+  window.sessionStorage['user_id'] + '/' +this.collectList[index].good_id)
        .then((res) => {
          this.getCollect();
        }, (err) => {
          console.log(err);
        })
      }
    },
    mounted() {
    	this.getCollect();
    }
  }
</script>
<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 660px;
    position: relative;
    overflow: auto;
  }
  .delete {
    padding-bottom: 10px;
  }
  .cell:hover {
    color: blue;
  }
</style>
