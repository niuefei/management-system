<template>
	<view>
		<view class="cu-form-group">
			<view class="title">项目名称:</view>
			<input placeholder="" name="input" v-model="formData.Pname"></input>
		</view>
		<view class="cu-form-group2" @click="chooseImage">
			<view class="title3">主页图片:</view>
			<image class="img" src="img"></image>
		</view>
		<view class="text1">
			<view class="title2">团队简介:</view>
			<textarea class="text" @input="textArea"></textarea>
		</view>
		<view class="cu-bar btn-group">
			<button class="cu-btn bg-green shadow-blur round2" @click="update">确认修改</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
	          img:"",
			  formData:{
				id:'',
			  	Pname:'',
			  	introduction:'',
				data:'',
				prizes:''
			  }
			}
		},
		methods: {
			textArea(e){
				this.formData.introduction = e.detail.value
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
			update(){
				const cookie = uni.getStorageSync('cookie')
				const that = this;
				const tempFilePath = this.imgList[0];
				uni.uploadFile({
					url:'http://106.53.116.162:8080/image',
					filePath:tempFilePath,
					name:'image',
					success:(ImgRes)=>{
						console.log(ImgRes.data)
						that.formData.data = ImgRes.data
					},
					fail:(error)=>{
						console.log(error)
					}
				})
				console.log(this.formData)
				
			}
		},
		onLoad(options){
			this.formData.id = options.pid;
		}
	}
</script>

<style>
	.img {
		width: 60px;
	}
	
	.cu-form-group2 {
		height: 60px;
		weight: 375px;
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
