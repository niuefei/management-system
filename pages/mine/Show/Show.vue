<template>
	<view class="container">
		<view class="tabs">
			<view class="tab_item" v-for="item in tabs" :key="item.id" :class="item.isActive?'active':''" @click="handleTab(item.id)">
				<text>{{item.title}}</text>
			</view>
		</view>
		<view class="content">
			<block v-if="tabs[0].isActive">
					<view v-if="competition.length!=0" >
						<view class="competition" v-for="(item) in competition" :key="item.id">
							<view class="item">
								<image mode="widthFix" src="https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00662-2358.jpg"></image>
								<view class="block1">
									<text>比赛名称</text>
									<text>{{item.contestName}}</text>
								</view>
								<view class="block2">
									<text>奖项：</text>
									<text>{{item.prizeLevel}}</text>
								</view>
							</view>
						</view>
					</view>
				<view v-if="paper.length!=0" >
					<view class="competition" v-for="(item) in paper" :key="item.id">
						<view class="item">
							<image mode="widthFix" src="https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00662-2358.jpg"></image>
							<view class="block1">
								<text>论文</text>
								<text>{{item.thesisTitle}}</text>
							</view>
							<view class="block2">
								<text>专区：</text>
								<text>{{item.publicationName}}</text>
							</view>
							<view class="block2">
								<text>状态：</text>
								<text>{{item.publicationState}}</text>
							</view>
						</view>
					</view>
				</view>
				<view v-if="patent.length!=0">
					<view v-for="(item) in patent" :key="item.id" class="competition">
						<view class="item">
							<image mode="widthFix" src="https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00662-2358.jpg"></image>
							<view class="block1">
								<text>专利</text>
								<text>{{item.patentName}}</text>
							</view>
							<view class="block2">
								<text>类别</text>
								<text>{{item.patentType}}</text>
							</view>
						</view>
					</view>
				</view>
			</block>
			<block v-else-if="tabs[1].isActive">
				<view v-if="competition.length!=0" >
					<checkbox-group @change="handleCheckbox($event,'competition')">
						<view class="competition" v-for="(item) in competition" :key="item.id">
							<view class="item">
								<image mode="widthFix" src="https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00662-2358.jpg"></image>
								<view class="block1">
									<text>比赛名称</text>
									<text>{{item.contestName}}</text>
								</view>
								<view class="block2">
									<text>奖项：</text>
									<text>{{item.prizeLevel}}</text>
								</view>
								<checkbox class="check" :value="item.id" :checked="item.isChecked"></checkbox>
							</view>
						</view>
					</checkbox-group>
					<view class="g-bg-theme button" @click="submit('competition')">确认展示</view>
					<view class="tips">确认展示后，该成绩将在个人荣誉墙展示，并对其他用户展示~</view>
				</view>
				<view v-else class="tips">你暂时没有比赛获奖哟~</view>
			</block>
			<block v-else-if="tabs[2].isActive">
				<view v-if="paper.length!=0" >
					<checkbox-group @change="handleCheckbox($event,'paper')">
						<view class="competition" v-for="(item) in paper" :key="item.id">
							<view class="item">
								<image mode="widthFix" src="https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00662-2358.jpg"></image>
								<view class="block1">
									<text>论文</text>
									<text>{{item.thesisTitle}}</text>
								</view>
								<view class="block2">
									<text>专区：</text>
									<text>{{item.publicationName}}</text>
								</view>
								<view class="block2">
									<text>状态：</text>
									<text>{{item.publicationState}}</text>
								</view>
								<checkbox class="check" :value="item.id" :data-type="'paper'"></checkbox>
							</view>
						</view>
					</checkbox-group>
					<view class="g-bg-theme button" @click="submit('paper')">确认展示</view>
					<view class="tips">确认展示后，该成绩将在个人荣誉墙展示，并对其他用户展示~</view>
				</view>
				<view v-else class="tips">你暂时没有论文发表哟~</view>
				
			</block>
			<block v-else-if="tabs[3].isActive">
				<view v-if="patent.length!=0">
					<checkbox-group @change="handleCheckbox($event,'patent')">
						<view v-for="(item) in patent" :key="item.id" class="competition">
							<view class="item">
								<image mode="widthFix" src="https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00662-2358.jpg"></image>
								<view class="block1">
									<text>专利</text>
									<text>{{item.patentName}}</text>
								</view>
								<view class="block2">
									<text>类别</text>
									<text>{{item.patentType}}</text>
								</view>
								<checkbox class="check" :value="item.id"></checkbox>
							</view>
						</view>
					</checkbox-group>
					<view class="g-bg-theme button" @click="submit('patent')">确认展示</view>
					<view class="tips">确认展示后，该成绩将在个人荣誉墙展示，并对其他用户展示~</view>
				</view>
				<view v-else class="tips">你暂时没有发表专利哟~</view>
				
				
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs:[{
					id:0,
					title:'全部',
					isActive:true
				},{
					id:1,
					title:'竞赛',
					isActive:false
				},{
					id:2,
					title:'论文',
					isActive:false
				},{
					id:3,
					title:'专利',
					isActive:false
				}],
				allProject:[],
				competition:[],
				patent:[],
				paper:[]
			}
		},
		methods: {
			handleTab(id){
				this.tabs.forEach((v,i)=>v.id === id?v.isActive=true:v.isActive=false)
			},
			handleCheckbox(e,value){
				const id = e.detail.value;
				switch(value){
					case 'competition':
						this.competition.forEach((v,i)=>v.id==id?v.isChecked=!v.isChecked:v.isChecked);
						break;
					case 'paper':
						this.paper.forEach((v,i)=>v.id==id?v.isChecked=!v.isChecked:v.isChecked);
						break;
					case 'patent':
						this.papent.forEach((v,i)=>v.id==id?v.isChecked=!v.isChecked:v.isChecked);
						break;
				}
			},
			submit(type){
				console.log("触发submit")
				switch(type){
					case 'competition':
						this.competition.forEach((v,i)=>{
							if(v.isChecked&&v.display=='0'){
								this.request({
									url:'/project/displayContest',
									method:'POST',
									data:{id:v.id}
								}).then(res=>{
									console.log('res',res)
								})
							}else{
								wx.showToast({
									title:'该项已经展示',
									icon:'none'
								})
							}
						})
						break;
					case 'paper':
						this.paper.forEach((v,i)=>{
							if(v.isChecked&&v.display=='0'){
								this.request({
									url:'/project/displayThesis',
									method:'POST',
									data:{id:v.id}
								}).then(res=>{
									console.log('res',res)
								})
							}else{
								wx.showToast({
									title:'该项已经展示',
									icon:'none'
								})
							}
						})
						break;
					case 'patent':
						this.paper.forEach((v,i)=>{
							if(v.isChecked&&v.display=='0'){
								this.request({
									url:'/project/displayPatent',
									method:'POST',
									data:{id:v.id}
								}).then(res=>{
									console.log('res',res)
								})
							}else{
								wx.showToast({
									title:'该项已经展示',
									icon:'none'
								})
							}
						})
						break;
				}
			},
			getPaper(){
				this.request({
					url:'/project/selectAllContest',
					method:'GET'
				}).then(res=>{
					for(let i=0;i<res.data.length;i++){
						res.data[i].isChecked=false;
					}
					this.competition = res.data;
				},err=>{
					console.log("competition失败",err)
				})
			},
			getPatent(){
				this.request({
					url:'/project/selectAllPatent',
					method:'GET'
				}).then(res=>{
					for(let i=0;i<res.data.length;i++){
						res.data[i].isChecked=false;
					}
					this.patent = res.data;
				},err=>{
					console.log("patent失败",err)
				})
			},
			getCompetition(){
				this.request({
					url:'/project/selectAllThesis',
					method:'GET'
				}).then(res=>{
					for(let i=0;i<res.data.length;i++){
						res.data[i].isChecked=false;
					}
					this.paper = res.data;
				},err=>{
					console.log("paper失败",err)
				})
			},
			getAllProject(){
				this.request({
					url:'/project/selectAllProjects',
					method:'GET'
				}).then(res=>{
					for(let i=0;i<res.data.length;i++){
						res.data[i].isChecked=false;
					}
					this.allProject = res.data;
				},err=>{
					console.log("AllProjects失败",err)
				})
			}
		},
		onLoad(){
			this.getCompetition();
			this.getPaper();
			this.getPatent();
			this.getAllProject()
		}
	}
