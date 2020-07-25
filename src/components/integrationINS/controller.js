'use strict'

const boom = require('@hapi/boom');
const axios = require('axios');

const caseModel = require('./model');

const getINSCovidData = async (req, res) => {
  const result = await axios.get('https://www.datos.gov.co/resource/gt2j-8ykr.json');

  if (!result.data.length) throw boom.badImplementation('No API results');

  for(let reg = 0; reg < result.data.length; reg += 100) {
    const dbQueries = result.data.slice(reg, reg + 100).map(data => {
      data.edad = Number(data.edad);
      return caseModel.findOneAndUpdate(
        { id_de_caso: data.id_de_caso },
        { $set: data },
        { upsert: true }
      )
    });

    await Promise.all(dbQueries);
  }

  res.status(200).json({ message: 'Success', data: `${result.data.length} rows updated/inserted on our DB` });
};

module.exports = {
  getINSCovidData
};