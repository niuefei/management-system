<template>
	<view class="">
		<view class="cu-form-group"  @click="chooseImage">
			<view class="title">
				头像
			</view>
			<image class="head_Img" :src="userInfo.pictureUrl"></image>
		</view>
		<view class="cu-form-group">
			<view class="title">昵称</view>
			<input v-model="userInfo.userName" placeholder="请输入昵称" class="name_input">
		</view>
		<view class="cu-form-group">
			<view class="title">个人简介</view>
			<textarea v-model="userInfo.introduction" placeholder="请输入个人简介" class="pc_Incontent"></textarea>
		</view>
		<view class="cu-form-group">
			<view class="title">职业</view>
			<input v-model="userInfo.job" placeholder="请输入职业" disabled class="name_input">
		</view>
		<view class="cu-form-group">
			<view class="title">所属单位</view>
			<input  disabled v-model="userInfo.unit" class="name_input">
		</view>
		<view class="g-bg-theme button" @click="Querenxiugai">确认修改</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	export default{
		data(){
			return{
				userInfo:{}
			}
		},
		methods:{
			chooseImage() {
			uni.chooseImage({
				count: 1,
				success: res => {
					this.userInfo.pictureUrl = res.tempFilePaths[0]
				}
			})
		},	
		Querenxiugai(){
			console.log(this.userInfo.pictureUrl)
			uni.uploadFile({
				url:'http://106.53.116.162:8080/file',
				filePath:this.userInfo.pictureUrl,
				name:'file',
				success:(res)=>{
					if(res.statusCode==200){
						this.userInfo.pictureUrl = 'http://'+res.data;
						this.request({
							url: '/user/set',
							method:'POST',
							data:this.userInfo,
							contentType:'application/json'
						}).then(res=>{
							if(res.statusCode==200){
								Vue.prototype.globalData.settings.wxInfo = this.userInfo;
								uni.showToast({
									title:'修改成功',
									icon:'none',
									duration:3000
								})
								uni.navigateBack({
									delta:1
								})
							}else{
								uni.showToast({
									title:'修改失败',
									icon:'none',
									duration:3000
								})
							}
						},err=>{
							uni.showToast({
								title:'修改失败',
								icon:'none',
								duration:3000
							})
						})
					}else{
						uni.showToast({
							title:'上传图片失败',
							icon:'none'
						})
					}
					
					
				},
				fail:(error)=>{
					console.log(error)
					uni.showToast({
						title:'上传图片失败',
						icon:'none'
					})
				}
			})
			
			
			
		}
		},
		onLoad(){
			this.userInfo = Vue.prototype.globalData.settings.wxInfo;
		}
		
	}
</script>
<style>
	.Chainge{
		width: 280rpx;
		height: 80rpx;
		opacity: 1;
		background: #4c96cb;
		font-size: 32rpx;
		font-family: -700;
		font-weight: bold;
		margin-top: 126rpx;
	}
	.name_input{
		height: 120rpx;
	}
   .headImg_content{
	width: 100%;
	height: 120rpx;
	border-bottom-style:solid ;
	border-color: #E4E4E4;
	border-width: 2rpx;
	display: flex;
	justify-content: start;
    }
	.Img_text{
		width: 108rpx;
		height: 120rpx;
		opacity: 1;
		font-size: 36rpx;
		font-weight: bold;
		margin-left: 40rpx;
		line-height: 120rpx;
		
	}
	.head_Img{
		width: 100rpx;
		height: 100rpx;
		background: #E4E4E4;
		margin-left:474rpx ;
		margin-top:10rpx;
		border-radius: 50%;
	}
	.name{
		width: 100%;
		height: 120rpx;
		border-bottom-style:solid ;
		border-color: #E4E4E4;
		border-width: 2rpx;
		display: flex;
		justify-content: start;
		font-size: 36rpx;
		font-weight: bold;
		line-height: 120rpx;
		padding-left: 40rpx;
	}
	.pc_In{
		width: 100%;
		height: 370rpx;
		border-bottom-style:solid ;
		border-color: #E4E4E4;
		border-width: 2rpx;
	}
	.pc_Intext{
	 margin-left: 40rpx;
	 font-size: 36rpx;
	 font-weight: bold;
	 width: 180rpx;
	 height: 42rpx;
	 padding-top: 44rpx;
	}
	.pc_Incontent{
		width: 662rpx;
		height: 230rpx;
		margin-top: 70rpx;
		margin-left: 40rpx;
		padding: 10rpx;
		border-radius: 5rpx;
		border: 1rpx solid #E4E4E4;
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
