<template>
	<view>
		<form>
			<view class="cu-form-group">
				<view class="title">活动名称:</view>
				<input placeholder="请输入活动名称" name="name" v-model="formData.name"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">活动日期:</view>
				<picker mode="date" :value="formData.holdTime" start="2015-09-01" end="2024-09-01" @change="DateChange">
					<view class="picker">
						{{formData.holdTime}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">活动地点:</view>
				<input placeholder="请输入活动地点" name="site" v-model="formData.site"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">主办单位:</view>
				<input placeholder="请输入举办单位" name="host" v-model="formData.host"></input>
			</view>
			<view class="cu-form-group2">
				<view class="title">活动logo：</view>
				<view class="img" @tap="ChooseImage" v-if="imgList">
					<image :src="imgList" mode="aspectFill"></image>
				</view>
				<view class="img solids" @tap="ChooseImage" v-if="!imgList">
					<text class='cuIcon-cameraadd'></text>
				</view>
			</view>
			<view class="text1">
				<view class="title">活动内容:</view>
				<textarea class="text" @input="textareaInput" placeholder="请输入活动内容" name='introduction'></textarea>
			</view>
			<view class="cu-bar btn-group">
				<view class="g-bg-theme button" @click="submit">提交申请</view>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				imgList:'',
				formData:{
					name:'',
					holdTime:'2021-07-30',
					site:'',
					host:'',
					logoUrl:'',
					introduction:''
				}
			}
		},
		methods: {
			ChooseImage(){
				uni.chooseImage({
					count: 1, //默认1
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						this.imgList = res.tempFilePaths
						console.log('临时文件路径',this.imgList[0])
					}
				});
			},
			textareaInput(e){
				this.formData.introduction = e.detail.value
			},
			DateChange(e) {
				this.formData.holdTime = e.detail.value
			},
			submit(){
				const cookie = uni.getStorageSync('cookie')
				const that = this;
				/*
				* 上传图片到服务器
				* */
				const tempFilePath = this.imgList[0];
				uni.uploadFile({
					url:'http://106.53.116.162:8080/image',
					filePath:tempFilePath,
					name:'image',
					success:(ImgRes)=>{
						console.log(ImgRes.data)
						that.formData.logoUrl = ImgRes.data
					},
					fail:(error)=>{
						console.log(error)
					}
				})
				console.log(that.formData)
				this.request({
					url:'/user/addEvent',
					method:'POST',
					data:that.formData,
					contentType:'application/json'
				}).then(res=>{
					console.log('成功',res)
					uni.showToast({
						title:'已发起',
						icon:'success',
						success: () => {
							uni.navigateBack({
								delta:1
							})
						}
					})
				},error=>{
					console.log('发起失败',error)
				})
			}
		}
	}
</script>

<style lang="scss">
	.cu-form-group2 {
		height: 160rpx;
		weight: 375px;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		font-weight: bold;
		padding-top:10rpx;
		padding-left: 35rpx;
		border-top: 1rpx solid #F0F0F0;
		border-bottom: 1rpx solid #F0F0F0;
		position: relative;
		.title{
			padding-top:36rpx;
		}
		.img {
			position: absolute;
			top:10rpx;
			right: 40rpx;
			height: 60px;
			width: 60px;
			text-align: center;
			font-size: 80rpx;
			padding-top: 20rpx;
			color: #F0F0F0;
			image{
				width: 90%;
				height: 90%;
			}
		}
	}
	.title{
		font-size: 36rpx;
		font-weight: bold;
	}
	.text1{
		margin-left: 35rpx;
		margin-top: 35rpx;
	}
	.text {
		border-radius: 15rpx;
		padding: 10rpx;
		border-style: solid;
		border-width: 1px;
		border-color: #555555;
		height: 170px;
		weight: 341px;
		padding: 5rpx;
		margin: 30rpx 0;
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
