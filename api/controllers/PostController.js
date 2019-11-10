const Post = require('../models/Post');
const Tag = require('../models/Tag');
const User = require('../models/User');
const Sequelize = require('sequelize');

const PostController = () => {
		const create = async (req, res) => {
			const AuthenticatedUserId = req.token.id;
			const {body} = req;
			try {

				const tags = body.tags.map(tag => Tag.findOrCreate({where: {name: tag}, defaults: {name: tag}})
					.spread((tag, created) => tag['dataValues']['id']));

				// const users = body.mentioned_users.map(userName => User.findAll({
				// 	where: {userName: userName},
				// 	defaults: {userName: userName}
				// })
				// 	.spread((userName, created) => {
				//
				// 		userName['dataValues']['id']
				// 	}));
				//
				// Promise.all(users).then(function (results) {
				// 	console.log(results)
				// });
				// return;
				//we find the user even we if we have the userID from TOKEN
				//as if we changed the userId of the user or we deleted him
				//while his token stay alive
				User.findByPk(AuthenticatedUserId)
					.then(() => Post.create({
						content: body.content,
						UserId: AuthenticatedUserId
					}))
					.then(post => Promise.all(tags)
						.then(storedTags => {
							post.addHashTagged(storedTags)
						}).then(() => post))
					.then(post => Post.findOne({
						where: {id: post['dataValues']['id']},
						include: [User, {model: Tag, as: 'HashTagged'}]
					}))
					.then(postWithAssociations => res.json(postWithAssociations))
					.catch(err => res.status(400).json({err: `User with id = [${AuthenticatedUserId}] doesn\'t exist. ${err}`}))
			} catch
				(err) {
				console.log(err);
				return res.status(500).json({msg: 'Internal server error'});
			}
		};

		const getPostsByHashtag = async (req, res) => {
			try {
				const {body} = req;

				const posts = await Post.findAll({
					include: [
						{model: Tag, as: 'HashTagged', where: {name: {[Sequelize.Op.in]: body.hashtags}}}
					]
				});

				return res.status(200).json({posts});
			} catch (err) {
				console.log(err);
				return res.status(500).json({msg: 'Internal server error'});
			}
		};

		const mostRecentPosts = async (req, res) => {
			try {

				const userPosts = await Post.findAll({
					order: [['createdAt', 'DESC']],
				});

				return res.status(200).json({userPosts});
			} catch (err) {
				console.log(err);
				return res.status(500).json({msg: 'Internal server error'});
			}
		};

		return {
			create,
			getPostsByHashtag,
			mostRecentPosts
		};
	}
;

module.exports = PostController;
