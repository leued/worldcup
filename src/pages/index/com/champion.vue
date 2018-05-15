<template>
  	<div>
	  	<div class="champion">
	  		<div class="teambox" v-for="item,index in configData.teamgroup">
	  			<div class="teamitem"  v-bind:class="{'on':setLight(index2,1+index),'chsoen':setChosen(index2,1+index)}" v-for="item2,index2 in item">
	  			    <i v-if="setChosen(index2,1+index)"></i>
		  			<img :src="imgroute+item2+'.png'" alt="">
		  			<span>{{configData.teamlist[item2]}}</span>
	  			</div>
	  		</div>
	  	</div>
	  	<div class="submit" v-bind:class="{'on':setLight(configData.teamgroup.length+1)}"></div>
	  	<div class="explain">
			<span>规则说明</span>
			<p>1、点击支持的球队，然后提交竞猜即可。</p>
			<p>2、决赛日前可多次提交，以最后一次为准。提交越早，猜中后获得积分越高。</p>
		</div>
  	</div>
</template>

<script>
import Vue from 'vue';
export default {
  name: 'champion',
  props:["psection"],
  data () {
    return {
       configData:configData,
       imgroute:imgroute,
       chosen:{
       	x:null,
       	y:null
       },
       section:0,//猜冠军的模块标志，模块个数根据teamgroup来判定
       sectionX:0 //每个section x方向的位置标志
      }
  },
  methods: {
		setLight(x,y=null){
			if(y!=null){
				return this.section == y && this.sectionX==x && this.psection==1
			}else{
				return this.section ==y && this.psection==1
			}
			
		},
		setChosen(x,y){
			// console.log(this.chosen.x,this.chosen.y,x,y)
			return this.chosen.y == y && this.chosen.x==x && this.psection==1
		},
		handleUp(){
			const me = this;
			me.section !=0 && me.section --
		},
		handleDown(){
			const me = this;
			me.section < me.configData.teamgroup.length+1 && me.section ++
		},
		handleLeft(){
			if(this.sectionX!=0){
				this.sectionX--
			}
		},
		handleRight(){
			if(this.sectionX!=this.configData.teamgroup[0].length-1){
				this.sectionX++
			}
		},
		save(){
			const me = this;
			Vue.axios({
				url:'http://worldcup.beta.scloud.letv.cn/h5/home/AddUserGuessChampion',
				method:"post",
			    headers:{
			        'Content-type': 'application/x-www-form-urlencoded'
			    },
			    data:{
			    	uid:2,
			  		team:me.configData.teamgroup[me.chosen.y][me.chosen.x],
			    }
			}).then(function(r){
				console.log(r.data)
			})
		}
  },
  mounted(){
  	const me = this;
  	this.$bus.$on('move1',function(direction){
  		switch(direction){
  			case "up":
  			me.handleUp();
  			break;
  			case "down":
  			me.handleDown();
  			break;
  			case "left":
  			me.handleLeft();
  			break;
  			case "right":
  			me.handleRight();
  			break;
  		}
  	})
  	this.$bus.$on("comfirm1",function(){
  		switch(me.section){
  			case me.configData.teamgroup.length+1:
  			me.save();
  			break;
  			default:
  			me.chosen.x = me.sectionX;
  			me.chosen.y = me.section;
  			break;
  		}
  	});
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
