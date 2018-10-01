{{#iif basket.summa '==' 0}}
<li class="basket_top " id="basket_top" style="display: none;"></li>
{{else}}
<li class="basket_top " id="basket_top">
	<div class="inner" >
		<a class="b_info" href="/basket/">
			<div class="line_1">
				<div class="text">корзина</div>
			</div>
			<div class="line_2">
				<span class="text">Сумма:</span>
				<span class="sum">
					<span>{{basket.summa_str}}</span> руб.
				</span>
			</div>
			<div class="rasp"></div>
		</a>
		<div class="b_detail">
			<div class="b_list" ></div>
			<div class="b_total">
				<div class="text_panel">
					<div class="sum">
						<span>{{basket.summa_str}} руб.</span>
					</div>
					<div class="sum_text">Сумма заказа:</div>
				</div>
				<div class="btn_panel">
					<a href="/basket/" class="btn">Оформить...</a>
				</div>
			</div>
		</div>
	</div>
</li>
{{/iif}}