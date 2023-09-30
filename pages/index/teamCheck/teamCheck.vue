<template>
	<view class="container">
		<view class="bgCover">
			<text>请进行个人信息登记验证，方便进行项目情况申报统计</text>
		</view>
		<view class="profile">
			<view class="title1">基本信息</view>
			<view class="cu-form-group margin-top">
				<view class="title">姓名：</view>
				<input type="" v-model="form.name" placeholder="请输入姓名"/>
			</view>
			<view class="cu-form-group">
				<view class="title">学号：</view>
				<input v-model="form.id" placeholder="请输入学号" />
			</view>
			<view class="cu-form-group">
				<view class="title">年级：</view>
				<picker @change="gradeChange" class="competitionPicker" :value="index" :range="grade">
					<view class="picker">
						{{form.grade===''?'请选择年级':form.grade}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">学院：</view>
				<picker @change="academyChange" class="competitionPicker" :value="index" :range="academy">
					<view class="picker">
						{{form.academy===''?'请选择学院':form.academy}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">专业：</view>
				<input v-model="major" placeholder="请输入专业全称" />
			</view>
			<view class="cu-form-group btn">
				<button @click="submit">确认上传</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				grade:['2018','2019','2021','2022'],
				academy:['计算机学院','管理学院','政法学院','应数学院','经贸学院'],
				form:{
					name:'',
					id:'',
					grade:'',
					academy:'',
					major:''
				}
			}
		},
		methods: {
			academyChange(e){
				this.form.academy = this.academy[e.detail.value]
			},
			gradeChange(e){
				this.form.grade = this.grade[e.detail.value]
			},
			submit(){
				uni.showModal({
					content:'接口暂未开放'
				})
			}
		}
	}
</script>

<style lang="scss">
	.container{
		padding-top: 20rpx;
		background-color: #f2f2f2;
	}
	.bgCover {
		width: 660rpx;
		background: #81C3D7;
		margin: 0 auto;
		box-shadow: 12rpx 12rpx #d6d6d6;
		display: flex;
		flex-wrap: wrap;
		padding: 56rpx;
		justify-content: space-between;
		margin-bottom: 50rpx;
		height: 188rpx;
		background: linear-gradient(135deg, transparent 10px, #2baaca 0);
		text{
			color: #fff;
			font-size: 34rpx;
		}
	}
	.profile{
		height: 800rpx;
		border-radius: 20rpx;
		width: 90%;
		margin-left: 50rpx;
	}
	.title1{
		font-size: 32rpx;
		font-weight: bold;
	}
	.btn{
		
		button{
			background-color: #4696CB;
			height: 80rpx;
			width: 280rpx;
			color: #fff;
			font-size: 32rpx;
			font-weight: bold;
		}
	}
</style>
