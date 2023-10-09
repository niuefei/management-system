<template>
	<view>
		<view class="content">
			<!-- url传参 会遍历数组 -->
			<navigator v-for="(item) in newsList" :key="item.title" :url="'../news_detail/news_detail?nid='+item.id" open-type="navigate" class="content_list">
				<view class="img"><image mode="widthFix" :src="item.pictureUrl"></image></view>
				<view class="tx">
					<view class="text-weight">通知：<text class="text-abc">{{item.title}}</text></view>
					<view class="text-gray text-sm detail">
						{{item.title}}
					</view>
				</view>
			</navigator>
			<view class="item_list">
				<navigator v-for="(item) in newsList" :key="item.title" :url="'../news_detail/news_detail?nid='+item.id" open-type="navigate" class="item" >通知：关于人工智能
					<view class="text-gray text-sm">{{item.title}}</view>
				</navigator>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newsList:[]
			}
		},
		methods: {
			getNewList(){
				this.request({
					url:'/news/selectNews',
					method:'GET'
				}).then(res=>{
					this.newsList = res.data
				},err=>{
					console.log('最新要闻列表请求失败',err)
				})
			},
		},
		onLoad(){
			this.getNewList()
		}
	}
</script>

<style lang="scss" scoped>
.content{
	margin: 40rpx 20rpx;
	.content_list{
		display: flex;
		border-bottom: 1rpx solid #F0F0F0;
		.img{
			width: 60px;
			height: 60px;
		}
		.tx{
			margin: 20rpx;
			.detail{
				margin-top:10rpx;
			}
			.text-weight{
				font-size: 28rpx;
				font-weight: bold;
			}
		}
	}
	.item_list{
		margin-top:20rpx;
		width: 100%;
		.item{
			font-size: 28rpx;
			font-weight: bold;
			width: 100%;
			line-height: 50rpx;
			border-bottom:1rpx solid #F0F0F0 ;
			.text-gray{
				font-weight: 0;
			}
		}
	}	
}

</style>
