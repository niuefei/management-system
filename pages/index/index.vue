<template>
	<view>
		<!-- 搜索框 -->
		<Search></Search>
		<swiper class="screen-swiper square-dot" style="width: 650rpx;margin: 0 auto;" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index" @click="toDetail">
				<image :src="item.url" mode="scaleToFill" v-if="item.type=='image'"></image>
			</swiper-item>
		</swiper>
		<!--最新要闻-->
		<view class="cu-form-group margin-top news" >
			<view class="title" @click="toNews">
				<view class="tx">最新要闻</view>
				<text class="cuIcon-right text-gray"></text>
			</view>
			<view class="item_list" style="margin-left: 0;">
				<navigator v-for=" (item,index) in newList" v-if="index<3" :url="'./news_detail/news_detail?nid='+item.id" :key="item.id" class="item" >通知：{{item.title}}</navigator>
			</view>
		</view>
		<!-- 工作区 -->
		<view class="cu-form-group margin-top work">
			<view class="title">
				工作区
			</view>
			<view class="work_content">
				<view v-for="(item,index) in workContentList" class="work_item" :key="item.id" @click="toPage(item.id)">
					<text>{{item.title}}</text>
					<image :src="item.image_url"></image>
				</view>
				
			</view>
		</view>
		<!-- 热门活动 -->
		<view class="cu-form-group margin-top active">
			<view class="title">
				<view class="tx">热门活动</view>
			</view>
			<view class="active">
				<view class="activity_card" v-for="(item,index) in hotActivityList" v-if="index<3" :key="index" @click="goDetail(item.id)">
					<view class="active_img cu-avatar round xl" :style="'background-image:url(' + item.logoUrl+');'">
					</view>
					<view class="active_message">
						<view style="font-size: 36rpx;font-weight: bold;">{{item.name}}</view>
						<view>
							<view style="font-size: small;margin-top: 20rpx;">主办方：{{item.host}}</view>
							<view style="font-size: small;">时间：{{item.createTime | formatDate('-') }}</view>
						</view>
						<view style="font-size: small;color: #7f7f7f;margin-top: 20rpx;">{{item.number}}人已参加</view><!-- 新增一个字段人数 -->
					</view>
					<view style="margin-top: -190rpx;">
						<view class='sellout' :style="{'border-color':(item.status== 0 ?'transparent transparent #F59A23' : item.status==1 ? 'transparent transparent #4C96CB':'transparent transparent #AAAAAA' )}">
							<template v-if="item.status==0">未参加</template>
							<template v-else="item.status==1">已参加</template>
							<template v-else="item.status==2">已过期</template><!-- 这里后台新增一个字段2 -->
						</view>
					</view>
			
				</view>
			</view>
				
		</view>
		
	</view>
</template>

