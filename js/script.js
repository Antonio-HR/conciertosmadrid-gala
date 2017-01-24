var area;
	function main() {
		cartodb.createVis('mapa', 'https://antonio-hr.carto.com/api/v2/viz/292c2bca-8989-11e6-9b62-0e233c30368f/viz.json',{
    		zoom: 12
		})//
		.done(function(vis, layers) {
		    // layer 0 is the base layer, layer 1 is cartodb layer
		    // when setInteraction is disabled featureOver is triggered
			var subLayer = layers[1].getSubLayer(0);
			createSelector(subLayer);

		})
		.error(function(err){
			console.log(err);
		});
		function createSelector(layer){
		var sql = new cartodb.SQL({user:'antonio-hr'});
		var option = $('#selector li');
		var query = '';
		option.click(function(e){
			var $li = $(e.target);
			area = $li.attr('data');
			option.removeClass('selected');
			$li.addClass('selected');
			if (area === 'todos') {
				var query = "SELECT * FROM dataset_final_carto";
			}else{
				query = "SELECT * FROM dataset_final_carto WHERE genero_mas_representativo ='"+area+"'";
			}
			layer.setSQL(query); 
			
		});
	}
		
	}	// 

	window.onload = main;