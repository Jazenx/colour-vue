<template>
  <div class="app-container">
    <el-row v-if="showRelation">
      <relationship :nodes="nodes" :edges="edges">
      </relationship>
    </el-row>
  </div>
</template>

<script>
import store from '../../store'
import BackToTop from '@/components/BackToTop'
import waves from '@/directive/waves.js'// 水波纹指令
import clip from '@/utils/clipboard' // use clipboard directly
import clipboard from '@/directive/clipboard/index.js'  // use clipboard by v-directive
import relationship from './relationship'
import { getWaterArmyCommunityNodes, getWaterArmyCommunityEdges } from '@/api/waterarmy';

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
      authorid: null,
      nodes: null,
      edges: null
    }
  },
  created() {
    this.authorid = this.$route.query.authorid;
    this.getWaterArmyCommunityEdges();
    this.getWaterArmyCommunityNodes();
  },
  methods: {
    getWaterArmyCommunityNodes() {
      getWaterArmyCommunityNodes(this.authorid).then(response => {
        this.nodes = response.data.nodes;
        if (this.edges != null) {
          this.showRelation = true;
          console.log(this.edges, this.showRelation)
        }
      })
    },
    getWaterArmyCommunityEdges() {
      getWaterArmyCommunityEdges(this.authorid).then(response => {
        this.edges = response.data.edges;
        if (this.nodes != null) {
          this.showRelation = true;
          console.log(this.nodes, this.showRelation)
        }
      })
    }
  }
}
</script>

