import type { LocalizedText, Skill, SkillCategory, SkillPrerequisite } from '../models/life-rpg'
import { getLevelFromXP, getSkillThreshold } from '../utils/skill-progression'

type SkillSeed = [id: string, category: SkillCategory, zh: string, en: string, xp: number, locked?: boolean, icon?: string]

const seeds: SkillSeed[] = [
  ['python','intelligence','Python','Python',235,false,'Code2'],
  ['ai-llm','intelligence','AI & LLM','AI & LLM',520,false,'Sparkles'],
  ['english','languages','英语','English',680,false,'Languages'],
  ['makeup','aesthetics','化妆','Makeup',80,false,'WandSparkles'],
  ['investing','freedom','投资','Investing',120,false,'Coins'],
  ['pilot','adventure','私人飞行执照','Private Pilot Licence',0,true,'Plane'],
  ['statistics','intelligence','统计','Statistics',760,false,'ChartNoAxesCombined'],
  ['sql','intelligence','SQL','SQL',250,false,'Database'],
  ['ai-agent','intelligence','AI Agent','AI Agent',480,false,'Bot'],
  ['ai-product','intelligence','AI 产品','AI Product',460,false,'Boxes'],
  ['finance','intelligence','金融','Finance',140,false,'Landmark'],
  ['spanish','languages','西班牙语','Spanish',0,true,'Languages'],
  ['korean','languages','韩语','Korean',0,true,'Languages'],
  ['driving','adventure','驾驶','Driving',220,false,'Car'],
  ['diving','adventure','潜水','Diving',0,true,'Waves'],
  ['skiing','adventure','滑雪','Skiing',0,true,'MountainSnow'],
  ['horse-riding','adventure','骑马','Horse Riding',0,true,'Badge'],
  ['sailing','adventure','帆船','Sailing',0,true,'Sailboat'],
  ['fashion','aesthetics','穿搭','Fashion',230,false,'Shirt'],
  ['jewelry','aesthetics','珠宝鉴赏','Jewelry',245,false,'Gem'],
  ['photography','aesthetics','摄影','Photography',0,true,'Camera'],
  ['interior-design','aesthetics','空间审美','Interior Design',70,false,'House'],
  ['strength','fitness','力量训练','Strength Training',150,false,'Dumbbell'],
  ['cardio','fitness','心肺','Cardio',75,false,'HeartPulse'],
  ['swimming','fitness','游泳','Swimming',120,false,'Waves'],
  ['dance','fitness','舞蹈','Dance',35,false,'Music2'],
  ['presentation','career','演讲表达','Presentation',430,false,'Presentation'],
  ['negotiation','career','谈判','Negotiation',160,false,'Handshake'],
  ['networking','career','人际连接','Networking',240,false,'Network'],
  ['leadership','career','领导力','Leadership',90,false,'Flag'],
  ['entrepreneurship','career','创业','Entrepreneurship',0,true,'Rocket'],
  ['personal-finance','freedom','个人财务','Personal Finance',230,false,'WalletCards'],
  ['asset-building','freedom','资产构建','Asset Building',45,false,'Blocks'],
  ['passive-income','freedom','被动收入','Passive Income',0,true,'Sprout'],
  ['location-independence','freedom','地点自由','Location Independence',0,true,'MapPinned'],
]

