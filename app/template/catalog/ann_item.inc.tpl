<article class="ann_item" id="ann_{{id}}">
	<a class="red_label" href="{{seria_url}}" >{{series_mnemonic}}</a>
	<a href="{{url}}">
		<div class="pix-box">
			<img src="/img/iResize.php?w=210&h=215&bg=ffffff&img={{image}}"/>
		</div>
	</a>
	<h2><a href="{{ann_item.url}}">{{ann_item.name}}</a></h2>
	
	<ul>
		{{#each param_array}}
		<li>{{this.name}} {{this.value}}</li>
		{{/each}}
	</ul>
	<div class="price" ng-if="ann_item.price!=0">{{price_str}} р.</div>
	
	{{#iif root_cat_id '!=' 20}}
	<div class="compare_panel">
		{{#iif in_compare '==' 0}}
		<a class="compare" ng-click="addCompare(ann_item)">добавить к сравнению</a>
		{{/iif}}
	
		<!--сравнить-->
		{{#iif in_compare '==' 1}}
		<a class="compare" href="{{compare_url}}">сравнить {{compare_total}}</a>
		{{/iif}}
		
		<!--удалить-->
		{{#iif in_compare '==' 1}}
		<div class="delete" title="удалить из сравнения"></div>
		{{/iif}}
	</div>
	{{/iif}}
</article>