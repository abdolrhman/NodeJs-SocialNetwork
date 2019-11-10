const axios = require('axios');

const GOTController = () => {
	const mainGOTURL = 'https://api.got.show';
	//get all ages
	const allAges = async (req, res) => {
		try {
			const allAges = await axios.get(`${mainGOTURL}/api/book/ages/`);
			const data = allAges['data'];
			return res.status(200).json(data);
		} catch (err) {
			console.log(err);
			return res.status(500).json({msg: 'Internal server error', err});
		}
	};

	// AgeShow - Get ages by name
	const ageByName = async (req, res) => {
		try {
			const allAges = await axios.get(`${mainGOTURL}/api/show/ages/${req.params.name}`);
			const data = allAges['data'];
			return res.status(200).json(data);
		} catch (err) {
			console.log(err);
			return res.status(500).json({msg: 'Internal server error', err});
		}
	};


	//etc
	//fun never end.. lots of API @_@

	return {
		allAges,
		ageByName
	};
};

module.exports = GOTController;