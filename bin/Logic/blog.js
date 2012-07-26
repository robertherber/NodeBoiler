var logger = require('../Helpers/logger'),
	blogModel = require('../Data/BlogModel');

function addPost(title){
	var instance = new blogModel.Post();
	instance.title = title;
	instance.save(function(err){
		if(err){
			logger.error(err);
		}
	});
}

function getAllPosts(){
	blogModel.Post.find({}, function(err, docs)
	{
		if(err){
			logger.error(err);
		}

		if(docs){
			logger.info('Fetched ' + docs.length + ' blog posts');
		}
	});
}

module.exports = {
	addPost : addPost,
	getAllPosts : getAllPosts
};
