{{#each left_menu}}
	<nav >
		<ul>
			{{#iif ../cat_mnemonic '==' mnemonic}}
			<li class="open">
			{{else}}
			<li>
			{{/iif}}
				{{#iif link_disable '==' 0}}<a href='{{url}}'>{{name}}</a>{{else}}<a>{{name}}</a>{{/iif}}
				<!--{if $left_menu[i].seria_array}-->
					{{#iif ../cat_mnemonic '!=' mnemonic}}
					<ul id="submenu_{{id}}" class="submenu" style="display:none;">
					{{else}}
					<ul id="submenu_{{id}}" class="submenu" >
					{{/iif}}
					
						{{#each seria_array}}
							<li>
								<a href="{{url}}">{{name}}</a>
								<ul>
									{{#each ann_array}}
										{{#iif ../../../ann_mnemonic '==' mnemonic}}
										<a class="selected" href="{{url}}">
										{{else}}
										<a href="{{url}}">
										{{/iif}}
										{{name}}
										</a>
									{{/each}}
								</ul>
							</li>
						{{/each}}
					</ul>
				<!--{/if}-->
			</li>
		</ul>
	</nav>
{{/each}}

