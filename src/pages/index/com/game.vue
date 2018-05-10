<template>
  	<div>
		<div class="time">
			<span  v-bind:class="{'on':setLight(1,index)}" v-for="item,index in configData.date">{{item}}</span>
		</div>
		<div class="player">
			<div class="g-flexbox wrapbox" v-for="(i,index) in gamelist">
				<div class="g-flex box">{{configData.teamlist[i.left]}}</div>
				<div class="box box_2">
					<span v-bind:class="{'on':setLight(2,0,index),'chosen':setChosen(index,3)}">胜</span>
					<span v-bind:class="{'on':setLight(2,1,index),'chosen':setChosen(index,1)}">平</span>	
					<span v-bind:class="{'on':setLight(2,2,index),'chosen':setChosen(index,0)}">负</span>
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
  props:["psection"],
  data () {
    return {
		configData:configData,
		game:{
			x:0,
			y:0
		},//比赛列表中x,y方向的位置
		section1x:0,//时间模块，也即是第一个section在x轴上的位置标志
		section:0, //猜单场分为三个模块，默认进入是第一个模块
		gameindex:null
    }
  },
  computed:{
  	gamelist(){
  		var gamelist =[];
  		for(let i=0;i<this.configData.gamelist.length;i++){
  			if(this.configData.gamelist[i].time == this.configData.currentdate){
  				gamelist = this.configData.gamelist[i].data;
  				this.gameindex = i;
  				break
  			}
  		}
  		return gamelist
  	}
  },
  methods: {
		setLight(section,x=null,y=null){
			switch(section){
				case 1:
				return this.section == section && x == this.section1x  && this.psection==1;
				break;
				case 2:
				return this.section == section && this.game.x==x && this.game.y==y && this.psection==1
				break;
				case 3:
				return this.section == section && this.psection==1
				break;
				default:
				return false
				break;
			}
		},
		setChosen(index,num){
			return this.gamelist[index].chosen == num
		},
		handleUp(){
		  	const me = this;
		  	switch(me.section){
		  		case 1:
		  		me.section --
		  		break;
		  		case 2:
		  		if(me.game.y!=0){
		  			me.game.y--
		  		}else{
		  			me.section --
		  		}
		  		break;
		  		case 3:
		  		me.section --
		  		break;
		  	}
		 },
		handleDown(){
		  	const me = this;
		  	switch(me.section){
		  		case 0:
		  		me.section ++
		  		break;
		  		case 1:
		  		me.section ++
		  		break;
		  		case 2:
		  		if(me.game.y!=me.gamelist.length-1){
		  			me.game.y++;
		  		}else{
		  			me.section ++
		  		}
		  		break;
		  	}
		},
		handleLeft(){
			switch(this.section){
				case 1:
				if(this.section1x!=0){
					this.section1x--;
					this.$bus.$emit("dateChange",this.section1x)
				}
				break;
				case 2:
				if(this.game.x!=0){
					this.game.x--
				}
				break;
			}
		},
		handleRight(){
			switch(this.section){
				case 1:
				if(this.section1x!=this.configData.date.length-1){
					this.section1x++;
					this.$bus.$emit("dateChange",this.section1x)
				}
				break;
				case 2:
				if(this.game.x!=2){
					this.game.x++
				}
				break;
			}
		},
		maps(i){
			const map = {
				"0":3,
				"1":1,
				"2":0
			}
			return map[i]
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
  	this.$bus.$on("comfirm0",function(){
  		switch(me.section){
  			case 2:
  			//此处逻辑待优化
  			me.configData.gamelist[me.gameindex].data[me.game.y].chosen = me.maps(me.game.x);
  			break;
  			case 3:
  			break;
  		}
  	});
  }
}
</script>

<style lang="less" >
	
</style>