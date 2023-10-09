<template>
	<view>
		<view class="cu-form-group">
			<view class="title">团队名称:</view>
			<input placeholder="" name="input">
		</view>
		<view class="cu-form-group2" @click="chooseImage">
			<view class="title3">团队logo:</view>
			<image class="img" src="img"></image>
		</view>
		<view class="text1">
			<view class="title2">团队简介:</view>
			<textarea class="text"></textarea>
		</view>
		<view class="cu-bar btn-group">
			<button class="cu-btn bg-green shadow-blur round2">确认修改</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
	          img:""
			}
		},
		methods: {
			chooseImage() {
				uni.chooseImage({
					count: 1,
					success: res => {
						this.img = res.tempFilePaths
					}
				})
			}
		}
	}
</script>

<style>
	.img {
		width: 60px;
	}
	
	.cu-form-group2 {
		height: 60px;
		/* bugFix weight? */
		/* weight: 375px; */
		width: 375px;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		margin-top: 21px;
		font-weight: bold;
	}
	.title3 {
	
		font-weight: bold;
		margin-left: 20px;
	}
	
	.title2 {
		font-weight: bold;
		padding-left: 20px;
		margin-bottom: 24px;
	}
	
	.title {
		font-weight: bold;
		margin-left: 6px;
	}
	
	.text {
		border-style: solid;
		border-width: 1px;
		border-color: #555555;
		height: 170px;
		/* bugFix */
		/* weight: 341px; */
		width: 341px;
		margin-left: 20px;
	
	}
	
	.cu-bar .btn-group {
		margin-top: 104px;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	
	.cu-bar .btn-group {
		margin-bottom: 75px;
	}
	
	.cu-btn .bg-blue .shadow-blur .round2 {
		width: 140px;
		height: 40px;
		opacity: 1;
		font-size: 16px;
		font-family: -400;
		font-weight: 400;
		margin-top: 75px;
	
	}
	
	.cu-btn .bg-green .shadow-blur .round {
		width: 140px;
		height: 40px;
		opacity: 1;
		font-size: 16px;
		font-family: -400;
		font-weight: 400;
		background: bg-blue;
	}
</style>
