<section class="content-main">
	
	<div class="page_header margin_bottom">
		<h1>{{page_item.name}}</h1>
	</div>
	
	{{#if page_item.text}}
	<div class="become-box" style="margin-bottom:0;padding-bottom:0;">{{{page_item.text}}}</div>
	{{/if}}
	
	<div class="page_form  ">
		<div class="header">Запрос на дилерство:</div>
		<table class="form_table">
			<tr ><!--sd_name-->
				<td class="name">название организации:</td>
				<td class="value">
					<input type="text" ng-model="form.name" id="sd_name" />
				</td>
			</tr>
			<tr ><!--sd_fio-->
				<td class="name">Контактное лицо:</td>
				<td class="value">
					<input type="text" ng-model="form.fio" id="sd_fio" />
				</td>
			</tr>
			<tr ><!--sd_city-->
				<td class="name">город:</td>
				<td class="value">
					<input type="text" ng-model="form.city" id="sd_city" />
				</td>
			</tr>
			<tr ><!--sd_phone-->
				<td class="name">телефон:</td>
				<td class="value">
					<input type="text" ng-model="form.phone" placeholder="8 (000) 000-00-00" id="sd_phone" />
				</td>
			</tr>
			<tr ><!--sd_email-->
				<td class="name">E-mail:</td>
				<td class="value">
					<input type="text" ng-model="form.email" id="sd_email" />
				</td>
			</tr>
			<tr ><!--sd_site-->
				<td class="name">WEB-сайт:</td>
				<td class="value">
					<input type="text" ng-model="form.site" id="sd_site" />
				</td>
			</tr>
			<tr ><!--sd_note-->
				<td class="name">Примечание:</td>
				<td class="value">
					<textarea ng-model="form.note" class="type-text" cols="50" rows="4" id="sd_note"></textarea>
				</td>
			</tr>
			<tr ><!--sd_customer_base-->
				<td class="name label">
					<label for="sd_customer_base">наработанная база клиентов:</label>
				</td>
				<td class="value">
					<input ng-model="form.customer_base" id="sd_customer_base" type="checkbox" class="type-checkbox" />
				</td>
			</tr>
			<tr ><!--sd_service_center-->
				<td class="name label">
					<label for="sd_service_center">собственный сервисный центр:</label>
				</td>
				<td class="value">
					<input ng-model="form.service_center" id="sd_service_center" type="checkbox" class="type-checkbox" />
				</td>
			</tr>
			<tr ><!--Отправить-->
				<td class="name"></td>
				<td class="value">
					<div class="btn_send transition" ng-click="sendForm();">отправить запрос</div>
				</td>
			</tr>
		</table>
	</div>
	
</section>