<script>
	import Search from '../../components/search/search'
	import Vue from 'vue'
	export default {
		components:{
			Search
		},
		data() {
			return {
				swiperList: [{
					url: 'https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00662-2358.jpg',
					type: 'image'
				},
				{
					url: 'https://img1.baidu.com/it/u=304222681,1796783952&fm=26&fmt=auto&gp=0.jpg',
					type: 'image',
				},
				{
					url:'https://img0.baidu.com/it/u=2769070850,4275762968&fm=26&fmt=auto&gp=0.jpg',
					type:'image'
				}
				],
				workContentList:[{
					id:0,
					title:'项目申报',
					image_url:'../../static/index_image/projectSubmit.png'
				},{
					id:1,
					title:'我的团队',
					image_url:'../../static/index_image/myTeam.png'
				},{
					id:2,
					title:'我的项目',
					image_url:'../../static/index_image/myproject.png'
				},{
					id:3,
					title:'信息绑定',
					image_url:'../../static/index_image/bindMessage.png'
				},{
					id:4,
					title:'团队验证',
					image_url:'../../static/index_image/teamCheck.png'
				},{
					id:5,
					title:'创新创业导师',
					image_url:'../../static/index_image/hotActivity.png'
				}
				],

				hotActivityList:[],
				pjList:[],
				userList:[],
				newList:[],				
			}
		},
		
		async onLoad() {
			
			if(Vue.prototype.globalData.settings.wxInfo==undefined&&Vue.prototype.globalData.settings.wxInfo==''){
				uni.navigateTo({
					url:'../login/login'
				})
			}
			
			// 登录获取用户信息		
			await this.$onLaunched
				this.getIndexList()
				this.getHotActivity()
				this.getMyProject()
				this.getNewList()
		},
		filters:{
			formatDate: function(value,spe='/') {
			   let data= new Date(value);
			   let year = data.getFullYear();
			   let month = data.getMonth() + 1;
			   let day = data.getDate();
			   month = month >= 10 ? month : "0" + month;
			   day = day >= 10 ? day : "0" + day;
			   return `${year}${spe}${month}${spe}${day}`;
			}
		},
		
		methods: {
			/**
			 * 页面跳转 ‘新闻’
			 * @param {}
			 */
			toNews(){
				uni.navigateTo({
					url:'./news/news'
				})
			},
			/**
			 * 页面跳转 ‘名师指导’
			 * @param {}
			 */
			toTeacher(){
				uni.navigateTo({
					url:'./teacher/teacher'
				})
			},
			/**
			 * 页面跳转 ‘我的项目’
			 * @param {}
			 */
			toMyProject(){
				uni.navigateTo({
					url:'./myProject/myProject'
				})
			},
			/**
			 * 工作区页面跳转
			 * */
			toPage(id){
				switch(id){
					case 0:
						uni.navigateTo({
							url:'./projectSubmit/projectSubmit'
						})
						break;
					case 1:
						uni.navigateTo({
							url:'../mine/My_team/My_team'
						})
						break;
					case 2:
						uni.navigateTo({
							url:'../mine/My_project/My_project'
						})
						break;
					case 3:
						uni.navigateTo({
							url:'./profileCheck/profileCheck'
						})
						break;
					case 4:
						uni.navigateTo({
							url:'./teamCheck/teamCheck'
						})
						break;
					case 5:
						uni.showModal({
							content:'内容暂未开放'
						})
				}
			},
			
			goDetail(id) {
				uni.navigateTo({
					url:'../activity/activity_detail/activity_detail?eId='+id
				})
			},
			
			login(){
				this.request({
					url:'/user/login',
					method: 'POST',
					contentType:'application/x-www-form-urlencoded',
					data:{stuNumber:'1113',password:'123456'}
				}).then(res=>{
					console.log(res)
				})
			},
			/**
			 * 获取热门活动
			 * @param {}
			 */
			getHotActivity(){
				this.request({
					url:'/event/hotEvents',
				}).then(res=>{
					this.hotActivityList = res.data
				})
			},
			/**
			 * 获取首页内容
			 * @param {}
			 */
			getIndexList(){
				this.request({
					url:'/hello',
					method: 'GET',
				}).then(res =>{
					this.userList = res.data[1];
				})
			},
			/**
			 * 获取最新要闻列表
			 * @param {}
			 */
			getNewList(){
				this.request({
					url:'/news/selectNews',
					method:'GET'
				}).then(res=>{
					this.newList = res.data
				},err=>{
					console.log('最新要闻列表失败-index',err)
				})
			},
			/**
			 * 获取我的项目列表
			 * @param {}
			 */
			getMyProject(){
				this.request({
					url:'/user/projects',
				}).then(res=>{
					this.pjList = [...this.pjList,...res.data]
				},err=>{
					console.log('我的项目请求失败-index',err)
				})
			},
			
			toDetail(){
				uni.navigateTo({
					url:'./news_detail/news_detail?nid=1'
				})
			}
		}
	}
</script>

<style lang="scss">
	.search {
		background-color: #EDEFF2;
		border-radius: 20px;
		width: 650rpx;
		margin: 20rpx auto;
		padding: 10rpx;
		
		.icon-search {
			color: #2771B1;
			font-size: 50rpx;
			margin-left: 20rpx;
		}
	}
	.cu-form-group{
		display: flex;
		flex-wrap: wrap;
		.title{
			width: 100%;
			display: flex;
			font-weight: 600;
			font-size: 34rpx;
			line-height: 100rpx;
			position: relative;
			.cuIcon-right{
				position: absolute;
				right: 0;
				float: right;
				color: black;
			}
		}
		.item_list{
			margin-top:20rpx;
			width: 100%;
			.item{
				width: 100%;
				line-height: 60rpx;
				border-bottom:1rpx solid #F0F0F0 ;
			}
		}	
	}
	.work{
		background-color: #f2f2f2;
		border-radius: 20rpx;
		padding-bottom: 60rpx;
		margin: 20rpx;
		.title{
			justify-content: center;
		}
	}
	.work_content{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		.work_item{
			display: flex;
			flex-direction: column;
			margin-top: 60rpx;
			width:200rpx;
			height: 200rpx;
			background-color: #4696CB;
			border-radius: 20rpx;
			text-align: center;
			justify-content: center;
			align-content: space-between;
			text{
				font-size: 32rpx;
				font-weight: bold;
			}
			image{
				margin-left: 50rpx;
				width: 100rpx;
				height: 100rpx;
				border-radius: 20rpx;
			}
		}
	}
	.active {
		display: flex;
		align-items: center;
		flex-direction: column;
		width: 100%;
		
	}
	.actvie_tx{
		text-align: left;
		font-size: 34rpx;
		font-weight: bold;
	}

	.activity_card {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		height: 240rpx;
		border-radius: 10rpx;
		box-shadow: 0px 0px 2px 0px #797979;
		margin: 20rpx 24rpx;

		.active_img {
			width: 200rpx;
			height: 200rpx;
			margin-left: 32rpx;
		}

		.active_message {
			margin-left: 32rpx;
		}
	}

	.sellout_box {
		width: 30%;
		background-color: white;
		overflow: hidden;
		position: relative;
		margin-left: auto;
	}

	.sellout {
		color: white;
		font-size: 28rpx;
		width: 170rpx;
		height: 0;
		text-align: center;
		position: absolute;
		right: -14rpx;
		transform: rotate(45deg);
		border-width: 0 40rpx 40rpx 40rpx;
		border-style: none solid solid;
	}
</style>
