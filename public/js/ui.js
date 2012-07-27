var UI = {
	Templates : {
		/*BlogPost : _.template("<article><header><h2><%= title %></h2><p><%= body %></p><p><%= date %></p></article>"),*/
		BlogPost : _.template("<article><header><h2><%= title %></h2><p>body</p><p>date</p></article>"),
		BlogPostCollection : _.template("<ul><% _.each(items, function(item) { %><%= itemTemplate(item) %><% }) %></ul>")
	},
	Views : {
		Collection : Backbone.View.extend({
			render: function(){
				this.el.innerHTML = this.options.template({ items: this.options.data.toJSON(), itemTemplate: this.options.itemTemplate });
				return this;
			},
			initialize : function(){
				var currentView = this;
				this.options.data.on('add', function(item){
					currentView.render();
				});
				this.options.data.on('remove', function(item){
					currentView.render();
				});
				this.options.data.on('change', function(item){
					currentView.render();
				});
			}
		}),
		Item : Backbone.View.extend({
			render: function(){
				this.el.innerHTML = this.options.template(this.options.data.toJSON());
				return this;
			},
			initialize: function(){
				this.options.data.bind('change', this.render);
			}
		})
	},
	init: function(){
		this.blogPostsView = new UI.Views.Collection({
			template: UI.Templates.BlogPostCollection,
			itemTemplate: UI.Templates.BlogPost,
			el: document.querySelector('#articles'),
			data: Data.blogPosts
		});
	}
};

UI.init();
