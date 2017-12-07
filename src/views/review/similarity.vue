<template>
  <div class="app-container">
    <el-row v-for="(similarity, index) in similarity" :key="similarity.id" style="margin: 20px;border: 1px solid #d3dce6;background: #F0F8FF; border-radius:5px;margin-top:10px">
      <el-row style="margin: 5px">
        <a class="aTitle" :href="similarity.url" target="_blank">关联PID:{{ similarity.thread }}</a>
        <el-tag type="danger">作者:{{similarity.author}}</el-tag>
        <el-tag type="success" v-if="similarity.forumname">{{similarity.forumname}}</el-tag>
        <i class="el-icon-time" style="float:right">{{similarity.replydate}}</i>
      </el-row>
      <el-row style="margin:10px;overflow:auto;max-height:60px" v-html="similarity.content">
      </el-row>
    </el-row>
    <div v-show="!listLoading" class="pagination-container" style="display: flex;justify-content: center;align-items: center;">
      <el-pagination @size-change="handleSimilaritySizeChange" @current-change="handleSimilarityCurrentChange" :current-page.sync="similarityQuery.page" :page-sizes="[5, 10, 20]" :page-size="similarityQuery.limit" layout="total, sizes, prev, pager, next" :total="similarityTotal">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getPostSimilarity } from '@/api/waterarmy';
import store from '../../store';

export default {
  name: 'Similarity',
  props: {
    thread: null
  },
  data() {
    return {
      similarity: [],
      listLoading: true,
      similarityTotal: null,
      similarityQuery: {
        page: 1,
        limit: 5,
        thread: null
      }
    };
  },
  created() {
    this.similarityQuery.thread = this.thread;
    this.getSimilarityList();
  },
  methods: {
    handleSimilaritySizeChange(val) {
      this.similarityQuery.limit = val;
      console.log('一页展示的条数变了，load一次list');
      this.getSimilarityList();
    },
    handleSimilarityCurrentChange(val) {
      this.similarityQuery.page = val;
      console.log('一页展示的条数变了，load一次list');
      this.getSimilarityList();
    },
    getSimilarityList() {
      getPostSimilarity(this.similarityQuery).then(response => {
        this.similarity = response.data.items;
        this.similarityTotal = response.data.total;
        this.listLoading = false
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.main-container {
  border: 1px solid #d3dce6;
  margin: 80px;
  margin-top: 10px;
  background: #f3f3f3;
}

.detail-box {
  border: 1px solid #d3dce6; // background: #F0FFFF
}

.aTitle {
  color: #4682b4;
}

.aHref {
  color: #00bfff;
  text-decoration: underline;
}

.infoGrey {
  color: #808080;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
