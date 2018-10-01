<!--WORK--> 
<section class="content-main">
	<div class="page_header margin_bottom">
		<h1>{{cat_item.name}}</h1>
	</div>
	<div class="main-box">
		{{#iif cat_item.name '==' 'Беговые дорожки'}}
		<img class="cat_img" src="/img/cat_ban_beg.jpg" alt="Беговые дорожки" style="margin-top:0;" />
		{{else}}
		<img class="cat_img" src="/img/pix_2.jpg" alt="" style="margin-top:0;" />
		{{/iif}}
		
		{{#if cat_item.name}}
		<p style="text-align:justify;">{{{cat_item.text}}}</p>	
		{{/if}}
	</div>
	<div class="catalog-widgets clearfix"></div>
</section>