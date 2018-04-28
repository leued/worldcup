<template>
  	<div>
		<div class="g-flexbox wrapbox" v-for="(item,index) in showData" :class="{current:index==currentLine}" >
			<div class="g-flex box">{{item.left}}</div>
			<div class="box box_2">
				<span :class="{on:isOn(index, childrenIndex), on2:isOn2(index, childrenIndex)}"  v-for="(i, childrenIndex) in item.value">{{i.name}}</span>
			</div>
			<div class="g-flex box">{{item.right}}</div>
  		</div>
  	</div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'index',
  data () {
    return {
    	showData:[
			{
				left:"秘鲁",
				right:"丹麦",
				value:[
					{name:"胜"},
					{name:"平"},
					{name:"负"}
				]
			},
			{
				left:"秘鲁",
				right:"丹麦",
				value:[
					{name:"胜"},
					{name:"平"},
					{name:"负"}
				]
			},
			{
				left:"秘鲁",
				right:"丹麦",
				value:[
					{name:"胜"},
					{name:"平"},
					{name:"负"}
				]
			}

    	],
		baseWidth:192,
		currentLine:0,//上下
		//currentCol:0,//左右
		currentCol:{
			0:{
				col:0
			},
			1:{
				col:0
			},
			2:{
				col:0
			}
		}
    }
  },
  computed:{

  },
  methods: {
		move(){
			var me  = this;
			document.onkeydown=function(e){
	  			e=window.event||e;
			  	switch(e.keyCode){
				  	case 13:
				  		me.enterPlay();
				  		break;
				    case 37: //左键
					    me.currentCol[me.currentLine].col--;
				      	me.setX();
				     	break;
				    case 38: //向上键
						me.currentLine--;
				      	me.setY();
				      break;
				    case 39: //右键
				      	me.currentCol[me.currentLine].col++;
			      		me.setX();
				      	break;
				    case 40: //向下键
			      		me.currentLine++;
			      		me.setY();
				      	break;
				    default:
				      	break;
			  	}
			}
		},
		setY(){
			var me = this;
			if(me.currentLine<0){
				me.currentLine=0;
			}
			if(me.currentLine >= me.showData.length){
				me.currentLine = me.showData.length-1;
			} 
			me.currentCol[me.currentLine] = {
				col:me.currentCol[me.currentLine].col ? me.currentCol[me.currentLine].col : 0
			}
		},
		setX(){
			var me = this;
			if(me.currentCol[me.currentLine].col<0){
				me.currentCol[me.currentLine].col=0;
			}
			if(me.currentCol[me.currentLine].col >= 3){
				me.currentCol[me.currentLine].col = 2;
			} 

			me.currentCol[me.currentLine] = {
				col:me.currentCol[me.currentLine].col
			}

		},
		isOn(index, childrenIndex){
			var me = this;
			if(childrenIndex==me.currentCol[me.currentLine].col && index==me.currentLine){
					return true;
			}
		},
		isOn2(index, childrenIndex){
			var me = this;
			if(childrenIndex==me.currentCol[index].col){
					return true;
			}
		}
  },
  mounted(){
	 this.move();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
