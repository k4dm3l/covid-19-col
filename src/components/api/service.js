'use strict'

const caseModel = require('../integrationINS/model');

const top5Covid19Departments = () => {
  return caseModel.aggregate([
    {
			$group: {
				_id: {
					city: '$departamento'		
				},
				count: {
					$sum: 1
				}	
			}
		},
		{
			$project: {
				_id: 0,
				department: '$$ROOT._id.city',
				count: '$$ROOT.count'
			}
		},
		{
			$sort: {
				count: -1
			}
		},
		{
			$limit: 5
		}
  ])
  .exec();
};

const countCovid19MaleFemale = () => {
  return caseModel.aggregate([
		{
			$group: {
				_id: {
					sex: '$sexo'
				},
				count: {
					$sum: 1
				}
			}
		},
		{
			$project: {
				_id: 0,
				sex: '$$ROOT._id.sex',
				count: '$$ROOT.count'
			}
    },
    {
			$sort: {
				sex: 1
			}
		}
  ])
  .exec();
};

const countCovid19RecoveryTypes = () => {
  return caseModel.aggregate([
		{
			$group: {
				_id: {
					recovery: '$tipo_recuperaci_n'
				},
				count: {
					$sum: 1
				}
			}
		},
		{
			$project: {
				_id: 0,
				recovery: '$$ROOT._id.recovery',
				count: '$$ROOT.count'
			}
    },
    {
			$sort: {
				recovery: 1
			}
		}
  ])
  .exec();
};

const countCovid19CasesByStatus = () => {
  return caseModel.aggregate([
		{
			$group: {
				_id: {
					status: '$estado'
				},
				count: {
					$sum: 1
				}
			}
		},
		{
			$project: {
				_id: 0,
				status: '$$ROOT._id.status',
				count: '$$ROOT.count'
			}
		},
		{
			$sort: {
				status: 1
			}
		}
  ])
  .exec();
};

const countCovid19CasesByRangeAge = () => {
  return caseModel.aggregate([
    {
      $group: {    
        _id: {
           $concat: [
              { $cond: [{$lte: ["$edad",0]}, "Less or Equal 0", ""]}, 
              { $cond: [{$and:[ {$gt:["$edad", 0 ]}, {$lt: ["$edad", 18]}]}, "1-18", ""] },
              { $cond: [{$and:[ {$gte:["$edad",18]}, {$lt:["$edad", 25]}]}, "18-24", ""]},
              { $cond: [{$and:[ {$gte:["$edad",25]}, {$lt:["$edad", 31]}]}, "25-30", ""]},
              { $cond: [{$and:[ {$gte:["$edad",31]}, {$lt:["$edad", 41]}]}, "31-40", ""]},
              { $cond: [{$and:[ {$gte:["$edad",41]}, {$lt:["$edad", 51]}]}, "41-50", ""]},
              { $cond: [{$gte:["$edad",51]}, "Over 50", ""]}
           ]
        },
              count: { $sum: 1 }
      }    
    }
  ])
  .exec();
};

const countCovid19CasesByAtention = () => {
	return caseModel.aggregate([
    {
      $group: {
				_id: {
					atention: '$atenci_n'
				},
				count: {
					$sum: 1
				}
			}
    },
    {
    	$project: {
				_id: 0,
				atention: '$$ROOT._id.atention',
				count: '$$ROOT.count'
			}
		},
		{
			$sort: {
				atention: -1
			}
		}
	])
	.exec();
};

const getLastUpdateBD = () => {
	return caseModel.find({}, {
		_id: 0,
		updatedAt: 1
	})
	.sort({ updatedAt: -1 })
	.limit(1)
	.lean()
	.exec();
};

const getCountCases = () => {
	return caseModel.estimatedDocumentCount();
};

module.exports = {
  top5Covid19Departments,
  countCovid19MaleFemale,
  countCovid19RecoveryTypes,
  countCovid19CasesByStatus,
	countCovid19CasesByRangeAge,
	countCovid19CasesByAtention,
	getLastUpdateBD,
	getCountCases
};