$(function(){
	// 随机生成棋子位置  2014/08/03  @bby
	/*
	*********
	@animals   :   棋子数组
	@random    :   用于生成随机角标的数组
	@randomAnimals    :    用于装打乱顺序之后的棋子数组
	@domAnimalName    :    用于输出到dom的棋子数组
	*/
	
	var animalObj = {
		init : function(){
			var animals = [1, 2, 3, 4, 5, 6, 7, 8, -1, -2, -3, -4, -5, -6, -7, -8],
				random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,15],
				randomAnimals = [],
				animalName = ['象', '狮', '虎', '豹', '狼', '狗', '猫', '鼠'],
				domAnimalName = [];
			// 打乱棋子数组
			for(var i = 0; i < animals.length;){
				randomAnimals.push(animals.splice(Math.floor(Math.random() * animals.length ),1)[0]);
			}

			// 组合棋子数组
			// &&输出到dom
			for(var i = 0, l = randomAnimals.length; i < l; ++i){
				domAnimalName[i] = {team:'',name:''};
				domAnimalName[i].team = randomAnimals[i];
				domAnimalName[i].name = animalName[Math.abs(randomAnimals[i]) -1];
				$('.animals').append($('<div class="animal hide animal'+(i+1)+'"></div>').attr("team", domAnimalName[i].team).text(domAnimalName[i].name));
			}
			//  添加坐标
			$('.animal').each(function(i){
				$(this).data('coordinate',{x:i % 4,y:Math.floor(i / 4)});
			});
		},
		showCard : function(){
			if($(this).attr('team') > 0){
				$(this).css({background:'red',textIndent:0}).removeClass('hide').addClass('normal');
			}else{
				$(this).css({background:'green',textIndent:0}).removeClass('hide').addClass('normal');
			}
		},
		move : function(){

		},
		activeCard : function(){
			$('.active').removeClass('active');
			$(this).addClass('active');
			var coordinate = $(this).data('coordinate');
			animalObj.deriction(coordinate);
		},
		deriction : function(coordinate){
			$('.deriction').remove();
			var top = right = bottom = left = 0;
			if(coordinate.x === 0 && coordinate.y === 0){
				//左上角
				right = bottom = 1;
				// $('.animal').attr('left')
				// 查找临近棋子状态，不用each
			}else if(coordinate.x === 3 && coordinate.y === 3){
				// 右下角
				left = top = 1;
			}else if(coordinate.x === 3 && coordinate.y === 0){
				// 右上角
				left = bottom = 1;
			}else if(coordinate.x === 0 && coordinate.y === 3){
				// 左下角
				right = top = 1;
			}else if(coordinate.y === 0){
				// 顶部
				right = bottom = left = 1;
			}else if(coordinate.x === 3){
				// 右侧
				top = bottom = left = 1;
			}else if(coordinate.y === 3){
				// 左侧
				top = right = left =1;
			}else if(coordinate.x === 0){
				// 底部
				top = right = bottom = 1;
			}else{
				top = right = bottom = left = 1;
			}
			$('.active').append('<div class="deriction"><div class="top '+(top?'':'none')+'"></div><div class="right '+(right?'':'none')+'"></div><div class="bottom '+(bottom?'':'none')+'"></div><div class="left '+(left?'':'none')+'"></div></div>');
		}
	}
	animalObj.init();
	$('.animals').on('click','.hide',animalObj.showCard);
	$('.animals').on('click','.normal',animalObj.activeCard);


});