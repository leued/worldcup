<template>
  	<div>
  	    <div class="score">
  	      <div class="scorelist">
  	      	<ul>
  	      		<li  v-if="score.list[n]" v-for="n in 5">
  	      			<div>
  	      				<div>
  	      					<img :src="filterHead(score.user.picture)" alt="">
  	      					<div>
  	      						<span>乐小天</span>
  	      						<span>猜中<em>{{ score.list[n].total_victory}}</em>场</span>	
  	      					</div>
  	      				</div>
  	      				<p>积分：<em>{{score.list[n].total_score}}</em>分</p>
  	      			</div>
  	      		</li>
  	      	</ul>
  	      	<ul>
  	      		<li v-if="score.list[n+5]" v-for="n in 5">
  	      			<div>
  	      				<div>
  	      					<img :src="filterHead(score.user.picture)" alt="">
  	      					<div>
  	      						<span>乐小天</span>
  	      						<span>猜中<em>{{score.list[n+1].total_victory}}</em>场</span>	
  	      					</div>	
  	      				</div>
  	      				<p>积分：<em>{{ score.list[n+5].total_score}}</em>分</p>
  	      			</div>
  	      		</li>
  	      	</ul>
  	      </div>
  	      <div class="myscore">
  	          <img :src="filterHead(score.user.picture)" alt="">	
  	          <ul>
  	          	<li>
  	          		<span>我的积分</span>
  	          		<strong>{{score.user.total_score}}分</strong>
  	          	</li>
  	          	<li>
  	          		<span>猜中场次</span>
  	          		<strong>{{score.user.total_victory}}场</strong>
  	          	</li>
  	          	<li>
  	          		<span>猜单场积分</span>
  	          		<strong>{{score.user.victory_score}}分</strong>
  	          	</li>
  	          	<li>
  	          		<span>猜冠军积分</span>
  	          		<strong>{{score.user.champion_score}}分</strong>
  	          	</li>
  	          	<li>
  	          		<span>我的排名</span>
  	          		<strong>{{score.user.number}}名</strong>
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
  },
  mounted(){
  	this.$bus.$on('move2',function(direction){
  		switch(direction){
  			case "left":
  			this.$bus.$emit('tabToggle',1)
  			break;
  		}
  	})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
