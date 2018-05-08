<template>
  	<div>
		<div class="time">
			<span v-bind:class="{'on':setLight(0)}">猜胜负</span>
			<span v-bind:class="{'on':setLight(1)}">猜冠军</span>
			<span v-bind:class="{'on':setLight(2)}">积分榜</span>
		</div>
		<div>
			<game v-show="tabIndex==0" :containerIndex="containerIndex"></game>
			<champion v-show="tabIndex==1" :containerIndex="containerIndex"></champion>
			<score v-show="tabIndex==2" :containerIndex="containerIndex"></score>
		</div>
  	</div>
</template>

<script>
import Vue from 'vue';
import game from './com/game';
import champion from './com/champion';
import score from './com/score';

export default {
  name: 'index',
  data () {
    return {
		configData:configData,
		containerIndex:0,
		tabIndex:0,
    }
  },
  components:{game,champion,score},
  computed:{},
  methods: {
		move(){
			let me  = this;
			// this.forEachPlayer();
			document.onkeydown=function(e){
	  			e=window.event||e;
			  	switch(e.keyCode){
				  	case 13:
				  		me.enterPlay();
				  		break;
				    case 37: //左键
				      	me.setX("left");
				     	break;
				    case 38: //向上键
				    	me.setY("up")
				      break;
				    case 39: //右键
			      		me.setX("right");
				      	break;
				    case 40: //向下键
				    	me.setY("down")
				      	break;
				    default:
				      	break;
			  	}
			}
		},
		setX(direction){
			switch(direction){
				case "left":
				if(this.containerIndex==0 && this.tabIndex>0){
					this.tabIndex--;
				}else{
					this.$bus.$emit("move","left")
				}
				break;
				case "right":
				if(this.containerIndex==0 && this.tabIndex<2){
					this.tabIndex++;
				}else{
					this.$bus.$emit("move","right")
				}
				break;
			}
			
		},
		setY(direction){
			switch(direction){
				case "up":
				if(this.$children[this.tabIndex].lightIndex==1){
					this.containerIndex = 0;
				}
				this.$bus.$emit("move","up")
				break;
				case "down":
				if(this.containerIndex == 0){
					this.containerIndex++;
				}
				this.$bus.$emit("move","down")
				break;
			}
		},
		setLight(index){
			return this.containerIndex==0 && this.tabIndex==index
		}

  },
  mounted(){
	this.move();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
	.g-flexbox{
		display:-moz-flex; /* Firefox */
		display:-webkit-flex; /* Safari and Chrome */
		display:-ms-flexbox; /* Internet Explorer 10 */
		display:flex;
	}
	.g-flex{
		-moz-flex:1.0; /* Firefox */
		-webkit-flex:1.0; /* Safari and Chrome */
		-ms-flex:1.0; /* Internet Explorer 10 */
		flex:1.0;
	}
	.on{
		border: 1px solid red;
	}
	.time{
		width: 400px;
		margin: 0 auto;	
	}
	.player{
		//height: 200px;
		overflow-y:auto;
	}
	.wrapbox{
		width: 400px;
		height: 30px;
		margin: 20px auto;
		line-height: 30px;
		padding: 40px;
	}
	.wrapbox.current{
		border: 1px solid blue;
	}
	.box{
		margin: 0 10px;
		border: 1px solid blue;
		text-align: center;
		font-size: 14px;
		span{
			color: red;
		}
	}
	.box_2{
		border: none;
	}
	.box_2  span{
		display:inline-block;
		width: 50px;
	}
	.box_2  span.on2{
		background: red;
		color: #fff;
	}
	.box_2  span.on{
		background: red;
		color: #fff;
	}
</style>
