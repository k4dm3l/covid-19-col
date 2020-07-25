'use strict'

const { 
  top5Covid19Departments,
  countCovid19MaleFemale,
  countCovid19RecoveryTypes,
  countCovid19CasesByStatus,
  countCovid19CasesByRangeAge,
  countCovid19CasesByAtention,
  getCountCases,
  getLastUpdateBD
} = require('./service');

const getDataCovid19 = async (req, res) => {
  const [ 
    top5Departments,
    countMaleFemale,
    countRecoveryType,
    countCasesByStatus,
    countCasesByRangeAge,
    countCasesByAtention,
    countCases,
    getLastUpdateDate
  ] = await Promise.all([
    top5Covid19Departments(),
    countCovid19MaleFemale(),
    countCovid19RecoveryTypes(),
    countCovid19CasesByStatus(),
    countCovid19CasesByRangeAge(),
    countCovid19CasesByAtention(),
    getCountCases(),
    getLastUpdateBD()
  ]);

  res.status(200).render('main', {
    title: 'Covid-19 Data',
    data: { 
      departments: top5Departments,
      sex: countMaleFemale,
      recoveryTypes: countRecoveryType,
      casesByStatus: countCasesByStatus,
      casesByRangeAge: countCasesByRangeAge,
      casesByAtention: countCasesByAtention,
      numberCases: countCases,
      lastUpdate: getLastUpdateDate
    }
  });
};

module.exports = {
  getDataCovid19
};