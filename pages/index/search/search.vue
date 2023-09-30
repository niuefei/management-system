<template>
	<view>
		<view class="search">
			<text class="cuIcon cuIcon-search icon-search"></text>
			<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" confirm-type="search"></input>
		</view>
		<view class="tab" style="display: flex;flex-wrap:wrap;margin: auto 20rpx;">
			<view class="title" style="font-size: 34rpx;font-weight: bold;padding-top:20rpx">搜索结果：</view>
			<view class="tabbar">
				<view class="bg-white nav text-center">
					<view class="cu-item" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in tabs" :key="index" @tap="tabSelect" :data-id="index">{{item.name}}</view>
				</view>
			</view>
		</view>
		<!--综合-->
		<view v-if="tabs[0].isActive">
			<view class="cu-form-group margin-top news">
				<view class="title">
					<view class="tx">新闻</view>
				</view>
				<view v-for="(item,index) in news_list" :key="index" class="item_list">
					<view class="item" >{{item.detail}}</view>
				</view>
			</view>
			<!-- 用户 -->
			<view class="cu-form-group margin-top student">
				<view class="title">
					<view class="tx">用户</view>
				</view>
				<view class="student_list">
					<view v-for="(item,index) in student_list" :key="index" class="stu_item">
						<view class="top">
							<view class="cu-avatar xl round margin-left" :style="{backgroundImage:'url('+item.icon_url+')'}"></view>
							<view class="tx">
								<view class="name">{{item.name}}</view>
								<view class="occu">{{item.occu}}</view>
								<view class="institue">{{item.institue}}</view>
							</view>
						</view>
						<view class="bar" style="">
							<view class="mine">个人主页</view>
							<view class="message">发消息</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 名师 -->
			<view class="cu-form-group margin-top educ">
				<view class="title">
					<view class="tx">名师</view>
				</view>
				<view class="teacher_list">
					<view v-for="(item,index) in teacher_list" :key="index" class="tea_item">
						<view class="top">
							<view class="cu-avatar xl round margin-left" :style="{backgroundImage:'url('+item.icon_url+')'}"></view>
							<view class="tx">
								<view class="name" style="">{{item.name}}</view>
								<view class="occu" style="">{{item.occu}}</view>
								<view class="institue">{{item.institu}}</view>
							</view>
						</view>
						<view class="bar" style="">
							<view class="mine">个人主页</view>
							<view class="message">发消息</view>
						</view>
					</view>
				</view>
			</view>
			<view class="tips" style="width: 100%;height: 140px;text-align: center;">没有更多结果啦~</view>
		</view>
		<!--最新要闻-->
		<view v-else-if="tabs[1].isActive">
			<view class="cu-form-group margin-top news">
				<view class="title">
					<view class="tx">新闻</view>
				</view>
				<view class="item_list" style="margin-left: 0;">
					<view class="item" >通知：关于人工智能
					<view class="text-gray text-sm">True mastery of any skill takes a lifetime</view>
					</view>
					<view class="item">通知：关于人工智能
					<view class="text-gray text-sm">True mastery of any skill takes a lifetime</view>
					</view>
					<view class="item">通知：关于人工智能
					<view class="text-gray text-sm">True mastery of any skill takes a lifetime</view>
					</view>
				</view>
				<view class="content">
					<view class="cu-avatar square lg">通知</view>
					<view class="tx">
						<view class="text-grey">通知：<text class="text-abc">关于人工智能</text></view>
						<view class="text-gray text-sm detail">
							True mastery of any skill takes a lifetime
						</view>
					</view>
				</view>
				<view class="content">
					<view class="cu-avatar square lg">通知</view>
					<view class="tx">
						<view class="text-grey">通知：<text class="text-abc">关于人工智能</text></view>
						<view class="text-gray text-sm detail">
							True mastery of any skill takes a lifetime
						</view>
					</view>
				</view>
			</view>
			<view class="tips" style="width: 100%;height: 140px;text-align: center;">没有更多结果啦~</view>
		</view>
		<!-- 用户 -->
		<view v-else-if="tabs[2].isActive">
			<view class="cu-form-group margin-top educ">
				<view class="title">
					<view class="tx">用户</view>
				</view>
				<view class="student_list">
					<view v-for="(item,index) in student_list" :key="index" class="stu_item">
						<view class="top">
							<view class="cu-avatar xl round margin-left" :style="{backgroundImage:'url('+item.icon_url+')'}"></view>
							<view class="tx">
								<view class="name">{{item.name}}</view>
								<view class="occu">{{item.occu}}</view>
								<view class="institue">{{item.institue}}</view>
							</view>
						</view>
						<view class="bar" style="">
							<view class="mine">个人主页</view>
							<view class="message">发消息</view>
						</view>
					</view>
				</view>
			</view>
			<view class="tips" style="width: 100%;height: 140px;text-align: center;">没有更多结果啦~</view>
		</view>
		<!-- 名师 -->
		<view v-else="tabs[3].isActive">
			<view class="cu-form-group margin-top educ">
				<view class="title">
					<view class="tx">名师</view>
				</view>
				<view class="teacher_list">
					<view v-for="(item,index) in teacher_list" :key="index" class="tea_item">
						<view class="top">
							<view class="cu-avatar xl round margin-left" :style="{backgroundImage:'url('+item.icon_url+')'}"></view>
							<view class="tx">
								<view class="name" style="">{{item.name}}</view>
								<view class="occu" style="">{{item.occu}}</view>
								<view class="institue">{{item.institue}}</view>
							</view>
						</view>
						<view class="bar" style="">
							<view class="mine">个人主页</view>
							<view class="message">发消息</view>
						</view>
					</view>
				</view>
			</view>
			<view class="tips" style="width: 100%;height: 140px;text-align: center;">没有更多结果啦~</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				InputBottom:0,
				TabCur: 0,
				url:'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
				tabs:[
					{
						name:"综合",
						isActive:true
					},
					{
						name:"新闻",
						isActive:false
					},
					{
						name:"用户",
						isActive:false
					},
					{
						name:"名师",
						isActive:false
					}
				],
				// 搜索筛选后的新闻列表
				news_list:[
					{
						detail:'通知：关于人工智能'
					},
					{
						detail:'通知：关于人工智能'
					},
					{
						detail:'通知：关于人工智能'
					}
				],
				// 搜索筛选后的名师列表
				teacher_list:[
					{
						icon_url:'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
						name:'周杰伦',
						occu:'创业导师',
						institue:'xx学院'
					},
					{
						icon_url:'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
						name:'周杰伦',
						occu:'创业导师',
						institue:'台湾创业学院'
					},
					{
						icon_url:'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
						name:'周杰伦',
						occu:'创业导师',
						institue:'xx团队'
					},
					{
						icon_url:'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
						name:'周杰伦',
						occu:'创业导师',
						institue:'xx团队'
					}
					],
					// 搜索筛选后的学生列表
					student_list:[
						{
							icon_url:'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
							name:'周杰伦',
							occu:'学生',
							institue:'xx团队'
						},
						{
							icon_url:'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
							name:'周杰伦',
							occu:'学生',
							institue:'xx团队'
						},
						{
							icon_url:'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
							name:'周杰伦',
							occu:'学生',
							institue:'xx团队'
						},
						{
							icon_url:'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
							name:'周杰伦',
							occu:'学生',
							institue:'xx团队'
						}
					]
			};
				
				
		},
		methods:{
			InputFocus(e) {
				console.log(e)
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				console.log(e)
				this.InputBottom = 0
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.tabs.forEach((v,i)=>i===this.TabCur?v.isActive=true:v.isActive=false);
			}
		}
	}
