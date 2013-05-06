steal('can/control/view',
	  'can/view/ejs',
	  'jquerypp/dom/form_params',
	  'jquerypp/event/key',
	  './create.css',
function(){

/**
 * @class Jupiter.Create
 */
can.Control('bitovi.Create',
/* @Static */
{
	defaults : {
		model : null,
		insertInto : null,
		form: null
	}
},
/* @Prototype */
{
	init : function(){
		this.element.html(this.view());
		this.forms = $([]);
	},
	'.createbutton click': function(){
		var form = $(can.view(this.options.form, {})).prependTo(this.options.insertInto);
		this.forms = this.forms.add(form);
		this.element.hide();
	},

	"{insertInto} form keyup": function(el, ev){
		if(ev.keyName() == "\r"){ // user hit enter
			this.options.insertInto.find("form").submit();
		}
	},

	"{insertInto} form submit": function(el, ev){
		ev.preventDefault();
		var params = el.formParams();
		var item = new this.options.model(params);
		item.save();
		this.forms.remove();
		this.forms = $([]);
		this.element.show();
	}
})

});