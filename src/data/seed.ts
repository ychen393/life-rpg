import type { LifeRPGState } from '../models/life-rpg'
import { createSeedSkills } from './skills'

export const SCHEMA_VERSION = 4

export const createSeedState = (): LifeRPGState => ({
  schemaVersion: SCHEMA_VERSION,
  language: 'zh',
  character: {
    name: 'YIHAN', level: 21, xp: 2680, xpToNextLevel: 3500, streak: 7, completedQuestCount: 0,
    questsTodayTotal: 5, unlockedAchievementCount: 28, activeProjectCount: 6,
    role: { zh: '探索者 · AI Builder', en: 'Explorer · AI Builder' },
    mainQuest: { zh: '构建一个拥有最大自由度与选择权的人生', en: 'Build a life with maximum freedom and optionality' },
  },
  attributes: [
    ['intelligence', '智力', 'Intelligence', 8], ['career', '事业', 'Career', 7],
    ['wealth', '财富', 'Wealth', 4.5], ['fitness', '身体', 'Fitness', 4.5],
    ['aesthetics', '审美', 'Aesthetics', 7], ['social', '社交', 'Social', 6.5],
    ['freedom', '自由', 'Freedom', 5.5], ['adventure', '冒险', 'Adventure', 6.5],
  ].map(([id, zh, en, value]) => ({ id: String(id), name: { zh: String(zh), en: String(en) }, value: Number(value) })),
  skills: createSeedSkills(),
  quests: [
    ['gre', 'GRE 学习 30 分钟', 'Study GRE for 30 min', '完成一组专注练习。', 'Complete one focused study block.', 20, 'english', 'normal'],
    ['python-practice', 'Python 练习 20 分钟', 'Practice Python for 20 min', '用代码解决一个小问题。', 'Solve one small problem with code.', 15, 'python', 'normal'],
    ['ai-project', 'AI Project 30 分钟', 'Work on AI Project for 30 min', '推动当前 AI 项目向前一步。', 'Move the current AI project one step forward.', 20, 'ai-product', 'hard'],
    ['walk', '散步 5000 步', 'Walk 5,000 steps', '离开屏幕，让身体恢复流动。', 'Step away from the screen and move.', 10, 'cardio', 'easy'],
    ['makeup-technique', '学习一个新的化妆技巧', 'Learn one makeup technique', '尝试并记录一个新的技巧。', 'Try and document one new technique.', 5, 'makeup', 'easy'],
  ].map(([id, zh, en, descriptionZh, descriptionEn, xpReward, linkedSkillId, difficulty]) => ({
    id: String(id), title: { zh: String(zh), en: String(en) }, description: { zh: String(descriptionZh), en: String(descriptionEn) },
    xpReward: Number(xpReward), linkedSkillId: String(linkedSkillId), difficulty: difficulty as LifeRPGState['quests'][number]['difficulty'], completed: false,
    createdAt: '2026-09-29T08:00:00.000Z',
  })),
  achievements: [
    { id: 'builder', name: { zh: 'Builder', en: 'Builder' }, description: { zh: 'AI 产品', en: 'AI Product' }, state: 'unlocked', progress: 100, icon: 'Hammer' },
    { id: 'changed-mind', name: { zh: 'Changed My Mind', en: 'Changed My Mind' }, description: { zh: '改变人生方向', en: 'Changed direction' }, state: 'unlocked', progress: 100, icon: 'Compass' },
    { id: 'english-four', name: { zh: '英语', en: 'English' }, description: { zh: 'Lv.4', en: 'Lv.4' }, state: 'unlocked', progress: 100, icon: 'Languages' },
  ],
  roadmap: [
    ['21', 'AI × 事业', 'AI × Career'], ['22', '研究生申请', 'Graduate Applications'],
    ['23', 'MSc / 全球体验', 'MSc / Global Experience'], ['25', '投资与资产', 'Investing & Assets'],
    ['28', '私人飞行执照', 'Private Pilot Licence'],
  ].map(([ageOrYear, zh, en], order) => ({ id: `roadmap-${order}`, ageOrYear, title: { zh, en }, description: { zh: '', en: '' }, order })),
})
