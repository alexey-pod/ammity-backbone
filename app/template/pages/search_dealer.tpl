<section class="content-main">
	
	<div class="page_header margin_bottom">
		<h1>{{page_item.name}}</h1>
	</div>
	
	<div class="map-widget" id="diler_map" style="width:720px; height:388px;"></div>
	
	<div class="become-box" style="margin-bottom:0;padding-bottom:0;">
		
		{{#if page_item.text}}
		<div>{{{page_item.text}}}</div>
		{{/if}}
		
		<div class="select_city">
			<div class="list">
				{{#each alphabet_array}}
				<div class="item">{{this}}</div>
				{{/each}}
			</div>
			<div class="show_all" onclick="p_obj.showCity(this);">показать весь список</div>
		</div>
		
		<table class="diler_list" id="d_table">
			{{#each diler_array}}
			<tbody city="{{@key}}">
				<tr class="letter" >
					<td colspan="4">{{@key}}</td>
				</tr>
				{{#each this}}
				<tr class="diler" city="{{index_letter}}">
					<td class="city">{{city}}</td>
					<td class="name">{{name}}</td>
					<td class="site">
						{{#if website1}}
							<a href="{{website1_url}}" target="_blank">{{website1}}</a>
						{{/if}}
						{{#if website1}}
							<a href="{{website2_url}}" target="_blank">{{website2}}</a>
						{{/if}}
					</td>
					<td class="phone">
						{{#if tel1}}<span>{{tel1}}</span>{{/if}}
						{{#if tel2}}<span>{{tel2}}</span>{{/if}}
					</td>
				</tr>
				{{/each}}
				<tr class="rasp" city="{{index_letter}}">
					<td colspan="4"></td>
				</tr>
			</tbody>
			{{/each}}
		</table>
		<br><br><br>
	</div>
	
</section>
<div class="map_tooltip hide">
	<div class="inner">
		<div class="content">
			<div class="name">Армавир-Спорт</div>
			<div class="city">г.Армавир</div>
			<div class="phone">8 (928) 848-29-34</div>
			<a href="@" class="site">www.armavir-sport.ru</a>
			<div class="close"></div>
		</div>
		<div class="arrow h"></div>
		<div class="arrow v"></div>
	</div>
</div>
<script>
function pageClass(){
	{// Инициализация
		var self = this;
		this.debug_mode=true;
		this.debug_mode=false;
	}//END Инициализация
	this.init = function(){
		this.initMap();
		this.initCity();
	}
	{// map
		this.initMap = function(){
			
			 
			//var myLatlng = new google.maps.LatLng(55.730578, 37.623214);
			//var myLatlng = new google.maps.LatLng(55.590175, 37.670250);
			//var myLatlng = new google.maps.LatLng(55.833420, 49.050422);
			var myLatlng = new google.maps.LatLng(57.971605, 73.384121);
			var myOptions = {
				zoom: 3,
				center: myLatlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}
			this.map = new google.maps.Map(document.getElementById("diler_map"), myOptions); 
			this.bildPlace();
			
			//Вычисление значения Zoom по границам 
			//this.getZoom();
			return;
		}//END
		this.bildPlace = function(){
			
			this.marker=[];
			this.infowindow=[];
			//var arr=this.place_array;
			var arr=this.diler_map_array;
			
			//console.log(arr)
			//for(var i in arr) {
			//if (!arr.hasOwnProperty(i)) continue;
			for(var i=0;i<arr.length;i++){
				//if(arr[i].name=='Strongpeople'){
				/*
				if(arr[i].name=='Фитнесстехнологии'){
					console.log(arr[i])
				}
				*/
				//console.log('i='+i)
				//создание метки
				//var myLatlng = new google.maps.LatLng(arr[i].lon, arr[i].lat);
				var myLatlng = new google.maps.LatLng(arr[i].lat, arr[i].lon);
				//console.log(arr[i]);
				//console.log(arr[i].id);
				//console.log('lon='+arr[i].lon+' lat='+arr[i].lat);
				//var contentString = '<div class="" id="content_'+i+'">'+arr[i][2]+'</div>';
				var str = '';
				str=''
				+'<div class="map_tooltip_2" id="content_'+i+'">'
				+'<div class="inner">'
				+'<div class="content">'
				+'<div class="name">'+arr[i].name+'</div>'
				+'<div class="city">г. '+arr[i].city+'</div>'
				+'<div class="phone">'+arr[i].tel1+'</div>'
				+'<a target="_blank" href="http://'+arr[i].website1+'" class="site">'+arr[i].website1+'</a>'
				+'<div class="close"></div>'
				+'</div>'
				+'<div class="arrow v"></div>'
				+'</div>'
				+'</div>';
				
				//console.log(contentString)
				//console.log(str)
				//var infowindow = new google.maps.InfoWindow({
				this.infowindow[i] = new google.maps.InfoWindow({
					content: str
				});
				
				{// добавление на карту
					
					//var marker = new google.maps.Marker({
					this.marker[i] = new google.maps.Marker({
						position: myLatlng,
						map: this.map,
						title:arr[i].name,
						icon:'/img/client/map/ammiti_map_icon.png'
					});
				}//END
				this.marker[i].m_id=i;// идентификатор метки
				
				google.maps.event.addListener(this.marker[i], 'click', function() {
					//console.log(this);
					//console.log('m_id='+this.m_id);
					self.closeInfowindowAll();
					self.infowindow[this.m_id].open(self.map, self.marker[this.m_id]);
					self.fixStyle();
				});
				
			}//END for
			
			return;
		}//END
		this.closeInfowindowAll = function(){
			var arr=this.diler_map_array;
			for(var i=0;i<arr.length;i++){
				self.infowindow[i].close(self.map, self.marker[i]);
			}
			return;
		}//END
		this.fixStyle = function(){
			var gm_style_iw=$('.map_tooltip_2').parent().parent().parent();
			
			$(gm_style_iw).prev().children().eq(3).css({'background':'#B21C2E'});
			$(gm_style_iw).prev().children().eq(2).children().children().css({'background':'#B21C2E'});
			// кнопка закрыть
			
			$(gm_style_iw).next( ).children().hide();
			$(gm_style_iw).next( ).css(
				{
					'background-image':'url(/img/client/map/bclose.png)',
					'background-repeat': 'no-repeat',
					'background-position': 'center center'
				}
			);
			$(gm_style_iw).css({'background':'#B21C2E'});
			return;
		}//END
	}//END map
	{//city
		this.initCity = function(){
			$('table tr:nth-child(2n)').addClass('bg');
			jQuery.each($('.select_city .list .item'), function() {
				//console.log(this)
				var letter=$(this).html();
				var length= $('#d_table TR[city='+letter+']').length;
				//console.log('length='+length)
				if(length==0){
					$(this).addClass('disabled');
				}
				$(this).on('click', function(){
					//console.log('click')
					//console.log(this)
					//var 
					self.showCity(this);
				});
			});
			return;
		}//END initCity
		this.showCity = function(item){
		
			if($(item).hasClass('disabled')){
				return;
			}
			
			var letter=$(item).html();
			//console.log('letter='+letter)
			if(letter=='показать весь список'){
				$('#d_table TBODY').show();
				$('.select_city .show_all').removeClass('show');
			}
			else{
				$('.select_city .show_all').addClass('show');
				jQuery.each($('#d_table TBODY'), function() {
					if($(this).attr('city')==letter){
						$(this).show();
					}
					else{
						$(this).hide();
					}
				});//END jQuery.each
			} 
			
			//подсвечиваем в фильтре
			$('.select_city .item').removeClass('selected');
			jQuery.each($('.select_city .item'), function() {
				if( $(this).html()==letter ){
					$(this).addClass('selected');
				}
			});
			
		}//END
	}//END city
}//END Class
</script>