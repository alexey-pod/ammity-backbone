<section class="content-main">
	
	<div class="page_header margin_bottom">
		<h1>{{page_item.name}}</h1>
	</div>
	
	<div class="become-box" style="margin-bottom:0;padding-bottom:0;">
	
		{{#if page_item.text}}
		<div>{{{page_item.text}}}</div>
		{{/if}}
		
		<div class="contact_menu" id="contact_menu">
			<div class="item question" value="question"></div>
			<div class="item comment" value="comment"></div>
			<div class="item service" value="service"></div>
		</div>
	</div>
	
	<div class="page_form  hide" id="question_form"><!--Вопрос в компанию-->
		<div class="header">Вопрос в компанию:</div>
		<table class="form_table" ng-controller="pages_contact_ctrl_question">
			<tr ><!--Ваше ФИО fio-->
				<td class="name">Ваше ФИО:</td>
				<td class="value">
					<input type="text" value="" id="q_fio" ng-model="form.fio" />
				</td>
			</tr>
			<tr ><!--Email email-->
				<td class="name">Email:</td>
				<td class="value">
					<input type="text" value="" id="q_email" ng-model="form.email" />
				</td>
			</tr>
			<tr ><!--Телефон с кодом города phone-->
				<td class="name">Телефон с кодом города:</td>
				<td class="value">
					<input type="text" value="" id="q_phone" placeholder="8 (000) 000-00-00" ng-model="form.phone" />
				</td>
			</tr>
			<tr ><!--вопрос:-->
				<td class="name">вопрос:</td>
				<td class="value">
					<textarea id="q_text" ng-model="form.text"></textarea>
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
					<div class="btn_send transition" onclick="p_obj.sendFormQuestion();">Отправить</div>
				</td>
			</tr>
		</table>
	</div>
	
	<div class="page_form  hide" id="comment_form"><!--Отзыв о продукте-->
		<div class="header">Отзыв о продукТЕ:</div>
		<table class="form_table" ng-controller="pages_contact_ctrl_comment">
			<tr ><!--Выберите Ваш продукт cat_id-->
				<td class="name">Выберите продукт:</td>
				<td class="value">
					<select id="c_cat_id" onchange="p_obj.catChangeComment();">
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
					<select id="c_seria_id" onchange="p_obj.seriaChangeComment();">
						<option value="0">выбор...</option>
					</select>
				</td>
			</tr>
			<tr ><!--Выбери модель model_id-->
				<td class="name">Выбери модель:</td>
				<td class="value">
					<select id="c_model_id">
						<option value="0">выбор...</option>
					</select>
				</td>
			</tr>
			
			<tr ><!-- design-->
				<td class="name">Дизайн:</td>
				<td class="value" id="rating_design">
					<ul class="rating_box" rate="3" style="" >
						<li class="selected">1</li>
						<li class="selected">2</li>
						<li class="selected">3</li>
						<li class="">4</li>
						<li class="">5</li>
					</ul>
				</td>
			</tr>
			<tr ><!-- safety-->
				<td class="name">Надежность:</td>
				<td class="value" id="rating_safety">
					<ul class="rating_box" rate="3" style="" >
						<li class="selected">1</li>
						<li class="selected">2</li>
						<li class="selected">3</li>
						<li class="">4</li>
						<li class="">5</li>
					</ul>
				</td>
			</tr>
			<tr ><!-- functionality-->
				<td class="name">Функциональность:</td>
				<td class="value" id="rating_functionality">
					<ul class="rating_box" rate="3" style="" >
						<li class="selected">1</li>
						<li class="selected">2</li>
						<li class="selected">3</li>
						<li class="">4</li>
						<li class="">5</li>
					</ul>
				</td>
			</tr>
			<tr ><!-- comfort-->
				<td class="name">Комфорт:</td>
				<td class="value" id="rating_comfort">
					<ul class="rating_box" rate="3" style="" >
						<li class="selected">1</li>
						<li class="selected">2</li>
						<li class="selected">3</li>
						<li class="">4</li>
						<li class="">5</li>
					</ul>
				</td>
			</tr>
			<tr ><!--отзыв:-->
				<td class="name">отзыв:</td>
				<td class="value">
					<textarea id="c_text" ng-model="form.text"></textarea>
				</td>
			</tr>
			<tr ><!--Ваше ФИО fio-->
				<td class="name">Ваше ФИО:</td>
				<td class="value">
					<input type="text" value="" id="c_fio" ng-model="form.fio" />
				</td>
			</tr>
			<tr ><!--Email email-->
				<td class="name">Email:</td>
				<td class="value">
					<input type="text" value="" id="c_email" ng-model="form.email" />
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
					<div class="btn_send transition" onclick="p_obj.sendFormComment();">Отправить</div>
				</td>
			</tr>
		</table>
	</div>
	
	<div class="page_form  hide" id="service_form"><!--Обращение в сервисную службу-->
		<div class="header">Обращение в сервисную службу:</div>
		<table class="form_table" ng-controller="pages_contact_ctrl_service">
			<tr ><!--Ваше ФИО fio-->
				<td class="name">Ваше ФИО:</td>
				<td class="value">
					<input type="text" value="" id="s_fio" ng-model="form.fio" />
				</td>
			</tr>
			<tr ><!--Email email-->
				<td class="name">Email:</td>
				<td class="value">
					<input type="text" value="" id="s_email" ng-model="form.email" />
				</td>
			</tr>
			<tr ><!--Телефон с кодом города phone-->
				<td class="name">Телефон с кодом города:</td>
				<td class="value">
					<input type="text" value="" id="s_phone" placeholder="8 (000) 000-00-00" ng-model="form.phone" />
				</td>
			</tr>
			<tr ><!--магазин-->
				<td class="name">магазин:</td>
				<td class="value">
					<input type="text" value="" id="s_shop" placeholder="магазин, где был приобретен товар" ng-model="form.shop" />
				</td>
			</tr>
			
			<tr ><!--Выберите Ваш продукт cat_id-->
				<td class="name">тип продукта:</td>
				<td class="value">
					<select id="s_cat_id" onchange="p_obj.catChangeService();">
						<option value="0">выбор...</option>
						{{#each cat_array}}
						<option value="{{id}}" data-root_cat_id="{{root_cat_id}}">{{name}}</option>
						{{/each}}
					</select>
				</td>
			</tr>
			<tr ><!--Выберите серию seria_id-->
				<td class="name">серия:</td>
				<td class="value">
					<select id="s_seria_id" onchange="p_obj.seriaChangeService();">
						<option value="0">выбор...</option>
					</select>
				</td>
			</tr>
			<tr ><!--Выбери модель model_id-->
				<td class="name">модель:</td>
				<td class="value">
					<select id="s_model_id">
						<option value="0">выбор...</option>
					</select>
				</td>
			</tr>
			
			
			<tr ><!--serial_number-->
				<td class="name">Серийный номер:</td>
				<td class="value">
					<input type="text" value="" id="s_serial_number" ng-model="form.serial_number" />
				</td>
			</tr>
			<tr ><!--Причина обращения::-->
				<td class="name">Причина обращения:</td>
				<td class="value">
					<textarea id="s_text" ng-model="form.text"></textarea>
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
					<div class="btn_send transition" onclick="p_obj.sendFormService();">Отправить</div>
				</td>
			</tr>
		</table>
	</div>
	
</section>
<div class="hide">
	<img src="/img/client/bContact_comment_over.png"/>
	<img src="/img/client/bContact_comment_down.png"/>
	<img src="/img/client/bContact_service_over.png"/>
	<img src="/img/client/bContact_service_down.png"/>
	<img src="/img/client/icon/star_red.png"/>
</div>
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
		
		
		{// menu init
			jQuery.each($("#contact_menu .item"), function() {
				$(this).click(function () {
					var value=$(this).attr('value');
					$('.page_form').hide();
					$('#'+value+'_form').show();
					
					//console.log('click '+value)
					
					$("#contact_menu .item").removeClass('selected');
					$(this).addClass('selected');
				});
			});
		}
		
		{/*Comment*/
			$('#c_seria_id, #c_model_id').attr({'disabled':'disabled'});
			$('UL LI').removeClass('selected');
			$('UL').attr({'rate':0});
		}
		{/*service*/
			$('#s_seria_id, #s_model_id').attr({'disabled':'disabled'});
		}
		//this.initRating();
		this.initRating('rating_design');
		this.initRating('rating_safety');
		this.initRating('rating_functionality');
		this.initRating('rating_comfort');
	}//END init
	
	// после отправки - прятать форму и написать крупным щрифтом спасибо за обращение
	//	подготовить url для прямого клика
	
	{//question_form  question
		this.sendFormQuestion = function(){// отправить форму
		
			{// получение данных					
				var fio = $.trim($("#q_fio").val());
				var email = $.trim($("#q_email").val());
				var phone = $.trim($("#q_phone").val());
				var text = $.trim($("#q_text").val());
			}// END
			{// проверка полей на заполнение
				
				if(fio=='' || email=='' || phone=='' || text==''){
					fn.uAlert('Все поля формы обязательны для заполнения!');
					return;
				}
				
				
			}// END
			fn.showProcess('Отправка запроса');
			$.ajax({
				type: "POST",
				url: this.script_url,
				data: "mode=addQuestionItem"
						+"&fio="+fio
						+"&email="+email
						+"&phone="+phone
						+"&text="+text,
						
				success: function(a){
					fn.hideProcess();
					fn.completeProcess('Сообщение', 'Спасибо за обращение');
					self.clearFormQuestion();
				}// END success
			});// END ajax
			return;
		}//END 
		this.clearFormQuestion = function(){
			$('#question_form').find('INPUT[type!=radio],  TEXTAREA').val('');
			$('.page_form').hide();
			$("#contact_menu .item").removeClass('selected');
		}//END
	}//END
	{//comment_form  Comment
		this.sendFormComment = function(){// отправить форму
		
			{// получение данных					
				var model_id = $.trim($("#c_model_id").val());
				var text = $.trim($("#c_text").val());
				var fio = $.trim($("#c_fio").val());
				var email = $.trim($("#c_email").val());
				
				var design= $('#rating_design UL').attr('rate');
				var safety= $('#rating_safety UL').attr('rate');
				var functionality= $('#rating_functionality UL').attr('rate');
				var comfort= $('#rating_comfort UL').attr('rate');
			}// END
			{// проверка полей на заполнение
				/*
				console.log(model_id)
				console.log(fio)
				console.log(email)
				console.log(text)
				*/
				if(model_id==0 || fio=='' || email=='' || text==''){
					fn.uAlert('Все поля формы обязательны для заполнения!');
					return;
				}
				
			}// END
			fn.showProcess('Отправка запроса');
			$.ajax({
				type: "POST",
				url: this.script_url,
				data: "mode=addCommentItem"
						+"&ann_id="+model_id
						+"&text="+text
						+"&fio="+fio
						+"&email="+email
						+"&design="+design
						+"&safety="+safety
						+"&functionality="+functionality
						+"&comfort="+comfort,
				success: function(a){
					fn.hideProcess();
					fn.completeProcess('Сообщение', 'Спасибо за обращение');
					self.clearFormComment();
				}// END success
			});// END ajax
			return;
		}//END 
		this.clearFormComment = function(){
			$('#comment_form').find('INPUT[type!=radio],  TEXTAREA').val('');
			$('.page_form').hide();
			$("#contact_menu .item").removeClass('selected');
			$('UL LI').removeClass('selected');
			$('UL').attr({'rate':0});
			
			$('#c_seria_id, #c_model_id').attr({'disabled':'disabled'}).val(0);
			$('#c_cat_id').val(0);
		}//END
		
		this.catChangeComment = function(){
			$('#c_model_id').attr({'disabled':'disabled'}).val(0);
			var cat_id = $.trim($("#c_cat_id").val());
			//console.log('catChange() cat_id='+cat_id)
			if(cat_id==0){
				$('#c_seria_id, #c_model_id').attr({'disabled':'disabled'}).val(0);
				return;
			}
			//console.log('cat_id='+cat_id)
			$.ajax({
				type: "POST",
				dataType: 'json',
				url: this.script_url,
				data: "mode=getSeriaArrayByAnnCat"
						+"&root_cat_id="+cat_id,
				success: function(a){
					var arr=a;
					//console.log(arr);
					if(arr.length==0){
						$('#c_seria_id, #c_model_id').attr({'disabled':'disabled'}).val(0);
						return;
					}
					var str='';
					str+='<option value="0">выбор...</option>';
					for(var i=0;i<arr.length;i++){
						str+='<option value="'+arr[i].id+'">'+arr[i].name+'</option>';
					}
					$('#c_seria_id').html(str);
					$('#c_seria_id').attr({'disabled':false});
					
					
				}// END success
			});// END ajax
			
		}//END 
		this.seriaChangeComment = function(){
			var seria_id = $.trim($("#c_seria_id").val());
			var cat_id = $.trim($("#c_cat_id").val());
			var root_cat_id = $.trim($("#c_cat_id :selected").data('root_cat_id'));
			$.ajax({
				type: "POST",
				dataType: 'json',
				url: this.script_url,
				data: "mode=getAnnArrayForRegister"
						+"&seria_id="+seria_id
						+"&root_cat_id="+root_cat_id
						,
				success: function(a){
					var arr=a;
					//console.log(arr);
					if(arr.length==0){
						$('#c_model_id').attr({'disabled':'disabled'}).val(0);
						return;
					}
					var str='';
					str+='<option value="0">выбор...</option>';
					for(var i=0;i<arr.length;i++){
						str+='<option value="'+arr[i].id+'">'+arr[i].name+'</option>';
					}
					$('#c_model_id').html(str);
					$('#c_model_id').attr({'disabled':false});
					
					
				}// END success
			});// END ajax
			
			
		}//END 
		
	}
	this.initRating = function(ann_id){
		// наведение мыши на li
		jQuery.each($('#'+ann_id+' UL LI'), function() {
			//console.log(this);
			$(this).mouseenter(function(){
				var index=$(this).html();
				//$.each($('ul#.rating li'), function() {
				$.each($('#'+ann_id+' UL LI'), function() {
					var index_inner=$(this).html();
					if(index_inner<=index){
						$(this).addClass('selected');
					}
					else{
						$(this).removeClass('selected');
					}
				});//END each
				
				//$('#'+ann_id+' .rate').show();
				//$('#'+ann_id+' .rate .user_rate').html(index);
			});//END mouseenter
		});
		
		
		// уведение мыши от всего UL
		$('#'+ann_id+' UL').mouseleave(function(){
			var index=$(this).attr('rate');
			if(index==undefined){
				//$('ul#.rating li').removeClass('selected');
				$('#'+ann_id+' UL LI').removeClass('selected');
				return;
			}
			//$.each($('ul#.rating li'), function() {
			$.each($('#'+ann_id+' UL LI'), function() {
				var index_inner=$(this).html();
				if(index_inner>index){
					$(this).removeClass('selected');
				}
				else{
					$(this).addClass('selected');
				}
			});
			
			// прячем панельку с оценкой
			if(index==0){
				$('#'+ann_id+' .rate').hide();
			}
			// восстанавливаем текст оценки
			$('#'+ann_id+' .rate .user_rate').html(index);
		});
		
		
		
		// установить rate
		$('#'+ann_id+' UL LI').click(function(){// установить rate
			var index=$(this).html();
			$('#'+ann_id+' UL').attr({'rate':index});
			$('#'+ann_id+' .reset').show();
			//self.setAnnRate(ann_id ,index);
			//console.log('rate='+index);
		});
		
	
	}//END
	{//service_form  Service
		
		
		
		this.sendFormService = function(){// отправить форму
		
			{// получение данных					
				var fio = $.trim($("#s_fio").val());
				var email = $.trim($("#s_email").val());
				var phone = $.trim($("#s_phone").val());
				var shop = $.trim($("#s_shop").val());
				var model_id = $.trim($("#s_model_id").val());
				var text = $.trim($("#s_text").val());
				var serial_number = $.trim($("#s_serial_number").val());
			}// END
			{// проверка полей на заполнение
				/*
				console.log(model_id)
				console.log(fio)
				console.log(email)
				console.log(text)
				*/
				if(fio=='' || email=='' || phone=='' || shop=='' || model_id==0 || text=='' || serial_number==''){
					fn.uAlert('Все поля формы обязательны для заполнения!');
					return;
				}
				
			}// END
			fn.showProcess('Отправка запроса');
			$.ajax({
				type: "POST",
				url: this.script_url,
				data: "mode=addServiceItem"
						+"&fio="+fio
						+"&email="+email
						+"&phone="+phone
						+"&shop="+shop
						+"&ann_id="+model_id
						+"&text="+text
						+"&serial_number="+serial_number,
				success: function(a){
					fn.hideProcess();
					fn.completeProcess('Сообщение', 'Спасибо за обращение');
					self.clearFormService();
				}// END success
			});// END ajax
			return;
		}//END 
		this.clearFormService = function(){
			$('#service_form').find('INPUT[type!=radio],  TEXTAREA').val('');
			$('.page_form').hide();
			$("#contact_menu .item").removeClass('selected');
			
			
			
			$('#s_seria_id, #s_model_id').attr({'disabled':'disabled'}).val(0);
			$('#s_cat_id').val(0);
		}//END
		
		this.catChangeService = function(){
			$('#s_model_id').attr({'disabled':'disabled'}).val(0);
			var cat_id = $.trim($("#s_cat_id").val());
			//console.log('catChange() cat_id='+cat_id)
			if(cat_id==0){
				$('#s_seria_id, #s_model_id').attr({'disabled':'disabled'}).val(0);
				return;
			}
			//console.log('cat_id='+cat_id)
			$.ajax({
				type: "POST",
				dataType: 'json',
				url: this.script_url,
				data: "mode=getSeriaArrayByAnnCat"
						+"&root_cat_id="+cat_id,
				success: function(a){
					var arr=a;
					//console.log(arr);
					if(arr.length==0){
						$('#s_seria_id, #s_model_id').attr({'disabled':'disabled'}).val(0);
						return;
					}
					var str='';
					str+='<option value="0">выбор...</option>';
					for(var i=0;i<arr.length;i++){
						str+='<option value="'+arr[i].id+'">'+arr[i].name+'</option>';
					}
					$('#s_seria_id').html(str);
					$('#s_seria_id').attr({'disabled':false});
					
					
				}// END success
			});// END ajax
			
		}//END 
		this.seriaChangeService = function(){
			var seria_id = $.trim($("#s_seria_id").val());
			var cat_id = $.trim($("#s_cat_id").val());
			var root_cat_id = $.trim($("#s_cat_id :selected").data('root_cat_id'));
			$.ajax({
				type: "POST",
				dataType: 'json',
				url: this.script_url,
				data: "mode=getAnnArrayForRegister"
						+"&seria_id="+seria_id
						+"&root_cat_id="+root_cat_id
						,
				success: function(a){
					var arr=a;
					//console.log(arr);
					if(arr.length==0){
						$('#s_model_id').attr({'disabled':'disabled'}).val(0);
						return;
					}
					var str='';
					str+='<option value="0">выбор...</option>';
					for(var i=0;i<arr.length;i++){
						str+='<option value="'+arr[i].id+'">'+arr[i].name+'</option>';
					}
					$('#s_model_id').html(str);
					$('#s_model_id').attr({'disabled':false});
					
					
				}// END success
			});// END ajax
			
			
		}//END 
		
	}//END 
	
}//END pageClass p_obj
</script>