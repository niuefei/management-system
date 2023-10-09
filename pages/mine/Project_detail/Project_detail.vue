<template>
	<view class="">
		<view class="cu-form-group ">
			<view class="title">项目名称</view>
		<text class="projectName"></text>
		<view class="Chainge">
			<button  class="cu-btn bg-white text-blue1" @click="to_Chainge_projectIn">修改</button>
		</view>
		</view>
		<view class="Notice_content">
			<view class="Notice_title">填写公告</view>
			<textarea class="Notice" v-model="projectDetail.notice"></textarea>
			<view class="cu btn-group">
				<button class="cu-bt" @click="pubish">发布</button>
			</view>
		</view>
		<view class="Ed_team">
			<view class="teams">成员管理</view>
			<view class="button" style="">
					<button class="cu-btn text-red bg-white shadow-blur">删除</button>
					<button class="cu-btn text-blue1 bg-white " @click="to_Membermanagement">邀请</button>
			</view>
		</view>
		<view class="to_file">
			<view class="file_m">
				<view class="file_Text">项目资料</view>
				<text ref="input" class="upFile text-blue1" @click="upload()">上传</text>
			</view>
		<view  class="file_input" placeholder="file">
			<text class="icon icon-wenjian1 margin-right-xs"></text>{{projectDetail.data | fileFormat}}
			<text class="cuIcon-roundclosefill text-red dir"></text>
		 </view >
		</view>
		<view class="Ed_team">
			<view class="teams">奖项填写</view>
			<view class="button">
				<button class="cu-btn text-blue1 bg-white ">填写</button>
			</view>
		</view>
		<view class="price">
			奖项：<input  v-text="price">
		</view>
	</view>
</template>

<script>
	
		export default {
		
			data(){
				return{
					file:["xx相关文件.zip","xx相关文件.zip"],
					price:"xx一等奖",
					projectDetail:{
						notice:'',
						data:''
					}
			}
			},
				
			methods:{
				close(){
					
				},
				to_Chainge_projectIn(){
					uni.navigateTo({
						url: '../Chainge_projectIn/Chainge_projectIn?pid='+this.projectDetail.id,
					});
				},
				to_Membermanagement(){
					uni.navigateTo({
						url: '../Member_management/Member_management?pid='+this.projectDetail.id,
					});
				},
				
				pubish(){
					const pid = this.projectDetail.id;
					this.request({
						url:'/project/changeProNotice',
						method:'POST',
						data:{pid,notice:this.projectDetail.notice},
						contentType:'application/x-www-form-urlencoded'
					}).then(res=>{
						uni.showToast({
							title:'发布成功',
							icon:'success'
						})
					},err=>{
						console.log(err)
					})
				},
				//获取项目详情
				getPjDetails(id){
					const pid = parseInt(id)
					this.request({
						url:'/project/selectProjectById',
						method:'POST',
						data:{pid},
						contentType:'application/x-www-form-urlencoded'
					}).then(res=>{
						this.projectDetail = res.data
					},error=>{
						console.log(error)
					})
				},
				
			},
			filters:{
				fileFormat:function(value){
					console.log(value)
					var index = value.lastIndexOf("\/");
					console.log(value.substring(index + 1, value.length))
					return value.substring(index + 1, value.length);
				}
			},
			onLoad(options){
				console.log(options.pid)
				this.getPjDetails(options.pid)
			}
		}
</script>

<style lang="scss">
    .price{
		display: flex;
		height: 120rpx;
		padding:42rpx 40rpx;
		border-bottom-style:solid ;
		border-color: #E4E4E4;
		border-width: 1rpx;
	}
	.text-red{
		font-size: 32rpx;
	}
	.text-blue1{
		background-color: #fff;
		color:#4C96CB;
		font-size: 32rpx;
		font-weight: 400;
	} 
	.cu btn-group{
		width: 100%;
		margin-right: 0px;
		margin-top: 200rpx;
	}
	.cu-bt {
		color: #FFFFFF;
		width: 200rpx;
		height: 60rpx;
		opacity: 1;
		background: #4c96cb;
		line-height:60rpx ;
		margin-right: 20rpx;
		font-size: 32rpx;
		margin-top: 20rpx;
		
	}  
	.cuIcon-roundclosefill{
		margin-right: 0px;
		border-style: none;
		line-height: 120rpx;
	     width: 40rpx;
		 background-color: white ;
		margin-right: 66rpx;
		border-radius: 50%;
	}
	.file_input{
		height: 120rpx;
		width: 100%;
		border-bottom-style:solid ;
		border-color: #E4E4E4;
		border-width: 2rpx;
		padding-left: 40rpx;
		line-height: 120rpx;
		display: flex;
		.icon{
			margin-top:40rpx;
		}
		.dir{
			margin-left:370rpx;
			font-size: 40rpx;
		}
		
	}
	.upFile{
		height: 94rpx;
		line-height: 94rpx;
		width: 120rpx;
		height: 36rpx;
		opacity: 1;
		font-family:  -400;
	}
	.file_Text{
		height: 94rpx;
		line-height:94rpx ;
		margin-left: 40rpx;
		font-size: 32rpx;
		font-family: -400;
		font-weight: 400;
	}
	.file_m{
		height: 47px;
		width: 100%;
		border-bottom-style:solid ;
		border-color: #E4E4E4;
		border-width: 1px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		
	}
	.to_file{
		width: 100%;
		height: 354rpx;
	
	}
	.button{
		margin: auto;
		margin-right:28rpx;
	}
	.teams{
		width: 128rpx;
		height: 36rpx;
		opacity: 1;
		font-size: 32rpx;
		font-family: -400;
		font-weight: 400;
		line-height: 88rpx;
		margin-left: 40rpx;
	}
	.Ed_team{
		height:88rpx ;
		width: 100%;
		border-bottom-style:solid ;
		border-color: #E4E4E4;
		border-width: 2rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		
	}
    .Notice_title{
		width: 128rpx;
		height: 36rpx;
		opacity: 1;
		font-size: 32rpx;
		font-family: -400;
		font-weight: 400;
		margin-left: 40rpx;
		padding-top: 34rpx;
	}
	.Notice{
		padding:10rpx;
		width: 682rpx;
		height: 182rpx;
		opacity: 1;
		background:white ;
		margin-top: 60rpx;
		margin-left: 40rpx;
		border: 0.5rpx solid #3F536E ;
	}
	.Notice_content{
		width: 750rpx;
		height: 392rpx;
		opacity: 1;
		background: #f2f2f2;
	}
	.title{
		font-size:32rpx;
		font-weight:bold;
	}
	.Chainge{
		font-size: 32rpx;
		font-weight: 400;
		color: #4c96cb;
	}
</style>
