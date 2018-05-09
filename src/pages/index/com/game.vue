<template>
  	<div>
		<div v-bind:class="{'on':setLight(1)}" class="time">{{configData.currentdate}}</div>
		<div class="player">
			<div class="g-flexbox wrapbox" v-for="(i,index) in gamelist" v-bind:class="{'on':setLight(2+index)}">
				<div class="g-flex box">{{configData.teamlist[i.left]}}</div>
				<div class="box box_2">
					<span>胜</span>
					<span>平</span>	
					<span>负</span>
				</div>
				<div class="g-flex box">{{configData.teamlist[i.right]}}</div>
  			</div>
		</div>
		<div v-bind:class="{'on':setLight(2+gamelist.length)}">提交</div>
  	</div>
</template>

<script>
export default {
  name: 'game',
  props:["containerIndex"],
  data () {
    return {
		configData:configData,
		lightIndex:0
    }
  },
  computed:{
  	gamelist(){
  		var gamelist =[];
  		for(let i=0;i<this.configData.gamelist.length;i++){
  			if(this.configData.gamelist[i].time == this.configData.currentdate){
  				gamelist = this.configData.gamelist[i].data;
  				break
  			}
  		}
  		return gamelist
  	}
  },
  methods: {
		setLight(index){
			return this.lightIndex == index && this.containerIndex==1
		}
  },
  mounted(){
  	const me = this;
  	this.$bus.$on('move0',function(direction){
  		switch(direction){
  			case "up":
  			me.lightIndex !=0 && me.lightIndex --
  			break;
  			case "down":
  			me.lightIndex < me.gamelist.length+2 && me.lightIndex ++
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

<style lang="less" >
	
</style>