const milestoneTemplates: Record<SkillCategory, LocalizedText[]> = {
  intelligence: [
    { zh:'尚未开始探索。',en:'Not yet explored.' }, { zh:'理解核心概念与基本术语。',en:'Understand the core concepts and vocabulary.' },
    { zh:'能在指导下完成实际练习。',en:'Apply the skill in guided practical work.' }, { zh:'能独立完成一个小型真实项目。',en:'Complete a small real-world project independently.' },
    { zh:'能处理复杂问题并解释自己的方法。',en:'Handle complex problems and explain the approach.' }, { zh:'能设计可靠系统并指导他人。',en:'Design reliable systems and guide others.' },
  ],
  languages: [
    { zh:'尚未开始学习。',en:'Not yet started.' }, { zh:'能进行简单自我介绍和日常表达。',en:'Handle introductions and simple daily expressions.' },
    { zh:'能应对旅行与日常生活对话。',en:'Navigate travel and everyday conversations.' }, { zh:'能自然讨论熟悉的话题。',en:'Discuss familiar topics with confidence.' },
    { zh:'能在学习与工作场景中流畅表达。',en:'Communicate fluently in study and work settings.' }, { zh:'能准确理解文化语境并进行深度表达。',en:'Understand cultural nuance and express complex ideas.' },
  ],
  adventure: [
    { zh:'尚未踏上这段旅程。',en:'The journey has not begun.' }, { zh:'了解安全规则并完成首次体验。',en:'Learn safety fundamentals and complete a first experience.' },
    { zh:'能在指导下稳定完成基础活动。',en:'Perform the fundamentals consistently with guidance.' }, { zh:'能在常见环境中独立行动。',en:'Operate independently in familiar conditions.' },
    { zh:'能处理多变环境与突发情况。',en:'Handle changing conditions and unexpected situations.' }, { zh:'达到可带领他人安全探索的水平。',en:'Lead others through the experience safely.' },
  ],
  aesthetics: [
    { zh:'尚未开始建立感知。',en:'Not yet explored.' }, { zh:'理解基础原则并能复现简单风格。',en:'Understand fundamentals and recreate simple styles.' },
    { zh:'能有意识地做出协调选择。',en:'Make intentional and coherent aesthetic choices.' }, { zh:'形成稳定的个人判断与表达。',en:'Develop consistent personal taste and expression.' },
    { zh:'能针对情境创作完整方案。',en:'Create complete concepts for different contexts.' }, { zh:'形成成熟、独特且可传达的审美体系。',en:'Build a distinctive and communicable aesthetic system.' },
  ],
  fitness: [
    { zh:'尚未建立练习。',en:'No practice established yet.' }, { zh:'掌握安全动作与基础节奏。',en:'Learn safe movement and basic rhythm.' },
    { zh:'形成可持续的规律练习。',en:'Maintain a sustainable practice routine.' }, { zh:'能独立规划并完成阶段训练。',en:'Plan and complete a training block independently.' },
    { zh:'具备扎实能力并能调整训练策略。',en:'Adapt training with strong practical ability.' }, { zh:'长期稳定，并能帮助他人安全进步。',en:'Sustain mastery and help others progress safely.' },
  ],
  career: [
    { zh:'尚未刻意练习。',en:'Not yet practiced intentionally.' }, { zh:'理解基本框架并尝试应用。',en:'Understand the basic framework and try it in practice.' },
    { zh:'能在常见工作场景中稳定运用。',en:'Use the skill reliably in common work situations.' }, { zh:'能独立推动有清晰成果的工作。',en:'Drive work independently toward a clear outcome.' },
    { zh:'能处理高复杂度与高影响力场景。',en:'Navigate complex, high-impact situations.' }, { zh:'形成可复制的方法并能赋能他人。',en:'Build repeatable methods and enable others.' },
  ],
  freedom: [
    { zh:'尚未开始构建。',en:'Not yet started.' }, { zh:'理解基础原则并完成第一步。',en:'Understand the fundamentals and take a first step.' },
    { zh:'建立可持续执行的个人系统。',en:'Build a sustainable personal system.' }, { zh:'系统开始产生稳定的现实选择权。',en:'The system begins creating meaningful optionality.' },
    { zh:'能抵御风险并主动设计生活方式。',en:'Withstand risk and intentionally design a lifestyle.' }, { zh:'拥有长期、稳健且高度自主的选择权。',en:'Maintain robust long-term freedom and autonomy.' },
  ],
}

const pythonMilestones: LocalizedText[] = [
  { zh:'未开始。',en:'Not started.' },
  { zh:'能理解变量、条件、循环、函数等基础概念。',en:'Understand variables, conditions, loops and functions.' },
  { zh:'能阅读并修改简单 Python 程序和 AI 生成代码。',en:'Read and modify simple Python programs and AI-generated code.' },
  { zh:'能独立完成小型自动化工具或数据项目。',en:'Independently build small automation tools or data projects.' },
  { zh:'能独立构建中等复杂度 AI Application。',en:'Independently build medium-complexity AI applications.' },
  { zh:'能设计、实现并调试生产级 Python / AI 系统。',en:'Design, implement and debug production-grade Python / AI systems.' },
]

const prerequisites: Record<string, SkillPrerequisite[]> = {
  'ai-agent': [{ skillId:'ai-llm',minLevel:2,label:{zh:'AI & LLM ≥ Lv.2',en:'AI & LLM ≥ Lv.2'} }],
  entrepreneurship: [
    { skillId:'ai-product',minLevel:3,suggested:true,label:{zh:'AI 产品 ≥ Lv.3',en:'AI Product ≥ Lv.3'} },
    { skillId:'personal-finance',minLevel:2,suggested:true,label:{zh:'个人财务 ≥ Lv.2',en:'Personal Finance ≥ Lv.2'} },
  ],
  pilot: [
    { label:{zh:'身体 ≥ Lv.4',en:'Fitness ≥ Lv.4'},suggested:true }, { label:{zh:'自由 ≥ Lv.5',en:'Freedom ≥ Lv.5'},suggested:true },
    { label:{zh:'完成 Discovery Flight 里程碑',en:'Complete a Discovery Flight milestone'},suggested:true },
  ],
  sailing: [{ label:{zh:'游泳 ≥ Lv.2（建议）',en:'Swimming ≥ Lv.2 (suggested)'},suggested:true }],
  'passive-income': [{ skillId:'asset-building',minLevel:2,label:{zh:'资产构建 ≥ Lv.2',en:'Asset Building ≥ Lv.2'},suggested:true }],
}

export function createSeedSkills(): Skill[] {
  return seeds.map(([id,category,zh,en,xp,locked=false,icon='Compass']) => {
    const level = getLevelFromXP(xp)
    const milestones = id === 'python' ? pythonMilestones : milestoneTemplates[category]
    return {
      id, category, name:{zh,en},
      description:{ zh:`持续探索并建立「${zh}」的真实能力。`,en:`Build practical, real-world capability in ${en}.` },
      level, xp, xpToNextLevel:getSkillThreshold(Math.min(5,level+1)), maxLevel:5, locked,
      prerequisites:prerequisites[id] ?? [], levelMilestones:milestones, questIds:[], icon, xpHistory:[],
    }
  })
}
