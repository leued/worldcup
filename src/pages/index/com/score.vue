<template>
  	<div>
  	    <div class="score">
  	      <div class="scorelist"  v-if="score.list.length!=0 && gametype!=7">
  	      	<ul>
  	      		<li  v-if="score.list[n-1]" v-for="n in 5">
  	      			<div>
  	      				<div>
  	      					<img :src="filterHead(score.list[n-1].picture)" alt="">
  	      					<div>
  	      						<span>{{score.list[n-1].nickname && score.list[n-1].nickname}}</span>
  	      						<span>猜中<em>{{ score.list[n-1].total_victory}}</em>场</span>	
  	      					</div>
  	      				</div>
  	      				<p>积分：<em>{{score.list[n-1].total_score}}</em>分</p>
  	      			</div>
  	      		</li>
  	      	</ul>
  	      	<ul>
  	      		<li v-if="score.list[n+4]" v-for="n in 5">
  	      			<div>
  	      				<div>
  	      					<img :src="filterHead(score.list[n+4].picture)" alt="">
  	      					<div>
  	      						<span>{{score.list[n+4].nickname && score.list[n+4].nickname}}</span>
  	      						<span>猜中<em>{{score.list[n+4].total_victory}}</em>场</span>	
  	      					</div>	
  	      				</div>
  	      				<p>积分：<em>{{ score.list[n+4].total_score||0}}</em>分</p>
  	      			</div>
  	      		</li>
  	      	</ul>
  	      </div>
  	      <div class="myscore" v-if="uid">
  	          <img :src="filterHead(score.user.picture)" alt="">	
  	          <ul>
  	          	<li>
  	          		<span>我的积分</span>
  	          		<strong>{{score.user.total_score||0}}分</strong>
  	          	</li>
  	          	<li>
  	          		<span>猜中场次</span>
  	          		<strong>{{score.user.total_victory}}场</strong>
  	          	</li>
  	          	<li>
  	          		<span>猜单场积分</span>
  	          		<strong>{{score.user.victory_score||0}}分</strong>
  	          	</li>
  	          	<li>
  	          		<span>猜冠军积分</span>
  	          		<strong>{{score.user.champion_score||0}}分</strong>
  	          	</li>
  	          	<li>
  	          		<span>我的排名</span>
  	          		<strong>{{score.user.number}}名</strong>
  	          	</li>
  	          </ul>
  	      </div>
  	    </div>
        <div class="notstart" v-if="score.list.length==0||score.list==''">
             <p>尚未开始比赛...</p>
        </div>
        <div class="notreward" v-if="gametype==7&&(score.user.number>10||score.user.number==0)">
             <p>遗憾，您未能在本次竞猜中进入获奖名次...</p>
        </div>
        <div class="reward" v-if="gametype==7&&score.user.number<10 && score.user.number>0">
            <p>领奖方式</p>
            <div>用微信扫码，关注乐视超级电视公众号，回复您的中奖码【{{uid}}】领取奖品</div>
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
       gametype:configData.gametype,
       score:configData.score,
       defaultimg:'https://i3.letvimg.com/lc04_user/201610/10/20/05/333304201476101122.jpg',
       uid:UID
      }
  },
  methods:{
  	filterHead(img){
      var i =  img?img.split(",")[0]:this.defaultimg;
  		return i
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
