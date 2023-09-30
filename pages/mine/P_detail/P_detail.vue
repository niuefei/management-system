<template>
	<view  class="">
		<view class="cu-form-group ">
			<view class="title" v-for="item in myProject">{{item.pname}}</view>
		<text class="projectName"></text>
		</view>
		<view class="Notice_content">
			<view class="Notice_title">最新公告</view>
			<textarea class="Notice" v-for="item in myProject" >{{item.notice}}</textarea>
		<view class="time" v-for="item in myProject" >
			{{item.createTime}}
		</view>
		</view>
		<view class="vip">
			<view class="vip_title">
				主要成员
			</view>
			<view class="pr">
				<view class="teams" v-for="item in vip_In">
		    	<image class="teams_img"  v-bind:src="item.vip_img"></image>
				<view class="teams_name">
					{{item.vip_name}}
				</view>
		    </view>
		</view>
			</view>
			<view class="to_file">
				<view class="file_m">
					<view class="file_Text">项目资料</view>
				</view>
			<view v-for="item in project" class="file_input" placeholder="file">
				<text class="icon icon-wenjian1 margin-right-xs"></text>{{item.project_name}}
			 </view >
			</view>
     </view>
</template>


<script>
	export default{
		data(){
			return{
				myProject:'',
				Notice:"Friend Im Mary ,Lily is my best friend.I have long straight hair.She has short curly hair.Both of us like singing and dasncing .We like to do the same things.But we also have some differences,She is more outgoing than me,She is good a...",
			    time:"2021-7-21",
				project:[{project_name:"xx项目.zip"},{project_name:"xx项目.zip"},],
				vip_In:[{
					vip_name:"周杰伦",
					vip_img:'https://p0.ssl.img.360kuai.com/t01ac15b63ce5cab1ca.webp'
				},
				{
					vip_name:"周杰伦",
					vip_img:'https://p0.ssl.img.360kuai.com/t01ac15b63ce5cab1ca.webp'
				},
				{
					vip_name:"周杰伦",
					vip_img:'https://p0.ssl.img.360kuai.com/t01ac15b63ce5cab1ca.webp'
				},]
			}
		},
		onLoad: function() {
			
		}
	}
</script>

<style lang="scss">
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
		height: 177px;
	
	}
	.pr{
		width: 100%;
		display: flex;
		flex-direction: row;
	}
	.teams_name{
		height: 20px;
		margin-top: 17px;
		line-height: 20px;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.teams_img{
		height: 60px;
		width: 60px;
		margin-left: 10px;
		border-radius: 50%;
		
	}
	.teams{
		height: 100px;
		width: 80px;
		margin-left: 30px;
		margin-top: 20px;
	}
	.vip{
		width: 100%;
		height: 170px;
	}
	.vip_title{
		width: 100%;
		margin-left: 20px;
		width: 64px;
		height: 18px;
		opacity: 1;
		font-size: 16px;
		font-family: -400;
		font-weight: 400;
		margin-top: 13px;
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
		font-size: 16px;
		width: 341px;
		height: 91px;
		opacity: 1;
		background:white ;
		margin-top: 30px;
		margin-left: 20px;
		background: #f2f2f2;
	}
	.Notice_content{
		width: 375px;
		height: 196px;
		opacity: 1;
		background: #f2f2f2;
		.time{
			width: 72px;
			height: 16px;
			margin-left: 277px;
			margin-top:17px;
			
		}
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
