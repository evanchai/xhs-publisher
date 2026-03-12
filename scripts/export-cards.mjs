#!/usr/bin/env node
/**
 * Export each .card from an HTML file as a high-res PNG (3x).
 * Usage: npx puppeteer browsers install chrome && node scripts/export-cards.mjs
 */
import puppeteer from 'puppeteer'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const htmlPath = path.resolve(__dirname, '../reference/raspi-tutorial-handbook.html')
const outDir = path.resolve(__dirname, '../output')

const SCALE = 3 // 3x for crisp XHS images (1170×1659)

;(async () => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  // Set viewport to ensure cards render at correct size
  await page.setViewport({ width: 1200, height: 900, deviceScaleFactor: SCALE })

  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0', timeout: 30000 })

  // Wait for fonts to load
  await page.evaluate(() => document.fonts.ready)

  const cards = await page.$$('.card')
  console.log(`Found ${cards.length} cards`)

  for (let i = 0; i < cards.length; i++) {
    const filename = path.join(outDir, `raspi-${String(i + 1).padStart(2, '0')}.png`)
    await cards[i].screenshot({ path: filename, type: 'png' })
    console.log(`✓ ${filename}`)
  }

  await browser.close()
  console.log(`\nDone! ${cards.length} images saved to output/`)
})()
