/** background-move version 0.2
 *
 * Powered By JaeHo Song thruthesky@gmail.com
 * Open source code under GPL.
 */
(function($) {
	$.fn.move = function( options )
	{
		var defaults = {
			'selectOnLoad' : true,
			'selectNo': 1,
			'speed': 700,
			'easing' : 'swing'
		};
		var timer_interval = null;
		var o =$.extend( defaults, options );
		var $this = $(this);
		$this.append("<div class='background'></div>");
		var $background = $this.find('.background');
		$this.css('position', 'relative').css('z-index', '999');
		
		selectOnLoad();
		
		function selectOnLoad()
		{
			if ( o.selectOnLoad ) {
				display( o.selectNo );
			}
			else {
				$background.css('display', 'none');
			}
		}
		
		function menu_attr( n ) {
			var menu = $this.find(".menu:eq(" + n + ")");
			var width = menu.width();
			var height = menu.height();
			var p = menu.position();
			return {
					'top'			:		p.top + 'px',
					'left'			:		p.left + 'px',
					'width'		:		width,
					'height'	:		height
			};
		}
		function display( n )
		{
			$background.css('display', 'block');
			$background.css( menu_attr( n ) );
		}
		function trans( n ) {
			$background.css('display', 'block');
			$background.animate(
				menu_attr( n ) ,
				o.speed,
				o.easing,
				function() {
					// callback
				}
			);
		}
		
		
		/* Hover on menu. Begin background transition */
		$('.menus .menu').mouseenter(function(){
			var n = $(this).index();
			
			if ( timer_interval ) clearTimeout(timer_interval);
			timer_interval = setTimeout( function () {
					trans(n);
				},
				200
			);
		});
		
		/* If mouse out, then set background to the menu selected on load : 마우스가 밖으로 나가면 처음 선택 위치로 돌아감 */
		$(this).mouseleave(function(){
			if ( o.selectOnLoad ) {
				trans( o.selectNo );
			}
		});
		
	}
}) (jQuery);
