const env                     = require('dotenv').config()
const path                    = require('path')
const htmlStandards           = require('reshape-standard')
const cssStandards            = require('spike-css-standards')
const jsStandards             = require('spike-js-standards')
const pageId                  = require('spike-page-id')
const sugarml                 = require('sugarml')
const sugarss                 = require('sugarss')
const df                      = require('dateformat')
const fn                      = require('format-num')
const SpikeDatoCMS            = require('spike-datocms')

const locals                  = { }

const datos = new SpikeDatoCMS({
  addDataTo: locals,
  token: process.env.dato_api_key,
  models: [
    {
      name: 'home_page',
      template: {
        path: 'views/index.sgr',
        output: (page) => { return `/index.html` }
      }
    },
  {
    name: 'person'
  },
  {
    name: 'client'
  },
  {
    name: 'project',
    transform: (data) => {
      if (data.date) {
        dateHours = new Date(data.date)
        data.date = dateHours.setUTCHours(5)
      }
      return data
    }
  },
  {
    name: 'quote'
  },
  {
    name: 'service'
  }
]
})

module.exports = {
  devtool: 'source-map',
  matchers: { html: '*(**/)*.sgr', css: '*(**/)*.css' },
  ignore: [ '**/_layout.sgr', '**/layout.sgr', '**/.*', 'readme.md', 'yarn.lock', 'custom_modules/**', 'views/includes/**' ],
  reshape: htmlStandards ({
    parser: sugarml,
    locals: (ctx) => { return Object.assign(locals,
      { pageId: pageId(ctx) },
      { df: df.bind(df) },
      { fn: fn.bind(fn) }
    )}
  }),
  postcss: cssStandards({
    locals: { datos }
  }),
  babel: jsStandards(),
  plugins: [datos]
}

