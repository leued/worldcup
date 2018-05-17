<template>
  	<div>
  	    <div class="score">
  	      <div class="scorelist">
  	      	<ul>
  	      		<li v-for="n in 5"></li>
  	      	</ul>
  	      	<ul>
  	      		<li v-for="n in 5"></li>
  	      	</ul>
  	      </div>
  	      <div class="myscore">
  	          <img :src="filterHead(score.user.picture)" alt="">	
  	          <ul>
  	          	<li>
  	          		<span>我的积分</span>
  	          		<strong>5000分</strong>
  	          	</li>
  	          	<li>
  	          		<span>猜中场次</span>
  	          		<strong>5000分</strong>
  	          	</li>
  	          	<li>
  	          		<span>猜单场积分</span>
  	          		<strong>5000分</strong>
  	          	</li>
  	          	<li>
  	          		<span>猜冠军积分</span>
  	          		<strong>5000分</strong>
  	          	</li>
  	          	<li>
  	          		<span>最近场次积分</span>
  	          		<strong>5000分</strong>
  	          	</li>
  	          	<li>
  	          		<span>我的排名</span>
  	          		<strong>5000分</strong>
  	          	</li>
  	          </ul>
  	      </div>
  	    </div>
  		<div class="explain">
			<span>规则说明</span>
			<p>1、单场比赛在次日零点系统结算后可获得积分；猜冠军支持的球队在决赛后可获得积分。</p>
			<p>2、按照积分排序，如果积分相同，按猜中场次排序，如果场次也相同，越早猜冠军排名越靠前。</p>
		</div>
  	</div>
</template>

<script>
import Vue from 'vue';
export default {
  name: 'score',
  data () {
    return {
       score:configData.score
      }
  },
  methods:{
  	filterHead(img){
  		return img.split(",")[0]
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
