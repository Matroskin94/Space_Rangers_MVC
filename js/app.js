/*------------------- Start view --------------------*/
var view = {
	show_field:function(){
		$("#enemey-field > table").fadeIn(300);
		$("#ships-for-batle").css("display","none");
		$("#m-btn-text").parent().fadeOut(150,function(){
			$("#m-btn-text").html("End game");
		});
		$("#m-btn-text").parent().fadeIn(150);
	},
	show_hangar:function(){
		$("#ships-for-batle").fadeIn(300);	
		$("#enemey-field > table").css("display","none");
		$("#m-btn-text").parent().fadeOut(150,function(){
			$("#m-btn-text").html("Start game");
		});
		$("#m-btn-text").parent().fadeIn(150);
	},
	replace_ship_av: function(avatar,e){
		document.body.appendChild(avatar);
		avatar.style.zIndex = 9999; // сделать, чтобы элемент был над другими
		avatar.style.position = 'absolute';
		avatar.style.left = e.pageX + 'px';
		avatar.style.top = e.pageY + 'px';
	}
};
/*------------------- End view --------------------*/



/*------------------- Start model --------------------*/
var model = {
	dragObject:{},
	game_status: function(e){
		var butt_id = e.id,
		tmp_but = document.getElementById(butt_id);
		if(butt_id === "start-btn"){
			tmp_but.id = "end-btn";
		}else if(butt_id === "end-btn"){
			tmp_but.id = "start-btn";
		}
		return butt_id;
	},
	grab_ship: function(e){
		this.dragObject.element = e;
		this.dragObject.downX = e.pageX;
		this.dragObject.downY = e.pageY;
		$(e.target).addClass("grabbed");
		if(!this.dragObject.avatar){
			this.dragObject.avatar = event.target;
		}
		return this.dragObject.avatar;
		//console.log(e);
		//console.log(this.dragObject.element === undefined);

	},
	getAvatar: function(){
		return this.dragObject.avatar;
	}

};
/*------------------- End model --------------------*/


/*------------------- Start controller --------------------*/
var controller = {
	ship_grabbed: false,
	main_btn_clk: function(){
		var butt = $(".game-button")[0],
		status = model.game_status(butt);
		if(status === "start-btn"){
			view.show_field();
		}else if(status === "end-btn"){
			view.show_hangar();
		}
	},
	choose_ship: function(e){
		if(model.dragObject.element === undefined){
			model.grab_ship(e);
			var avatar = model.grab_ship(e.target);
			view.replace_ship_av(avatar,e.target);

		}
	},
	drag_ship: function(e){
		console.log($('.ships-line').find(".grabbed").length);
		if($('.ships-line').find(".grabbed").length != 0){
			this.ship_grabbed = true;
			console.log("1");
		}
		if(this.ship_grabbed){
			console.log("grab");
			var avatar = model.getAvatar();
			view.replace_ship_av(avatar,e.target);
		}
	}
};
/*------------------- End controller --------------------*/




$(document).ready(function () {

	var game = {
		init: function(){
			this.main();
			this.control();
			this.event();
		},

		main: function(){

		},

		control: function(){

		},

		event: function(){
			var main_but = document.getElementById("start-btn");
			main_but.onclick = controller.main_btn_clk;
			$('body').on('click', '.draggable', controller.choose_ship);
			document.onmousemove =  controller.drag_ship;

			
			
		}

	};

	game.init();
});