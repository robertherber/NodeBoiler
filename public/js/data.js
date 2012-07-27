var Data = {
	Models : {
		BlogPost : Backbone.Model.extend({
			initialize : function(){
				/*this.view = new Views.BlogPost({template: Templates.BlogPost, data: this });*/
			}
		}),
		BlogPostCollection : Backbone.Collection.extend({
			initialize: function(){
				this.model = Data.Models.BlogPost;
				this.on('add', function(item){
					var uid = item.get('uid');
					if(!uid){
						var blogPost =  item.toJSON();
						blogPost.cid = item.cid;
						socket.data.add('blogPosts', blogPost);
					}
				});
				this.on('remove', function(item){
					socket.data.remove('blogPosts', item.toJSON());
				});
				this.on('change', function(item){
					if(item.get('uid')){
						socket.data.change('blogPosts', item.toJSON());
					}
				});
			}
		})
	},
	init : function(){
		Data.blogPosts = new Data.Models.BlogPostCollection();
		//Data.blogPosts.add(new Data.Models.BlogPost({'title' : 'First item'}));
		socket.data.onAdd = function(collectionName, data){
			var collection = Data[collectionName];
			treatIndividually(data, function(data){
				collection.add(new collection.model(data));
			});
		};
		socket.data.onRemove = function(collectionName, data){
			var collection = Data[collectionName];
			treatIndividually(data, function(data){
				var element = collection.filter(function(item){ return item.get('uid') == data.uid;})[0];
				collection.remove(element);
			});
		};
		socket.data.onChange = function(collectionName, data){
			var collection = Data[collectionName];
			treatIndividually(data, function(data){
				//var element = collection.at(collection._byCid[data.cid] || collection.indexOf(data.uid));
				var element = collection._byCid[data.cid] || collection.filter(function(item){ return item.get('uid') == data.uid;})[0];
				element.set(data);
			});
		};
	}
};

var treatIndividually = function(data, callback){
	if(data instanceof Array){
		_.each(data, callback);
	}
	else{
		callback(data);
	}
};

Data.init();
