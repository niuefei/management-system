<template>
	<view class="">
		<view class="cu-form-group ">
			<view class="title">团队名称</view>
		<text class="projectName"></text>
		<view class="Chainge">
			<button  class="cu-btn bg-white shadow-blur" @click="to_Chainge_teamtIn">修改</button>
		</view>
		</view>
		<view class="Notice_content">
			<view class="Notice_title">填写公告</view>
			<textarea class="Notice" v-text="Notice"></textarea>
			<view class="cu btn-group">
					<button class="cu-bt">发布</button>
				</view>
		</view>
		<view class="Ed_team">
			<view class="teams">成员管理</view>
			<view class="button">
								<button class="cu-btn text-red bg-white shadow-blur">删除</button>
					<button class="cu-btn text-blue bg-white " @click="to_Membermanagement">邀请</button>
			</view>
		</view>
		<view class="to_file">
			<view class="file_m">
				<view class="file_Text">团队项目</view>
		 <text ref="input" class="upFile" @click="upload()">上传</text>
			</view>
		 <view v-for="item in file" :key="item.id" class="file_input" placeholder="file">{{item}}
		 <button type="default" class="cuIcon-roundclosefill" @click="close"></button>
		 </view >
		</view>
		</view>
</template>

<script>
	export default {
	
		data(){
			return{
				Notice:"",
				file:["项目名称","项目名称"],
				TeamDetail:{}
		}
		},
			
		methods:{
			close(){
				
			},
			to_Chainge_teamtIn(){
				uni.navigateTo({
					url: '../Chainge_teamIn/Chainge_teamIn',
				});
			},
			to_Membermanagement(){
				uni.navigateTo({
					url: '../Member_management/Member_management',
				});
			},
			
		},
		onLoad(options){
			this.getMyTeamDetail(options.tid)
		}
	}
</script>

<style>
	.price{
		 height: 60px;
		 padding-left: 20px;
		 border-bottom-style:solid ;
		 border-color: #E4E4E4;
		 border-width: 1px;
	  }
	.cu btn-group{
		width: 100%;
		margin-right: 0px;
		margin-top: 100px;
	}
	.cu-bt {
		width: 100px;
		height: 30px;
		opacity: 1;
		background: #4c96cb;
		line-height:30px ;
		margin-right: 10px;
		font-size: 16px;
		margin-top: 10px;
		
	}  
	.cuIcon-roundclosefill{
		margin-right: 0px;
		border-style: none;
		line-height: 60px;
	     width: 20px;
		 background-color: white ;
	  margin-right: 33px;
		border-radius: 50%;
	}
	.file_input{
		height: 60px;
		width: 100%;
		border-bottom-style:solid ;
		border-color: #E4E4E4;
		border-width: 1px;
		padding-left: 20px;
		line-height: 60px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		
	}
	.upFile{
		height: 47px;
		line-height: 47px;
		width: 60px;
		height: 18px;
		opacity: 1;
		color: blue;
		font-family:  -400;
		font-weight: 400;
		color:#1CBBB4;
		
	}
	.file_Text{
		height: 47px;
		line-height:47px ;
		margin-left: 20px;
		font-size: 16px;
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
		height: 177px;
	
	}
	.button{
		margin: auto;
		margin-right: 18px;
	}
	.teams{
		width: 64px;
		height: 18px;
		opacity: 1;
		font-size: 16px;
		font-family: -400;
		font-weight: 400;
		line-height: 44px;
		margin-left: 20px;
		
	}
	.Ed_team{
		height:44px ;
		width: 100%;
		border-bottom-style:solid ;
		border-color: #E4E4E4;
		border-width: 1px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		
	}
	.Notice_title{
		width: 64px;
		height: 18px;
		opacity: 1;
		font-size: 16px;
		font-family: -400;
		font-weight: 400;
		margin-left: 20px;
		padding-top: 17px;
	}
	.Notice{
		width: 341px;
		height: 91px;
		opacity: 1;
		background:white ;
		margin-top: 30px;
		margin-left: 20px;
	}
	.Notice_content{
		width: 375px;
		height: 196px;
		opacity: 1;
		background: #f2f2f2;
	}
	.title{
		font-size:16px;
		font-weight:bold;
	}
	.Chainge{
		font-size: 16px;
		font-weight: 400;
		color: #4c96cb;
	}
</style>
