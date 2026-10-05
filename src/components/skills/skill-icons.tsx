import { Badge, Blocks, Bot, Boxes, Camera, Car, ChartNoAxesCombined, Code2, Coins, Compass, Database, Dumbbell, Flag, Gem, Handshake, HeartPulse, House, Landmark, Languages, MapPinned, MountainSnow, Music2, Network, Plane, Presentation, Rocket, Sailboat, Shirt, Sparkles, Sprout, WalletCards, WandSparkles, Waves, type LucideIcon } from 'lucide-react'
import { createElement } from 'react'

const icons: Record<string, LucideIcon> = { Badge, Blocks, Bot, Boxes, Camera, Car, ChartNoAxesCombined, Code2, Coins, Compass, Database, Dumbbell, Flag, Gem, Handshake, HeartPulse, House, Landmark, Languages, MapPinned, MountainSnow, Music2, Network, Plane, Presentation, Rocket, Sailboat, Shirt, Sparkles, Sprout, WalletCards, WandSparkles, Waves }

export function SkillIcon({ name }: { name: string }) {
  return createElement(icons[name] ?? Compass)
}
