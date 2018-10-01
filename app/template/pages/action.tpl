<section class="content-main">
	<div class="page_header margin_bottom">
		<h1>{{page_item.name}}</h1>
	</div>
	<div class="become-box">
		{{#if page_item.text}}
		<div>{{{page_item.text}}}</div>
		{{/if}}
		
		{{#iif page_item.text '==' ''}}
		<div class="action_page">
			<div class="tv_box">
				<div class="text">В настоящий момент акции не проводятся</div>
			</div>
		</div>
		{{/iif}}
	</div>
</section>