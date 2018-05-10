<template>
  	<div>
	  	<div class="player">
	  		<div class="g-flexbox wrapbox" v-for="item,index in configData.teamgroup">
	  			<div class="g-flex box"  v-bind:class="{'on':setLight(index2,1+index)}" v-for="item2,index2 in item">{{configData.teamlist[item2]}}</div>
	  		</div>
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
       section:0,//猜冠军的模块标志，模块个数根据teamgroup来判定
       sectionX:0 //每个section x方向的位置标志
      }
  },
  methods: {
		setLight(x,y){
			return this.section == y && this.sectionX==x && this.psection==1
		},
		handleUp(){
			const me = this;
			me.section !=0 && me.section --
		},
		handleDown(){
			const me = this;
			me.section < me.configData.teamgroup.length && me.section ++
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
