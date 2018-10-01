<section class="content-main">
	<div class="catalog-widgets clearfix ">
			<div class="seria_block" ng-repeat="seria_cat_item in page.seria_cat_array">
				<div class="page_header">
					<h1>{{seria_cat_item.name}} серия {{page.seria_item.name}}</h1>
				</div>
				<div class="ann_list" 
					ann_list 
					ann_array="seria_cat_item.ann_array"
					>
				</div>
			</div><!--END ng-repeat-->
		<!--this_ann_array--><!--{*используется для сравнения - не удалять*}-->
	</div>
</section>

