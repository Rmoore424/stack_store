'use strict';
var async =  require('async'),
	mongoose = require('mongoose');

require("./");
var Vacation = mongoose.model('Vacation');
var Category = mongoose.model('Category');

var vacations = [ 
	{name: "The Holodeck",
	description: "Too many places you'd like to visit? Why not visit them all with only one vacation?",
	price: 5000,
	category: "Otherworldly",
	imageUrl: "http://www.thescrib.com/wp-content/uploads/2013/04/holodeck.jpg"
	},
	{name: 'Biking in the French Alps',
	description: 'Cycle the most famous climbs in the Tour de France, on our 9-day adventure which spans the French Pyrenees, Mont Ventoux and the Alps.',
	price: 5000, 
	category: 'Adventure',
	imageUrl: 'http://cycleventoux.com/wp-content/uploads/2012/07/IMG_08971.jpg'
	},
	{name: 'Rafting down the Colorado River',
	description: 'Spend a full day white water rafting down the beautiful Colorado River. Complete with a hot picnic lunch!',
	price: 1000,
	category: 'Adventure',
	imageUrl: 'http://www.coloradowhitewaterrafting.com/img/hero/three.jpg'
	},
	{name: 'Discover Patagonia',
	description: 'Bring your backpack and your hiking boots for this 49 day trip starting from Chile’s modern metropolis into the beautiful lake districts of Chile and Argentina before passing into remote and windy Patagonia to the world’s largest glacier and most southerly town.',
	price: 10000,
	category: 'Adventure',
	imageUrl: 'http://upload.wikimedia.org/wikipedia/commons/4/49/Cuernos_del_Paine_from_Lake_Peho%C3%A9.jpg'
	},
	{name: 'Under the Sea',
	description: 'Darling it\'s better down where it\'s wetter. Take it from me. ',
	price: 500,
	category: 'Otherworldly',
	imageUrl: 'http://www.pageresource.com/wallpapers/wallpaper/under-the-sea-clown-fish-unique-nature_602139.jpg'
	},
	{name: 'Narnia',
	description: 'Have fun hanging out with fauns, centaurs, and talking animals. Come to witness the wisdom of Aslan and the other one-fantasy creatures of the world in the wardrobe.',
	price: 2000,
	category: 'Fictional', 
	imageUrl: 'http://1.bp.blogspot.com/_H02IGl5vXq0/TO8V8QOrsGI/AAAAAAAAGBA/qp45QO4Wv7A/s1600/IMG_3258.JPG'
	},
	{name: 'Middle-Earth',
	description: 'Looking for a magical ring that could give you ultimate power? This is the vacation for you!',
	price: 2500,
	category: 'Fictional',
	imageUrl: 'http://thesevensees.com/wp-content/uploads/2012/12/Hobbit_Bilbo-Gandalf-at-Bag-End.jpg'
	},
	{name: 'Jurassic Park',
	description: 'Dinosaurs!!',
	price: 2500,
	category: 'Fictional',
	imageUrl: 'http://www.wallpaperup.com/uploads/wallpapers/2014/03/07/289297/244e2b0a46048d2c70baac5ae51fa54f.jpg'
	},
	{name: 'Wild West',
	description: 'Visit the local saloon, head out on a cattle drive, maybe even rob a stagecoach or two.', 
	price: 2500,
	category: 'Time Travel',
	imageUrl: 'http://cdn2.getyourguide.com/img/tour_img-137187-48.jpg'
	},
	{name: 'Medieval England',
	description: 'If you enjoy the Renaissance Faire you\'ll really love this vacation',
	price: 250,
	category: 'Time Travel',
	imageUrl: 'http://www.medart.pitt.edu/image/England/Caernarvon/Castle/Caern-Cas-003-b.jpg'
	}	
];

var bluebird = require('bluebird');
var mongoose = require('mongoose');

var seed = function (name, description, price, category, imageUrl) {
	var parentCategory;
	var foundCategory = Category.findOne({name:category}).exec();
	// console.log(foundCategory);
	Category.findOne({name:category}).exec(function (err, category) {
		if (err) next(err);
		// console.log(category);
	})
	.then(function(category) {
		parentCategory=category;
		// console.log(parentCategory);
		return Vacation.create({
			name: name,
			description: description,
			price: price,
			category: parentCategory._id,
			imageUrl: imageUrl
		});
	});
};

vacations.forEach(function (vacation) {
	var name = vacation.name,
		description = vacation.description,
		price = vacation.price,
		category = vacation.category,
		imageUrl = vacation.imageUrl;

		seed(name, description, price, category, imageUrl);
});

