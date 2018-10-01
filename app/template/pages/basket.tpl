<section class="content-main">
	
	<div class="page_header margin_bottom">
		<h1>{{page_item.name}}</h1>
	</div>
	
	{{#if page_item.text}}
	<div class="become-box">{{{page_item.text}}}</div>
	{{/if}}
	
	{{#iif basket.summa '!=' 0}}
	<div class="basket_page" ng-if="basket.summa!=0">
		<div class="page_form " >
			<table class="order_spec">
				<tr class="header">
					<td class="delete"></td>
					<td class="name">Наименование</td>
					<td class="price">Цена</td>
					<td class="qty">Кол-во</td>
					<td class="sum">Сумма</td>
				</tr>
				<tbody id="order_spec_tbody"></tbody>
				<tr class="total">
					<td class="delete"></td>
					<td colspan="2" class="name">Итого</td>
					<td colspan="2" class="sum"><span id="basket_total_summa">{{basket.summa_str}}</span> руб.</td>
				</tr>
			</table>
		</div>
		<div class="page_rasp bold">ЗАПОЛНИТЕ ФОРМУ И ЗАКАЗ БУДЕТ ПЕРЕДАН БЛИЖАЙШЕНМУ ДИЛЕРУ В ВАШЕМ РЕГИОНЕ:</div>
		<div class="page_form " >
			<table class="form_table">
				<tr><!--ФИО--> 
					<td class="name">Ваше ФИО:</td>
					<td class="value">
						<input id="b_fio" ng-model="form.fio" type="text" size="30" value=""/>
					</td>
				</tr>
				<tr><!--Телефон-->
					<td class="name">Телефон:</td>
					<td class="value">
						<input placeholder="8 (000) 000-00-00" id="b_phone" ng-model="form.phone" type="text" size="30" value=""/>
					</td>
				</tr>
				<tr><!--email-->
					<td class="name">E-mail:</td>
					<td class="value">
						<input placeholder="адрес электронной почты" id="b_email" ng-model="form.email" type="text" size="30" value=""/>
					</td>
				</tr>
				<tr><!--Город-->
					<td class="name">Город:</td>
					<td class="value">
						<input placeholder="город доставки" id="b_city" ng-model="form.city" type="text" size="30" value=""/>
					</td>
				</tr>
				<tr><!--Адрес-->
					<td class="name">Адрес:</td>
					<td class="value">
						<input placeholder="адрес доставки" id="b_address" ng-model="form.address" type="text" size="30" value=""/>
					</td>
				</tr>
				<tr><!--вопрос:-->
					<td class="name">Примечание:</td>
					<td class="value">
						<textarea id="b_text" ng-model="form.text"></textarea>
					</td>
				</tr>
				<tr ><!--Отправить-->
					<td class="name"></td>
					<td class="value">
						<div class="btn_send transition">Отправить заказ</div>
					</td>
				</tr>
			</table>
		</div>	
		
	
	</div>
	{{/iif}}
	
	{{#iif basket.order_send '==' 1}}
	<div class="basket_page_confirm become-box" ng-if="order.send==1">
		<div class="text">
			<p>Благодарим за заказ.</p>
			<p>Ожидайте звонка ближайшего торгового представителя.</p>
		</div>
		
		<div class="order">Ваш заказ <span>{{basket.order_nomber}}</span></div>
		
		<div class="return">
			<a href="/catalog/">вернуться в каталог</a>
		</div>
	</div>
	{{/iif}}
	
	{{#iif basket.summa '==' 0}}
		{{#iif basket.order_send '!=' 1}}
		<div class="basket_page_empty" ng-if="basket.summa==0 && order.send!=1">
			<div class="become-box" style="text-align:center;">
				<br>
				<img src="/img/client/basket/basket_empty.png"
					alt="Для оформления заказа - добавьте товары в корзину" 
					title="Для оформления заказа - добавьте товары в корзину"
					/>
			</div>
		</div>
		{{/iif}}
	{{/iif}}
	
</section>