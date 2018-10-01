<section class="content-main">
	
	<div class="page_header margin_bottom">
		<h1>{{page_item.name}}</h1>
	</div>
	
	<div class="become-box">
		<div class="presentation_page">
			{{#each pr_array}}
			<div class="pr_item hide_">
				<div class="content">
					<a name="pr_{{id}}"></a>
					<div class="header">
						<img class="icon"  src="{{icon_black}}"/>
						<div class="title">{{name}}</div>
					</div>
					<div class="text">{{{text}}}</div>
				</div>
				{{#if image_array}}
				<div class="image_list" id="image_list_{{id}}">
					<div class="inner">
					{{#each image_array}}
					<a href="{{image}}">
						<img src="/img/iResize.php?size=125&bg=ffffff&img={{image}}" />
					</a>
					{{/each}}
					</div>
					<div class="panel hide">
						<div class="p_inner">
							<div class="text">Всего 9 изображений</div>
							<div onmousedown="return false" onselectstart="return false" class="prev" onclick="p_obj.clickPrev({{id}});"></div>
							<div onmousedown="return false" onselectstart="return false" class="next" onclick="p_obj.clickNext({{id}});"></div>
						</div>
					</div>
				</div>
				{{/if}}
			</div>
			{{/each}}
		</div>
	</div>
</section>
<script>
	function pageClass(){
		{// Инициализация
			var self = this;
			//this.script_url = m_obj.script_url;	// урл респондента
			
		}//END Инициализация
		this.init = function(){
			this.initImage();
			//return;
			
			jQuery.each($('.pr_item .image_list'), function() {
				$(this).find('A').lightBox();	// подключаем lightbox для картинок
			});
			
			jQuery.each($('.presentation_page .pr_item .content .text'), function() {
				var height=$(this).height();
				//console.log('height='+height)
				if(height<160){
					$(this).height(height);
					$(this).css({'padding-right':10});
				}
				else{
					$(this).height(160);
					$(this).scrollbars();
					$(this).find('.scrollblock').after('<div class="scrollblock_bg"></div>');
				}
			});
			/*
			$('.pr_item .text').scrollbars();
			$('.scrollblock').after('<div class="scrollblock_bg"></div>');
			*/
			
			
		}//END init
		
		{// картинки
				this.image_block={};
				//this.image_panel=1;
				//this.image_panel_max=0;// всего картинок в сете
				this.initImage = function(){
					jQuery.each($('.image_list'), function() {
						
						//console.log(this)
						var img_total=$(this).find('A').length;
						//console.log('img_total='+img_total)
						if(img_total>5){
							$(this).find('.panel .text').html('Всего '+img_total+' изображений');
							$(this).find('.panel').show();
							
							
						}
						else{
							$(this).find('.panel').hide();
							return;
						}
						
						var id=$(this).attr('id').substr(11);
						self.image_block[id]={};
						
						var p_nomber=1;
						var total=0;
						$(this).find('A').each(function(){
							//console.log(this)
							if(total==5){
								total=0;
								p_nomber++;
								//self.image_panel_max=p_nomber;
								self.image_block[id].max=p_nomber;
								
							}
							total++;
							//console.log(this);
							
							$(this).attr('panel_nomber',p_nomber);
							
							
						});
						
						if(img_total>5){
							self.image_block[id].panel=1;
							self.clickAction(id);
						}
					});
					return;
				}//END 
				this.clickNext = function(id){
					//console.log('next')
					//this.image_panel++;
					this.image_block[id].panel++
					//if(this.image_panel>this.image_panel_max){
					//if(this.image_block[id].panel>this.image_panel_max){
					if(this.image_block[id].panel>self.image_block[id].max){
						//this.image_panel=1;
						this.image_block[id].panel=1;
					}
					this.clickAction(id);
				}
				this.clickPrev = function(id){
					//console.log('id='+id)
					//console.log('clickPrev')
					//this.image_panel--;
					this.image_panel--;
					this.image_block[id].panel--;
					//if(this.image_panel<=0){
					if(this.image_block[id].panel<=0){
						//this.image_panel=this.image_panel_max;
						//this.image_block[id].panel=this.image_panel_max;
						this.image_block[id].panel=self.image_block[id].max;
					}
					this.clickAction(id);
				}
				this.clickAction = function(id){
					//console.log('id='+id);
					
					$('#image_list_'+id+' A').removeClass('current');
					$('#image_list_'+id+' A').hide();
					$('#image_list_'+id+' A[panel_nomber='+this.image_block[id].panel+']').show();
					
					// отключено т.к. вызывает открытие lightbox
					//$('#image_list_'+id+' A[panel_nomber='+this.image_panel+']:eq(0)').trigger('click');
					$('#image_list_'+id+' A[panel_nomber='+this.image_block[id].panel+']:eq(0)').addClass('current');
					
					
					
					//$('#container .right-box .tabs LI').removeClass('current');
					//$('#container .right-box .tabs LI').hide();
					//$('#container .right-box .tabs LI[panel_nomber='+this.image_panel+']').show();
					//$('#container .right-box .tabs LI[panel_nomber='+this.image_panel+']:eq(0)').trigger('click');
					//$('#container .right-box .tabs LI[panel_nomber='+this.image_panel+']:eq(0)').addClass('current');
				}
				
			}// картинки
		
	}//END pageClass p_obj
	$(function(){
		p_obj = new pageClass();
		p_obj.init();
	});
</script>