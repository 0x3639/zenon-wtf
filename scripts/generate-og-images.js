const { createCanvas } = require('canvas')
const fs = require('fs')
const path = require('path')

// Card data - matches content/cards.ts
const cards = [
  { id: 'welcome', title: 'Welcome to Zenon', subtitle: 'Network of Momentum' },
  { id: 'problem', title: 'The Blockchain Bottleneck', subtitle: 'Why Every Chain Is Slow' },
  { id: 'insight', title: "What If They Didn't Have To?", subtitle: 'A Fundamental Rethinking' },
  { id: 'dual-ledger', title: 'Your Account Is Your Blockchain', subtitle: 'The Dual-Ledger Architecture' },
  { id: 'parallel', title: 'Parallel, Not Sequential', subtitle: 'Everyone Moves at Once' },
  { id: 'feeless', title: 'No Fees. Ever.', subtitle: 'Dynamic Plasma' },
  { id: 'browser', title: 'Run a Node in Your Browser', subtitle: 'Not a Light Client—A Real Peer' },
  { id: 'dfa', title: 'Proof, Not Replay', subtitle: 'Deterministic Fact Acceptance' },
  { id: 'zapps', title: 'Execute Locally, Anchor Globally', subtitle: 'zApps & Client-Side Logic' },
  { id: 'cross-chain', title: 'Connect Without Trusting', subtitle: 'Cross-Chain Verification' },
  { id: 'architecture', title: 'How It All Fits Together', subtitle: 'Sentries → Sentinels → Pillars' },
  { id: 'vision', title: 'The Network of Momentum', subtitle: 'A New Foundation' },
]

const WIDTH = 1200
const HEIGHT = 630

// Zenon colors
const COLORS = {
  bg: '#0d1117',
  green: '#7fff00',
  text: '#ffffff',
  muted: '#8b949e',
}

function generateOGImage(card) {
  const canvas = createCanvas(WIDTH, HEIGHT)
  const ctx = canvas.getContext('2d')

  // Background
  ctx.fillStyle = COLORS.bg
  ctx.fillRect(0, 0, WIDTH, HEIGHT)

  // Decorative border
  ctx.strokeStyle = COLORS.green
  ctx.lineWidth = 4
  ctx.strokeRect(40, 40, WIDTH - 80, HEIGHT - 80)

  // Corner accents
  const cornerSize = 30
  ctx.fillStyle = COLORS.green
  // Top left
  ctx.fillRect(40, 40, cornerSize, 4)
  ctx.fillRect(40, 40, 4, cornerSize)
  // Top right
  ctx.fillRect(WIDTH - 40 - cornerSize, 40, cornerSize, 4)
  ctx.fillRect(WIDTH - 44, 40, 4, cornerSize)
  // Bottom left
  ctx.fillRect(40, HEIGHT - 44, cornerSize, 4)
  ctx.fillRect(40, HEIGHT - 40 - cornerSize, 4, cornerSize)
  // Bottom right
  ctx.fillRect(WIDTH - 40 - cornerSize, HEIGHT - 44, cornerSize, 4)
  ctx.fillRect(WIDTH - 44, HEIGHT - 40 - cornerSize, 4, cornerSize)

  // Zenon logo/symbol
  ctx.fillStyle = COLORS.green
  ctx.font = 'bold 48px Arial'
  ctx.textAlign = 'left'
  ctx.fillText('◈', 80, 120)

  // "ZENON" text
  ctx.fillStyle = COLORS.green
  ctx.font = 'bold 24px Arial'
  ctx.fillText('ZENON', 140, 115)

  // Subtitle (above title)
  ctx.fillStyle = COLORS.green
  ctx.font = '500 28px Arial'
  ctx.textAlign = 'center'
  ctx.fillText(card.subtitle.toUpperCase(), WIDTH / 2, 280)

  // Title
  ctx.fillStyle = COLORS.text
  ctx.font = 'bold 64px Arial'

  // Word wrap for long titles
  const words = card.title.split(' ')
  let lines = []
  let currentLine = words[0]

  for (let i = 1; i < words.length; i++) {
    const testLine = currentLine + ' ' + words[i]
    const metrics = ctx.measureText(testLine)
    if (metrics.width < WIDTH - 160) {
      currentLine = testLine
    } else {
      lines.push(currentLine)
      currentLine = words[i]
    }
  }
  lines.push(currentLine)

  // Draw title lines
  const lineHeight = 80
  const startY = 370 - ((lines.length - 1) * lineHeight) / 2
  lines.forEach((line, index) => {
    ctx.fillText(line, WIDTH / 2, startY + index * lineHeight)
  })

  // URL at bottom
  ctx.fillStyle = COLORS.muted
  ctx.font = '24px Arial'
  ctx.fillText('zenon.wtf', WIDTH / 2, HEIGHT - 80)

  return canvas.toBuffer('image/png')
}

// Generate all images
const outputDir = path.join(__dirname, '../public/og')

cards.forEach(card => {
  const buffer = generateOGImage(card)
  const filePath = path.join(outputDir, `${card.id}.png`)
  fs.writeFileSync(filePath, buffer)
  console.log(`Generated: ${card.id}.png`)
})

console.log('\nAll OG images generated successfully!')
