<section class="content-main">
	
	<div class="page_header margin_bottom">
		<h1>{{page_item.name}}</h1>
	</div>
	
	{{#if page_item.text}}
	<div class="become-box" style="margin-bottom:0;padding-bottom:0;">{{{page_item.text}}}</div>
	{{/if}}
	
	<div class="page_rasp">все поля формы являются обязательными для заполнения</div>
	
	<div class="page_form product_registration">
		<table class="form_table">
			<tr ><!--Ваше ФИО fio-->
				<td class="name">Ваше ФИО:</td>
				<td class="value">
					<input type="text" value="" id="fio" ng-model="form.fio" />
				</td>
			</tr>
			<tr ><!--Email email-->
				<td class="name">Email:</td>
				<td class="value">
					<input type="text" value="" id="email" ng-model="form.email" />
				</td>
			</tr>
			<tr ><!--Телефон с кодом города phone-->
				<td class="name">Телефон с кодом города:</td>
				<td class="value">
					<input type="text" value="" id="phone" ng-model="form.phone" placeholder="8 (000) 000-00-00" />
				</td>
			</tr>
			<tr ><!--Город city-->
				<td class="name">Город:</td>
				<td class="value">
					<input type="text" value="" id="city" ng-model="form.city" />
				</td>
			</tr>
			<tr ><!--Магазин shop-->
				<td class="name">Магазин, где был приобретен товар:</td>
				<td class="value ">
					<input type="text" value="" id="shop" ng-model="form.shop" />
				</td>
			</tr>
			<tr ><!--Дата продажи sale_date-->
				<td class="name">Дата продажи (по чеку):</td>
				<td class="value">
					<div class="sale_date_container">
						<input type="text" value="" id="sale_date" />
						<div class="icon"></div>
					</div>
				</td>
			</tr>
			<tr ><!--Выберите Ваш продукт cat_id-->
				<td class="name">Выберите Ваш продукт:</td>
				<td class="value">
					<select id="cat_id" onchange="p_obj.catChange();">
						<option value="0">выбор...</option>
						{{#each cat_array}}
						<option value="{{id}}" data-root_cat_id="{{root_cat_id}}">{{name}}</option>
						{{/each}}
					</select>
				</td>
			</tr>
			<tr ><!--Выберите серию seria_id-->
				<td class="name">Выберите серию:</td>
				<td class="value">
					<select id="seria_id" onchange="p_obj.seriaChange();">
						<option value="0">выбор...</option>
					</select>
				</td>
			</tr>
			<tr ><!--Выбери модель model_id-->
				<td class="name">Выбери модель:</td>
				<td class="value">
					<select id="model_id">
						<option value="0">выбор...</option>
					</select>
				</td>
			</tr>
			<tr ><!--Введите серийный номер продукта serial_number-->
				<td class="name">Введите серийный номер продукта:</td>
				<td class="value">
					<input type="text" value="" id="serial_number" ng-model="form.serial_number" />
				</td>
			</tr>
			<tr ><!--Скан-копия гарантийного талона-->
				<td class="name">Скан-копия гарантийного талона:</td>
				<td class="value text">
					<div class="image_list" id="image_list"></div>
					<div class="load_image transition" id="load_image">Загрузить...</div>
				</td>
			</tr>
			<tr ><!--обязательно к заполнению-->
				<td class="name"></td>
				<td class="value info">
					Все поля обязательны для заполнения. Пожалуйста, внимательно проверьте написание адреса вашей электронной почты, и при необходимости, укажите дополнительный способ связи. После отправки вашего обращения или вопроса, специалист ответит вам в кратчайшие сроки. Обращаем ваше внимание, что отдел поддержки работает с 10:00 до 18:00 часов по московскому времени, в будни. 
				</td>
			</tr>
			<tr ><!--Отправить-->
				<td class="name"></td>
				<td class="value">
					<div class="btn_send transition" onclick="p_obj.sendForm();">Отправить</div>
				</td>
			</tr>
		</table>
	
		<br>
	</div>
	
</section>
<script>
function pageClass(){
	{// Инициализация
		var self = this;
		this.script_url = App.Core.script_url;	// урл респондента
		
	}//END Инициализация
	this.init = function(){
		
		$( "#sale_date" ).datepicker({
			buttonImageOnly: true,
			dateFormat: 'dd-mm-yy',
		});// END datepicker
		$('.sale_date_container .icon').click(function(e){
			$( "#sale_date" ).datepicker( "show" );
		});
	
		
		
	
		//console.log(this.script_url)
		this.clearForm();
		this.initImage();
		
		$('#seria_id, #model_id').attr({'disabled':'disabled'});
		
	}//END init
	
	this.sendForm = function(){// отправить форму
	
		{// получение данных					
			var fio = $.trim($("#fio").val());
			var email = $.trim($("#email").val());
			var phone = $.trim($("#phone").val());
			var city = $.trim($("#city").val());
			var shop = $.trim($("#shop").val());
			var sale_date = $.trim($("#sale_date").val());
			var model_id = $.trim($("#model_id").val());
			var serial_number = $.trim($("#serial_number").val());
			var attach_str=this.packImage();
			//console.log(attach_str)
		}// END
		{// проверка полей на заполнение
			
			if(fio==''){
				fn.uAlert('ВАШЕ ФИО - не заполнено');
				$("#fio").focus();
				return;
			}
			if(email==''){
				fn.uAlert('EMAIL - не заполнено');
				$("#email").focus();
				return;
			}
			if(fn.isEmail(email)==false){
				fn.uAlert('EMAIL - заполнено неверно');
				$("#email").focus();
				return;
			}
			if(phone==''){
				fn.uAlert('ТЕЛЕФОН С КОДОМ ГОРОДА - не заполнено');
				$("#phone").focus();
				return;
			}
			if(city==''){
				fn.uAlert('ГОРОД - не заполнено');
				$("#city").focus();
				return;
			}
			if(shop==''){
				fn.uAlert('МАГАЗИН, ГДЕ БЫЛ ПРИОБРЕТЕН ТОВАР - не заполнено');
				$("#shop").focus();
				return;
			}
			if(sale_date==''){
				fn.uAlert('ДАТА ПРОДАЖИ (ПО ЧЕКУ) - не заполнено');
				$("#sale_date").focus();
				return;
			}
			if(model_id==0){
				fn.uAlert('МОДЕЛЬ - не заполнено');
				return;
			}
			if(serial_number==''){
				fn.uAlert('ВВЕДИТЕ СЕРИЙНЫЙ НОМЕР ПРОДУКТА - не заполнено');
				$("#serial_number").focus();
				return;
			}
			if(attach_str==''){
				fn.uAlert('СКАН-КОПИЯ - не загружена');
				return;
			}
			
			
		}// END
		fn.showProcess('Отправка запроса');
		$.ajax({
			type: "POST",
			url: this.script_url,
			data: "mode=addPrItem"
					+"&fio="+fio
					+"&email="+email
					+"&phone="+phone
					+"&city="+city
					+"&shop="+shop
					+"&sale_date="+sale_date
					+"&ann_id="+model_id
					+"&serial_number="+serial_number
					+"&attach_str="+attach_str,
			success: function(a){
				fn.hideProcess();
				fn.completeProcess('Сообщение', 'Спасибо ваш продукт зарегестрирован.');
				
				self.clearForm();
				/*
				*/
			}// END success
		});// END ajax
		return;
	}//END 
	this.clearForm = function(){
		$('#image_list').html('');
		this.item_image_field_id=0;
		this.setUploaderText();
		
	
		$('.product_registration').find('INPUT[type!=radio],  TEXTAREA').val('');
		//$('#sd_service_center, #sd_customer_base').attr("checked", false)
		$('#seria_id, #model_id').attr({'disabled':'disabled'}).val(0);
		$('#cat_id').val(0);
		$('#fio').focus();
	}
	
	this.catChange = function(){
		$('#model_id').attr({'disabled':'disabled'}).val(0);
		var cat_id = $.trim($("#cat_id").val());
		
		//console.log('catChange() cat_id='+cat_id)
		if(cat_id==0){
			$('#seria_id, #model_id').attr({'disabled':'disabled'}).val(0);
			return;
		}
		//console.log('cat_id='+cat_id)
		$.ajax({
			type: "POST",
			url: this.script_url,
			dataType: 'json',
			//data: "mode=getCatArray"
			data: "mode=getSeriaArrayByAnnCat"
					+"&root_cat_id="+cat_id,
			success: function(a){
				
				var arr=a;
				//console.log(arr);
				if(arr.length==0){
					$('#seria_id, #model_id').attr({'disabled':'disabled'}).val(0);
					return;
				}
				var str='';
				str+='<option value="0">выбор...</option>';
				for(var i=0;i<arr.length;i++){
					str+='<option value="'+arr[i].id+'">'+arr[i].name+'</option>';
				}
				$('#seria_id').html(str);
				$('#seria_id').attr({'disabled':false});
				
				
			}// END success
		});// END ajax
		
	}//END 
	this.seriaChange = function(){
		var seria_id = $.trim($("#seria_id").val());
		var cat_id = $.trim($("#cat_id").val());
		var root_cat_id = $.trim($("#cat_id :selected").data('root_cat_id'));
		//console.log('root_cat_id='+root_cat_id)
		$.ajax({
			type: "POST",
			url: this.script_url,
			dataType: 'json',
			data: "mode=getAnnArrayForRegister"
					+"&seria_id="+seria_id
					+"&root_cat_id="+root_cat_id,
			success: function(a){
				
				var arr=a;
				//console.log(arr);
				if(arr.length==0){
					$('#model_id').attr({'disabled':'disabled'}).val(0);
					return;
				}
				var str='';
				str+='<option value="0">выбор...</option>';
				for(var i=0;i<arr.length;i++){
					str+='<option value="'+arr[i].id+'">'+arr[i].name+'</option>';
				}
				$('#model_id').html(str);
				$('#model_id').attr({'disabled':false});
				
				
			}// END success
		});// END ajax
		
		
	}//END 
	
	{// image
		this.item_image_field_id=0;	// счётчик полей
		this.item_image_max=4;
		
		this.initImage = function(){// инит картинок
			
			this.image_uploader=new qq.FileUploader({
				element: document.getElementById('load_image'),
				action: this.script_url,
				multiple: false, // множественная загрузка
				allowedExtensions:['gif', 'jpg', 'png','pdf', 'zip', 'rar', '7z'], 
				params: {
					mode: 'uploadFile',
					type: 'product_registration'
					//file: $('#image_input_file_'+field_id).val() // файл который удаляется при загрузке нового
				},
				//debug: true,
				onSubmit: function(id, fileName){
					//p_obj.deleteImage($('#image_input_file_'+field_id).val());
					//console.log('загрузка')
					//console.log('id='+id)
					//console.log('fileName='+fileName)
					
					// прячем кнопку загрузить 
					$('#load_image .qq-upload-button').hide();
					/*
					
					// прячем кнопку удалить 
					$('#image_item_'+field_id+' .delete').hide();
					*/
				},
				onCancel: function(id, fileName){
					// показываем кнопку загрузить 
					$('#load_image .qq-upload-button').show();
					// чистим информацию о загрузке
					$('#load_image .qq-upload-list').html('');	
				},
				onComplete: function(id, fileName, responseJSON){
					//console.log( responseJSON )
					
					self.item_image_field_id++;
					var i=self.item_image_field_id;
					var json=responseJSON;
					
					
					{// html
						var str='';
						str+='<a ondragstart="return false" href="'+json.file+'" id="item_image_'+i+'" class="item" title="'+json.filename+'.'+json.ext+'" target="_blank">';
						str+='<div class="icon"></div>';
						//str+='<div class="icon"> <img src="/img/iResize.php?size=78&amp;bg=ffffff&amp;img='+json.file+'" /> </div>';
						str+='<div class="close" title="удалить"></div>';
						str+='<div class="text">'+json.filename+'.'+json.ext+'</div>';
						str+='<input id="item_image_input_'+i+'" value="'+json.file_id+'" type="hidden"/>';
						str+='</a>';
						$('#image_list').append(str);
					}//END html
					
					{// удаление
						$('#item_image_'+i+' .close').click(function( e ) {
							e.stopPropagation();
							e.stopImmediatePropagation();
							e.preventDefault();
							if( confirm('Действительно удалить?')==false ){
								return;
							}
							$('#item_image_'+i).empty().remove();
							self.setUploaderText();
						});
					}
						
					// показываем кнопку загрузить 
					$('#load_image .qq-upload-button').show();
					// чистим информацию о загрузке
					$('#load_image .qq-upload-list').html('');	
					
					self.setUploaderText();
					
					//$('.qq-upload-drop-area').show();
					
				}
			});// END FileUploader
			
		}//END
		this.packImage = function(){
			var arr = [];
			var sort=0;
			jQuery.each($("#image_list .item"), function() {
				var field_id=this.id.substr(11);
				if(parseInt(field_id)!=0){
					var file_id=$('#item_image_input_'+field_id).val();
					if(file_id!=''){
						sort+=10;
						arr.push({'file_id':file_id, 'sort':sort});
					}
				}
			});// END jQuery.each
			//return arr;
			//var str=packDataAjax(this.getImageArray());
			var str=fn.packDataAjax(arr);
			return str;
		}//END
		
		this.setUploaderText = function()
		// установить текст на кнопке
		// спрятать|показать кнопку загрузки
		{
			
			{// установить текст на кнопке
			
				var total=$("#image_list .item").length;
				if(total==0){
					$('#load_image .qq-upload-button SPAN').html('загрузить');
				}
				else{
					$('#load_image .qq-upload-button SPAN').html('загрузить ещё...');
				}
				
			}
			
			{// спрятать|показать кнопку загрузки
				if(total>=this.item_image_max){
					$('#load_image').hide();
				}
				else{
					$('#load_image').show();
				}
			}
		}//END
	}//END image
	
}//END pageClass p_obj
</script>