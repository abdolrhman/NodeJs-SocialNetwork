const Post = require('../models/Post');
const Tag = require('../models/Tag');
const User = require('../models/User');
// const mailer = require('../services/mail.service');
const Sequelize = require('sequelize');

const PostController = () => {
		const create = async (req, res) => {
			const AuthenticatedUserId = req.token.id;
			const {body} = req;
			try {


				let ThereAreMentionedUsers = body.mentioned_users && body.mentioned_users.length;
				let ThereAreTags = body.tags && body.tags.length;
				let thereAreMentionedUsersAndTags = ThereAreMentionedUsers && ThereAreTags;

				let tags = [];
				if (ThereAreTags) {
					tags = body.tags.map(tag => Tag.findOrCreate({where: {name: tag}, defaults: {name: tag}})
						.spread((tag, created) => tag['dataValues']['id']));
				}

				if (ThereAreMentionedUsers) {
					let usersIds = [];
					const users = await User.findAll({
						where: {userName: {[Sequelize.Op.in]: body.mentioned_users}}
					});

					users.forEach((user) => {
						usersIds.push(user['dataValues']['id']);
						//mailer not tested yet ...
						// mailer(user)
					});
				}

				const post = Post.create({
					content: body.content,
					UserId: AuthenticatedUserId
				});
				if (thereAreMentionedUsersAndTags) {
					post.then(storedTags => {
						post.addHashTagged(storedTags);
						post.addUserMentioned(usersIds);
					}).then(() => post);
				} else if (ThereAreMentionedUsers) {
					post.then(() => {
						post.addUserMentioned(usersIds);
					}).then(() => post);
				} else if (ThereAreTags) {
					post.then(post => Promise.all(tags)
						.then(storedTags => {
							post.addHashTagged(storedTags);
						}).then(() => post))
				}

				post.then(post => Post.findOne({
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
		const getPostsByTag = async (req, res) => {
			try {
				const posts = await Post.findAll({
					include: [
						{model: Tag, as: 'HashTagged', where: {name: req.params.tag}}
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
			mostRecentPosts,
			getPostsBytag: getPostsByTag
		};
	}
;

module.exports = PostController;
