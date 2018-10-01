<section class="home-main-widgets clearfix">
	{{#each cat_array}}
	<article>
		<a {{#iif link_disable '==' 0}}href='{{url}}'{{/iif}}>
			<img src="{{image}}" />
			<h2>{{name}}</h2>
		</a>
	</article>
	{{/each}}
</section>

<article class="line-news">
	<strong>Новость:</strong>
	<a>новое поступление эллиптических и велотренажеров</a>
</article>

<section class="bottom-widgets clearfix">
	{{#each pr_mane}}
	<a class="widget" href="{{url}}">
		<h3>{{{name}}}</h3>
		<div class="url_name">{{url_name}}</div>
		<img src="{{icon_white}}"/>
	</a>
	{{/each}}
</section>