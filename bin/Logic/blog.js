var logger = require('../Helpers/logger'),
	blogModel = require('../Data/BlogModel');

function addPost(title, body, date){
	var instance = new blogModel.Post();
	instance.title = title;
	instance.body = body;
	instance.date = date;
	instance.save(function(err){
		if(err){
			logger.error(err);
		}
	});
}

//TODO: Needs some promise magic
function getAllPosts(){
	blogModel.Post.find({}).exec(function(err, docs)
	{
		if(err){
			logger.error(err);
		}

		if(docs){
			logger.info('Fetched ' + docs.length + ' blog posts');
			return docs;
		}
	});
}

module.exports = {
	addPost : addPost,
	getAllPosts : getAllPosts
};
