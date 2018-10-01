<section class="content-main full-content" >
	<div class="page_header">
		<h1>Сравнение товаров</h1>
	</div>
	
	<div class="menu_nav_bar">
		<a 
			class="all tab tab_control_item {{#iif diff '==' 0}}active{{/iif}}" 
			style="margin-left:-7px; z-index:50;" 
			href="/compare/{{compare_list}}/"
		>
			<div class="gl l"></div>
			<div class="gc c" style="">все характеристики</div>
			<div class="gr r"></div>
		</a>
		<a 
			class="diff tab tab_control_item {{#iif diff '==' 1}}active{{/iif}}" 
			style="z-index:40;" href="/compare/{{compare_list}}/diff/">
			<div class="gl l"></div>
			<div class="gc c" style="">только отличающиеся характеристики</div>
			<div class="gr r"></div>
		</a>
		
	</div>
	<div class="table-box clearfix">
		
		<table class="table-tovar">
			<tr>
				<td>&nbsp;</td>
				{{#each compare_array.model_array}}
				<td ng-repeat="model_item in page.compare_array.model_array">
					<div class="relative">
						<a class="close" 
							ann_id="{{id}}" 
							root_cat_id="{{root_cat_id}}"
							mnemonic="{{mnemonic}}"
							cat_mnemonic="{{cat_mnemonic}}"
							seria_mnemonic="{{seria_mnemonic}}"
							href="{{url_delete}}"></a>
						{{#iif is_disable '==' 1}}
						<div class="disable">отключено</div>
						{{/iif}}
						<a href="{{url}}">
							<img src="/img/iResize.php?w=100&h=100&bg=ffffff&img={{image}}"/>
						</a>
						<h3><a href="{{url}}">{{name}}</a></h3>
					</div>
				</td>
				{{/each}}
			</tr>
		</table>
		
		{{#each compare_array.param_array}}
		<div>
			<h2> {{@key}}</h2>
			<table class="table-tovar-desc">
				{{#each this}}
				<tr ng-repeat="(key_2, val_2) in val_1">
					<td width="400"><strong>{{@key}}</strong></td>
					{{#each this}}
					<td ng-repeat="el in val_2 track by $index">{{this}}</td>
					{{/each}}
				</tr>
				{{/each}}
			</table>
		</div>
		{{/each}}
		
	</div>
</section>