</script>

<style lang="scss">
	.tabs{
		padding-top: 40rpx;
		height: 160rpx;
		display: flex;
		font-size: 32rpx;
		font-weight: bold;
		justify-content:space-around;
		background-color: #F2F2F2;
		border-radius: 20rpx 20rpx 0 0;
		.tab_item{
			display: flex;
			justify-content: center;
			align-items: center;
			width: 120rpx;
			height: 100rpx;
			background-color: #fff;
			border-radius: 20rpx;
		}
		.active{
			background-color: #4696CB;
		}
		
		
	}
	.check{
		height: 56rpx;
	}
	.competition{
		.item{
			margin: 20rpx;
			padding: 20rpx;
			display: flex;
			border: 2rpx solid #f2f2f2;
			border-radius: 10rpx;
			image{
				width: 130rpx;
				height: 130rpx;
				border-radius: 10rpx;
			}
			.block1{
				margin:10rpx;
				flex:2;
				display: flex;
				flex-direction: column;
				text-align: center;
				text{
					font-size: 32rpx;
				}
				text:first-child{
					font-weight: bold;
				}
			}
			checkbox{
				// width: 50rpx;
				// height: 50rpx;
			}
			.block2{
				margin:10rpx;
				flex:2;
				display: flex;
				flex-direction: column;
				text-align: center;
				text{
					font-size: 32rpx;
				}	
				text:first-child{
					color: #4696CB;
					font-weight: bold;
				}
			}
		}
		
	}
	.button{
		font-weight: bold;
		height: 80rpx;
		width: 280rpx;
		margin: 30rpx auto;
		line-height: 80rpx;
		text-align: center;
		border-radius: 5px;
	}
	.tips{
		color:#DDDDDD;
		text-align: center;
		font-size: 40rpx;
		margin-top: 30rpx;
	}
</style>