</script>

<style lang="scss" scoped>
.search {
	display: flex;
	flex-direction: row;
	background-color: #EDEFF2;
    border-radius: 20px;
    width: 650rpx;
    margin: 20rpx auto;
    padding: 10rpx;
	.icon-search {
		color: #2771B1;
		font-size: 50rpx;
		font-weight: bold;
		margin-left: 20rpx;
	}
	input{
		font-size: 40rpx;
		padding: 10rpx;
	}
}
.tab{
	.tabbar{
		margin-top:20rpx;
		.bg-white{
			justify-content: center;
			align-items: center;
			height: 56rpx;
			border: 1rpx solid grey;
			border-radius: 112px;
			.cu-item{
				line-height: 56rpx;
				margin: 0;
				height: 56rpx;
			}
			.text-blue{
				width: 59px;
				color: black;
				background-color: #2771b1;
				border-radius: 112px;
			}
		}
	}
}
.cu-form-group{
	display: flex;
	flex-wrap: wrap;
	.title{
		width: 100%;
		display: flex;
		font-weight: 600;
		font-size: 40rpx;
		line-height: 100rpx;
		position: relative;
		.cuIcon-right{
			position: absolute;
			right: 0;
			float: right;
			color: black;
		}
	}
	.item_list{
		margin-top:20rpx;
		width: 100%;
		.item{
			width: 100%;
			line-height: 60rpx;
			border-bottom:1rpx solid #F0F0F0 ;
		}
	}	
}

