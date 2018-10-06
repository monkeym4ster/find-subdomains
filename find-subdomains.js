#!/usr/bin/env node

const request = require('superagent')
const url = require('url')
const fs = require('fs')
const path = require('path')
const pkg = require('./package.json')

const getRawResponse = domain => {
  return new Promise((resolve, reject) => {
    request.get(`https://crt.sh/?q=%.${domain}&output=json`)
      .then(res => resolve(res.text))
      .catch(err => {
        if (err.statusCode !== 200) return reject(err)
        return resolve(err.rawResponse)
      })
  })
}

const printBanner = () => {
  const fileData = fs.readFileSync(path.join(__dirname, 'banner.txt'), 'utf8')
  console.log(`${fileData} Version ${pkg.version}\n`)

}

const clearUrl = target => {
  let domain = target
  if (/^(https?:|www\.)/i.test(target)) domain = url.parse(target).hostname || domain
  // domain = domain.replace(/.*www\./i, '') // TODO: not need multiple replace
  return domain
}

;(async () => {
  printBanner()

  if (process.argv.length !== 3) {
    console.log(`usage: find-subdomains DOMAIN`)
    process.exit(1)
  }

  const target = process.argv[2]
  const domain = clearUrl(target)
  
  console.log(`[*] TARGET: ${domain}\n`)

  let response
  try { 
    response = await getRawResponse(domain)
  } catch (err) {
    console.log(`[X] Information not available! (${err.statusCode})`)
    return process.exit(1)
  }

  const jsonData = JSON.parse(`[${response.trim().replace(/}{/g, '},{')}]`)
  const subdomains = Array.from(new Set(jsonData.map(_ => _.name_value)))
  for (const _ of subdomains) console.log(`[+] ${_}`)
  console.log('\n[*]  Done. Have a nice day! ;).')
})()
