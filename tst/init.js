;'use strict';
import { Plannerix3D } from './plannerix.js';

const json = {
	"doors": [
		[
			[
				553,
				697
			],
			[
				553,
				690
			],
			[
				638,
				690
			],
			[
				638,
				696
			],
			[
				553,
				697
			]
		],
		[
			[
				934,
				663
			],
			[
				933,
				578
			],
			[
				939,
				578
			],
			[
				940,
				663
			],
			[
				934,
				663
			]
		],
		[
			[
				456,
				646
			],
			[
				457,
				561
			],
			[
				462,
				561
			],
			[
				462,
				646
			],
			[
				456,
				646
			]
		],
		[
			[
				787,
				547
			],
			[
				787,
				555
			],
			[
				693,
				556
			],
			[
				693,
				549
			],
			[
				787,
				547
			]
		],
		[
			[
				897,
				547
			],
			[
				897,
				555
			],
			[
				803,
				555
			],
			[
				803,
				549
			],
			[
				897,
				547
			]
		]
	],
	"rooms": [
		{
			"area": 19.67,
			"type": "kitchen",
			"points": [
				[
					455,
					161
				],
				[
					456,
					817
				],
				[
					106,
					817
				],
				[
					105,
					162
				]
			],
			"objects": [
				[
					"plate",
					[
						242,
						782
					]
				],
				[
					"sink",
					[
						405,
						784
					]
				]
			]
		},
		{
			"area": 10.9,
			"type": "hall",
			"points": [
				[
					792,
					547
				],
				[
					463,
					549
				],
				[
					463,
					162
				],
				[
					792,
					161
				]
			],
			"objects": []
		},
		{
			"area": 9.86,
			"type": "bedroom",
			"points": [
				[
					799,
					549
				],
				[
					799,
					162
				],
				[
					1127,
					161
				],
				[
					1127,
					487
				],
				[
					934,
					487
				],
				[
					934,
					547
				]
			],
			"objects": []
		},
		{
			"area": 8.41,
			"type": "corridor",
			"points": [
				[
					462,
					556
				],
				[
					933,
					555
				],
				[
					934,
					816
				],
				[
					656,
					818
				],
				[
					656,
					697
				],
				[
					721,
					697
				],
				[
					721,
					690
				],
				[
					463,
					690
				]
			],
			"objects": []
		},
		{
			"area": 4.14,
			"type": "bathroom",
			"points": [
				[
					939,
					497
				],
				[
					1127,
					496
				],
				[
					1127,
					754
				],
				[
					940,
					754
				]
			],
			"objects": [
				[
					"sink",
					[
						1092,
						621
					]
				],
				[
					"toilet",
					[
						1002,
						701
					]
				],
				[
					"bath",
					[
						1026,
						529
					]
				]
			]
		},
		{
			"area": 1.91,
			"type": "wc",
			"points": [
				[
					648,
					696
				],
				[
					648,
					817
				],
				[
					463,
					817
				],
				[
					463,
					697
				]
			],
			"objects": [
				[
					"toilet",
					[
						517,
						757
					]
				],
				[
					"sink",
					[
						604,
						782
					]
				]
			]
		}
	],
	"windows": [
		[
			[
				67,
				707
			],
			[
				67,
				544
			],
			[
				106,
				544
			],
			[
				106,
				707
			]
		],
		[
			[
				848,
				162
			],
			[
				848,
				121
			],
			[
				1049,
				120
			],
			[
				1049,
				161
			]
		],
		[
			[
				509,
				162
			],
			[
				509,
				121
			],
			[
				714,
				120
			],
			[
				714,
				161
			]
		],
		[
			[
				378,
				162
			],
			[
				173,
				162
			],
			[
				173,
				120
			],
			[
				378,
				120
			]
		]
	],
	"total_area": 54.9,
	"meta_objects": {
		"Bath": 1,
		"Sink": 3,
		"Plate": 1,
		"Toilet": 2
	},
	"number_rooms": 2,
	"entrance_doors": [
		[
			[
				817,
				834
			],
			[
				817,
				818
			],
			[
				934,
				816
			],
			[
				924,
				834
			]
		]
	],
	"external_walls": [
		[
			67,
			120
		],
		[
			67,
			834
		],
		[
			951,
			834
		],
		[
			951,
			775
		],
		[
			952,
			774
		],
		[
			1044,
			774
		],
		[
			1045,
			773
		],
		[
			1138,
			773
		],
		[
			1138,
			447
		],
		[
			1137,
			446
		],
		[
			1137,
			120
		],
		[
			949,
			120
		],
		[
			948,
			121
		],
		[
			848,
			121
		],
		[
			847,
			122
		],
		[
			816,
			122
		],
		[
			815,
			121
		],
		[
			748,
			121
		],
		[
			747,
			120
		],
		[
			612,
			120
		],
		[
			611,
			121
		],
		[
			509,
			121
		],
		[
			508,
			122
		],
		[
			478,
			122
		],
		[
			477,
			121
		],
		[
			412,
			121
		],
		[
			411,
			120
		]
	]
};
window.App3D = new Plannerix3D(json);

/*let texturesPathJson = 'https://ai.plannerix.com/result/82/';

fetch(texturesPathJson)
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		console.log(data);
	});*/


/*	console.warn("Project loading");
	$.ajax({
		type: 'POST',
		url: texturesPathJson,
		data: "",
		cache: false,
		contentType: "application/json",
		dataType: "json",
		success: function(result) {
			console.warn("Project loaded");
			console.log( JSON.parse(result.data) )
			//window.App3D = new Remplanner3D(config);
		},
		error: function(errMsg) {
			console.log(errMsg);
		}
	});*/
