<template>
	<view>
		<view class="news_detail">
			<view class="title">{{newsDetail.title}}</view>
			<text class="publisher">校团委</text>
			<text class="time">{{newsDetail.createTime | formatDate('-')}}</text>
			<view class="content">
				<view class="img">
						<image :src="newsDetail.pictureUrl"></image>
					</view>
					<view class="tx">{{newsDetail.content}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newsDetail:{}
			}
		},
		methods: {
			getNewsDetail(id){
				const nid = parseInt(id)
				this.request({
					url:'/news/selectNewsById',
					method:'POST',
					data:{nid},
					contentType:'application/x-www-form-urlencoded'
				}).then(res=>{
					this.newsDetail = res.data
				},err=>{
					console.log('最新要闻详情请求失败',err)
				})
			}
		},
		filters:{
				// 时间戳处理
				formatDate: function(value,spe='/') {
				   let data= new Date(value);
				   console.log(data)
				   let year = data.getFullYear();
				   let month = data.getMonth() + 1;
				   let day = data.getDate();
				   month = month >= 10 ? month : "0" + month;
				   day = day >= 10 ? day : "0" + day;
				   return `${year}${spe}${month}${spe}${day}`;
			}
		},
		onLoad(options){
			this.getNewsDetail(options.nid)
		}
	}
</script>

<style lang="scss" scoped>
.news_detail{
	.title{
		text-align: left;
		font-size: 40rpx;
		font-weight: bold;
		margin: 20rpx;
	}
	.publisher{
		margin-left: 20rpx;
		color: #46BFDF;
	}
	.time{
		margin: 20rpx;
	}
	.content{
		text-align: center;
		align-items: center;
		justify-content: center;
		background-color: #F0F0F0;
		.img{
			image{
				margin:20rpx auto;
				width: 300px;
				height: 170px;
			}
		}
		.tx{
			margin: 40rpx 20rpx;
			line-height: 30rpx;
		}
	}
}
</style>
