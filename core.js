$(function(){
	// 随机生成棋子位置  2014/08/03  @bby
	/*
	*********
	@animals   :   棋子数组
	@random    :   用于生成随机角标的数组
	@randomAnimals    :    用于装打乱顺序之后的棋子数组
	@domAnimalName    :    用于输出到dom的棋子数组
	@piecesArray      :    棋子对象
		@name         ：   棋子名称
		@this         ：   棋子所属玩家
		@x            ：   棋子x坐标
		@y            ：   棋子y坐标
	*/

/*	var piecesArray=[];

	function Pieces(name,team,x,y,animals,i){
		this.name = name;
		this.team = team;
		this.x = x;
		this.y = y;
		this.deriction = function(){};
	}*/


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
				// piecesArray.push(new Pieces(animalName[Math.abs(randomAnimals[i]) -1], randomAnimals[i],i%4,Math.floor(i / 4)));
			}
			//  添加坐标
			$('.animal').each(function(i){
				$(this).data('coordinate',{x:i % 4,y:Math.floor(i / 4)});
				$(this).addClass("c"+i % 4+Math.floor(i / 4));
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
		compare : function(judgeThis,judgeObj,judgeDeriction){
			if(judgeThis.hasClass('hide')){
				//未翻牌
				judgeDeriction == 't' ? dtop = 0 : judgeDeriction == 'r' ? dright = 0 : judgeDeriction == 'b' ? dbottom = 0 : dleft = 0 ; 
			}else{
				if(judgeThis.attr('team') * judgeObj.attr('team') > 0){
					// 同一方的棋子
					judgeDeriction == 't' ? dtop = 0 : judgeDeriction == 'r' ? dright = 0 : judgeDeriction == 'b' ? dbottom = 0 : dleft = 0 ; 
				}else if(Math.abs(judgeThis.attr('team')) < Math.abs(judgeObj.attr('team'))){
					// 级别比自己大
					judgeDeriction == 't' ? dtop = 0 : judgeDeriction == 'r' ? dright = 0 : judgeDeriction == 'b' ? dbottom = 0 : dleft = 0 ; 
				}
			}
		},
		judge : function(t, r, b, l, c){
			// 找到对应方向的对象
			if(t){//dtop
				var _this = $('.c'+c.x+(c.y-1)),
					_obj = $('.c'+c.x+c.y);
					animalObj.compare(_this, _obj, 't');

			}
			if(r){//dright
				var _this = $('.c'+(c.x+1)+c.y),
					_obj = $('.c'+c.x+c.y);
					animalObj.compare(_this, _obj, 'r');
			}
			if(b){//dbottom
				var _this = $('.c'+c.x+(c.y+1)),
					_obj = $('.c'+c.x+c.y);
					animalObj.compare(_this, _obj, 'b');
			}
			if(l){//dleft
				var _this = $('.c'+(c.x-1)+c.y),
					_obj = $('.c'+c.x+c.y);
					animalObj.compare(_this, _obj, 'l');
			}
		},
		deriction : function(coordinate){
			$('.deriction').remove();
			var dtop = dright = dbottom = dleft = 0;
			if(coordinate.x === 0 && coordinate.y === 0){
				//左上角
				dright = dbottom = 1;

				animalObj.judge(dtop, dright, dbottom, dleft, coordinate);
					
			}else if(coordinate.x === 3 && coordinate.y === 3){
				// 右下角
				dleft = dtop = 1;
				animalObj.judge(dtop, dright, dbottom, dleft, coordinate);
			}else if(coordinate.x === 3 && coordinate.y === 0){
				// 右上角
				dleft = dbottom = 1;
				animalObj.judge(dtop, dright, dbottom, dleft, coordinate);
			}else if(coordinate.x === 0 && coordinate.y === 3){
				// 左下角
				dright = dtop = 1;
				animalObj.judge(dtop, dright, dbottom, dleft, coordinate);
			}else if(coordinate.y === 0){
				// 顶部
				dright = dbottom = dleft = 1;
				animalObj.judge(dtop, dright, dbottom, dleft, coordinate);
			}else if(coordinate.x === 3){
				// 右侧
				dtop = dbottom = dleft = 1;
				animalObj.judge(dtop, dright, dbottom, dleft, coordinate);
			}else if(coordinate.y === 3){
				// 左侧
				dtop = dright = dleft =1;
				animalObj.judge(dtop, dright, dbottom, dleft, coordinate);
			}else if(coordinate.x === 0){
				// 底部
				dtop = dright = dbottom = 1;
				animalObj.judge(dtop, dright, dbottom, dleft, coordinate);
			}else{
				dtop = dright = dbottom = dleft = 1;
				animalObj.judge(dtop, dright, dbottom, dleft, coordinate);
			}
			$('.active').append('<div class="deriction"><div class="top '+(dtop?'':'none')+'"></div><div class="right '+(dright?'':'none')+'"></div><div class="bottom '+(dbottom?'':'none')+'"></div><div class="left '+(dleft?'':'none')+'"></div></div>');
		}
	};

	animalObj.init();
	$('.animals').on('click','.hide',animalObj.showCard);
	$('.animals').on('click','.normal',animalObj.activeCard);
});