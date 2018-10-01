// оптимизация:
// обновить версию Backbone
// удалять вьюхи и модели после перехода со страницы
// DataCache и т.д. убрать в App
// obj.updateBasket - переделать через события
// убрать вызовы  App.Core.updateBasket('delete'); из basketFactory
// использовать единую модель для корзины вверху и на странице корзина
// возможно двойное нажатие на кнопку отправить на форме
// функция App.Core.loadPage id переименовать в cache
// переделать по образцу - перенести js в html
// http://loc_ammity_backbone.ru/pages/app/



(function($) {// расширения jQuery
	$.fn.isEqual = function($otherSet) 
	{
		/*
			сравнить одинаковость элементов
			http://obstart.ru/jquery-sravnit-elementy.html
			пример:
			var a=$$('#start > div:last-child');
			var b=$$('#start > div.live')[0];
			console.log($$(b).isEqual(a));
		*/
		if (this === $otherSet) return true;
		if (this.length != $otherSet.length) return false;
		var ret = true;
		this.each(function(idx) { 
			if (this !== $otherSet[idx]) {
				ret = false; return false;
			}
		});
		return ret;
	};
})(jQuery);

Handlebars.registerHelper('iif', function (lvalue, operator, rvalue, options) {
	// источники 
	// https://gist.github.com/pheuter/3515945
	// http://stackoverflow.com/questions/8853396/logical-operator-in-a-handlebars-js-if-conditional
	// http://code-maven.com/handlebars-conditionals
	
	
    var operators, result;

    if (arguments.length < 3) {
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
    }

    if (options === undefined) {
        options = rvalue;
        rvalue = operator;
        operator = "===";
    }

    operators = {
        '==': function (l, r) { return l == r; },
        '===': function (l, r) { return l === r; },
        '!=': function (l, r) { return l != r; },
        '!==': function (l, r) { return l !== r; },
        '<': function (l, r) { return l < r; },
        '>': function (l, r) { return l > r; },
        '<=': function (l, r) { return l <= r; },
        '>=': function (l, r) { return l >= r; },
        'typeof': function (l, r) { return typeof l == r; }
    };

    if (!operators[operator]) {
        throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
    }

    result = operators[operator](lvalue, rvalue);

    if (result) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }

});

//var vent = {};
//_.extend(vent, Backbone.Events);

