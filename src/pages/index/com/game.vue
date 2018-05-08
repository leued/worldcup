<template>
  	<div>
		<div class="time">{{configData.currentdate}}</div>
		<div class="player">
			<div  class="g-flexbox wrapbox" v-for="(i,index) in gamelist" >
				<div class="g-flex box">{{configData.teamlist[i.left]}}</div>
				<div class="box box_2">
					<span>胜</span>
					<span>平</span>	
					<span>负</span>
				</div>
				<div class="g-flex box">{{configData.teamlist[i.right]}}</div>
  			</div>
		</div>
		<div>提交</div>
  	</div>
</template>

<script>
export default {
  name: 'game',
  data () {
    return {
		configData:configData,

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
		
  },
  mounted(){
  }
}
</script>

<style lang="less" >
	
</style>