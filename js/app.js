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
	draw_grab_ship: function(dragObject){
		dragObject.object.css({"top":""+dragObject.Y+"px", "left":""+dragObject.X+"px"});
	},
	draw_navy: function(cell_numb,type,horizontal){
		console.log("cell:" + cell_numb);
		console.log("type:" + type);
		console.log("horizontal:" + horizontal);
		if(horizontal){
			switch(type){
				case 1:{
					$("#p"+cell_numb+"").addClass("player-ship");
					break;
				}
				case 2:{
					$("#p"+cell_numb+"").addClass("player-ship");
					cell_numb++;
					$("#p"+cell_numb+"").addClass("player-ship");
					break;
				}				
				case 3:{
					$("#p"+cell_numb+"").addClass("player-ship");
					cell_numb--;
					$("#p"+cell_numb+"").addClass("player-ship");
					cell_numb+= 2;	
					$("#p"+cell_numb+"").addClass("player-ship");
					break;
				}
				case 4:{
					$("#p"+cell_numb+"").addClass("player-ship");
					cell_numb--;
					$("#p"+cell_numb+"").addClass("player-ship");
					cell_numb += 2;
					$("#p"+cell_numb+"").addClass("player-ship");
					cell_numb++;
					$("#p"+cell_numb+"").addClass("player-ship");
					break;
				}
				case 5:{
					$("#p"+cell_numb+"").addClass("player-ship");
					cell_numb--;
					$("#p"+cell_numb+"").addClass("player-ship");
					cell_numb--;
					$("#p"+cell_numb+"").addClass("player-ship");
					cell_numb += 3;
					$("#p"+cell_numb+"").addClass("player-ship");
					cell_numb++;
					$("#p"+cell_numb+"").addClass("player-ship");
					break;
				}				
			}
		}else if(!horizontal){
			switch(type){
				case 1:{
					$("#p"+cell_numb+"").addClass("player-ship");
					break;
				}
				case 2:{
					$("#p"+cell_numb+"").addClass("player-ship");
					cell_numb = Number(cell_numb) + 10;
					$("#p"+cell_numb+"").addClass("player-ship");
					break;
				}
				case 3:{
					$("#p"+cell_numb+"").addClass("player-ship");
					cell_numb = Number(cell_numb) + 10;
					$("#p"+cell_numb+"").addClass("player-ship");
					cell_numb = Number(cell_numb) - 20;
					$("#p"+cell_numb+"").addClass("player-ship");
					break;
				}
				case 4:{
					$("#p"+cell_numb+"").addClass("player-ship");
					cell_numb = Number(cell_numb) + 10;
					$("#p"+cell_numb+"").addClass("player-ship");
					cell_numb = Number(cell_numb) + 10;
					$("#p"+cell_numb+"").addClass("player-ship");
					cell_numb = Number(cell_numb) - 30;
					$("#p"+cell_numb+"").addClass("player-ship");
					break;
				}
				case 5:{
					$("#p"+cell_numb+"").addClass("player-ship");
					cell_numb = Number(cell_numb) + 10;
					$("#p"+cell_numb+"").addClass("player-ship");
					cell_numb = Number(cell_numb) + 10;
					$("#p"+cell_numb+"").addClass("player-ship");
					cell_numb = Number(cell_numb) - 30;
					$("#p"+cell_numb+"").addClass("player-ship");
					cell_numb = Number(cell_numb) - 10;
					$("#p"+cell_numb+"").addClass("player-ship");
					break;
				}				
			}
		}
	}
};
/*------------------- End view --------------------*/



