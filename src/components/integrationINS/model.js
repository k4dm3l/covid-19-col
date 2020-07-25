'use strict'

const { Schema, model } = require('mongoose');

const CaseSchema = new Schema({
  id_de_caso: String,
  fecha_de_notificaci_n: Date,
  c_digo_divipola: String,
  ciudad_de_ubicaci_n: String,
  departamento: String,
  atenci_n: String,
  edad: String,
  sexo: String,
  tipo: String,
  estado: String,
  pa_s_de_procedencia: String,
  fis: String,
  fecha_diagnostico: Date,
  fecha_recuperado: Date,
  fecha_reporte_web: Date,
  tipo_recuperaci_n: String,
  codigo_departamento: String,
  codigo_pais: String,
  pertenencia_etnica: String
});

module.exports = model('Cases', CaseSchema);