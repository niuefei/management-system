<template>
	<view>
		<view class="container">
			<view class="top">
				<image class="Img"  style="" :src="userInfo.pictureUrl"></image>
				<view class="detail">
					<view class="name">{{userInfo.realName}}</view>
					<view class="self_profile">所属团队:{{userInfo.unit==null?'暂无':userInfo.unit}}</view>
				</view>
				<view class="message" @click="sendMessage">发消息</view>
			</view>
		</view>
		<view class="profile">
			<view class="p_title">基本信息</view>
			<view class="p_detail">
				<view>年级：<text>{{userInfo.grade==null?'暂无':userInfo.grade}}</text></view>
				<view>学院：<text>{{userInfo.academy==null?'暂无':userInfo.academy}}</text></view>
				<view>专业：<text>{{userInfo.major==null?'暂无':userInfo.major}}</text></view>
				<view>个人简介：<text>{{userInfo.introduction==null?'这个人很懒，什么也没留下。':userInfo.introduction}}</text></view>
			</view>
		</view>
		<view class="pj">
			<view class="pj_title">参与项目</view>
			<view v-if="project.length!=0" class="pj_detail">
				<view  v-for="(item) in project" class="pj_list" :key="item.id" @click="to_Detail(item.id)">
					<view class="Img"><image mode="widthFix" :src="item.pictureUrl"></image></view>
					<view class="tx">
						<view>项目：<text>{{item.pname}}</text></view>
						<view>奖项：<text>{{item.prizes}}</text></view>
					</view>
				</view>
				
			</view>
			<view v-else class="pj_detail">暂无参与项目~</view>
		</view>
		<view class="hon" @click="to_Show">
			<view class="cu-form-group margin-top"  >
				<view class="title" >荣誉墙</view>
				<text class="cuIcon-right text-gray"></text>
			</view>
			<view v-if="competition.length!=0" >
					<view class="competition" v-for="(item) in competition" :key="item.id">
						<view class="item" v-if="item.display=='1'">
							<image mode="widthFix" src="https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00662-2358.jpg"></image>
							<view class="block1">
								<text>比赛名称</text>
								<text>{{item.contestName}}</text>
							</view>
							<view class="block2">
								<text>奖项：</text>
								<text>{{item.prizeLevel}}</text>
							</view>
						</view>
					</view>
				</view>
			<view v-if="paper.length!=0" >
				<view class="competition" v-for="(item) in paper" :key="item.id">
					<view class="item" v-if="item.display=='1'">
						<image mode="widthFix" src="https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00662-2358.jpg"></image>
						<view class="block1">
							<text>论文</text>
							<text>{{item.thesisTitle}}</text>
						</view>
						<view class="block2">
							<text>专区：</text>
							<text>{{item.publicationName}}</text>
						</view>
						<view class="block2">
							<text>状态：</text>
							<text>{{item.publicationState}}</text>
						</view>
					</view>
				</view>
			</view>
			<view v-if="patent.length!=0">
				<view v-for="(item) in patent" :key="item.id" class="competition">
					<view class="item" v-if="item.display=='1'">
						<image mode="widthFix" src="https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00662-2358.jpg"></image>
						<view class="block1">
							<text>专利</text>
							<text>{{item.patentName}}</text>
						</view>
						<view class="block2">
							<text>类别</text>
							<text>{{item.patentType}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="tips">到底了啦~ </view>
	</view>
</template>

<script>
	import Vue from 'vue'
	export default {
		data() {
			return {
				competition:[],
				paper:[],
				patent:[],
				project:[],
				userInfo:{} 
			}
		},
		methods: {
			to_Show(){
				uni.navigateTo({
					url:'../../mine/Show/Show'
				})
			},
			sendMessage(){
				uni.navigateTo({
					url:'../../message/ChatMessage/ChatMessage'
				})
			},
			to_Detail(pid){
				uni.navigateTo({
					url:'../myProject_detail/myProject_detail?pid='+pid
				})
			},
			getMyProject(){
				this.request({
					url:'/user/projects',
					method:'GET'
				}).then(res=>{
					if(res.statusCode==200){
						this.project = res.data;
					}
					
				})
			},
			getAllProject(){
				this.request({
					url:'/project/selectAllProjects',
					method:'GET'
				}).then(res=>{
					this.competition = res.data[0]
					this.paper = res.data[2]
					this.patent = res.data[1]
				},err=>{
					console.log("AllProjects失败",err)
				})
			}
		},
		onLoad(){
			this.getAllProject();
			this.getMyProject()
			this.userInfo = Vue.prototype.globalData.settings.wxInfo;
		}
		
	}
</script>

<style lang="scss" scoped>
.container{
	border-top: 5rpx solid #4c96cb;
	background-color: #4c96cb;
	height: 200rpx;
	width: 100%;
	position: relative;
	.top{
		width: 100%;
		height: 250rpx;
		align-items: center;
		background-color: #FFFFFF;
		border-radius: 60rpx 60rpx 0 0;
		display: flex;
		position: relative;
		border-bottom: 1rpx solid #F0F0F0;
		.Img{
			// padding-top:40rpx;
			width: 80px;
			height: 80px;
			margin-left: 20rpx ;
			// box-shadow:-5px -5px 1px #2771B1 inset;
			border-radius: 50%;
		}
		.detail{
			margin:auto 40rpx;
			.name{
				font-size: 21px;
				font-weight: bold;
			}
			// .self_profile{
				
			// }
		}
		.message{
			text-align: center;
			padding-top:12rpx ;
			position: absolute;
			right: 60rpx;
			font-size: 28rpx;
			font-weight: 400;
			color: #fff;
			background-color: #4c96cb;
			width: 71px;
			height: 30px;
			border-radius: 10rpx;
		}
	}
}
.profile{
	margin-top:80rpx;
	.p_title{
		height: 100rpx;
		font-weight: bold;
		font-size: 32rpx;
		text-align: center;
	}
	.p_detail{
		background-color: #F0F0F0;
		padding: 30rpx;
		font-size: 32rpx;
		line-height: 100rpx;
		
	}
}
.pj{
	margin-top:60rpx;
	.pj_title{
		height: 100rpx;
		font-weight: bold;
		font-size: 32rpx;
		text-align: center;
	}
	.pj_detail{
		background-color: #F0F0F0;
		padding: 30rpx;
		font-size: 32rpx;
		line-height: 100rpx;
		.pj_list{
			border-radius:40rpx;
			margin-bottom: 40rpx;
			background-color: #fff;
			display: flex;
			padding: 20rpx;
			.Img{
				padding: 20rpx;
				width: 200rpx;
				height: 200rpx;
				image{
					width: 160rpx;
					height: 160rpx;
				}
			}
			.tx{
				line-height: 60rpx;
				font-size: 32rpx;
				font-weight: bold;
				margin-left: 20rpx;
				text{
					font-weight: 400;
				}
			}
		}
	}
}
.competition{
		.item{
			margin: 20rpx;
			padding: 20rpx;
			display: flex;
			border: 2rpx solid #f2f2f2;
			border-radius: 10rpx;
			image{
				width: 130rpx;
				height: 130rpx;
				border-radius: 10rpx;
			}
			.block1{
				margin:10rpx;
				flex:2;
				display: flex;
				flex-direction: column;
				text-align: center;
				text{
					font-size: 32rpx;
				}
				text:first-child{
					font-weight: bold;
				}
			}
			.block2{
				margin:10rpx;
				flex:2;
				display: flex;
				flex-direction: column;
				text-align: center;
				text{
					font-size: 32rpx;
				}	
				text:first-child{
					color: #4696CB;
					font-weight: bold;
				}
			}
		}
		
	}

.tips{
	height: 100rpx;
	text-align: center;
	padding-top: 40rpx;
}
.title{
	font-size: 32rpx;
	font-weight: bold;
}
</style>
