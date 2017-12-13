<template>
  <div class="app-container">
    <div class="main-container">
      <span style="font-size:20px;margin:20px">水军分析</span>
      <el-row v-if="showRelation" style="display:flex;justify-content: center">
        <relationship :nodes="nodes" :edges="edges" :userid="authorid">
        </relationship>
      </el-row>
      <el-row style="margin:20px" v-for="(item, index) in list" :key="item.id">
        <el-row style="margin-top:10px;">
          <el-tooltip class="item" effect="dark" content="查看帖子详情" placement="top">
            <span style="color:#4682B4;cursor:pointer" @click="showPostDetail(item)">
              <b>{{item.thread}}</b>
            </span>
          </el-tooltip>
          <el-row style="overflow:auto;max-height:100px;border: 2px solid #d3dce6;background:#D3D3D3; border-radius:5px" v-html="item.content">
          </el-row>
        </el-row>
      </el-row>
    </div>
    <!-- <div class="pagination-container" style="display: flex;justify-content: center;align-items: center;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10, 20 ,30]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div> -->
    <el-dialog :title="this.postTitle+'-贴子详情'" :visible.sync="dialogVisible" width="30%">
      <el-row v-if="showDetailRelation" style="display:flex;justify-content: center">
        <relationship :nodes="detailNodes" :edges="detailEdges" :userid="detailAuthotid">
        </relationship>
      </el-row>
      <el-table :key='tableKey' :data="detailList" v-loading="listLoading" element-loading-text="努力加载中..." border fit highlight-current-row style="width: 100%;">
        <el-table-column align="center" label="用户">
          <template scope="scope">
            <span style="margin-left:10px;cursor:pointer" v-html="scope.row.authorid" v-clipboard:copy='scope.row.authorid' v-clipboard:success='clipboardSuccess'>{{scope.row.authorid}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="用户名">
          <template scope="scope">
            <span style="margin-left:10px;cursor:pointer" v-html="scope.row.username" v-clipboard:copy='scope.row.username' v-clipboard:success='clipboardSuccess'>{{scope.row.username}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="内容" width="460px">
          <template scope="scope">
            <el-row style="overflow:auto;max-height:100px;border: 2px solid #d3dce6;background:#D3D3D3; border-radius:5px" v-html="scope.row.content">
            </el-row>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Floor_Level">
          <template scope="scope">
            <span>{{scope.row.floorlevel}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="时间">
          <template scope="scope">
            <span>{{scope.row.posttime}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div v-show="!listLoading" class="pagination-container" style="display: flex;justify-content: center;align-items: center;">
        <el-pagination @size-change="handleDetailSizeChange" @current-change="handleDetailCurrentChange" :current-page.sync="detailQuery.page" :page-sizes="[20, 30 ,50]" :page-size="detailQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="detailTotal">
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import store from '../../store'
import BackToTop from '@/components/BackToTop'
import waves from '@/directive/waves.js'// 水波纹指令
import clip from '@/utils/clipboard' // use clipboard directly
import clipboard from '@/directive/clipboard/index.js'  // use clipboard by v-directive
import relationship from './relationship'
import { getWaterArmyCommunityNodes, getWaterArmyCommunityEdges, getWaterArmyCommunityPosts, getCommunityPostsDetail } from '@/api/waterarmy';

export default {
  name: 'waterarmyAn',
  components: { BackToTop, relationship },
  directives: {
    waves,
    clipboard
  },
  data() {
    return {
      showRelation: false,
      showDetailRelation: false,
      detailNodes: null,
      detailEdges: null,
      authorid: null,
      detailAuthotid: null,
      nodes: null,
      edges: null,
      list: null,
      detailList: null,
      listLoading: true,
      total: null,
      postTitle: null,
      tableKey: 0,
      dialogVisible: false,
      listQuery: {
        page: 1,
        limit: 10
      },
      detailTotal: null,
      temporaryThread: null,
      temporaryUserid: null,
      detailQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  created() {
    this.authorid = this.$route.query.authorid;
    this.getWaterArmyCommunityEdges();
    this.getWaterArmyCommunityNodes();
    this.getList();
  },
  methods: {
    getList() {
      getWaterArmyCommunityPosts(this.listQuery, this.authorid).then(response => {
        this.list = response.data.items;
        this.total = response.data.total;
        console.log(this.list)
      });
    },
    getWaterArmyCommunityNodes() {
      getWaterArmyCommunityNodes(this.authorid).then(response => {
        this.nodes = response.data.nodes;
        if (this.edges != null) {
          this.showRelation = true;
        }
      })
    },
    getWaterArmyCommunityEdges() {
      getWaterArmyCommunityEdges(this.authorid).then(response => {
        this.edges = response.data.edges;
        if (this.nodes != null) {
          this.showRelation = true;
        }
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleDetailSizeChange(val) {
      this.detailQuery.limit = val;
      this.getCommunityPostsDetail(this.temporaryThread, this.temporaryUserid)
    },
    handleDetailCurrentChange(val) {
      this.detailQuery.page = val;
      this.getCommunityPostsDetail(this.temporaryThread, this.temporaryUserid)
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    showPostDetail(row) {
      this.detailTotal = null;
      this.temporaryThread = null;
      this.temporaryUserid = null;
      this.detailQuery.page = 1;
      this.detailQuery.limit = 10;
      this.getCommunityPostsDetail(row.thread, row.authorid);
      this.temporaryThread = row.thread;
      this.temporaryUserid = row.authorid;
      getWaterArmyCommunityNodes(row.authorid).then(response => {
        this.detailNodes = response.data.nodes;
        if (this.detailEdges != null) {
          this.dialogVisible = true
          this.showDetailRelation = true;
        }
      })
      getWaterArmyCommunityEdges(row.authorid).then(response => {
        this.detailEdges = response.data.edges;
        if (this.detailNodes != null) {
          this.dialogVisible = true
          this.showDetailRelation = true;
        }
      })
      this.postTitle = row.thread;
      this.detailAuthotid = row.authorid;
    },
    getCommunityPostsDetail(threadid, userid) {
      getCommunityPostsDetail(this.detailQuery, threadid, userid).then(response => {
        this.detailList = response.data.items;
        this.detailTotal = response.data.total;
        this.listLoading = false;
      });
    },
    clipboardSuccess() {
      this.$message({
        message: '复制成功',
        type: 'success',
        duration: 1500
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.main-container {
  border: 1px solid #d3dce6;
  margin: 80px;
  margin-top: 10px;
  background: #f3f3f3
}

.detail-box {
  border: 1px solid #d3dce6; // background: #F0FFFF
}

.aTitle {
  color: #4682B4;
}

.aHref {
  color: #00BFFF;
  text-decoration: underline;
}

.infoGrey {
  color: #808080;
}
</style>
