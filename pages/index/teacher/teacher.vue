<template>
	<view>
		<view class="cu-form-group margin-top educ">
			<view class="teacher_list">
				<view v-for="(item,index) in teacher_list" :key="index" class="tea_item">
					<!-- 传参 -->
					<navigator url="../teacher_profile/teacher_profile" class="top">
						<view class="cu-avatar xl round margin-left" :style="{backgroundImage:'url('+item.icon_url+')'}"></view>
						<view class="tx">
							<view class="name">{{item.name}}</view>
							<view class="occu">{{item.occu}}</view>
							<view class="institue">{{item.institu}}</view>
						</view>
					</navigator>
					<view class="bar" style="">
						<view class="mine">个人主页</view>
						<view class="message">发消息</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.educ{
	display: flex;
	flex-wrap: wrap;
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
}

</style>