/*------------------- Start model --------------------*/
var model = {
	ship_placed: false,
	ship_grabbed:false,
	dragObject:{
		X : 0,
		Y : 0,
		object: null,
		horizontal: true,
		ship_type: 0,
		set_type:function(type){
			switch(type){
				case "ships-one":{
					this.ship_type = 1;
					break;
				};
				case "ships-two":{
					this.ship_type = 2;
					break;
				};
				case "ships-three":{
					this.ship_type = 3;
					break;
				};
				case "ships-four":{
					this.ship_type = 4;
					break;
				};
				case "ships-five":{
					this.ship_type = 5;
					break;
				};
			}
		},
		set_coords:function(x,y){
			if(this.horizontal){
				this.Y = y - 20;
				this.X = x - (40 * this.ship_type) / 2;
			}else{
				this.X = x - 20;
				this.Y = y - (40 * this.ship_type) / 2;
			}
			
		}
	},
	player_arr : [	0,0,0,0,0,0,0,0,0,0,					
					0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,0,0
					],
	enemy_arr :  [	0,0,0,0,0,0,0,0,0,0,					
					0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,0,0					
					],
	pl_ships_arr : Array(),
	en_ships_arr : Array(),
	init_drag: function(obj,x,y){
		this.dragObject.object = obj;
		this.dragObject.set_type(this.dragObject.object.prop("id"));
		this.dragObject.object.addClass("grabbed");
		this.dragObject.set_coords(x,y);
		this.dragObject.object.css("position", "absolute");

	},
    getCursor: function(){
    	var cursor = {
    		x: document.getElementById("cursorX").value,
    		y: document.getElementById("cursorY").value 
    	};
    	return cursor;
    },
    setCursor: function(x,y){
    	document.getElementById("cursorX").value = x;
    	document.getElementById("cursorY").value = y;
    },
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
	mouse_bind: function(){
		$("body").bind("mousemove",this.set_coords);
	},
	mouse_unbind: function(){
		$("body").unbind("mousemove",this.set_coords);
	},
	show_arr: function(arr){
		console.log("  A|B|C|D|E|F|G|H|I|J|");
		for(var i = 0;i<10;i++){
			console.log(i+" "+arr[i*10+0]+"|"+arr[i*10+1]+"|"+arr[i*10+2]+"|"+arr[i*10+3]+"|"+arr[i*10+4]+"|"+arr[i*10+5]+"|"+arr[i*10+6]+"|"+arr[i*10+7]+"|"+arr[i*10+8]+"|"+arr[i*10+9]+"|");
		}
	},
	check_cell: function(number,arr){
		if(arr[number] == 0){
			return true;
		}else{
			return false;
		}
	},
	setNavy: function(cell_numb,tmp_arr,horizontal){
		var tmp_numb = 0,
			top_edge = 3;
		tmp_arr[cell_numb] = 1;

		if(horizontal){
			if(cell_numb % 10 == 0){
				tmp_numb = cell_numb - 10;
				top_edge = 2;
			}else if((cell_numb + 1) % 10 == 0){
				tmp_numb = cell_numb - 11;
				top_edge = 2;
			}else{
				tmp_numb = cell_numb - 11;
			}
			for(var j = tmp_numb;j<tmp_numb+top_edge;j++){
				if((tmp_arr[j] != 1) && (j >= 0) && (j<100)){
					tmp_arr[j] = 2;
				}
			}
			if(cell_numb % 10 == 0){
				tmp_numb = cell_numb + 10;
			}else {
				tmp_numb = cell_numb + 9;
			}
			for(var j = tmp_numb;j<tmp_numb+top_edge;j++){
				if((tmp_arr[j] != 1) && (j > 0) && (j<100)){
					tmp_arr[j] = 2;
				}
			}
			if((tmp_arr[cell_numb-1] != 1) && (cell_numb % 10 != 0)){
				tmp_arr[cell_numb-1] = 2;
			}
		}else{
			if(cell_numb < 9){
				tmp_numb = cell_numb - 1;
				top_edge = 2;
			}else if(cell_numb > 89) {
				tmp_numb = cell_numb - 11;
			}else {
				tmp_numb = cell_numb - 11;
			}
			for(var i = tmp_numb;i<tmp_numb+top_edge*10;i+=10){
				if((tmp_arr[i] != 1) && (cell_numb % 10 != 0)){
					tmp_arr[i] = 2;
				}
			}
			if(cell_numb > 9){
				tmp_numb = cell_numb - 9; 
			}else {
				tmp_numb = cell_numb + 1;
			}
			for(var i = tmp_numb;i<tmp_numb+top_edge*10;i+=10){
				if((cell_numb + 1) % 10 != 0){
					tmp_arr[i] = 2;
				}
			}
			if((cell_numb - 10 >0) && (tmp_arr[cell_numb-10] != 1)){
				tmp_arr[cell_numb - 10] = 2;
			}
		}

		return tmp_arr;
	},
	create_ship: function(type,horiz, cell){
		var ship_obj = {
				type : 0,
				horiz: "",
				cells: [],
				health : -1 
			},
			j = 0,
			tmp_cell = cell;
		ship_obj.type = type;
		ship_obj.horiz = horiz;
		ship_obj.health = 2;
		if(horiz){
			if(((type == 3) || (type == 4))){
				tmp_cell--;
			}else if(type == 5){
				tmp_cell-=2;
			}
			for(var i = tmp_cell; i<tmp_cell + type;i++){
				ship_obj.cells[j] = i;
				j++;
			}
		}else{
			if(((type == 3) || (type == 4))){
				tmp_cell-=10;
			}else if(type == 5){
				tmp_cell-=20;
			}
			for(var i = tmp_cell; i<tmp_cell + type*10;i+=10){
				ship_obj.cells[j] = i;
				j++;
			}
		}
		return ship_obj;
	},
	ship_to_array: function(target,type,horizontal,ships_arr){
		/*console.log("ship type:" + type +"");
		console.log("horizontal:" + horizontal + "");
		console.log(target);*/
		var reg = new RegExp("\\d{1,2}","i"),
			cell_numb = "";
		if($(target).hasClass("batle-cell")){
			cell_numb = Number(reg.exec(target.id)[0]);
			/* Расшифровка значений массива
				0 - пустая ячейка с возможностью установки корабля
				1 - ячейка с установленным кораблём
				2 - пустая ячейка без возможности установки корабля(стоит возле кораблей)
				3 - ячейка с подбитым(убитым) кораблём
			*/
			var tmp_arr = ships_arr;
			if(model.check_cell(cell_numb,tmp_arr)){
				var local_arr = [],
					local_arr = ships_arr,
					tmp_cell = cell_numb,
					ship_obj = "";
				if(horizontal){
					if((type == 3) || (type == 4)){
						tmp_cell--;
					}else if(type == 5){
						tmp_cell-=2;
					}
					for(var i = 0;i<type;i++){
						if(model.check_cell(tmp_cell,tmp_arr)){
							local_arr = model.setNavy(tmp_cell,tmp_arr,horizontal);
							tmp_cell++;
						}else{
							return false;
						}
					}
					if((local_arr[tmp_cell] != 1) && ((tmp_cell) % 10 != 0)){
						local_arr[tmp_cell] = 2;
					}
				}else{
					if((type == 3) || (type == 4)){
						tmp_cell-= 10;
					}else if(type == 5){
						tmp_cell-=20;
					}
					for(var i = 0;i<type;i++){
						if(model.check_cell(tmp_cell,tmp_arr)){
							local_arr = model.setNavy(tmp_cell,tmp_arr,horizontal);
							tmp_cell+=10;
						}else{
							return false;
						}
					}
					if(tmp_cell < 100){
						local_arr[tmp_cell] = 2;
					}
				}
				model.player_arr = local_arr;
				model.show_arr(model.player_arr);
				ship_obj = model.create_ship(type, horizontal, cell_numb);
				model.pl_ships_arr.push(ship_obj);
				console.log(model.pl_ships_arr);
				return true;

			}else{
				return false;
			}
		}else{
			console.log("not battle cell");
			return false;
		}
		
	}

};
/*------------------- End model --------------------*/