.student_list{
	margin-top:40rpx;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	.stu_item{
		margin-left: 10rpx;
		margin-right: 24rpx;
		margin-bottom: 40rpx;
		padding-top: 20rpx;
		width: 45%;
		border-radius: 10px;
		box-shadow: 0px 0px 5px 0px #aaaaaa;
		display: flex;
		flex-direction: column;
		.top{
			padding-top:10rpx;
			flex:1;
			display: flex;
			flex-direction: row;
			.tx{
				margin-left: 20rpx;
				.name{
					font-size: 40rpx;
					font-weight: bold;
					line-height: 50rpx;
					margin-bottom: 10rpx;
				}
				.occu{
					margin:10rpx 0;
					font-size: 28rpx;
					line-height: 30rpx;
				}
				.institue{
					font-size: 28rpx;
					line-height: 30rpx;
				}
			}
		}
		.bar{
			width: 95%;
			align-items: center;
			justify-content: center;
			text-align: center;
			margin: 60rpx 10rpx 20rpx 10rpx;
			flex:1;
			display:flex;
			flex-direction: row;
			font-size: 30rpx;
			font-weight: bold;
			color:#FFFFFF;
			line-height: 80rpx;
			.mine{
				width: 50%;
				padding: 0 10rpx;
				border-radius: 66rpx 0 0 66rpx;
				background-color: #4c96cb;
			}
			.message{
				width: 50%;
				border-radius: 0 66rpx 66rpx 0;
				background-color: #2771b1;
			}
			.team{
				width: 70%;
				border-radius: 66rpx;
				background-color: #4c96cb;
			}
		}
	}
}

.teacher_list{
	margin-top:40rpx;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	.tea_item{
		margin-left: 10rpx;
		margin-right: 24rpx;
		margin-bottom: 40rpx;
		padding-top: 20rpx;
		width: 45%;
		border-radius: 10px;
		box-shadow: 0px 0px 5px 0px #aaaaaa;
		display: flex;
		flex-direction: column;
		.top{
			padding-top:10rpx;
			flex:1;
			display: flex;
			flex-direction: row;
			.tx{
				margin-left: 20rpx;
				.name{
					font-size: 40rpx;
					font-weight: bold;
					line-height: 50rpx;
					margin-bottom: 10rpx;
				}
				.occu{
					margin:10rpx 0;
					font-size: 28rpx;
					line-height: 30rpx;
				}
				.institue{
					font-size: 28rpx;
					line-height: 30rpx;
				}
			}
		}
		.bar{
			width: 95%;
			align-items: center;
			justify-content: center;
			text-align: center;
			margin: 60rpx 10rpx 20rpx 10rpx;
			flex:1;
			display:flex;
			flex-direction: row;
			font-size: 30rpx;
			font-weight: bold;
			color:#FFFFFF;
			line-height: 80rpx;
			.mine{
				width: 50%;
				padding: 0 10rpx;
				border-radius: 66rpx 0 0 66rpx;
				background-color: #4c96cb;
			}
			.message{
				width: 50%;
				border-radius: 0 66rpx 66rpx 0;
				background-color: #2771b1;
			}
		}
	}
}
.content{
	margin-top:30rpx;
	display: flex;
	.tx{
		margin: 20rpx;
		.detail{
			margin-top:10rpx;
		}
	}
}

</style>
