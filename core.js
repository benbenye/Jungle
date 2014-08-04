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
				domAnimalName[i].name = animalName[Math.abs(randomAnimals[i]) -1]
				$('.animals').append($('<div class="animal hide animal'+(i+1)+'"></div>').attr("team", domAnimalName[i].team).text(domAnimalName[i].name));
			}
			
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
			$(this).removeClass('normal').addClass('active');
			animalObj.deriction();

		},
		deriction : function(){
			$('.active').append('<div class="deriction"><div class="top"></div><div class="right"></div><div class="bottom"></div><div class="left"></div></div>');
		}
	}
	animalObj.init();
	$('.animals').on('click','.hide',animalObj.showCard);
	$('.animals').on('click','.normal',animalObj.activeCard);


});