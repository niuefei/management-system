<template>
	<view class="" >
			<view class="cu-form-group">
				<view class="title">{{teamDetail.teamName}}</view>
				<text class="projectName"></text>
			</view>
			<view class="Notice_content">
				<view class="Notice_title">最新公告</view>
				<textarea class="Notice">{{teamDetail.notice}}</textarea>
				<view class="time">
					{{teamDetail.createTime | formatDate('-')}}
				</view>
			</view>
		<view class="vip">
			<view class="vip_title">
				主要成员
			</view>
			<view class="pr">
				<view class="teams" v-for="(item,index) in vip_In" :key="index" @click="to_Profile(index)">
					<image class="teams_img"  :src="item.vip_img"></image>
					<view class="teams_name">
						{{item.vip_name}}
					</view>
				</view>
			</view>
			</view>
		    <view class="to_file">
		    	<view class="file_m">
		    		<view class="file_Text">团队项目</view>
		    	</view>
				<view v-for="(item,index) in team_project" :key="index" class="file_input" @click="to_pj(index)" placeholder="file">
					<text class="icon icon-xiangmu1"></text>
					<view class="pj_name">{{item.project_name}}</view>
				</view >
		    </view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				myTeam:'',
				Notice:"Friend Im Mary ,Lily is my best friend.I have long straight hair.She has short curly hair.Both of us like singing and dasncing .We like to do the same things.But we also have some differences,She is more outgoing than me,She is good a...",
			    time:"2021-7-21",
				team_project:[{project_name:"项目名称"},{project_name:"项目名称"},],
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
				}],
				teamDetail:{}
			}
		},
		methods:{
			getMyTeamDetail(id){
				const tid = parseInt(id)
				this.request({
					url:'/team/selectTeamById',
					method:'POST',
					data:{tid},
					contentType:'application/x-www-form-urlencoded'
				}).then(res=>{
					this.teamDetail = res.data
				},err=>{
					console.log(err)
				})
			},
			to_Profile(id){
				uni.navigateTo({
					url:'../../index/teacher_profile/teacher_profile?uid='+id
				})
			},
			to_pj(pid){
				uni.navigateTo({
					url:'../../index/myProject_detail/myProject_detail?pid='+1
				})
			}
		},
		filters:{
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
		onLoad: function(options) {
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
		width: 100%;
		border-bottom: 1rpx solid #E4E4E4;
		padding-left: 20px;
		line-height: 120rpx;
		display: flex;
	}
	.icon{
		margin-top: 20rpx;
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
	.time{
		width: 72px;
		height: 16px;
		margin-left: 277px;
		margin-top:17px;
		
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
