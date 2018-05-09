<template>
  	<div>
	  	<div class="player">
	  		<div class="g-flexbox wrapbox" v-bind:class="{'on':setLight(1+index)}" v-for="item,index in configData.teamgroup">
	  			<div class="g-flex box" v-for="item2,index2 in item">{{configData.teamlist[item2]}}</div>
	  		</div>
	  	</div>
  	</div>
</template>

<script>
import Vue from 'vue';
export default {
  name: 'champion',
  props:["containerIndex"],
  data () {
    return {
       configData:configData,
       lightIndex:0
      }
  },
  methods: {
		setLight(index){
			return this.lightIndex == index && this.containerIndex==1
		}
  },
  mounted(){
  	const me = this;
  	this.$bus.$on('move1',function(direction){
  		switch(direction){
  			case "up":
  			me.lightIndex !=0 && me.lightIndex --
  			break;
  			case "down":
  			// console.log(me.configData.teamgroup.length)
  			me.lightIndex < me.configData.teamgroup.length && me.lightIndex ++
  			break;
  			case "left":
  			break;
  			case "right":
  			break;
  		}
  	})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
