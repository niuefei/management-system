<template>
	<view>
		<view class="cu-form-group">
			<view class="title">团队名称:</view>
			<input placeholder="" v-model="formData.teamName" name="input"></input>
		</view>
		<view class="cu-form-group2" @click="chooseImage">
			<view class="title3">团队logo:</view>
			<view class="img" @tap="chooseImage" v-if="img.length!==0">
				<image :src="img" mode="aspectFill"></image>
			</view>
			<view class="img solids" @tap="chooseImage" v-else>
				<text class='cuIcon-cameraadd'></text>
			</view>
		</view>
		<view class="text1">
			<view class="title2">团队简介:</view>
			<textarea class="text" @input="textArea"></textarea>
		</view>
		<view class="cu-bar btn-group">
			<button class="cu-btn bg-green shadow-blur round2" @click="CreateTeam">提交申请</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img:'',
				formData:{
					teamName:'',
					logoUrl:'',
					introduction:''
				}
				
			}
		},
		methods: {
			textArea(e){
				this.formData.introduction = e.detail.value;
			},
			chooseImage() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: (res) => {
						this.img = res.tempFilePaths
						console.log('临时文件路径',this.img[0])
					}
				});
			},
			CreateTeam(){
				//创建团队
				const tempFilePath = this.img[0];
				console.log(tempFilePath)
				uni.uploadFile({
					url:'http://106.53.116.162:8080/image',
					filePath:tempFilePath,
					name:'team_image',
					success:(res)=>{
						this.formData.logoUrl = res.data
					},
					fail:(error)=>{
						console.log(error)
					}
				})
				this.request({
					url:'/team/addTeam',
					method:'POST',
					data:this.formData
				}).then(res=>{
					console.log('成功',res)
					uni.showToast({
						title:'创建成功',
						icon:'success',
						success: () => {
							uni.navigateBack({
								delta:1
							})
						}
					})
				},error=>{
					console.log('失败',error)
				})
			}
			
		}
	}
</script>

<style lang="scss">
	.cu-form-group2 {
		position: relative;
		height: 120rpx;
		weight: 375px;
		display: flex;
		justify-content: flex-start;
		margin-top: 21px;
		font-weight: bold;
		.img{
			position: absolute;
			right: 40rpx;
			height: 70rpx;
			width: 70rpx;
			text-align: center;
			font-size: 30rpx;
			padding-top: 20rpx;
			color: #F0F0F0;
			image{
				width: 90%;
				height: 90%;
			}
		}
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
		weight: 341px;
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