/*------------------- Start controller --------------------*/
var controller = {
	main_btn_clk: function(){
		var butt = $(".game-button")[0],
		status = model.game_status(butt);
		if(status === "start-btn"){
			view.show_field();
		}else if(status === "end-btn"){
			view.show_hangar();
		}
	},
	grab_ship: function(e){
		var ship_clone = $("#"+e.target.id+"").clone();
		model.init_drag(ship_clone,e.pageX,e.pageY);
		view.draw_grab_ship(model.dragObject);
		$("body").append(model.dragObject.object); 
	},
	move_ship: function(e){
		if(model.dragObject.object != null){
			model.setCursor(e.pageX,e.pageY);
			model.dragObject.set_coords(e.pageX,e.pageY);
			view.draw_grab_ship(model.dragObject);
		}
	},
	rotate_ship: function(e){
		if(e.keyCode == 32){
			if(model.dragObject.horizontal){
				model.dragObject.horizontal = false;
				model.dragObject.object.prop("id",model.dragObject.object.prop("id") + "-vert");
			}else{
				model.dragObject.horizontal = true;
				model.dragObject.object.prop("id",model.dragObject.object.prop("id").slice(0,-5));
			}
			var cursor = model.getCursor();
			model.dragObject.set_coords(cursor.x, cursor.y);
			view.draw_grab_ship(model.dragObject);
		}
	},
	set_ship: function(e){
		if(model.dragObject.object != null && model.ship_grabbed){
			model.dragObject.object.detach();
			model.dragObject.object = null;
			model.ship_grabbed = false;
			model.ship_placed = true;
			$(document.elementFromPoint(e.pageX, e.pageY)).click();
		}else if(model.dragObject.object != null && !model.ship_grabbed){
			model.ship_grabbed = true;
		}else if(model.ship_placed) {
			var reg = new RegExp("\\d{1,2}","i"),
				cell_numb = "",
				set_result = true,
				table = $(e.target).closest("table");
			if(table.length != 0){
				set_result = model.ship_to_array(e.target,model.dragObject.ship_type,model.dragObject.horizontal,model.player_arr);
				if(set_result){
					cell_numb = reg.exec(e.target.id)[0];
					view.draw_navy(cell_numb,model.dragObject.ship_type,model.dragObject.horizontal);	
					model.ship_placed = false;
					model.dragObject.horizontal = true;
				}else{
					model.dragObject.horizontal = true;
				}
			}else{
				console.log("not in table");
			}
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
			$("#ships-for-batle").on("click",".draggable",controller.grab_ship);
			$("body").on("mousemove",controller.move_ship);
			$("body").on("click",controller.set_ship);
			$("#player-field").on("click",".batle-cell",controller.set_ship);
			$("body").on("keyup",controller.rotate_ship);
			//$("#ships-five").draggable();
			//$('#ships-for-batle').on('mousedown', '.draggable', controller.drag_ship);
			

			
			
		}

	};

	game.init();
});