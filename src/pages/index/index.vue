<template>
  	<div>
		<div domIndex="0" class="time" :class="{domOn:domIndex==0}"><span>猜胜负</span></div>
		<div domIndex="1" class="time" :class="{domOn:domIndex==1}">{{showData[currentDataIndex].time}}</div>
		<div class="player">
			<div :domIndex="index+2" class="g-flexbox wrapbox" :class="{domOn:domIndex==index+2}" v-for="(i,index) in showData[currentDataIndex].data" >
				<div class="g-flex box">{{i.left}}</div>
				<div class="box box_2">
					<span :class="{on:isOn(index, childrenIndex), on2:isOn2(index, childrenIndex)}"  v-for="(j, childrenIndex) in i.value">{{j.name}}</span>
				</div>
				<div class="g-flex box">{{i.right}}</div>
  			</div>
		</div>
		<div :domIndex="currentDataLength()+2" :class="{domOn:domIndex==currentDataLength()+2}">提交</div>
  	</div>
</template>

<script>
import Vue from 'vue';
//import $ from '../../assets/zepto.min.js';
export default {
  name: 'index',
  data () {
    return {
		showData:[
			{
				time:"20180601",
				data:[
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
				]
			},{
				time:"20180602",
				data:[
					{
						left:"秘鲁",
						right:"丹麦",
						value:[
							{name:"胜"},
							{name:"平"},
							{name:"负"}
						]
					},{
						left:"秘鲁",
						right:"丹麦",
						value:[
							{name:"胜"},
							{name:"平"},
							{name:"负"}
						]
					},{
						left:"秘鲁",
						right:"丹麦",
						value:[
							{name:"胜"},
							{name:"平"},
							{name:"负"}
						]
					},{
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
				]
			}
		],
		domIndex:0,          //页面元素索引
		currentDataIndex:0,  //当前时间索引
		currentDataLength:function(){
			return this.showData[this.currentDataIndex].data.length;
		},
		playerIndex:{},
		// playerIndex:{
		// 	play_0_0:0,
		// 	play_0_1:0,
		// 	play_0_2:0,
		// 	play_0_3:0
		// },
		currentLineIndex:{   //当前列索引
			0:{
				len:3,
				line:0
			},
			1:{
				len:3,
				line:0
			},
			2:{
				len:3,
				line:0
			}

		},
		currentCol:{  //当前行的元素的索引
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
			let me  = this;
			this.forEachPlayer();
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
				    	me.setDomY("up")
				      break;
				    case 39: //右键
			      		me.setX("right");
				      	break;
				    case 40: //向下键
				    	me.setDomY("down")
				      	break;
				    default:
				      	break;
			  	}
			}
		},
		forEachPlayer(){ //初始化player index
			let me = this;
			let data = me.showData;
			for(var i=0;i<data.length;i++){
				for(var j=0;j<data[i].data.length;j++){
					me.playerIndex["play_" + i + "_"+j] = 0
				}
			}
		},
		setDomY(type){
			let me = this;
			if(type=="up"){
				me.domIndex--;
			}else{
				me.domIndex++;
			}
			
			if(me.domIndex*1<=0){
				me.domIndex = 0;
			}
			if(me.domIndex*1>=me.getAttrLength("div","domIndex")){
				me.domIndex = me.getAttrLength("div","domIndex")-1;
			}
		},
		getAttrLength(node,attr){
			let nodes = document.getElementsByTagName(node);
			let index=0;
			for(var i=0;i<nodes.length;i++){
				if(nodes[i].getAttribute(attr)){
					index++
				}
			}
			return index;
		},
		setX(type){
			let me = this;
			if(me.domIndex==1){   //选择日期
				if(type=="right"){
					me.currentDataIndex++
				}else{
					me.currentDataIndex--
				}
				if(me.currentDataIndex<=0){
					me.currentDataIndex = 0;
				}
				if(me.currentDataIndex>= me.showData.length){
					me.currentDataIndex = me.showData.length-1;
				}
			}

			if(me.domIndex>1 && me.domIndex < me.getAttrLength("div","domIndex")-1){ //选择胜负
				if(type=="right"){
					me.playerIndex["play_" + me.currentDataIndex + "_"+(me.domIndex-2)] ++;
				}else{
					me.playerIndex["play_" + me.currentDataIndex + "_"+(me.domIndex-2)] --;
				}
				if(me.playerIndex["play_" + me.currentDataIndex + "_"+(me.domIndex-2)]<=0){
					me.playerIndex["play_" + me.currentDataIndex + "_"+(me.domIndex-2)] = 0;
				}
				if(me.playerIndex["play_" + me.currentDataIndex + "_"+(me.domIndex-2)]>= 3){
					me.playerIndex["play_" + me.currentDataIndex + "_"+(me.domIndex-2)] = 2;
				}
				//console.log(123,"play_" + me.currentDataIndex + "_"+(me.domIndex-2), me["play_" + me.currentDataIndex + "_"+(me.domIndex-2)])
			}
		},
		isCurrent(dateIndex, index){
			var me  = this;
			if(dateIndex==me.currentDateIndex && 
				index==me.currentLineIndex[me.currentDateIndex].line){
				return "current";
			}
		},
		isOn(index, childrenIndex){
			var me = this;
			if(me.playerIndex["play_" + me.currentDataIndex + "_"+(me.domIndex-2)]==childrenIndex && (index==me.domIndex-2)){
				return true;
			}
			/*if(childrenIndex==me.currentCol[me.currentLine].col && index==me.currentLine){
					return true;
			}*/
		},
		isOn2(index, childrenIndex){
			var me = this;
			if(childrenIndex == me.playerIndex["play_" + me.currentDataIndex + "_"+index]){
				return true;
			}
			/*if(childrenIndex==me.currentCol[index].col){
					return true;
			}*/
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
	.domOn{
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
