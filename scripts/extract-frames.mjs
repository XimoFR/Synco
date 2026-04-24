import { execSync } from 'child_process'
import { existsSync, mkdirSync } from 'fs'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const ffmpegPath = require('ffmpeg-static')

const INPUT   = 'public/videos/SyncoAnim.mp4'
const OUTPUT  = 'public/frames'
const FPS     = 30

if (!existsSync(OUTPUT)) mkdirSync(OUTPUT, { recursive: true })

// Get video info
const probeCmd = `"${ffmpegPath}" -i "${INPUT}" 2>&1`
let info = ''
try { execSync(probeCmd) } catch (e) { info = e.stderr?.toString() || e.stdout?.toString() || '' }

console.log('Video info:\n', info.match(/Duration.*\n/)?.[0] ?? 'unknown duration')

// Extract frames
console.log(`Extracting frames at ${FPS}fps...`)
execSync(
  `"${ffmpegPath}" -i "${INPUT}" -vf fps=${FPS} -q:v 3 "${OUTPUT}/frame_%04d.jpg" -y`,
  { stdio: 'inherit' }
)

// Count frames
const { readdirSync } = await import('fs')
const frames = readdirSync(OUTPUT).filter(f => f.endsWith('.jpg'))
console.log(`\nDone — ${frames.length} frames extracted to ${OUTPUT}/`)
console.log(`Total frames: ${frames.length}`)
