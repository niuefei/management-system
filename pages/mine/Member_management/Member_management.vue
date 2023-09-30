<template>
	<view>
		<view class="cu-form-group1">
			<view class="title">项目名称</view>
			<view class="modify">修改</view>
		</view>
		<view class="cu-form-group2">
			<view class="title1">成员管理</view>
			<view class="cu-bar search bg-white">
				<view class="search-form radius">
					<text class="cuIcon-search"></text>
					<input @blur="InputBlur" :adjust-position="false" type="text" placeholder=""
						confirm-type="search"></input>
				</view>
			</view>
		</view>
		<view class="cu-form-group2">
			<view class="tips">搜索结果</view>
			<view class="mem-list">
				<view class="mem-item">
					<view class="cu-avatar xl round margin-left Img"
						style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg);">
					</view>
					<view class="tx">周杰伦</view>
					<button class="cu-btn bg-blue1 margin-tb-sm" @click="addMem(1)">添加</button>
				</view>
				<view class="mem-item">
					<view class="cu-avatar xl round margin-left Img"
						style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg);">
					</view>
					<view class="tx">周杰伦</view>
					<button class="cu-btn bg-red margin-tb-sm">删除</button>
				</view>
				<view class="mem-item">
					<view class="cu-avatar xl round margin-left Img"
						style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg);">
					</view>
					<view class="tx">周杰伦</view>
					<button class="cu-btn bg-red margin-tb-sm">删除</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pid:''

			}
		},
		methods: {
			addMem(uid){
				const id = parseInt(this.pid)
				console.log(id)
				this.request({
					url:'/project/changeMemStatus',
					method:'POST',
					data:{pid:id,uid,status:"1"},
					contenType:'application/x-www-form-urlencoded'
				}).then(res=>{
					wx.showToast({
						title:'添加成功',
						duration:4000
					})
				},err=>{
					wx.showToast({
						title:'添加失败',
						duration:4000
					})
				})
			},
			InputBlur(e){
				const value = e.detail.value;
				
			}
		},
		onLoad(options){
			this.pid = options.pid
		}
	}
</script>

<style scoped lang="scss">
	image {
		margin: 20rpx 30rpx;
		height: 60px;
		width: 60px;
	}

	.cu-form-group1 {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		border-bottom: 1rpx solid #F0F0F0;
	}

	.title {
		margin: 30rpx;
		font-size: 36rpx;
		font-weight: bold;
	}

	.modify {
		margin: 30rpx;
		font-size: 28rpx;
	}

	.title1 {
		font-size: 32rpx;
		width: 100%;
		line-height: 80rpx;
		margin: 0 30rpx;
	}

	.title2 {
		font-size: 24rpx;
		margin: 0 30rpx;
	}

	.tips {
		color: red;
		font-size: 24rpx;
		line-height: 32rpx;
		margin: 0 30rpx;
	}

	.mem-list {
		display: flex;
		margin-left: 30rpx;
		flex-wrap: wrap;

		.mem-item {
			margin-top: 30rpx;
			width: 30%;
			justify-content: center;
			align-items: center;
			text-align: center;

			.tx {
				font-size: 34rpx;
				padding-left: 10rpx;
				line-height: 80rpx;
				font-weight: bold;
			}

		}
	}

	.bg-blue1 {
		background-color: #4c96cb;
		color: #fff;
	}

	.mem-list1 {
		padding: 10rpx 0;

		.mem-item1 {
			border-bottom: 1rpx solid #F0F0F0;
			clear: both; //清楚浮动
			padding: 10rpx 30rpx;

			.Img {
				width: 50px;
				height: 50px;
				margin: 0 30rpx;
			}

			.tx1 {
				font-size: 24rpx;
			}

			button {
				margin-right: 20rpx;
				float: right;
			}
		}
	}
</style>
