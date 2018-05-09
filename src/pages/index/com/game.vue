<template>
  	<div>
		<div v-bind:class="{'on':setLight(1)}" class="time">{{configData.currentdate}}</div>
		<div class="player">
			<div class="g-flexbox wrapbox" v-for="(i,index) in gamelist">
				<div class="g-flex box">{{configData.teamlist[i.left]}}</div>
				<div class="box box_2">
					<span v-bind:class="{'on':setLight(2,index,0)}">胜</span>
					<span v-bind:class="{'on':setLight(2,index,1)}">平</span>	
					<span v-bind:class="{'on':setLight(2,index,2)}">负</span>
				</div>
				<div class="g-flex box">{{configData.teamlist[i.right]}}</div>
  			</div>
		</div>
		<div v-bind:class="{'on':setLight(3)}">提交</div>
  	</div>
</template>

<script>
export default {
  name: 'game',
  props:["containerIndex"],
  data () {
    return {
		configData:configData,
		game:{
			x:0,
			y:0
		},//比赛列表中x,y方向的位置
		section:0 //猜单场分为三个模块，默认进入是第一个模块
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
		setLight(section,y=null,x=null){
			if(x!=null&&y!=null){
				return this.section == section && this.game.x==x
			       && this.game.y==y && this.containerIndex==1
			   }else{
			   	return this.section == section && this.containerIndex==1
			   }
		},
		handleUp(){
		  	const me = this;
		  	if(me.section==2&&me.game.y!=0){
		  		me.game.y--;
		  	}else{
		  		me.section !=0 && me.section --
		  	}
		 },
		handleDown(){
		  	const me = this;
		  	if(me.section==2&&me.game.y!=me.gamelist.length-1){
		  		me.game.y++;
		  	}else{
		  		me.section < 3 && me.section ++
		  	}
		},
		handleLeft(){
			if(this.section ==2 && this.game.x!=0){
				this.game.x--
			}
		},
		handleRight(){
			if(this.section ==2 && this.game.x!=2){
				this.game.x++
			}
		}
  },
  mounted(){
  	const me = this;
  	this.$bus.$on('move0',function(direction){
  		switch(direction){
  			case "up":
  			me.handleUp();
  			break;
  			case "down":
  			me.handleDown()
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

<style lang="less" >
	
</style>