import { Users, HandHeart, TreePine, Mountain } from 'lucide-vue-next'

export interface CultureTheme {
  text: string
  chip: string
  dot: string
  hover: string
  glow: string
  wash: string
  orb: string
  btn: string
  btnText: string
}

export const themes: Record<string, CultureTheme> = {
  'from-emerald-500 to-green-600': {
    text: 'text-emerald-200',
    chip: 'bg-emerald-400/15 text-emerald-100',
    dot: 'bg-emerald-400',
    hover: 'hover:border-emerald-400/50 group-hover:shadow-emerald-500/25',
    glow: 'from-emerald-500/70 via-teal-400/25 to-green-500/50',
    wash: 'from-emerald-500/[0.12] via-transparent to-green-500/[0.08]',
    orb: 'bg-emerald-500/30',
    btn: 'linear-gradient(135deg, #6ee7b7 0%, #34d399 60%, #22d3ee 120%)',
    btnText: '#064e3b',
  },
  'from-cyan-500 to-sky-600': {
    text: 'text-cyan-200',
    chip: 'bg-cyan-400/15 text-cyan-100',
    dot: 'bg-cyan-400',
    hover: 'hover:border-cyan-400/50 group-hover:shadow-cyan-500/25',
    glow: 'from-cyan-500/70 via-sky-400/25 to-blue-500/50',
    wash: 'from-cyan-500/[0.12] via-transparent to-blue-500/[0.08]',
    orb: 'bg-cyan-500/30',
    btn: 'linear-gradient(135deg, #67e8f9 0%, #22d3ee 60%, #38bdf8 120%)',
    btnText: '#083344',
  },
  'from-amber-500 to-orange-600': {
    text: 'text-amber-200',
    chip: 'bg-amber-400/15 text-amber-100',
    dot: 'bg-amber-400',
    hover: 'hover:border-amber-400/50 group-hover:shadow-amber-500/25',
    glow: 'from-amber-500/70 via-orange-400/25 to-orange-500/50',
    wash: 'from-amber-500/[0.12] via-transparent to-orange-500/[0.08]',
    orb: 'bg-amber-500/30',
    btn: 'linear-gradient(135deg, #fcd34d 0%, #f59e0b 60%, #f97316 120%)',
    btnText: '#451a03',
  },
  'from-purple-500 to-indigo-600': {
    text: 'text-purple-200',
    chip: 'bg-purple-400/15 text-purple-100',
    dot: 'bg-purple-400',
    hover: 'hover:border-purple-400/50 group-hover:shadow-purple-500/25',
    glow: 'from-purple-500/70 via-indigo-400/25 to-violet-500/50',
    wash: 'from-purple-500/[0.12] via-transparent to-violet-500/[0.08]',
    orb: 'bg-purple-500/30',
    btn: 'linear-gradient(135deg, #c4b5fd 0%, #a78bfa 60%, #818cf8 120%)',
    btnText: '#2e1065',
  },
  'from-rose-500 to-pink-600': {
    text: 'text-rose-200',
    chip: 'bg-rose-400/15 text-rose-100',
    dot: 'bg-rose-400',
    hover: 'hover:border-rose-400/50 group-hover:shadow-rose-500/25',
    glow: 'from-rose-500/70 via-pink-400/25 to-red-500/50',
    wash: 'from-rose-500/[0.12] via-transparent to-red-500/[0.08]',
    orb: 'bg-rose-500/30',
    btn: 'linear-gradient(135deg, #fda4af 0%, #fb7185 60%, #f472b6 120%)',
    btnText: '#4c0519',
  },
}

const pointIcons: Record<string, any> = {
  Users,
  HandHeart,
  TreePine,
  Mountain,
}

export const getIcon = (name: string) => pointIcons[name] || Users

export const isInstagram = (link?: string) => !!link && link.includes('instagram.com')
