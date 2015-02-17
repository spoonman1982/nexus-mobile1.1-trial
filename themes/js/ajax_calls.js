
/* Application Methods*/

var App = (function(){
	var db = LocalStorage;
	
	function initialize(){
		readingsListView = new ListView("ul#kwh_readings");
		bindEvents();
		populateReadingsList(getReadingsFromLocalStorage());
		this.getReadings = getReadingsFromLocalStorage ;
		this.sync = sync;
		this.clear = clear,
	}

    function bindEvents() {
        $("a#sync").on('click',sync);
        $("a#clear").on('click',clear);        
    }

    function populateReadingsList(readings) {
        readingsListView.refreshList(readings);
    }
	
    function getReadingsFromLocalStorage() {
        return JSON.parse(db.getItem("readings")) || [];
    }
		
	function clear(){
		restLocalStorage();
		populateReadingsList(getReadingsFromLocalStorage());
	}
	
	function sync(){
		url = "http://localhost:8000/monthlyreadingslist/";
		$.getJSON(url, function(readings){
			storeReadingsInLocalStorage(readings);
			populateReadingsList(readings);
		});
	}

 	function resetLocalStorage() {
        db.setItem("readings", JSON.stringify({ readings: [] }));
    }
	
    function storeReadingsInLocalStorage(readings) {
    	db.setItem("readings", JSON.stringify(readings));
    };
	
	
	return{
		initialize:initialize,
	}

})();

/* DOM Methods*/

var ListView = function(el){
	this.el = $(el);
};
	
ListView.prototype.refreshList = function(items){
	this.el.html('');
	this.el.hide();
	this.addItems(items);
	this.el.fadeIn('slow');
}

	
ListView.prototype.addItems = function(items){
	$.each(items, proxy(function(i, item)){
		this.addItem(item);	
	}, this}}

ListView.prototype.addItem = function(item){
		this.el.append($("</li>").html(item.cost));	
	}

