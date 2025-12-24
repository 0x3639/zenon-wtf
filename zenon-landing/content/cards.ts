export interface CardData {
  id: string
  title: string
  subtitle: string
  description: string
  keyPoints: string[]
  repoPath: string
  gitbookPath: string
  icon: string
  videoEmbed?: string
  bgColor?: string
}

export const cards: CardData[] = [
  // Card 1: Video
  {
    id: 'welcome',
    title: 'Welcome to Zenon',
    subtitle: 'Network of Momentum',
    description: '',
    keyPoints: [],
    repoPath: 'README.md',
    gitbookPath: '',
    icon: '◈',
    videoEmbed: 'https://player.vimeo.com/video/1149191553?h=3714720383',
    bgColor: '#000001',
  },

  // Card 2: The Problem
  {
    id: 'problem',
    title: 'The Blockchain Bottleneck',
    subtitle: 'Why Every Chain Is Slow',
    description:
      'On Ethereum, 10,000 computers run the same code for every transaction. That\'s like asking every employee in a company to do the same task. Wasteful, slow, and expensive.',
    keyPoints: [
      'Every validator re-executes every transaction',
      'You pay fees because validators charge for their work',
      'The more users, the slower it gets',
    ],
    repoPath: 'README.md',
    gitbookPath: '',
    icon: '⚠️',
  },

  // Card 3: The Insight
  {
    id: 'insight',
    title: 'What If They Didn\'t Have To?',
    subtitle: 'A Fundamental Rethinking',
    description:
      'What if validators only checked that your answer was correct without redoing all the math? That\'s the insight behind Zenon.',
    keyPoints: [
      'You do the work on your device',
      'The network only verifies the result',
      'No redundant computation',
    ],
    repoPath: 'docs/research/taxonomy-deterministic-fact-acceptance.md',
    gitbookPath: 'research/taxonomy-deterministic-fact-acceptance',
    icon: '💡',
  },

  // Card 4: The Solution
  {
    id: 'dual-ledger',
    title: 'Your Account Is Your Blockchain',
    subtitle: 'The Dual-Ledger Architecture',
    description:
      'In Zenon, every user has their own mini-blockchain in your browser. Your transactions don\'t compete with anyone else\'s. It\'s like having your own lane on the highway.',
    keyPoints: [
      'Account-chains: Your personal ledger',
      'Momentums: The global timestamp',
      'True parallelism—no traffic jams',
    ],
    repoPath: 'docs/architecture/architecture-overview.md',
    gitbookPath: 'architecture/architecture-overview',
    icon: '⧈',
  },

  // Card 5: Parallel Benefit
  {
    id: 'parallel',
    title: 'Parallel, Not Sequential',
    subtitle: 'Everyone Moves at Once',
    description:
      'Traditional blockchains are like a single checkout lane. Zenon is like a supermarket where everyone has their own self-checkout.',
    keyPoints: [
      'No competing for block space',
      'Your speed doesn\'t depend on network load',
      'Scales naturally with users',
    ],
    repoPath: 'docs/architecture/architecture-overview.md',
    gitbookPath: 'architecture/architecture-overview',
    icon: '🛤️',
  },

  // Card 6: Feeless Benefit
  {
    id: 'feeless',
    title: 'No Fees. Ever.',
    subtitle: 'Dynamic Plasma',
    description:
      'Gas fees exist because validators charge for their work. Since Zenon validators don\'t re-execute, there\'s no work to charge for. Simple.',
    keyPoints: [
      'No gas auctions',
      'No paying $50 for a simple transfer',
      'The network adapts to load without fees',
    ],
    repoPath: 'docs/notes/dynamic-plasma.md',
    gitbookPath: 'notes/dynamic-plasma',
    icon: '🆓',
  },

  // Card 7: Browser Capability
  {
    id: 'browser',
    title: 'Run a Node in Your Browser',
    subtitle: 'Not a Light Client—A Real Peer',
    description:
      'Other blockchains require you to trust a server. On Zenon, your browser downloads a tiny amount of data and verifies everything itself. No middleman.',
    keyPoints: [
      'No Infura, no Alchemy, no trust',
      'Verify transactions yourself',
      'Instant onboarding—no 24-hour sync',
    ],
    repoPath: 'docs/research/browser-light-client-overview.md',
    gitbookPath: 'research/browser-light-client-overview',
    icon: '🌐',
  },

  // Card 8: DFA (The How)
  {
    id: 'dfa',
    title: 'Proof, Not Replay',
    subtitle: 'Deterministic Fact Acceptance',
    description:
      'Most blockchains re-watch the whole movie to check the ending. Zenon just checks the final frame is correctly signed. Same result, fraction of the work.',
    keyPoints: [
      'Facts are verified cryptographically',
      'No virtual machine at consensus',
      'Results are provable without re-computation',
    ],
    repoPath: 'docs/research/taxonomy-deterministic-fact-acceptance.md',
    gitbookPath: 'research/taxonomy-deterministic-fact-acceptance',
    icon: '✓',
  },

  // Card 9: zApps Capability
  {
    id: 'zapps',
    title: 'Execute Locally, Anchor Globally',
    subtitle: 'zApps & Client-Side Logic',
    description:
      'Run complex applications on your own device. When you\'re done, submit a cryptographic commitment to your account-chain. The network never runs your code—it just stamps your work.',
    keyPoints: [
      'Apps run in your browser',
      'Submit results, not code',
      'Instant execution, no network wait',
    ],
    repoPath: 'docs/notes/execution-model.md',
    gitbookPath: 'notes/execution-model',
    icon: '⬡',
  },

  // Card 10: Cross-Chain Capability
  {
    id: 'cross-chain',
    title: 'Connect Without Trusting',
    subtitle: 'Cross-Chain Verification',
    description:
      'Want to verify a Bitcoin transaction? Zenon can check it directly—no bridge operators, no wrapped tokens, no trust assumptions. Pure cryptography.',
    keyPoints: [
      'Verify Bitcoin transactions natively',
      'No bridge operators to trust',
      'True interoperability',
    ],
    repoPath: 'docs/proposals/bitcoin-spv-engineering.md',
    gitbookPath: 'proposals/bitcoin-spv-engineering',
    icon: '🔗',
  },

  // Card 11: Architecture
  {
    id: 'architecture',
    title: 'How It All Fits Together',
    subtitle: 'Sentries → Sentinels → Pillars',
    description:
      'A layered system where execution happens on your device, spam is filtered in the middle, and consensus only handles ordering. Simple, elegant, scalable.',
    keyPoints: [
      'Sentries: Your device executes',
      'Sentinels: Filter and verify',
      'Pillars: Finalize the order',
    ],
    repoPath: 'docs/notes/node-architecture.md',
    gitbookPath: 'notes/node-architecture',
    icon: '🏗️',
  },

  // Card 12: Vision
  {
    id: 'vision',
    title: 'The Network of Momentum',
    subtitle: 'A New Foundation',
    description:
      'Imagine thousands of browser-based peers, running full applications, without fees, servers, or central infrastructure. That\'s not a dream. That\'s Zenon.',
    keyPoints: [
      'Sovereign users',
      'No central points of failure',
      'Built for the next decade',
    ],
    repoPath: 'README.md',
    gitbookPath: '',
    icon: '◈',
  },
]

export const REPO_BASE_URL = 'https://github.com/TminusZ/zenon-developer-commons/blob/main'
export const GITBOOK_BASE_URL = 'https://zenon-developer-commons.gitbook.io/zenon-developer-commons-docs'
