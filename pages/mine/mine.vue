<template>
	<view>
		<view class="g-bg-theme bg"></view>
		<view class="flex container" @click="to_Profile">
			<image class="Img"  style="" :src="userInfo.pictureUrl"></image>
			<view class="flex flex-direction margin-left" >
				<text class="text-xl text-bold">{{userInfo.userName}}</text>
				<view class="margin-top-xs">个人简介</view>
			</view>
		</view>
		<view class="bgCover">
			<view class="item" v-for="item in items" @click="handleTab(item.id)" :key="item.id">
				<image mode="widthFix" :src="item.image_url"></image>
				<text>{{item.title}}</text>
			</view>
			<!-- 模态框 -->
			<view class="cu-modal" :class="modalName=='Image'?'show':''">
				<view class="cu-dialog">
					<view class="bg-img" style="background-image: url('https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00662-2358.jpg');height:400rpx;padding: 20rpx;">
						<view class="cu-bar justify-end text-white">
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close bg-red"></text>
							</view>
						</view>
					</view>
					<view class="cu-bar  bg-white bar">
						<view class="action margin-0 flex-sub  solid-left btn" @tap="to_Createactivity">发起活动</view>
						<view class="action margin-0 flex-sub  solid-right" @tap="to_Activitymanager">活动管理</view>
					</view>
				</view>
			</view>
			
			<!-- <view class="item">
				<text class="icon icon-xiangmuku margin-right-xs"></text>
				<view @click="to_Myprojct">我的项目</view>
			</view>
			<view class="item">
				<text class="icon icon-bianxie margin-right-xs"></text>
				<view @click="to_projct_ed">项目管理</view>
			</view>
			<view class="item">
				<text class="icon icon-tuandui1 margin-right-xs"></text>
				<view @click="to_Myteam">我的团队</view>
			</view>
			<view class="item">
				<text class="icon icon-guanli margin-right-xs"></text>
				<view @click="to_Teammajor">团队管理</view>
			</view> -->
		</view>
		<view class="solid-bottom text-item" @click="more">更多功能</view>
		<view class="g-bg-theme button" @click="Out">退出登录</view>
	</view>
</template>

<script>
	import Vue from 'vue';
	export default {
		data() {
			return {
				items:[
					{
						id:0,
						title:'活动',
						image_url:'../../static/mine_image/image-20211016141948797.png'
					},
					{
						id:1,
						title:'展示',
						image_url:'../../static/index_image/myTeam.png'
					},
					{
						id:2,
						title:'设置',
						image_url:'../../static/mine_image/image-20211016142005220.png'
					}
				],
				modalName:null,
				userInfo:{}
			};
		},
		onLoad:function(options) {
				this.userInfo = Vue.prototype.globalData.settings.wxInfo;
				console.log(this.userInfo)
		},
		methods:{
			// 显示选择模态框
			showModal(name) {
				this.modalName = name
			},
			// 隐藏模态框
			hideModal(e) {
				this.modalName = null
			},
			handleTab(e){
				switch(e){
					case 0:
						this.showModal('Image')
						break;
					case 1:
						this.to_Show()
						break;
					case 2:
						this.to_Set()
						break;
				}
			},
			to_Show(){
				uni.navigateTo({
					url:'./Show/Show'
				})
			},
			to_Createactivity(){
				this.modalName = null;
				uni.navigateTo({
					url:"./Create_activity/Create_activity"
				})
			},
			to_Activitymanager(){
				this.modalName = null;
				uni.navigateTo({
					url:"./Activity_manager/Activity_manager"
				})
			},
			to_Set(){
				uni.navigateTo({
					url:"./Set/Set"
				})
			},
			to_Profile(){
				uni.navigateTo({
					url:'../index/teacher_profile/teacher_profile'
				})
			},
			more(){
				uni.showModal({
					content:'内容暂未开放'
				})
			},
			Out(){
				uni.showModal({
					content:'确定退出登录吗？',
					success:(res)=>{
						if(res.confirm){
							uni.showToast({
								title:'暂不支持',
								icon:'none'
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.bg {
		position: absolute;
		height: 100rpx;
		width: 100%;
		z-index: -1;
	}
	.Img{
		width: 160rpx;
		height: 160rpx;
		border-radius: 50%;
	}

	.container {
		background-color: #FFF;
		border-radius: 20px 20px 0 0;
		padding: 40rpx;
		align-items: center;

		.avatar {
			width: 128rpx;
			height: 128rpx;
			border-radius: 50%;
			overflow: hidden;
		}
	}

	.bgCover {
		width: 660rpx;
		background: #81C3D7;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		padding: 56rpx;
		justify-content: space-between;
		margin-bottom: 50rpx;
		border-radius: 10rpx;
		.item {
			display: flex;
			flex-direction: column;
			padding: 20rpx;
			width: 160rpx;
			height: 160rpx;
			background-color: #fff;
			border-radius: 10px;
			margin-bottom: 10rpx;
			margin-top: 10rpx;
			align-items: center;
			justify-content: center;
			font-weight: bold;
			image{
				width: 80rpx;
				height: 80rpx;
			}
		}
	}
	
	.text-item {
		padding: 30rpx 50rpx;
		font-weight: bold;
	}
	
	.button {
		font-weight: bold;
		height: 80rpx;
		width: 280rpx;
		margin: 30rpx auto;
		line-height: 80rpx;
		text-align: center;
		border-radius: 5px;
	}
	
</style>
