<template>
	<view>
		<view class="pj-title">{{pjDetail.pname}}</view>
		<view class="pj-detail">
			<view class="pj-tips">最新公告</view>
			<view class="pj-content">{{pjDetail.notice}}
			</view>
			<view class="pj-date">{{pjDetail.createTime | formatDate('-')}}</view>
		</view>
		<view class="pj-member">
			<view class="mem-tips">主要成员</view>
			<view class="mem-list">
				<view class="mem-item" v-for="(item,index) in memList" :key="id" @click="to_Profile(item.id)">
					<view class="cu-avatar xl round margin-left Img" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg);"></view>
					<view class="tx">{{item.name}}</view>
				</view>
			</view>
			
		</view>
		<view class="pj-docu">
			<view class="docu-tips">项目资料</view>
			<view class="docu-list" @click="preViewWord">
				<view class="docu-item">
					<text class="icon icon-wenjian1"></text>
					<text class="tx">{{pjDetail.data | fileFormat}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pjDetail:[],
				memList:[
					{
						id:0,
						name:'周杰伦',
						
					},{
						id:1,
						name:'周杰伦',
						
					},{
						id:2,
						name:'周杰伦',
						
					},{
						id:3,
						name:'周杰伦',
						
					}
				]
			}
		},
		methods: {
			getPjDetail(id){
				const pid= parseInt(id);
				this.request({
					url:'/project/selectProjectById',
					method:'POST',
					data:{pid},
					contentType:'application/x-www-form-urlencoded'
				}).then(res=>{
					this.pjDetail = res.data
				},err=>{
					console.log('失败',err)
				})
			},
			to_Profile(id){
				uni.navigateTo({
					url:'../../index/teacher_profile/teacher_profile?uid='+id
				})
			},
			preViewWord(){
				uni.showToast({
					title:'虚拟数据，暂不支持查看'
				})
			}
		},
		filters:{
			// 时间戳处理
			formatDate: function(value,spe='/') {
			   let data= new Date(value);
			   console.log(data)
			   let year = data.getFullYear();
			   let month = data.getMonth() + 1;
			   let day = data.getDate();
			   month = month >= 10 ? month : "0" + month;
			   day = day >= 10 ? day : "0" + day;
			   return `${year}${spe}${month}${spe}${day}`;
			},
			fileFormat:function(value){
				console.log(value)
				if(value != undefined){
					var index = value.lastIndexOf("\/");
					return value.substring(index + 1, value.length);
				}
				
			}
		},
		onLoad(options){
			this.getPjDetail(options.pid)
		}
	}
</script>

<style lang="scss" scoped>
.pj-title{
	margin: 20rpx 20rpx;
	font-size: 32rpx;
	font-weight: bold;
}
.pj-detail{
	background-color: #F0F0F0;
	position: relative;
	.pj-tips{
		font-size: 36rpx;
		padding: 40rpx;
	}
	.pj-content{
		padding: 0 55px 48px 20px;
		line-height: 36rpx;
	}
	.pj-date{
		position: absolute;
		bottom: 10rpx;
		right: 10rpx;
	}
}
.pj-member{
	.mem-tips{
		font-size: 36rpx;
		margin:34px auto 17px 20px;
		line-height: 36rpx;
	}
	.mem-list{
		display: flex;
		.mem-item{
			width: 25%;
		}
		.tx{
			margin: 10rpx;
			text-align: center;
			font-weight: bold;
		}
	}
	
}
.pj-docu{
	
	.docu-tips{
		font-size: 36rpx;
		margin:34px auto auto 20px;
	}
	.docu-list{
		.docu-item{
			padding: 20px 20px;
			font-size: 32rpx;
			height: 120rpx;
			border-bottom: 1rpx solid #F0F0F0;
			.icon-wenjian1{
				color: #2771B1;
			}
		}
	}
	
}
</style>
