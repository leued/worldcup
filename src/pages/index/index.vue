<template>
  	<div>
		<div domIndex="0" class="time domOn"><span>猜胜负</span></div>
		<div domIndex="1" class="time">{{showData[currentDataIndex].time}}</div>
		<div>
			<div :domIndex="index+2" class="g-flexbox wrapbox" v-for="(i,index) in showData[currentDataIndex].data" >
				<div class="g-flex box">{{i.left}}</div>
				<div class="box box_2">
					<span :class="{on:isOn(index, childrenIndex), on2:isOn2(index, childrenIndex)}"  v-for="(j, childrenIndex) in i.value">{{j.name}}</span>
				</div>
				<div class="g-flex box">{{i.right}}</div>
  			</div>
		</div>
		<div :domIndex="currentDataLength()+2">提交</div>
  	</div>
</template>

<script>
import Vue from 'vue';
import $ from '../../assets/zepto.min.js';
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
			var me  = this;
			document.onkeydown=function(e){
	  			e=window.event||e;
			  	switch(e.keyCode){
				  	case 13:
				  		me.enterPlay();
				  		break;
				    case 37: //左键
					    //me.currentCol[me.currentLine].col--;
				      	me.setX("left");
				     	break;
				    case 38: //向上键
				    	me.setDomY("up")
				      	//me.setY("up");
				      break;
				    case 39: //右键
				      	//me.currentCol[me.currentLine].col++;
			      		me.setX("right");
				      	break;
				    case 40: //向下键
				    	me.setDomY("down")
			      		//me.setY("down");
				      	break;
				    default:
				      	break;
			  	}
			}
		},
		setDomY(type){
			var me = this;
			if(type=="up"){
				me.domIndex--;
			}else{
				me.domIndex++;
			}
			
			if(me.domIndex*1<=0){
				me.domIndex = 0;
			}
			if(me.domIndex*1>=$('[domIndex]').length){
				me.domIndex = $('[domIndex]').length-1;
			}
			$('[domIndex]').removeClass('domOn');
			$('[domIndex="'+me.domIndex+'"]').addClass('domOn');

			if(me.domIndex==2){
			}
		},
		setY(type){
			var me = this;
			if(type=="up"){
				me.currentLineIndex[me.currentDateIndex].line--;
			}else{
				me.currentLineIndex[me.currentDateIndex].line++;
			}
			if(me.currentLineIndex[me.currentDateIndex].line<0){
				me.currentLineIndex[me.currentDateIndex].line=0;
			}
			if(me.currentLineIndex[me.currentDateIndex].line >= me.currentLineIndex[me.currentDateIndex].len){
				me.currentLineIndex[me.currentDateIndex].line = me.currentLineIndex[me.currentDateIndex].len-1;
			} 


			/*me.currentCol[me.currentLine] = {
				col:me.currentCol[me.currentLine].col ? me.currentCol[me.currentLine].col : 0
			}*/
		},
		setX(type){
			var me = this;
			if(me.domIndex==1 && type=="right"){
				me.currentDataIndex++
			}
			if(me.domIndex==1 && type=="left"){
				me.currentDataIndex--
			}

			// if(me.currentCol[me.currentLine].col<0){
			// 	me.currentCol[me.currentLine].col=0;
			// }
			// if(me.currentCol[me.currentLine].col >= 3){
			// 	me.currentCol[me.currentLine].col = 2;
			// } 
			// me.currentCol[me.currentLine] = {
			// 	col:me.currentCol[me.currentLine].col
			// }
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
			/*if(childrenIndex==me.currentCol[me.currentLine].col && index==me.currentLine){
					return true;
			}*/
		},
		isOn2(index, childrenIndex){
			var me = this;
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
