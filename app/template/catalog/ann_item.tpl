<section class="content-main">
	
	<div class="page_header">
		<h1>{{ann_item.name_full}}</h1>
	</div>
	
	<div class="menu_nav_bar" id="tab_control" style="overflow:hidden_;">
		<a href="#descr" class="tab tab_control_item" style="margin-left:-7px; z-index:50;" tab_control_id="descr">
			<div class="gl l"></div>
			<div class="gc c" style="width:98px; padding-left:0px; padding-right:0px;text-align:center">ОПИСАНИЕ</div>
			<div class="gr r"></div>
		</a>
		<a href="#feature" class="tab tab_control_item" style="z-index:140;" tab_control_id="feature">
			<div class="gl l"></div>
			<div class="gc c" style="width:121px; padding-left:0px; padding-right:0px;text-align:center">ОСОБЕННОСТИ</div>
			<div class="gr r"></div>
		</a>
		<a href="#ttx" class="tab tab_control_item" style="z-index:30;" tab_control_id="ttx">
			<div class="gl l"></div>
			<div class="gc c" style="width:141px; padding-left:0px; padding-right:0px;text-align:center">ХАРАКТЕРИСТИКИ</div>
			<div class="gr r"></div>
		</a>
		<!--compare-->
		
		
		<a id="in_compare_btn" style="z-index:20;" class="tab tab_control_item">
			<div class="gl l"></div>
			<div style="width:85px; padding-left:0px; padding-right:0px;text-align:center" class="gc c">
				<span>Сравнить</span>
			</div>
			<div class="gr r"></div>
		</a>
		
		<!--
		{{#iif ann_item.compare_total '==' 0}}
		<a style="z-index:20;" class="tab tab_control_item disabled">
			<div class="gl l"></div>
			<div style="width:85px; padding-left:0px; padding-right:0px;text-align:center" class="gc c">
				<span>Сравнить</span>
			</div>
			<div class="gr r"></div>
		</a>
		{{/iif}}
		{{#iif ann_item.compare_total '!=' 0}}
		<a href="{{ann_item.compare_url}}" style="z-index:20;" class="tab tab_control_item">
			<div class="gl l"></div>
			<div style="width:85px; padding-left:0px; padding-right:0px;text-align:center" class="gc c">
				<span>Сравнить</span>
				<span> {{ann_item.compare_total}}</span>
			</div>
			<div class="gr r"></div>
		</a>
		{{/iif}}
		-->
		
		<!--compare END-->
		{{#iif ann_item.cat_extended_warranty '==' 1}}
		<a class="tab tab_control_item" style="z-index:10;" href="/pages/product_registration/" >
			<div class="gl l"></div>
			<div class="gc c" style="width:189px; padding-left:0;padding-right:0;text-align:center;">РАСШИРЕННАЯ ГАРАНТИЯ</div>
			<div class="grlast rlast"></div>
		</a>
		{{/iif}}
	</div>
	
	<div class="tab_item" tab_item_id="descr">
		<div class="tovar-box clearfix">
			<a href="{{ann_item.seria_url}}" class="red_label">{{ann_item.series_mnemonic}}</a>
			<div class="right-box">
				{{#iif ann_item.price '!=' 0}}
					<div class="price">{{ann_item.price_str}} р.</div>
				{{/iif}}
				
				<div class="price_btn_panel">
					
					<a class="price_btn_text" id="price_btn_text"
						href="/basket/" {{#iif ann_item.in_basket_amount '==' 0}}style="display:none;"{{/iif}}>
						В Корзине <span>{{ann_item.in_basket_amount}}</span> шт.
					</a>
					
					
					<div class="price_btn" id="price_btn"
						{{#iif ann_item.in_basket_amount '!=' 0}}style="display:none;"{{/iif}} >
						<div class="qty">
							<span>1</span>
						</div>
						<div class="control">
							<div class="up" onclick="p_obj.changeBasketAmount('+')"></div>
							<div class="down" onclick="p_obj.changeBasketAmount('-')"></div>
						</div>
						<div onclick="p_obj.addToBasket({{ann_item.id}}, 'add');" class="text">
							<span>в корзину</span>
						</div>
					</div>
					
				</div>
				
				<ul class="tabs"><!--превью справа страницы-->
					{{#each ann_item.image_array}}
					<li>
						<img src="/img/iResize.php?w=90&h=90&bg=ffffff&img={{image}}" />
					</li>
					{{/each}}
				</ul>
				<div class="panel"><!--панель вперёд назад-->
					<div class="text">Всего изображений </div>
					<div onclick="p_obj.clickPrev();" class="prev"></div>
					<div onclick="p_obj.clickNext();" class="next"></div>
				</div>
				
				<div class="compare_btn_panel" id="compare_btn_panel">
					<a style="display:none;" onclick="p_obj.setCompare(1);" class="btn-tovar add">Добавить к сравнению</a>
					<a style="display:none;" onclick="p_obj.setCompare(0);" class="btn-tovar delete disable">Удалить из сравнения</a>
				</div>
				
				<div class="ware_icons">
					<a href="/pages/presentation/#pr_8" style="border:none">
						<img class="ware_icon" src="/img/client/ware_icon/ware_icon_rus.png" style="margin-left:0px" />
					</a>
					<a href="/pages/app/" style="border:none">
						<img class="ware_icon" src="/img/client/ware_icon/ware_icon_app.png" />
					</a>
					<a href="/pages/app/" style="border:none">
						<img class="ware_icon" src="/img/client/ware_icon/ware_icon_apple.png" />
					</a>
					<a href="/pages/app/" style="border:none">
						<img class="ware_icon" src="/img/client/ware_icon/ware_icon_android.png" />
					</a>
					<a href="/pages/product_registration/" style="border:none">
						<img class="ware_icon" src="/img/client/ware_icon/ware_icon_warranty.png" style="margin-right:0px" />
					</a>
				</div>
			</div>
			<div class="panes"><!--основные фото-->
				{{#each ann_item.image_array}}
					{{#iif @index '==' 0}}
						<div href="{{image}}"><img src="{{image}}" alt="" /></div>
					{{else}}
						<div href="{{image}}" style="display:none;"><img src="{{image}}" alt="" /></div>
					{{/iif}}
				{{/each}}
			</div>
			
			
		</div>
		<div class="block-content">
			<h3>Описание модели</h3>
			<div id="more_content">{{{ann_item.text}}}</div>
			<div class="more" id="more_btn" style="">
				<div class="icon"></div>
				<div class="text">ещё</div>
			</div>
			<div class="more up" id="more_btn_hide" style="">
				<div class="icon"></div>
				<div class="text">скрыть</div>
			</div>
		</div>
		
		<div class="tovar-widgets clearfix" style="margin-right:-6px;"><!--нет-->
			{{#each ann_item.feature_array}}
			<article class="widget">
				<img src="{{image}}" alt="{{name}}" />
				<div class="desc">
					<h3>{{name}}</h3>
					<p>{{{text}}}</p>
				</div>
			</article>
			{{/each}}
		</div>
		
	</div>
	
	<div class="tab_item" tab_item_id="feature">
		<div class="block-content">{{{ann_item.features}}}</div>
	</div>	
	
	<div class="tab_item" tab_item_id="ttx">
		<div class="table-box clearfix">
			{{#each ann_item.ch_array}}
				<h2>{{name}}</h2>
				<table class="table-tovar-desc">
					{{#each param}}
					<tr ng-repeat='param_item in ch_item.param'>
						<td width="400"><strong>{{{name}}}</strong></td>
						<td>{{{value}}}</td>
					</tr>
					{{/each}}
				</table>
			{{/each}}
		</div>
	</div>
	
	<!--this_ann_item-->
	<!--
	{*используется для сравнения - не удалять*}
	-->
	
</section>
<script>
function pageClass(){
	{// Инициализация
		var self = this;
		this.script_url = App.Core.script_url;	// урл респондента
		this.in_compare;
		this.in_compare_total;
		this.root_cat_id;
	}//END Инициализация
	this.init = function(){
		$('table tr:nth-child(2n+1)').addClass('bg-td');
			
		var tab_obj=new fn.tabClass('tab_control');
		tab_obj.init();
		
		{// показываем нужную вкладку
			var hash=document.location.hash;
			if(hash=='#feature'){
				$('.tab_control_item[tab_control_id=feature]').trigger('click');
			}
			if(hash=='#ttx'){
				$('.tab_control_item[tab_control_id=ttx]').trigger('click');
			}
		}
		
		{// смена иконок при наведении
			$('.ware_icons IMG').each(function(){
				var src_orig=$(this).attr('src');
				$(this).hover(
					function () {// навести
						var src=$(this).attr('src').substr(22);
						src=src.substr(-src.length, src.length-4);
						src='/img/client/ware_icon/'+src+'_active.png';
						$(this).attr('src', src);
					},
					function () {// увести
						$(this).attr('src', src_orig);
					}
				);//END hover
			});//END each
				
		}
		
		this.initImage();
		this.initCompare();
		
		
	}//END init
	
	{// картинки
	
		this.image_panel=1;
		this.image_panel_max=0;
		this.initImage = function(){
			
			var index=0;
			$('#container .right-box .tabs LI').each(function(){
				$(this).attr('index', index);
				index++;
				$(this).on('click', function(){
					
					$('#container .right-box .tabs LI').removeClass('current');
					$(this).addClass('current');
					
					$('#container .panes DIV').hide();
					$('#container .panes DIV:eq('+$(this).attr('index')+')').show();
				});
			});
			
			
			var img_total=$('#container .right-box .tabs LI').length;
			if(img_total>4){
				$('#container .right-box .panel .text').html('Всего '+img_total+' изображений');
				$('#container .right-box .panel').show();
				
			}
			else{
				$('#container .right-box .panel').hide();
			}
			
			var p_nomber=1;
			var total=0;
			$('#container .right-box .tabs LI').each(function(){
				if(total==4){
					total=0;
					p_nomber++;
					self.image_panel_max=p_nomber;
				}
				total++;
				//console.log(this);
				
				$(this).attr('panel_nomber',p_nomber);
				
				
			});
			
			if(img_total>4){
				this.clickAction();
			}
		
			
		
		}
		this.clickNext = function(){
			//console.log('next')
			this.image_panel++;
			if(this.image_panel>this.image_panel_max){
				this.image_panel=1;
			}
			this.clickAction();
		}
		this.clickPrev = function(){
			//console.log('next')
			this.image_panel--;
			if(this.image_panel<=0){
				this.image_panel=this.image_panel_max;
			}
			this.clickAction();
		}
		this.clickAction = function(){
			$('#container .right-box .tabs LI').removeClass('current');
			$('#container .right-box .tabs LI').hide();
			$('#container .right-box .tabs LI[panel_nomber='+this.image_panel+']').show();
			$('#container .right-box .tabs LI[panel_nomber='+this.image_panel+']:eq(0)').trigger('click');
			$('#container .right-box .tabs LI[panel_nomber='+this.image_panel+']:eq(0)').addClass('current');
		}
		
	}// картинки
	
	{// compare
		this.initCompare = function(){
			//console.log('this.in_compare='+this.in_compare);
			//console.log('this.compare_total='+this.compare_total);
			if(this.in_compare){
				$('#compare_btn_panel .add').hide();
				$('#compare_btn_panel .delete').show();
			}
			else{
				$('#compare_btn_panel .add').show();
				$('#compare_btn_panel .delete').hide();
			}
			this.setCompareText();
		}
		this.setCompare = function(in_compare){
			//console.log('setCompare')
			var item=App.Core.page.ann_item;
			
			if(in_compare==1){
				compareFactory.add(
					{
						ann_id:item.id, 
						ann_mnemonic: item.mnemonic, 
						root_cat_id: item.root_cat_id,
						cat_mnemonic: item.cat_mnemonic,
						seria_mnemonic: item.seria_mnemonic
					}
				);
				$('#compare_btn_panel .add').hide();
				$('#compare_btn_panel .delete').show();
			}
			else{
				compareFactory.delete(
					{
						ann_id:item.id, 
						ann_mnemonic: item.mnemonic, 
						root_cat_id: item.root_cat_id,
						cat_mnemonic: item.cat_mnemonic,
						seria_mnemonic: item.seria_mnemonic
					}
				);
				$('#compare_btn_panel .add').show();
				$('#compare_btn_panel .delete').hide();
			}
			
			this.setCompareText();
			
		}//END
		this.setCompareText = function(){
			var compare_total=compareFactory.countInCompare(this.root_cat_id);
			var compare_url=compareFactory.getCompareUrl(this.root_cat_id);
			//console.log('compare_total='+compare_total)
			if(compare_total==0){
				$('#in_compare_btn SPAN').html('сравнить');
				$('#in_compare_btn').addClass('disabled');
				$('#in_compare_btn').attr('href', '');
				$('#in_compare_btn').removeAttr("href")
			}
			else{
				$('#in_compare_btn SPAN').html('сравнить '+compare_total);
				$('#in_compare_btn').removeClass('disabled');
				$('#in_compare_btn').attr('href', compare_url);
			}
		}//END
	}//END compare
	
	{// basket
		this.addToBasket = function(id, mode){
			if(mode=='add'){
				var amount=$('.price_btn .qty SPAN').html();
				$('#price_btn').hide();
				$('#price_btn_text').show();
				basketFactory.addToBasket({id:id, amount:amount});
				$('#price_btn_text SPAN').html(amount);
			}
			else{// delete
				
			}
		}
		this.changeBasketAmount = function(mode){
			
			var amount=$('.price_btn .qty SPAN').html();
			amount=parseInt(amount);
			if(mode=='+'){
				amount=amount+1;
			}
			if(mode=='-'){
				amount=amount-1;
			}
			if(amount==100){
				amount=99;
			}
			if(amount==0){
				amount=1;
			}
			$('.price_btn .qty SPAN').html(amount);
			
		}//END
	}//END basket
	
}//END pageClass p_obj
</script>