;(function(){// fn
	
	window.fn={};
	fn.showPagePreloader=function(){
		//return;
		$('#overlay').show();
		$('#page_form_preloader').show();
		$('#global-wrapper').addClass('blurred');
	}
	fn.hidePagePreloader=function(){
		if(App.Core.init_load==0 || App.Core.page_load==0){
			return;
		}
		$('#overlay').hide();
		$('#page_form_preloader').hide();
		$('#global-wrapper').removeClass('blurred');
		$('#preloader_image').empty().remove();
	}
	
	fn.tabClass=function(id){
		var self = this;
		this.id = id;
		//this.total_tab=0;
		this.init = function(config){
			//console.log( config )
			//вешаем клики
			$.each($('#'+this.id+' .tab_control_item'), function() {
				//var tab_nomber=self.total_tab;
				
				$(this).click(function () {
					//var tab_content_item = $('#'+self.id+' .tab_content_container .item:eq('+tab_nomber+')');
					//self.tabClick(this, tab_content_item);
					var tab_id=$(this).attr('tab_control_id');
					self.tabClick(tab_id);
				});
				//self.total_tab++;
			});
			
			
			
			
			
			
			this.tabClick('descr');
			
		}//END init
		//this.tabClick = function(tab_item, tab_content_item){
		this.tabClick = function(id){
			//console.log(id)
			
			if($('.tab_item[tab_item_id="'+id+'"]').length){
				// табы
				$('#'+this.id+' .tab_control_item').removeClass('active');
				$('#'+this.id+' .tab_control_item[tab_control_id="'+id+'"]').addClass('active');
								
				// содержимое табов
				$('.tab_item').hide();
				$('.tab_item[tab_item_id="'+id+'"]').show();
			}
			
			
			//this.setUnderlineWidth();// установить ширину подчёркивания
		}//END tabClick
	}//END 
	
	fn.showProcess=function(title){
	
		var self=this;
		this.title=title;
		this.init = function(){
			if( $('#window_progressbar').length!=0 ){
				return;
			}
			
			var html='<div id="window_progressbar"><div style="margin-top:20px;" id="progressbar"></div></div>';
			$('body').append(html);
			$("#window_progressbar").hide();
			$("#window_progressbar").dialog({
				//show: "drop",
				//hide: "puff",
				autoOpen: false,
				modal: true,
				draggable: false,
				resizable: false,
				closeOnEscape: false
			})
			$("#window_progressbar").hide().prev().find("a").hide();
			$("#progressbar").progressbar({value:100}).css({border:"none", height:"20px"});
			return;
		}//END 
		this.show = function(){
			$('#window_progressbar').dialog("open").dialog('option', 'title', this.title).css({"min-height":"none"});
		}
		this.init();
		this.show();
	}// END showProcess
	fn.hideProcess=function(){$("#window_progressbar").dialog("close")}
	
	fn.completeProcess=function(title, text){
		var self=this;
		this.title=title;
		this.text=text;
		this.init = function(){
			if( $('#form_send_complete').length!=0 ){
				return;
			}
			
			var html=[
				'<div id="form_send_complete" title="Запрос отправлен" style="display:none;">',
					'<div id="form_send_complete_text" style="font-weight:bold;color:green;"></div>',
				'</div>',
				].join('');
			$('body').append(html);
			$('#form_send_complete').dialog({
					autoOpen: false,
					modal: true,
					//position:['center', 'top'],
					draggable: true,
					resizable: false,
					width: 350,
					buttons: {	
						"Ок": function() { 
							$(this).dialog("close"); 
						} 
					}
				});
			
			return;
		}//END 
		this.show = function(){
			//console.log('completeProcess:show()');
			//$('#window_progressbar').dialog("open").dialog('option', 'title', this.title).css({"min-height":"none"});
			$('#form_send_complete').dialog("open").dialog('option', 'title', this.title);
			var text=this.text||'';
			$('#form_send_complete_text').html(text);
		}
		this.init();
		this.show();
		
	}// END showProcess
	
	
	fn.numeric_format=function(val, thSep, dcSep) {
 
		// Проверка указания разделителя разрядов
		if (!thSep) thSep = ' ';
	 
		// Проверка указания десятичного разделителя
		if (!dcSep) dcSep = ',';
	 
		var res = val.toString();
		var lZero = (val < 0); // Признак отрицательного числа
	 
		// Определение длины форматируемой части
		var fLen = res.lastIndexOf('.'); // До десятичной точки
		fLen = (fLen > -1) ? fLen : res.length;
	 
		// Выделение временного буфера
		var tmpRes = res.substring(fLen);
		var cnt = -1;
		for (var ind = fLen; ind > 0; ind--) {
			// Формируем временный буфер
			cnt++;
			if (((cnt % 3) === 0) && (ind !== fLen) && (!lZero || (ind > 1))) {
				tmpRes = thSep + tmpRes;
			}
			tmpRes = res.charAt(ind - 1) + tmpRes;
		}
	 
		return tmpRes.replace('.', dcSep);
	 
}
	
	fn.uAlert=function(text){
		var self=this;
		this.text=text;
		
		
		this.init = function(){
			
			/*
			if( $('#alert_form').data('is_init')==1 ){
				return;
			}
			*/
			if( $('#alert_form').length!=0 ){
				return;
			}
			
			var html='<div class="alert_form" id="alert_form"><div class="header"><span>Внимание</span><div class="close"></div></div><div class="content"><div class="text"></div><div class="btn_block"><INPUT type="button" class="btn send" value="Ок"></div></div></div>';
			$('body').append(html);
			
			
			$("#alert_form").draggable(
				{
					cursor: "move",
					handle: ".header"
				}
			);
			$('#alert_form').data('is_init', 1);
			$('#alert_form').data('is_open', 0);
			
			{//	обработка кнопки Esc
				$(document).keydown(function(e){
					if ($('#alert_form').data('is_open')) {
						if (e.which==27) {// кнопка Esc
							self.hide();
						}
					}
				});
			}//END обработка кнопки Esc
				
			$('#alert_form .header .close').click(function(e){
				self.hide();
			});
				
			$('#alert_form .btn_block .btn.send').click(function(e){
				self.hide();
			});
				
			return;
		}//END 
		this.show = function(){
			
			$('#alert_form').data('is_open', 1);
			this.centeredForm();
			$('#alert_form .content .text').html(this.text);
			$('#overlay').show();
			$('#alert_form').show();
			
			$('#alert_form .btn_block .btn').focus();
			
		}//END
		this.centeredForm = function(){// центрировать
			var id='alert_form';
			if($('#'+id).data('is_open')!=1){
				return;
			}
		
			var form_width=$('#'+id).width();
			var form_height=$('#'+id).height();
			
			
			var body_width=$('html').width();
			//var body_height=$('html').height();
			var body_height=window.innerHeight;
			
			//console.log('scrollY ='+window.scrollY)
			
			
			
			var left=(body_width-form_width)/2;
			var top=(body_height-form_height)/2 + window.scrollY;
					
			$('#'+id).css({'left':left, 'top':top});
			
			
		}//END 	
		this.hide = function(){
			$('#overlay').hide();
			$('#alert_form').hide();
			$('#alert_form').data('is_open', 0);
		}
		this.init();
		this.show();
		
	}
	
	fn.isEmail=function (value){// проверка на email

		//if(!inp || !inp.value) return false;
		//var reg = /^[\w-](\.?[\w-])*@([A-Za-z]{2,}|[\w-](\.?[\w-])*\.[A-Za-z]{2,})$/i;
		var reg = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;// взято из избы
		
		return reg.test(value) ? true : false;
	}//END isEmail
	
	fn.inputPlaceholder=function(config){var id=config.id;var text=config.text;var color=config.color;var input=document.getElementById(id);$('#'+id).attr({'placeholder':text});if (!input) return null;if (input.placeholder && 'placeholder' in document.createElement(input.tagName)) return input;color = color || '#888888';var default_color = input.style.color;var placeholder = input.getAttribute('placeholder');if (input.value === '' || input.value == placeholder) {input.value = placeholder;input.style.color = color;input.setAttribute('data-placeholder-visible', 'true');}if(input.value==placeholder && document.activeElement.id==id){input.value='';}var add_event = /*@cc_on'attachEvent'||@*/'addEventListener';input[add_event](/*@cc_on'on'+@*/'focus', function(){input.style.color = default_color;if (input.getAttribute('data-placeholder-visible')) {input.setAttribute('data-placeholder-visible', '');input.value = '';}}, false);input[add_event](/*@cc_on'on'+@*/'blur', function(){if (input.value === '') {input.setAttribute('data-placeholder-visible', 'true');input.value = placeholder;input.style.color = color;} else {input.style.color = default_color;input.setAttribute('data-placeholder-visible', '');}}, false);input.form && input.form[add_event](/*@cc_on'on'+@*/'submit', function(){if (input.getAttribute('data-placeholder-visible')) {input.value = '';}}, false);return input;}
	
	fn.packDataAjax=function(arr1){// упаковать одномерный массив JS в строку
		var sep1 = "<[>";	//разделитель ключ - значение
		var sep2 = "<[[>";	//разделитель значений массива
		var sep3 = "<[[[>";	//разделитель для массивов
		var arr=arr1;
		var str='';
		/*
		for (var key1 in arr) {
			var val1 = arr[key1];
		}// END foreach1
		*/
		for(var i=0;i<arr.length;i++){
			str+=sep3;
			for (var key1 in arr[i]) {
				var val1 = arr[i][key1];
				str+=sep2;
				str+=key1+sep1+val1;
			}// END foreach1
		}// END for
		
		return str;
	}//END packDataAjax
	
})();
;(function(){// DataCache
	window.DataCache = (function() {
		/*
		https://learn.javascript.ru/closures-usage
		https://learn.javascript.ru/closures-module
		*/
		var cache={};
		return {
			get: function(id){
				//console.log('get');
				return cache[id];
			},
			put: function(id, val){
				cache[id]=val;
				//console.log('put');
				//console.log(cache);
				
			}
		}

	})();
})();
;(function(){// compareFactory
    
	window.compareFactory = (function() {
    
		var fac = {};
		var list={};
		
		fac.add=function(config){
			//console.log('compareFactory:add');
			//console.log(config);
			if(list[config.root_cat_id]==undefined){
				list[config.root_cat_id]={};
			}
			list[config.root_cat_id][config.ann_id]=config;
			
			config.in_compare=1;
			setCompare(config);
		}
		fac.delete=function(config){
			//console.log('compareFactory:delete');
			//console.log(config);
			if(list[config.root_cat_id] && list[config.root_cat_id][config.ann_id]){
				delete list[config.root_cat_id][config.ann_id];
			}
			config.in_compare=0;
			setCompare(config);
		}
		fac.getAll=function(){
			return list;
		}
		fac.init=function(init_list){
			//console.log('compareFactory:init()');
			//console.log(init_list);
			if(init_list.length==0){
				return;
			}
			//console.log(init_list );
			//console.log(init_list.length );
			list=init_list;
		}
		fac.getCompareUrl=getCompareUrl;
		fac.countInCompare=countInCompare;
		
		function setCompare(config){// сохранение на сервер
			var compare_mode=(config.in_compare==1)?('add'):('delete');
			//console.log(config);
			//console.log('обновить модель ');
			
			$.ajax({
				url: '/respondents/script_client.php',
				context: this,
				dataType: 'json',
				type: "POST",
				//async: false,
				data: {mode: 'setCompare', id: config.ann_id, compare_mode:compare_mode}
			})
			.success(function(result) {
				updateCache(config);
			});
			
			
		}// END
		
		function updateCache(config){
			//console.log('compareFactory:updateCache')
			//console.log(config)
			var root_cat_id=config.root_cat_id;
			var cat_mnemonic=config.cat_mnemonic;
			var ann_mnemonic=config.ann_mnemonic;
			var ann_id=config.ann_id;
			var in_compare=config.in_compare;
			var seria_mnemonic=config.seria_mnemonic;
			var compare_total=countInCompare(root_cat_id);
			var compare_url=getCompareUrl(root_cat_id);
			//console.log('compare_total='+compare_total)
			
			{//синхронизация cat_ann_array_ctrl: mnemonic+'_'+cat_mnemonic
				var page = DataCache.get('catalog_'+cat_mnemonic);
				if(page!=undefined){
					for(var i=0;i<page.ann_array.length;i++){
						if(page.ann_array[i].id==ann_id){
							page.ann_array[i].in_compare=in_compare;
						}
						page.ann_array[i].compare_total=compare_total;
						page.ann_array[i].compare_url=compare_url;
					}
					DataCache.put('catalog_'+cat_mnemonic, page);
				}
			}//END
			
			{//синхронизация seria_ann_array_ctrl: mnemonic+'_'+seria_mnemonic
				var page = DataCache.get('catalog_'+seria_mnemonic);
				if(page!=undefined){
					for(var i=0;i<page.seria_cat_array.length;i++){
						if(page.seria_cat_array[i].root_cat_id==root_cat_id){
							//console.log(page.seria_cat_array[i])
							for(var j=0;j<page.seria_cat_array[i].ann_array.length;j++){
								if(page.seria_cat_array[i].ann_array[j].id==ann_id){
									page.seria_cat_array[i].ann_array[j].in_compare=in_compare;
								}
								page.seria_cat_array[i].ann_array[j].compare_total=compare_total;
								page.seria_cat_array[i].ann_array[j].compare_url=compare_url;
							}
						}
					}
					DataCache.put('catalog_'+seria_mnemonic, page);
				}
			}//END
			
			{//синхронизация ann_item_ctrl: mnemonic+'_'+cat_mnemonic+'_'+ann_mnemonic
				{// 1 обновляем in_compare у ann_item по которой кликнули
					var page = DataCache.get('catalog_'+cat_mnemonic+'_'+ann_mnemonic);
					if(page!=undefined){
						page.ann_item.in_compare=in_compare;	
						DataCache.put('catalog_'+cat_mnemonic+'_'+ann_mnemonic, page);
					}
				}//END
				{// 2 обновляем у массива ранее загруженный ann_item
					var ann_array=annFactory.getAll();
					for(var i in ann_array) {
						if (!ann_array.hasOwnProperty(i)) continue;
						//console.log(ann_array[i]);
						var page = DataCache.get('catalog_'+ann_array[i].cat_mnemonic+'_'+ann_array[i].mnemonic);
						if (page==undefined) continue;
						//console.log('page');
						//console.log('catalog_'+ann_array[i].cat_mnemonic+'_'+ann_array[i].mnemonic);
						//console.log(page);
						page.ann_item.compare_total=compare_total;
						page.ann_item.compare_url=compare_url;
						DataCache.put('catalog_'+ann_array[i].cat_mnemonic+'_'+ann_array[i].mnemonic, page);
					}//END for
				}
			}//END
			
		}//END
		function countInCompare(root_cat_id){
			//console.log('countInCompare root_cat_id='+root_cat_id);
			var total=0;
			for(var i in list[root_cat_id]) {
				if (!list[root_cat_id].hasOwnProperty(i)) continue;
				total++;
			}
			return total;
		}
		function getCompareUrl(root_cat_id){
			//console.log('getCompareUrl()');
			var str='';
			//var total=0;
			for(var i in list[root_cat_id]) {
				if (!list[root_cat_id].hasOwnProperty(i)) continue;
				
				str+=list[root_cat_id][i].ann_id+'~';
			}
			str=str.substr(0, str.length-1);
			if(str==''){
				return '';
			}
			str='/compare/'+str+'/';
			//console.log(str);
			return str;
		}
		return fac;
	
	})();
	
})();
;(function(){// annFactory
	window.annFactory = (function() {
		var factory={};
		var ann_array={};
		
		factory.add=add;
		factory.get=get;
		factory.getAll=getAll;
		
		function add(item){
			//console.log('annFactory:add');
			ann_array[item.id]=item;
		}
		function getAll(){
			//console.log('annFactory:getAll');
			return ann_array;
		}
		function get(id){
			//console.log('annFactory:get');
			return ann_array[id];
		}
		
		return factory;
	})();
})();
;(function(){// basketFactory

	window.basketFactory = (function() {
		{// init
			var factory={};
			var basket={};
			basket.ann_array=[];
			basket.summa=0;
			basket.summa_str='';
			
			factory.addToBasket=addToBasket;
			factory.updateBasketItem=updateBasketItem;
			factory.deleteFromBasket=deleteFromBasket;
			factory.getBasket=getBasket;
			factory.getBasketItem=getBasketItem;
			factory.init=init;
			factory.clearBasket=clearBasket;
		}
	
		function addToBasket(config){
			//console.log('basketFactory:addToBasket()');
			//console.log('ann_item from annFactory');
			//console.log(ann_item);
			
			fn.showProcess('Добавление в корзину');
			
			$.ajax({
				url: '/respondents/script_client.php',
				context: this,
				dataType: 'json',
				type: "POST",
				data: {mode: 'addToBasket', id: config.id, amount:config.amount}
			})
			.success(function(result) {
				//updateCache(config);
				// получаем ann_item 
				var ann_item=annFactory.get(config.id);
				//console.log('ann_item from annFactory');
				//console.log(ann_item);
				var item={};
				item.id=ann_item.id;
				item.name=ann_item.name;
				item.name_full=ann_item.name_full;
				item.cat_name_one=ann_item.cat_name_one;
				item.seria_name=ann_item.seria_name;
				item.image=ann_item.image_array[0].image;
				item.price=ann_item.price;
				item.price_str=ann_item.price_str;
				item.url=ann_item.url;
				item.amount=config.amount;
				
				basket.ann_array.push(item);
				
				_updateDataCacheItem({mode:'add', amount:config.amount, id:config.id});
				_updateBasket();
				fn.hideProcess();
				
				
				App.Core.updateBasket('add');
			});
			
		}//END
		function updateBasketItem(config){
			//console.log('basketFactory:updateBasketItem()');
			
			{//19.04.16 перенесено из success функции
				// возможно перенести в отдельный метод
				
				var arr=basket.ann_array;
				for(var i=0;i<arr.length;i++){
					if(arr[i].id==config.id){
						arr[i].amount=config.amount;
					}
				}
				
				_updateDataCacheItem({mode:'update', amount:config.amount, id:config.id});
				_updateBasket();
			}
			
			App.Core.updateBasket('update');
			
			$.ajax({
				url: '/respondents/script_client.php',
				context: this,
				dataType: 'json',
				type: "POST",
				//async: false,
				data: {mode: 'updateBasketItem', id: config.id, amount:config.amount}
			})
			.success(function(result) {
				
				fn.hideProcess();
			});
			
			return;
		}//END
		function deleteFromBasket(id){
			//console.log('basketFactory:deleteFromBasket()');
			//console.log( getBasket().ann_array.length );
			//console.log('id='+id);
			
			
			{//19.04.16 перенесено из success функции
				var arr=basket.ann_array;
				for (var i = arr.length; i >= 0; i--) {
					if(arr[i]!=undefined && arr[i].id==id){
						arr.splice(i,1);
					}
				} 
				basket.ann_array=arr;
				_updateDataCacheItem({mode:'delete', id:id});
				_updateBasket();
			}

			
			App.Core.updateBasket('delete');
			
			
			$.ajax({
				url: '/respondents/script_client.php',
				context: this,
				dataType: 'json',
				type: "POST",
				//async: false,
				data: {mode: 'deleteFromBasket', id: id}
			})
			.success(function(result) {
				/*
				var arr=basket.ann_array;
				for (var i = arr.length; i >= 0; i--) {
					if(arr[i]!=undefined && arr[i].id==id){
						arr.splice(i,1);
					}
				} 
				basket.ann_array=arr;
				_updateDataCacheItem({mode:'delete', id:id});
				_updateBasket();
				*/
				
				//console.log('success');
				
				
			});
		
		}//END
		function getBasket(){
			//console.log('basketFactory:getBasket()');
			return basket;
		}
		function getBasketItem(id){
			var arr=basket.ann_array;
			for(var i=0;i<arr.length;i++){
				if(arr[i].id==id){
					return arr[i];
				}
			}
			return false;
		}//END
		function init(init_list){
			if(init_list.length==0){
				return;
			}
			basket=init_list;
			
			if(basket.ann_array==null){
				basket.ann_array=[];
			}
			
		}
		function clearBasket(){
			basket.ann_array=[];
			basket.summa=0;
			basket.summa_str='';
			_updateDataCacheAll({mode:'delete_all'});
			
			App.Core.updateBasket('clear');
		}//
		
		// служебные
		/*
		*/
		function _updateDataCacheItem(config){// 
			//console.log('basketFactory:_updateDataCacheItem()');
			//console.log(config);
			var ann_item=annFactory.get(config.id);
			if(ann_item==undefined){
				return;
			}
			//console.log(ann_item);
			var page = DataCache.get('catalog_'+ann_item.cat_mnemonic+'_'+ann_item.mnemonic);
			if(page==undefined){
				return;
			}
			
			if(config.mode=='add'){
				page.ann_item.in_basket=1;
				page.ann_item.in_basket_amount=config.amount;
			}
			if(config.mode=='delete'){
				page.ann_item.in_basket=0;
				page.ann_item.in_basket_amount=0;
			}
			if(config.mode=='update'){
				page.ann_item.in_basket=1;
				page.ann_item.in_basket_amount=config.amount;
			}
			
			//console.log('page=')
			//console.log(page)

			
			DataCache.put('catalog_'+ann_item.cat_mnemonic+'_'+ann_item.mnemonic, page);
			return;
		}//END
		function _updateDataCacheAll(config){
			//console.log('_updateDataCacheAll()')
			var arr=annFactory.getAll();
			//console.log(arr)
			//for(var i=0;i<arr.length;i++){
			for(var i in arr) {
				if (!arr.hasOwnProperty(i)) continue;
				
				var page = DataCache.get('catalog_'+arr[i].cat_mnemonic+'_'+arr[i].mnemonic);
				//console.log('page from DataCache');
				//console.log(page);
				if (page==undefined) continue;
				
				if(config.mode=='delete_all'){
					page.ann_item.in_basket=0;
					page.ann_item.in_basket_amount=0;
				}
				
				DataCache.put('catalog_'+arr[i].cat_mnemonic+'_'+arr[i].mnemonic, page);
			}
			return;
		}//END
		function _updateBasket(){//
			//console.log('basketFactory:_updateBasket()');
			var total_summa=0;
			var arr=basket.ann_array;
			for(var i=0;i<arr.length;i++){
				arr[i].summa=arr[i].amount*arr[i].price;
				total_summa=total_summa+arr[i].summa;
				arr[i].summa_str=fn.numeric_format(arr[i].summa, ' ');
			}
			//console.log(arr);
			basket.ann_array=arr;
			basket.summa=total_summa;
			basket.summa_str=fn.numeric_format(total_summa, ' ');
			return;
		}//END
		
		return factory;
	})();

})();
;(function(){// App

	window.App = {
		Models: {},
		Collection: {},
		Views: {},
		Routers: {},
		backbone_router: {},
	};
	
	window.App.Core = (function() {
		var obj={};
		obj.page={};
		obj.page_load=0;
		obj.init={};
		obj.init_load=0;
		obj.cat_mnemonic='';
		obj.ann_mnemonic='';
		obj.script_url='/respondents/script_client.php'; 
		
		
		obj.initCore=function(){
			$.ajax({
				url: '/app/respondents/init.php',
				context: this,
				dataType: 'json',
				//async: false,
			})
			.success(function(result) {
				
				compareFactory.init(result.compare);
				delete result.compare;
				
				basketFactory.init(result.basket);
				delete result.basket;
				
				
				//console.log(result);
				obj.init=result;
				obj.init_load=1;
				obj.initBasket();
				bildSeoTitle();
				bildLeftMenu();
				obj.initQuickSearch();
			});
		}//END initCore
		obj.bildPage=function(page){
			obj.page=page;
			obj.page_load=1;
			obj.after(obj.ctrl);
			bildSeoTitle();
			fn.hidePagePreloader();
		};
		obj.loadPage=function(config){
			fn.showPagePreloader();
			var url=config.url, id=config.id, data=config.data, ctrl=config.ctrl;
			
			obj.setCtrl(ctrl)
			
			// сбрасываем меню для всех страниц кроме указанных двух
			if(ctrl!='cat_ann_array_ctrl' && ctrl!='ann_item_ctrl'){
				App.Core.setCatMnemonic('');
				App.Core.setAnnMnemonic('');	
			}
			
			var page = DataCache.get(id);
			if (page) {
				App.Core.bildPage(page);
			}
			else{
				$.ajax({
					url: url,
					data: data,
					context: this,
					dataType: 'json',
					//async: false,
				})
				.success(function(result) {
					if(result.page_item.error_page){
						//console.log('error');
						var model=new App.Models.page404(result.page_item);
						var view=new App.Views.page404({model: model});
						App.Core.page=result;
						App.Core.page_load=1;
						bildSeoTitle();
						fn.hidePagePreloader();
						return;
					}
					
					DataCache.put(id, result);
					App.Core.bildPage(result);
				});
			}
		};//END 
		obj.setCatMnemonic=function(val){
			obj.cat_mnemonic=val;
			if(obj.left_menu_model){
				//console.log(obj.left_menu_model);
				//console.log('change DONE');
				// обновляем в модели мнемонику для перестроения меню
				obj.left_menu_model.set('cat_mnemonic', val);
			}
		}
		obj.setAnnMnemonic=function(val){
			obj.ann_mnemonic=val;
			if(obj.left_menu_model){
				//console.log(obj.left_menu_model);
				//console.log('change DONE');
				// обновляем в модели мнемонику для перестроения меню
				obj.left_menu_model.set('ann_mnemonic', val);
			}
		}
		obj.setCtrl=function(val){
			//console.log('val='+val)
			obj.ctrl=val;
			if(val=='index_ctrl' || val=='compare_ctrl'){
				$('#left_sidebar').hide();
				//console.log('hide')
			}
			else{
				$('#left_sidebar').show();
				//console.log('show')
			}
		}
		
		{// basket
			obj.initBasket=function(){
				//console.log('initBasket()');
				
				var basket=basketFactory.getBasket();
				//console.log(basket);
				
				
				obj.top_basket_model=new App.Models.top_basket({basket: basket});
				var view=new App.Views.top_basket({model: obj.top_basket_model});
				
			}//END
			obj.updateBasket=function(mode){
				//console.log('App.Core.updateBasket')
				//синхронизация моделей с basketFactory
				var summa=basketFactory.getBasket().summa;
				var summa_str=basketFactory.getBasket().summa_str;
				var ann_array=basketFactory.getBasket().ann_array;
				var basket=basketFactory.getBasket();
				
				if(mode=='delete'){
					if(App.Core.ctrl=='ann_item_ctrl'){
						$('#price_btn').show();
						$('#price_btn_text').hide();	
					}
					
					if(App.Core.ctrl=='pages_basket_ctrl'){
						// page_basket_model
						App.Core.page_basket_model.set('basket', basket ,{silent: true});
						App.Core.page_basket_model.trigger('updateList');
						if(summa==0){
							App.Core.page_basket_model.trigger('renderAll');
						}
						
						// top_basket_model
						App.Core.top_basket_model.set('basket', basket ,{silent: true});
						//App.Core.top_basket_model.trigger('updateSumma');
						App.Core.top_basket_model.trigger('renderAll');
						
					}
					else{
						App.Core.top_basket_model.set('basket', basket ,{silent: true});
					}
					if(basketFactory.getBasket().summa==0){
						App.Core.top_basket_model.trigger('renderAll');
					}
					
				}
				if(mode=='add'){
					// корзина вверху
					//console.log('add')
					App.Core.top_basket_model.set('basket', basket ,{silent: true});
					App.Core.top_basket_model.trigger('renderAll');
				}
				if(mode=='update'){
					// top_basket_model
					App.Core.top_basket_model.set('basket', basket ,{silent: true});
					App.Core.top_basket_model.trigger('renderAll');
					
					// page_basket_model
					App.Core.page_basket_model.set('basket', basket ,{silent: true});
					App.Core.page_basket_model.trigger('updateList');
				}
				if(mode=='clear'){
					// top_basket_model
					App.Core.top_basket_model.set('basket', basket ,{silent: true});
					App.Core.top_basket_model.trigger('renderAll');

					// page_basket_model
					App.Core.page_basket_model.set('basket', basket ,{silent: true});
					App.Core.page_basket_model.trigger('renderAll');
				}
			}
		}//END basket
		
		{//quick_search
			obj.initQuickSearch=function(){
				

				function searchClass(){
				
					var self = this;
					this.script_url = App.Core.script_url;
					
					this.init = function(){
						this.topQuickSearchInit();
					}//END init
					
					{// быстрый поиск
						this.search_array=[];
						this.inner_search_query_set='';
						this.quick_search_default_text = 'введите модель';
						
						this.topQuickSearchInit = function(){// init быстрого поиска
							var field_id='top_query';
										
							$('#'+field_id).attr({'autocomplete':'off'});
							$('#top_query_loading').hide();
							$('#top_query_clear').hide();
							
							// обработка кнопок вверх, вниз, Enter
							$('#top_query').keydown(function(eventObject){
								//console.log('кнопка - ' + eventObject.which );
								var total_search_item=$('.top_search_form_container .item').length;
								if(total_search_item==0){
									return;
								} 
								if ((eventObject.which==40)||(eventObject.which==38)) {
									if (eventObject.which==40){//вниз
										//console.log('вниз');
										var select_item=$('.top_search_form_container .item.selected');
										if(select_item.length>0){// уже создан выбранный элемент
											// смотрим чтобы элемент не был последним
											var last=$('.top_search_form_container .item:last-child');
											if( $(select_item).isEqual(last) ){
												return;
											}
											else{
												$('.top_search_form_container .item').removeClass('selected');
												$(select_item).next().addClass('selected');
												//$(this).trigger('blur');
											}
										}
										else{
											$('.top_search_form_container .item').removeClass('selected');
											$('.top_search_form_container .item:first-child').addClass('selected');
											
										}
									}//END вниз
									if (eventObject.which==38){// вверх
										var select_item=$('.top_search_form_container .item.selected');
										if(select_item.length>0){// уже создан выбранный элемент
											var first=$('.top_search_form_container .item:first-child');
											if( $(select_item).isEqual(first) ){
												$('.top_search_form_container .item').removeClass('selected');
												$(this).focus();
											}
											else{
												$('.top_search_form_container .item').removeClass('selected');
												$(select_item).prev().addClass('selected');
											}
										}
									}//END вверх
								}//END вверх-вниз
								if (eventObject.which==13) {// кнопка Enter
									var select_item=$('.top_search_form_container .item.selected');
									if(select_item.length>0){
										//$('.top_search_form_container .item.selected').children().focus();
										
										var href=$('.top_search_form_container .item.selected').children().attr('href');
										//alert(href)
										document.location.replace(href);
										return false;
									}
								}
							
							});//END keydown
							
							//отслеживаение клика за пределами формы
							$(document).click(function(e){
								if(
									($(e.target).parents(' #top_search_form_container').length!=1)// клик по форме
									&&
									($(e.target).attr('id')!=field_id)// клик по полю
								){
									$('#top_search_form_container').hide();
								}
							});
							
							// клик по строке поиска
							$('#'+field_id).click(function(eventObject){
								var query = $.trim($('#'+field_id).val());
								var total_search_item=$('.top_search_form_container .item').length;
								if( query!=0 && total_search_item!=0){
									$('#top_search_form_container').show();
								}
							});
							
							//обработка кнопки Esc
							$('#'+field_id).keydown(function(eventObject){
								if (eventObject.which==27) {// кнопка Esc
									$('#top_search_form_container').hide();
								}
							});
							
							// убрать всё лишнее если строка поиска пуста
							$('#'+field_id).keyup(function(eventObject){
								if( $('#'+field_id).val().length==0 ){
									self.clearQuickSearch();// очистить поиск
								}
							});
							
							// клик на кнопку очистить поиск
							$('#top_query_clear').click(function(){
								self.clearQuickSearch();// очистить поиск
							});
							
							/*
							$( '#'+field_id ).autocomplete({
								source: function( request, response  ) {
									self.searchAnn();
								},// end source:
								open : function(){},
								delay:500,
								minLength: 3,
								select: function( event, ui ) {	return false; },
								focus: function( event, ui ) { return false; }
								//change: function( event, ui ) { return false; }
							});// END autocomplete
							*/
							
							// подключаем поиск при наборе слова
							$('#'+field_id).keyup(function(e) {
								// не реагируем на Enter
								var query=$.trim( $('#'+field_id).val() );
								//console.log(query)
								if (e.which!=13 && self.inner_search_query_set!=query) {
									self.inner_search_query_set=query;
									if(query.length<2){
										return;
									}
									self.searchAnn();
								}
							});
							
							// текст по умолчанию
							fn.inputPlaceholder({'id':field_id, 'text':this.quick_search_default_text});
							
							
							$('#'+field_id).val('');
							return;
						}//END topQuickSearchInit
						this.searchAnn = function(){
							$( "#top_query" ).removeClass("ui-autocomplete-loading");// удаляем анимацию поиска в input
							$('#top_query_loading').show();
							$('#top_query_clear').show();
							var query=$.trim( $("#top_query").val() );
							
							$.ajax({
								url: this.script_url,
								data: {mode:'searchAnn', query: query},
								context: this,
								dataType: 'json',
								type: "POST",
								//async: false,
							})
							.success(function(result) {
								$('#top_query_loading').hide();
								self.search_array=result;
								self.bildSearchAnn();
							});
							
							
						}//END searchAnn
						this.bildSearchAnn = function(){// построить
							//console.log( 'bild' );
							var query=$.trim( $('#top_query').val() );
							var arr=this.search_array;
							var str='';
							if(arr.length==0){
								$('#top_search_form_container').hide().html('');
								return;
							}
							
							str+='<div class="inner">';
							for(var i=0;i<arr.length;i++){
								//arr[i].name_h=this.highLightQuery(arr[i].name, query);
								/*
								{// подсветка "Продукт поставщика"
									var query_arr = query.split(' ');
									var name_h=arr[i].name;
									for(var j=0;j<query_arr.length;j++){
										var query_item=$.trim(query_arr[j]);
										name_h=this.highLightQuery(name_h, query_item);
									}//EMD for
									arr[i].name_h=name_h;
								}
								*/
								
								str+=''
								+'<div class="item">'
									+'<a href="'+arr[i].url+'">'
										+'<div class="inner">'
											+'<div class="left">'
												+'<img src="/img/iResize.php?bg=E6E7EC&size=60&img='+arr[i].image+'"/>'
											+'</div>'
											+'<div class="center">'
												+'<div class="name">'+arr[i].name+'</div>'
												+'<div class="text">'+arr[i].cat_name_one+'</div>'
											+'</div>'
											+'<div class="right">'
												+'<div class="price">'+arr[i].price_str+' руб.</div>'
											+'</div>'
										+'</div>'
									+'</a>'
								+'</div>';
								
							}
							str+='</div>';
							
							
							$('#top_search_form_container').show().html(str);;
							{//курсор мыши
								jQuery.each($('.top_search_form_container .item'), function() {
									$(this).mouseover(function() {// НАведение
										$('.top_search_form_container .item').removeClass('selected');
										$(this).addClass('selected');
									});
									$(this).mouseleave(function() {// Уведение
										$('.top_search_form_container .item').removeClass('selected');
									});
									$(this).click(function (e) {
										//console.log('click')
										self.clearQuickSearch();
									});
								});//END jQuery.each
							}//END курсор мыши
							return;
						}//END bildSearchAnn
						this.clearQuickSearch = function(){// очистить поиск
							$('#top_query').val('');
							$('#top_search_form_container').hide().html('');
							$('#top_query').focus();
							$('#top_query_clear').hide();
							$('#top_query_loading').hide();
						}//END clearQuickSearch
						this.highLightQuery = function(str, query){// подсветка фразы query в строке str
							if(query==''){
								return str;
							}
							//var query=$.trim($("#f_query").val());
							var regex = new RegExp (query, "igm");//для подстветки
							var p=str.match(regex);
							if(p){
								//var new_str=str.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + $.ui.autocomplete.escapeRegex(query) +")(?![^<>]*>)(?![^&;]+;)", "gi"), "<b style='color:red; background-color:#FFFF55;'>$1</b>" );
								//var new_str=str.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + $.ui.autocomplete.escapeRegex(query) +")(?![^<>]*>)(?![^&;]+;)", "gi"), "<b style='color:#e66017;'>$1</b>" );
								var new_str=str.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + $.ui.autocomplete.escapeRegex(query) +")(?![^<>]*>)(?![^&;]+;)", "gi"), "<b style='background:#794A11;'>$1</b>" );
								return new_str;
							}
							else{
								return str;
							}
							//return str;
				}//END highLightQuery
					}//END быстрый поиск
					
				}//END
				var s_obj=new searchClass();
				s_obj.init();
			}
		}//END quick_search
		
		
		/*w*/function bildSeoTitle(){
			
			var el;
			//this.el = this.el || undefined;
			return function(){
				if(!el){
					el=$('#seo_title');
				}
				
				if(obj.page_load==1 && obj.init_load==1){
					$(el).html(obj.page.page_item.title+' | '+obj.init.config.site_name);
				}
			}();
			
		}//END
		/*w*/function bildLeftMenu(){
			
			//this.model.set('in_compare', 1);
			
			//console.log(App.Core.init.pr_left)
			
			
			var model=new App.Models.left_banner(App.Core.init.pr_left);
			var view=new App.Views.left_banner({model: model});
			
			
			
			
			var data={
				left_menu: App.Core.init.left_menu, 
				cat_mnemonic: obj.cat_mnemonic,
				ann_mnemonic: obj.ann_mnemonic 
			};
			obj.left_menu_model=new App.Models.left_menu(data);
			var view=new App.Views.left_menu({model: obj.left_menu_model});
			
		}
		
		// работа с шаблонами
		obj.template=function(templateHtml, data){
			// хелпер для шаблона
			var template=Handlebars.compile(templateHtml);
			return template(data);
		}
		obj.templateFromUrl=function(url, data, settings){
			
			// загрузка шаблона через url 
			// http://stackoverflow.com/questions/8366733/external-template-in-underscore
	
			var templateHtml = "";
			this.cache = this.cache || {};

			if (this.cache[url]) {
				templateHtml = this.cache[url];
			} else {
				$.ajax({
					url: url,
					method: "GET",
					async: false,
					success: function(data) {
						templateHtml = data;
					}
				});

				this.cache[url] = templateHtml;
			}

			//return _.template(templateHtml, data, settings);
			
			
			//console.log(url)
			//var d = new Date();
			//var datetime_start=d.getTime();
			//console.log('compile START')
			var template=Handlebars.compile(templateHtml);
			var html=template(data);
			//return template(data)
			//console.log('compile END')
			
			//var d = new Date();
			//var datetime_end=d.getTime();
			//var delta=datetime_end-datetime_start;
			
			//console.log('datetime_start='+datetime_start+' datetime_end='+datetime_end);
			//console.log('delta='+delta);
			return html;
			// среднее время 0,1 секунды
			
		}
		obj.emptyRender=function(obj, html){
			// рендер для элемента с пустым тегом
			// backbone.js events not firing after re-render
			//	http://stackoverflow.com/questions/7348988/backbone-js-events-not-firing-after-re-render
			if (obj.el == null) {
				obj.setElement(html);
			}
			else {
				obj.$el.empty();
				var el=$(html);
				var inner_html=$(el).html();
				obj.$el.append(inner_html);
			}
		}//END  
		/*w*/obj.after=function(ctrl, callback, context){
			// для обратного возвращения в контроллер после загрузки данных страницы
			//console.log(ctrl)
			//console.log(callback)
			//console.log(context)
			
			this.cache = this.cache || {};
			
			if(callback!=undefined){
				this.cache[ctrl]={callback:callback, context:context};
			}
			if(callback==undefined){
				if(!this.cache[ctrl]){
					return;
				}
				this.cache[ctrl].callback.apply(this.cache[ctrl].context, arguments);
			}
			
		}//END
		
		return obj;
		
	})();
	
	App.backbone_router = Backbone.Router.extend({
		routes: {
			"": "index_ctrl",
			// catalog
			"catalog/": "cat_ann_array_ctrl",
			"catalog/:cat_mnemonic/": 				"cat_ann_array_ctrl",
			"seria/:seria_mnemonic/": 				"seria_ann_array_ctrl",
			"catalog/:cat_mnemonic/:ann_mnemonic/": "ann_item_ctrl",
			"compare/:compare_list/(:diff/)": 		"compare_ctrl",
			"basket/": 								"pages_basket_ctrl",
			// pages
			"pages/cooperation/": "pages_cooperation_ctrl",
			"pages/product_registration/": "pages_product_registration_ctrl",
			"pages/search_dealer/": "pages_search_dealer_ctrl",
			"pages/contact/": "pages_contact_ctrl",
			"pages/app/": "pages_app_ctrl",
			"pages/action/": "pages_action_ctrl",
			"pages/presentation/": "pages_presentation_ctrl",
			"pages/:mnemonic/": "pages_ctrl",
			'*other': 'page404_ctrl' // пример URL: #whatever-blah/blah или #show/s14
		},
		
		/*done*/index_ctrl: function(){
			var ctrl='index_ctrl';
			var mnemonic='index';
			App.Core.loadPage(
				{
					ctrl: ctrl,
					id:mnemonic, 
					url:'/app/respondents/index.php', 
					data:{mnemonic:mnemonic},
				}
			);
			App.Core.after(ctrl, function () {
				var model=new App.Models.index(App.Core.page);
				var view=new App.Views.index({model: model});
			},this );
			
		},
		// catalog
		/*done*/cat_ann_array_ctrl: function(cat_mnemonic){
			//console.log('1 cat_ann_array_ctrl');
			
			var ctrl='cat_ann_array_ctrl';
			var cat_mnemonic = cat_mnemonic || 'begovye-dorozhki';
			 
			App.Core.setCatMnemonic(cat_mnemonic);
			App.Core.setAnnMnemonic('');
			
			App.Core.loadPage(
				{
					ctrl: ctrl,
					id:'catalog_'+cat_mnemonic, 
					url:'/app/respondents/catalog.php',
					data:{mode: 'ann_array_cat', cat_mnemonic: cat_mnemonic},
				}
			);
			App.Core.after(ctrl,function () {
				var model=new App.Models.cat_ann_array(App.Core.page);
				var view=new App.Views.cat_ann_array({model: model});
			},this );
			
		},//END
		/*done*/seria_ann_array_ctrl: function(seria_mnemonic){
						
			var ctrl='seria_ann_array_ctrl';
			
			App.Core.loadPage(
				{
					ctrl: ctrl,
					id:'catalog_'+seria_mnemonic, 
					url:'/app/respondents/catalog.php',
					data:{mode: 'ann_array_seria', seria_mnemonic: seria_mnemonic},
				}
			);
			App.Core.after(ctrl,function () {
				
				var arr=App.Core.page.seria_cat_array;
				for(var i=0;i<arr.length;i++){
					arr[i].cat_item_name=arr[i].name;
					arr[i].seria_item_name=App.Core.page.seria_item.name;
				}
				
				var collection = new App.Collection.seria_ann_item(App.Core.page.seria_cat_array);
				var view =new App.Views.seria_ann_item_collection({collection:collection});
			},this );
			
		},
		/*done*/ann_item_ctrl: function(cat_mnemonic, ann_mnemonic){
			//console.log('ann_item_ctrl');
			//console.log('cat_mnemonic='+cat_mnemonic);
			//console.log('ann_mnemonic='+ann_mnemonic);
			
			var ctrl='ann_item_ctrl';
			 
			App.Core.setCatMnemonic(cat_mnemonic);
			App.Core.setAnnMnemonic(ann_mnemonic);
			
			App.Core.loadPage(
				{
					ctrl: ctrl,
					id:'catalog_'+cat_mnemonic+'_'+ann_mnemonic, 
					url:'/app/respondents/catalog.php',
					data:{mode: 'ann_item', cat_mnemonic: cat_mnemonic, ann_mnemonic:ann_mnemonic},
				}
			);
			App.Core.after(ctrl,function () {
				
				annFactory.add(App.Core.page.ann_item);
				
				var model=new App.Models.ann_item_page(App.Core.page);
				var view=new App.Views.ann_item_page({model: model});
				
				p_obj = new pageClass();
				p_obj.in_compare=App.Core.page.ann_item.in_compare;
				p_obj.compare_total=App.Core.page.ann_item.compare_total;
				p_obj.root_cat_id=App.Core.page.ann_item.root_cat_id;
				p_obj.init();
				
			},this );
			
		},
		/*done*/compare_ctrl: function(compare_list, diff){
			
			var diff =(diff!=undefined)?(1):(0);
			var ctrl='compare_ctrl';
			var mnemonic = 'compare';
			App.Core.dif=diff;
			App.Core.loadPage(
				{
					ctrl: ctrl,
					id:mnemonic+'_'+compare_list+'_'+diff, 
					url:'/app/respondents/catalog.php',
					data:{mode: 'compare', compare_list: compare_list, diff:diff},
				}
			);
			App.Core.after(ctrl,function () {
				App.Core.page.compare_list=compare_list;
				App.Core.page.diff=App.Core.dif;
				var model=new App.Models.page_compare(App.Core.page);
				var view=new App.Views.page_compare({model: model});
			},this );
			
		},
		/*done*/pages_basket_ctrl: function(){
			
			var ctrl='pages_basket_ctrl';
			var mnemonic = 'basket';
			App.Core.loadPage(
				{
					ctrl: ctrl,
					id:mnemonic, 
					url:'/app/respondents/pages.php',
					data:{'mnemonic': mnemonic},
				}
			);
			App.Core.after(ctrl,function () {
				App.Core.page_basket_model=new App.Models.page_basket({page_item:App.Core.page, basket: basketFactory.getBasket() });
				var view=new App.Views.page_basket({model: App.Core.page_basket_model});
			},this );
			
		},
		// pages
		/*done*/pages_cooperation_ctrl: function(){
			//console.log('pages_cooperation_ctrl');
			
			var ctrl='pages_cooperation_ctrl';
			var mnemonic = 'cooperation';
			App.Core.loadPage(
				{
					ctrl: ctrl,
					id:mnemonic, 
					url:'/app/respondents/pages.php',
					data:{mnemonic: mnemonic},
				}
			);
			App.Core.after(ctrl,function () {
				var model=new App.Models.page_cooperation(App.Core.page);
				var view=new App.Views.page_cooperation({model: model});
			},this );
			
		},
		/*done*/pages_product_registration_ctrl: function(){
			//console.log('pages_product_registration_ctrl');
		
			var ctrl='pages_product_registration_ctrl';
			var mnemonic = 'product_registration';
			App.Core.loadPage(
				{
					ctrl: ctrl,
					id:mnemonic, 
					url:'/app/respondents/pages.php',
					data:{mnemonic: mnemonic},
				}
			);
			App.Core.after(ctrl,function () {
				var model=new App.Models.page_product_registration(App.Core.page);
				var view=new App.Views.page_product_registration({model: model});
				
				p_obj = new pageClass();
				p_obj.init();
				
			},this );
			
			
			
		},
		/*done*/pages_search_dealer_ctrl: function(){
			//console.log('pages_search_dealer_ctrl');
			
			var ctrl='pages_search_dealer_ctrl';
			var mnemonic = 'search_dealer';
			App.Core.loadPage(
				{
					ctrl: ctrl,
					id:mnemonic, 
					url:'/app/respondents/pages.php',
					data:{mnemonic: mnemonic},
				}
			);
			App.Core.after(ctrl,function () {
				App.Core.page.alphabet_array=['А','Б','В','Г','Д','Е','Ж','З','И','К','Л','М','Н','О','П','Р','С','Т','У','Ф','Х','Ц','Ч','Ш','Э','Ю','Я'];
				var model=new App.Models.page_search_dealer(App.Core.page);
				var view=new App.Views.page_search_dealer({model: model});
				
				p_obj = new pageClass();
				p_obj.diler_map_array=App.Core.page.diler_map_array;
				p_obj.init();
				
			},this );
			
		},
		/*done*/pages_contact_ctrl: function(){
			//console.log('pages_contact_ctrl');
			
			var ctrl='pages_contact_ctrl';
			var mnemonic = 'contact';
			App.Core.loadPage(
				{
					ctrl: ctrl,
					id:mnemonic, 
					url:'/app/respondents/pages.php',
					data:{mnemonic: mnemonic},
				}
			);
			App.Core.after(ctrl,function () {
				var model=new App.Models.page_contact(App.Core.page);
				var view=new App.Views.page_contact({model: model});
				
				p_obj = new pageClass();
				p_obj.init();
			},this );
			
		},
		/*done*/pages_app_ctrl: function(){
			//console.log('pages_app_ctrl');
			
			var ctrl='pages_app_ctrl';
			var mnemonic = 'app';
			App.Core.loadPage(
				{
					ctrl: ctrl,
					id:mnemonic, 
					url:'/app/respondents/pages.php',
					data:{mnemonic: mnemonic},
				}
			);
			App.Core.after(ctrl,function () {
				var model=new App.Models.page_app(App.Core.page);
				var view=new App.Views.page_app({model: model});
			},this );

		},
		/*done*/pages_action_ctrl: function(){
			//console.log('pages_action_ctrl');
			
			var ctrl='pages_action_ctrl';
			var mnemonic = 'action';
			App.Core.loadPage(
				{
					ctrl: ctrl,
					id:mnemonic, 
					url:'/app/respondents/pages.php',
					data:{mnemonic: mnemonic},
				}
			);
			App.Core.after(ctrl,function () {
				var model=new App.Models.page_action(App.Core.page);
				var view=new App.Views.page_action({model: model});
			},this );
			
		},
		/*done*/pages_presentation_ctrl: function(){
			//console.log('pages_presentation_ctrl');
			
			var ctrl='pages_presentation_ctrl';
			var mnemonic = 'presentation';
			App.Core.loadPage(
				{
					ctrl: ctrl,
					id:mnemonic, 
					url:'/app/respondents/pages.php',
					data:{mnemonic: mnemonic},
				}
			);
			App.Core.after(ctrl,function () {
				var model=new App.Models.page_presentation(App.Core.page);
				var view=new App.Views.page_presentation({model: model});
			},this );
			
		},
		/*done*/pages_ctrl: function(mnemonic){
			App.Core.setCatMnemonic('');
			
			var ctrl='pages_ctrl';
			App.Core.loadPage(
				{
					ctrl: ctrl,
					id:mnemonic, 
					url:'/app/respondents/pages.php', 
					data:{mnemonic:mnemonic},
				}
			);
			App.Core.after(ctrl, function () {
				var model=new App.Models.page(App.Core.page.page_item);
				var view=new App.Views.page({model: model});
			},this );
		},
		/*done*/page404_ctrl: function(){
			//console.log('page404_ctrl');
			
			var mnemonic = '404';
			var ctrl='page404_ctrl';
			App.Core.loadPage(
				{
					ctrl: ctrl,
					id:mnemonic, 
					url:'/app/respondents/pages.php', 
					data:{mnemonic:mnemonic},
				}
			);
			App.Core.after(ctrl, function () {
				var model=new App.Models.page404(App.Core.page.page_item);
				var view=new App.Views.page404({model: model});
			},this );
			
		},
	});

	function init(){
		
		App.Core.initCore();
		
		// обработка кликов
		$(document).on('click', "A[href^='/'], A[href='']", function (event) {
			if($(this).prop('target')!='_blank'){
				var href = $(event.currentTarget).attr('href')
				var passThrough = href.indexOf('except_url');// not use now
				if(passThrough<0 && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey){
					event.preventDefault();
					App.Routers.navigate($(this).attr("href"), {trigger: true} );
					return false;
				}
			}
		});
		
		// запуск роутинга
		App.Routers=new App.backbone_router();
		Backbone.history.start({ pushState: true });
		
		{// main page index_ctrl
			App.Models.index = Backbone.Model.extend({});
			App.Views.index = Backbone.View.extend({
				initialize: function() {
					this.render();
				},
				templateUrl: '/app/template/index.tpl',
				el: $("#b_view"), // DOM элемент widget'а
				render: function() {
					var html = App.Core.templateFromUrl(this.templateUrl, this.model.toJSON());
					this.$el.html( html );
				}
			});
		}//END main page
		
		{// pages_ctrl - page
			App.Models.page = Backbone.Model.extend({});
			App.Views.page = Backbone.View.extend({
				initialize: function() {
					this.render();
				},
				templateUrl: '/app/template/pages/pages.tpl',
				el: $("#b_view"), // DOM элемент widget'а
				render: function() {
					var html = App.Core.templateFromUrl(this.templateUrl, this.model.toJSON());
					this.$el.html( html );
				}
			});
		}//END pages_ctrl

		{// ann_item
			// модель ann_item
			App.Models.ann_item = Backbone.Model.extend({});
			// вид ann_item
			App.Views.ann_item = Backbone.View.extend({
				initialize: function() {
					this.el = null;// emptyRender
					this.model.on('change', this.render, this);
					this.render();
				},
				templateUrl: '/app/template/catalog/ann_item.inc.tpl',
				render: function() {
					//console.log('3 model - render')
					var html = App.Core.templateFromUrl(this.templateUrl, this.model.toJSON());
					App.Core.emptyRender(this, html);
					return this;
				},
				events: {
					"click .delete"	: "deleteCompare",
					"click .compare": "addCompare",
				},
				addCompare: function() {
					
					//console.log('addCompare()')
					var item=this.model.toJSON();
					compareFactory.add(
						{
							ann_id:item.id, 
							ann_mnemonic: item.mnemonic, 
							root_cat_id: item.root_cat_id,
							cat_mnemonic: item.cat_mnemonic,
							seria_mnemonic: item.seria_mnemonic
						}
					);
					
					this.model.set('in_compare', 1);
				},
				deleteCompare: function() {
					
					//console.log('deleteCompare()')
					var item=this.model.toJSON();
					compareFactory.delete(
						{
							ann_id:item.id, 
							ann_mnemonic: item.mnemonic, 
							root_cat_id: item.root_cat_id,
							cat_mnemonic: item.cat_mnemonic,
							seria_mnemonic: item.seria_mnemonic
						}
					);
					this.model.set('in_compare', 0);
				}
			});
			
			// коллекция ann_item - входят продукты серии или категории
			App.Collection.ann_item = Backbone.Collection.extend({
				model: App.Models.ann_item,
				/*
				initialize: function() {
					console.log(this.model.toJSON())
					//this.model.on('change', this.itemChange, this);
				},
				itemChange: function() {
					console.log('itemChange')
				}
				
				*/
				// нужно слушать изменение 1 модели
			});
			// вид коллекция ann_item - входят продукты серии или категории
			App.Views.ann_item_collection = Backbone.View.extend({
				initialize: function() {
					this.collection.on('change', this.itemChange, this);
					this.render();
				},
				render: function() {
					this.collection.each(this.addOne, this);
					return this;
				},
				addOne: function(data) {
					var view = new App.Views.ann_item({ model: data });
					this.$el.append(view.el);
				},
				itemChange: function(data) {
					//console.log('itemChange')
					
					//console.log(data.toJSON())
					//return;
					
					//console.log(this.model)
					//console.log()
					//console.log(this.collection.models)
					// достаточно вызвать метод роутера
					//App.Core.after(App.Core.ctrl);
					var root_cat_id=data.toJSON().root_cat_id
					var compare_url=compareFactory.getCompareUrl(root_cat_id)
					var compare_total=compareFactory.countInCompare(root_cat_id)
					//console.log('compare_url='+compare_url)
					//console.log('compare_total='+compare_total)
					//	ad.set('price', 1500000, {silent: true});
					var arr=this.collection.models;
					for(var i=0;i<arr.length;i++){
						//console.log(arr[i])
						//arr[i].set('price_str', 0, {silent: true});
						
						var in_compare=arr[i].get('in_compare');
						if(in_compare==1){
							arr[i].set('compare_total', compare_total, {silent: true});
							arr[i].set('compare_url', compare_url);
						}
						
						//arr[i].render();
					}
					//arr[0].set('some_attr', 0);
					
				}//END
			});
		}//END ann_item

		{// cat_ann_array_ctrl - cat_ann_array
			// модель категории
			App.Models.cat_ann_array = Backbone.Model.extend({});
			// вид категории
			App.Views.cat_ann_array = Backbone.View.extend({
				initialize: function() {
					this.render();
				},
				el: $("#b_view"), // DOM элемент widget'а
				templateUrl: '/app/template/catalog/ann_array_cat.tpl',
				render: function() {
					//console.log(this.model.toJSON())
					//console.log('2 App.Views.cat_ann_array - render')
					var html = App.Core.templateFromUrl(this.templateUrl, this.model.toJSON());
					this.$el.html( html );
					//console.log(html)
					
					var collection = new App.Collection.ann_item(this.model.toJSON().ann_array);
					var view =new App.Views.ann_item_collection({collection:collection});
					this.$el.find('.catalog-widgets').append(view.el);
					
				}
				
			});
		}//END cat_ann_array
		
		{// левое меню
			{// пункты меню
				App.Models.left_menu = Backbone.Model.extend({});
				App.Views.left_menu = Backbone.View.extend({
					initialize: function() {
						this.model.on('change', this.render, this);
						this.render();
					},
					el: $("#left_menu"), // DOM элемент widget'а
					render: function() {
						//console.log('render');
						//var html= App.Core.template($('#left_menu_tpl').html(), this.model.toJSON());
						var html = App.Core.templateFromUrl('/app/template/left_menu.tpl', this.model.toJSON());
						this.$el.html( html );
					}
				});
			}//END пункты меню
			{// баннеры
				App.Models.left_banner = Backbone.Model.extend({});
				App.Views.left_banner = Backbone.View.extend({
					initialize: function() {
						this.render();
					},
					el: $("#left_banner"), // DOM элемент widget'а
					render: function() {
						var html= App.Core.template($('#left_banner').html(), this.model.toJSON());
						this.$el.html( html );
					}
				});
			}//END баннеры
		}//END левое меню
		
		{// seria_ann_array_ctrl - cat_ann_array
		
			// модель серии- состоящей из нескольких ann_item
			App.Models.seria_ann_item = Backbone.Model.extend({});
			// вид серии- состоящей из нескольких ann_item
			App.Views.seria_ann_item = Backbone.View.extend({
				initialize: function() {
					this.render();
				},
				template: '<div class="seria_block"><div class="page_header"><h1>{{cat_item_name}} серия {{seria_item_name}}</h1></div><div class="ann_list" ></div></div>',
				//el: $("#b_view"), // DOM элемент widget'а
				render: function() {
					//console.log('3 model - render')
					var html= App.Core.template(this.template, this.model.toJSON());
					this.$el.html( html );
					
					//console.log(this.model.ann_array.toJSON())
					var collection = new App.Collection.ann_item(this.model.toJSON().ann_array);
					var view =new App.Views.ann_item_collection({collection:collection});
					this.$el.find('.ann_list').append(view.el);
					
					return this;
				}
			});
			
			// модель целой коллекции - состоящей из нескольких серий
			App.Collection.seria_ann_item = Backbone.Collection.extend({
				model: App.Models.seria_ann_item
			});
			// вид целой коллекции - состоящей из нескольких серий
			App.Views.seria_ann_item_collection = Backbone.View.extend({
				initialize: function() {
					this.$el.empty();
					this.render();
				},
				el: $("#b_view"), // DOM элемент widget'а
				render: function() {
					this.$el.append('<section class="content-main ng-scope"><div class="catalog-widgets clearfix "></div></div>');
					this.collection.each(this.addOne, this);
					return this;
				},
				addOne: function(data) {
					//console.log('addOne')
					//console.log(data.toJSON())
					var view = new App.Views.seria_ann_item({ model: data });
					this.$el.find('.catalog-widgets').append(view.el);
				}
				
			});
		
		}//END cat_ann_array
		
		{// ann_item_ctrl
			// модель ann_item
			App.Models.ann_item_page = Backbone.Model.extend({});
			// вид ann_item
			App.Views.ann_item_page = Backbone.View.extend({
				initialize: function() {
					//this.el = null;// emptyRender
					this.model.on('change', this.render, this);
					this.render();
				},
				el: $("#b_view"), // DOM элемент widget'а
				templateUrl: '/app/template/catalog/ann_item.tpl',
				render: function() {
					//console.log('3 model - render')
					var html = App.Core.templateFromUrl(this.templateUrl, this.model.toJSON());
					this.$el.html( html );
					return this;
				},
				/*
				events: {
					"click .delete"	: "deleteCompare",
					"click .compare": "addCompare",
				},
				addCompare: function() {
					console.log('addCompare()')
					this.model.set('in_compare', 1);
				},
				deleteCompare: function() {
					console.log('deleteCompare()')
					this.model.set('in_compare', 0);
				}
				*/
			});
		
		}//END ann_item_ctrl
		
		{// корзина в верху
			App.Models.top_basket_ann_item = Backbone.Model.extend({});
			App.Views.top_basket_ann_item = Backbone.View.extend({
				initialize: function() {
					this.el = null;// emptyRender
					this.model.on('change', this.render, this);
					this.render();
				},
				template: '<a href="{{url}}"><div class="item"><div class="delete" ng-click="deleteFromBasket(item);"></div><div class="image"><img src="/img/iResize.php?size=80&bg=ffffff&img={{image}}" /></div><div class="text"><div class="l1">{{cat_name_one}}</div><div class="l2">AMMITY {{seria_name}} {{name}}</div></div><div class="qty"><span>{{amount}} шт.</span></div><div class="sum"><span>{{summa_str}} руб.</span></div></div></a>',
				render: function() {
					//console.log('3 model - render')
					var html = App.Core.template(this.template, this.model.toJSON());
					App.Core.emptyRender(this, html);
					return this;
				},
				events: {
					"click .delete"	: "deleteFromBasket",
				},
				deleteFromBasket: function(e) {
					//console.log('deleteFromBasket')
					//console.log(e)
					this.$el.remove();
					basketFactory.deleteFromBasket(this.model.toJSON().id);
					return false;
				},
				/*
				remove: function() {
					this.$el.remove();
				}
					
				*/
			});
			
			// массив аннотаций в корзине
			App.Collection.top_basket_ann_item = Backbone.Collection.extend({
				model: App.Models.top_basket_ann_item,
				/*
				initialize: function() {
					console.log(this.model.toJSON())
					//this.model.on('change', this.itemChange, this);
				},
				itemChange: function() {
					console.log('itemChange')
				}
				
				*/
			});
			App.Views.top_basket_ann_item_collection = Backbone.View.extend({
				initialize: function() {
					this.collection.on('change', this.itemChange, this);
					this.render();
				},
				render: function() {
					this.collection.each(this.addOne, this);
					return this;
				},
				addOne: function(data) {
					var view = new App.Views.top_basket_ann_item({ model: data });
					this.$el.append(view.el);
				},
				
			});
			
			// корзина целиком
			App.Models.top_basket = Backbone.Model.extend({});
			App.Views.top_basket = Backbone.View.extend({
				initialize: function() {
					// добавление в корзину, изменение количества - полная перерисовка
					this.model.on('renderAll', this.render, this);
					// удаление - перерисовываем только цену, иначе корзина исчезает (мигает)
					this.model.on('updateSumma', this.updateSumma, this);
					this.render();
				},
				//el: $("#basket_top"), // DOM элемент widget'а
				templateUrl: '/app/template/basket_top.tpl',
				render: function() {
					//console.log('App.Views.top_basket - render')
					//console.log(this.model.toJSON().basket)
					
					if(this.model.toJSON().basket.summa==0){
						var html = App.Core.templateFromUrl(this.templateUrl, this.model.toJSON());
						$("#basket_top").replaceWith( html );
					}
					else{
						//console.log('App.Views.top_basket - render')
						//console.log(this.model.toJSON())
						var html = App.Core.templateFromUrl(this.templateUrl, this.model.toJSON());
						// добавляем продукты
						var collection = new App.Collection.top_basket_ann_item(this.model.toJSON().basket.ann_array);
						var view =new App.Views.top_basket_ann_item_collection({collection:collection});
						var el=$(html).find('.b_list').html( view.el ).parent().parent().parent();
						$("#basket_top").replaceWith( el );
					}
					
					return this;
				},
				updateSumma: function() {
					var basket=basketFactory.getBasket()
					$("#basket_top").find('.text_panel .sum SPAN').html(basket.summa_str+' руб.');
					$("#basket_top").find('.b_info .line_2 .sum SPAN').html(basket.summa_str);
				}//END
			});
		
		}//END корзина в верху
		
		{// pages_basket_ctrl
			
			// 1 продукт в корзине
			App.Models.page_basket_ann_item = Backbone.Model.extend({});
			App.Views.page_basket_ann_item = Backbone.View.extend({
				initialize: function() {
					this.el = null;// emptyRender
					//this.model.on('change', this.render, this);
					this.render();
					this.afterRender();
				},
				template: '<tr class="item"><td class="delete" title="удалить"></td><td class="name"><a href="{{url}}">{{name_full}}</a></td><td class="price">{{price_str}} руб.</td><td class="qty"><input type="text" maxlength="2" value="{{amount}}" /> шт</td><td class="sum">{{summa_str}} руб.</td></tr>',
				render: function() {
					//console.log('3 model - render')
					var html = App.Core.template(this.template, this.model.toJSON());
					App.Core.emptyRender(this, html);
					return this;
				},
				events: {
					"click .delete"	: "deleteFromBasket",
					"mouseout": "checkUpdateBasketItem"
				},
				deleteFromBasket: function() {
					this.$el.remove();
					basketFactory.deleteFromBasket(this.model.toJSON().id);
				},
				checkUpdateBasketItem: function() {
					//console.log('checkUpdateBasketItem()')
					var id=this.model.get('id');
					var amount=this.$el.find('INPUT').val();
					
					if(amount=='' || amount==0){
						amount=1;
					}
					
					// проверяем может число не изменилось
					if( amount==this.model.get('amount') ){
						// число не изменилось - ничего не делаем
					}
					else{// число изменилось
						basketFactory.updateBasketItem({id:id, amount:amount});
					}// END if
					
				},//END
				afterRender:  function() {
					//console.log('afterRender')
					
					var self=this;
					
					this.$el.find('INPUT').keypress(function(event) {
						// проверка на event.charCode - чтобы пользователь мог нажать backspace, enter, стрелочку назад...
						if (event.charCode && (event.charCode < 48 || event.charCode > 57))
						{
							return false;
						}
					});
					
					// нажатие кнопок
					this.$el.find('INPUT').keydown(function(event){
						// Enter
						if (event.which == 13 ) {
							self.checkUpdateBasketItem();
							
						}
					});
					
				}//END
				
			});
			
			
			// массив аннотаций в корзине
			App.Collection.page_basket_ann_item = Backbone.Collection.extend({
				model: App.Models.page_basket_ann_item,
			});
			App.Views.page_basket_ann_item_collection = Backbone.View.extend({
				initialize: function() {
					//this.el = null;// emptyRender
					//this.collection.on('change', this.itemChange, this);
					this.render();
				},
				//el: $("#order_spec_tbody"), // DOM элемент widget'а
				tagName: 'tbody',
				id: 'order_spec_tbody',
				render: function() {
					this.collection.each(this.addOne, this);
					return this;
				},
				addOne: function(data) {
					var view = new App.Views.page_basket_ann_item({ model: data });
					this.$el.append(view.el);
				},
				
			});
			
			// сама корзина
			App.Models.page_basket = Backbone.Model.extend({});
			App.Views.page_basket = Backbone.View.extend({
				initialize: function() {
					// добавление в корзину, изменение количества - полная перерисовка
					this.model.on('updateList', this.renderAnnList, this);
					this.model.on('renderAll', this.render, this);
					// удаление - перерисовываем только цену, иначе корзина исчезает (мигает)
					//this.model.on('change:summa_str', this.changeModelSumma, this);
					this.render();
				},
				el: $("#b_view"), // DOM элемент widget'а
				templateUrl: '/app/template/pages/basket.tpl',
				render: function() {
					var html = App.Core.templateFromUrl(this.templateUrl, this.model.toJSON());
					this.$el.html( html );
					
					this.renderAnnList();
					//console.log(view.$el.html())
					
					/*
					//console.log('render')
					var html = App.Core.templateFromUrl(this.templateUrl, this.model.toJSON());
					// добавляем продукты
					var collection = new App.Collection.top_basket_ann_item(this.model.toJSON().ann_array);
					var view =new App.Views.top_basket_ann_item_collection({collection:collection});
					var el=$(html).find('.b_list').html( view.el ).parent().parent().parent();
					$("#basket_top").replaceWith( el );
					return this;
					*/
				},
				renderAnnList: function() {
					// продукты в корзине
					var collection = new App.Collection.page_basket_ann_item(this.model.toJSON().basket.ann_array);
					var view =new App.Views.page_basket_ann_item_collection({collection:collection});
					//this.$el.find('#order_spec_tbody').html(view.$el.html());
					//this.$el.find('#order_spec_tbody').html(view.el);
					this.$el.find('#order_spec_tbody').replaceWith(view.el);
					//console.log(view.el)
					//console.log(view.$el.html())
					
					$('#basket_total_summa').html(basketFactory.getBasket().summa_str);
					/*
					if(basketFactory.getBasket().summa==0){
						//this.render();
						console.log('полный  рендер')
					}
					*/
					
				},
				events: {
					"click .btn_send": "sendForm",
				},
				debug_mode: false,
				//form_sending: false,
				sendForm: function() {
					
					{// get data
						var fio = $.trim($("#b_fio").val());
						var email = $.trim($("#b_email").val());
						var phone = $.trim($("#b_phone").val());
						var address = $.trim($("#b_address").val());
						var city = $.trim($("#b_city").val());
						var text = $.trim($("#b_text").val());
					}
					
					{// check 
						if(this.debug_mode==false){
							if(fio==''){
								fn.uAlert('Ваше ФИО - не заполнено');
								$("#b_fio").focus();
								return;
							}
							if(phone==''){
								fn.uAlert('Телефон - не заполнено');
								$("#b_phone").focus();
								return;
							}
							if(fn.isEmail(email)==false){
								fn.uAlert('E-mail - заполнено неверно');
								$("#b_email").focus();
								return;
							}
							if(city==''){
								fn.uAlert('Город - не заполнено');
								$("#b_city").focus();
								return;
							}
							if(address==''){
								fn.uAlert('Адрес - не заполнено');
								$("#b_address").focus();
								return;
							}
							
						}
					}
					
					fn.showProcess('Отправка заказа');
					
					$.ajax({
						type: "POST",
						url: App.Core.script_url,
						context: this,
						data: "mode=addOrderItem"
								+"&fio="+fio
								+"&email="+email
								+"&phone="+phone
								+"&address="+address
								+"&city="+city
								+"&text="+text,
						success: function(a){
							basketFactory.clearBasket();
							var basket=this.model.get('basket');
							basket.order_send=1;
							basket.order_nomber=a;
							this.model.set('basket', basket ,{silent: true});
							this.render();
							//console.log(this.model.toJSON());
							fn.hideProcess();
							
							basket.order_send=0;
							this.model.set('basket', basket ,{silent: true});
							//this.form_sending=false;
						}// END
					});
					
					
				}//END
			});
			
			
		}//END pages_basket_ctrl
	
		{// compare_ctrl
			App.Models.page_compare = Backbone.Model.extend({});
			App.Views.page_compare = Backbone.View.extend({
				initialize: function() {
					this.render();
				},
				templateUrl: '/app/template/catalog/compare.tpl',
				el: $("#b_view"), // DOM элемент widget'а
				render: function() {
					//console.log('render')
					//console.log(this.model.toJSON().diff)
					var html = App.Core.templateFromUrl(this.templateUrl, this.model.toJSON());
					this.$el.html( html );
					$('table tr:nth-child(2n+1)').addClass('bg-td');
				},
				events: {
					"click .close"	: "deleteCompare",
				},
				deleteCompare: function(event) {
					event.preventDefault();
					compareFactory.delete(
						{
							ann_id: 		$(event.target).attr('ann_id'), 
							ann_mnemonic: 	$(event.target).attr('mnemonic'), 
							root_cat_id: 	$(event.target).attr('root_cat_id'),
							cat_mnemonic: 	$(event.target).attr('cat_mnemonic'),
							seria_mnemonic: $(event.target).attr('seria_mnemonic')
						}
					);
					App.Routers.navigate($(event.target).attr('href'), {trigger: true} );
					return false;
				},
				/*
				clickDiff: function(event) {
					event.preventDefault();
					var url='/compare/'+this.model.get("compare_list")+'/?diff=1';
					App.Routers.navigate(url, {trigger: true} );
					console.log('clickDiff' + url)
					return false;
				},
				*/
			});
		}//END compare_ctrl
		
		{// pages_cooperation_ctrl
			App.Models.page_cooperation = Backbone.Model.extend({});
			App.Views.page_cooperation = Backbone.View.extend({
				initialize: function() {
					this.render();
				},
				templateUrl: '/app/template/pages/cooperation.tpl',
				el: $("#b_view"), // DOM элемент widget'а
				render: function() {
					var html = App.Core.templateFromUrl(this.templateUrl, this.model.toJSON());
					this.$el.html( html );
				},
				events: {
					"click .btn_send": "sendForm",
				},
				debug_mode: false,
				sendForm: function() {
					//console.log('sendForm')
					{// get data
						var name = $.trim($("#sd_name").val());
						var fio = $.trim($("#sd_fio").val());
						var city = $.trim($("#sd_city").val());
						var phone = $.trim($("#sd_phone").val());
						var email = $.trim($("#sd_email").val());
						var note = $.trim($("#sd_note").val());
						var site = $.trim($("#sd_site").val());
						var	service_center=($('#sd_service_center').prop("checked"))?(1):(0);
						var	customer_base=($('#sd_customer_base').prop("checked"))?(1):(0);
						//console.log($('#sd_service_center').attr("checked"))
						//console.log($('#sd_service_center').prop("checked"))
						//console.log('service_center='+service_center)
						//return;
					}
					
					{// check 
						if(this.debug_mode==false){
							{// проверка полей на заполнение
								if(name==''){
									fn.uAlert('НАЗВАНИЕ ОРГАНИЗАЦИИ - не заполнено');
									$("#sd_name").focus();
									return;
								}
								if(fio==''){
									fn.uAlert('КОНТАКТНОЕ ЛИЦО - не заполнено');
									$("#sd_fio").focus();
									return;
								}
								if(city==''){
									fn.uAlert('ГОРОД - не заполнено');
									$("#sd_city").focus();
									return;
								}
								if(phone==''){
									fn.uAlert('ТЕЛЕФОН - не заполнено');
									$("#sd_phone").focus();
									return;
								}
								if(email==''){
									fn.uAlert('E-MAIL - не заполнено');
									$("#sd_email").focus();
									return;
								}
								if(fn.isEmail(email)==false){
									fn.uAlert('E-MAIL - заполнено неверно');
									$("#sd_email").focus();
									return;
								}
							}// END
						}
					}
					
					fn.showProcess('Отправка заказа');
					
					$.ajax({
						type: "POST",
						url: App.Core.script_url,
						context: this,
						data: "mode=addDealerRequestItem"
								+"&name="+name
								+"&fio="+fio
								+"&city="+city
								+"&phone="+phone
								+"&email="+email
								+"&service_center="+service_center
								+"&customer_base="+customer_base
								+"&note="+note
								+"&site="+site,
						success: function(a){
							fn.hideProcess();
							fn.completeProcess('Сообщение', 'Спасибо ваше письмо принято.</br>Вскоре с Вами свяжется наш представитель.');
							this.render();
						}// END
					});
					
					
				}//END
				
			});
		}//END pages_cooperation_ctrl
		
		{// page_product_registration_ctrl
			App.Models.page_product_registration = Backbone.Model.extend({});
			App.Views.page_product_registration = Backbone.View.extend({
				initialize: function() {
					this.render();
				},
				templateUrl: '/app/template/pages/product_registration.tpl',
				el: $("#b_view"), // DOM элемент widget'а
				render: function() {
					var html = App.Core.templateFromUrl(this.templateUrl, this.model.toJSON());
					this.$el.html( html );
				},
			});
		}//END 
		
		{// page_search_dealer
			App.Models.page_search_dealer = Backbone.Model.extend({});
			App.Views.page_search_dealer = Backbone.View.extend({
				initialize: function() {
					this.render();
				},
				templateUrl: '/app/template/pages/search_dealer.tpl',
				el: $("#b_view"), // DOM элемент widget'а
				render: function() {
					var html = App.Core.templateFromUrl(this.templateUrl, this.model.toJSON());
					this.$el.html( html );
					//$('table tr:nth-child(2n)').addClass('bg');
					
					
					
				},
			});
		}
		
		{// page_contact
			App.Models.page_contact = Backbone.Model.extend({});
			App.Views.page_contact = Backbone.View.extend({
				initialize: function() {
					this.render();
				},
				templateUrl: '/app/template/pages/contact.tpl',
				el: $("#b_view"), // DOM элемент widget'а
				render: function() {
					var html = App.Core.templateFromUrl(this.templateUrl, this.model.toJSON());
					this.$el.html( html );
				},
			});
		}
		
		{// page_app
			App.Models.page_app = Backbone.Model.extend({});
			App.Views.page_app = Backbone.View.extend({
				initialize: function() {
					this.render();
				},
				templateUrl: '/app/template/pages/app.tpl',
				el: $("#b_view"), // DOM элемент widget'а
				render: function() {
					var html = App.Core.templateFromUrl(this.templateUrl, this.model.toJSON());
					this.$el.html( html );
				},
			});
		}
		
		{// page_action
			App.Models.page_action = Backbone.Model.extend({});
			App.Views.page_action = Backbone.View.extend({
				initialize: function() {
					this.render();
				},
				templateUrl: '/app/template/pages/action.tpl',
				el: $("#b_view"), // DOM элемент widget'а
				render: function() {
					var html = App.Core.templateFromUrl(this.templateUrl, this.model.toJSON());
					this.$el.html( html );
				},
			});
		}
		
		{// page_presentation
			App.Models.page_presentation = Backbone.Model.extend({});
			App.Views.page_presentation = Backbone.View.extend({
				initialize: function() {
					this.render();
				},
				templateUrl: '/app/template/pages/presentation.tpl',
				el: $("#b_view"), // DOM элемент widget'а
				render: function() {
					var html = App.Core.templateFromUrl(this.templateUrl, this.model.toJSON());
					this.$el.html( html );
				},
			});
		}
		
		{// page404
			App.Models.page404 = Backbone.Model.extend({});
			App.Views.page404 = Backbone.View.extend({
				initialize: function() {
					this.render();
				},
				templateUrl: '/app/template/pages/404.tpl',
				el: $("#b_view"), // DOM элемент widget'а
				render: function() {
					var html = App.Core.templateFromUrl(this.templateUrl, this.model.toJSON());
					this.$el.html( html );
				},
			});
		}
		
	}//END 
	init();

})();