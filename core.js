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
			$('.active').removeClass('active');
			$(this).addClass('active');
			var top = $(this).css('top'),
				left = $(this).css('left');
			animalObj.deriction(top, left);
		},
		deriction : function(tops, lefts){
			$('.deriction').remove();
			var top = right = bottom = left = 0;
			if(tops === '0px' && lefts === '0px'){
				right = bottom = 1;
			}else if(tops === '303px' && lefts === '303px'){
				left = top = 1;
			}else if(tops === '0px' && lefts === '303px'){
				left = bottom = 1;
			}else if(tops === '303px' && lefts === '0px'){
				right = top = 1;
			}else if(lefts === '0px'){
				top = right = bottom = 1;
			}else if(tops === '303px'){
				top = right = left =1;
			}else if(lefts === '303px'){
				top = bottom = left = 1;
			}else if(tops === '0px'){
				right = bottom = left = 1;
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