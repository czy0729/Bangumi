/*
 * @Author: czy0729
 * @Date: 2022-09-20 01:18:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-22 20:38:59
 */
import { DATA_ALPHABET } from '@constants/constants'
import { desc } from '../../utils'
import { ANIME_COLLECTED, ANIME_YEAR } from '../anime'

export const WENKU_FIRST = DATA_ALPHABET

export const WENKU_YEAR = ANIME_YEAR

export const WENKU_COLLECTED = ANIME_COLLECTED

export const WENKU_STATUS = ['连载', '完结'] as const

export const WENKU_ANIME = ['是', '否'] as const

export const WENKU_CATE = [
  '电击文库',
  '角川文库',
  'MF文库J',
  '富士见文库',
  'Fami通文库',
  '集英社',
  '讲谈社',
  'GA文库',
  'HJ文库',
  '小学馆',
  '少女文库',
  '一迅社',
  '游戏剧本'
] as const

export const WENKU_CATE_MAP = Object.fromEntries(
  WENKU_CATE.map((item, index) => [item, index])
) as Record<(typeof WENKU_CATE)[number], number>

export const WENKU_AUTHOR = [
  '西尾维新',
  '入间人间',
  '杉井光',
  '镰池和马',
  '野村美月',
  '榊一郎',
  '日日日',
  '绫里惠史',
  '田中芳树',
  '望公太',
  '五十岚雄策',
  '米泽穗信',
  '有川浩',
  '铃木大辅',
  '奈须蘑菇',
  '京极夏彦',
  '森见登美彦',
  '筑地俊彦',
  '细音启',
  '三河ごーすと',
  '森田季节',
  '时雨泽惠一',
  '虚渊玄',
  '十文字青',
  '三田诚',
  '土桥真二郎',
  '村崎幸也',
  '川口士',
  '成田良悟',
  '朝野始',
  '桥本纺',
  '河野裕',
  '古宫九时',
  '樱庭一树',
  '田尾典丈',
  '七月隆文',
  '镜游',
  '本田透',
  '野崎窗',
  '上远野浩平',
  '甲田学人',
  '平坂读',
  '矢岛沙罗',
  '新木伸',
  '小野不由美',
  '唐边叶介',
  '竹宫悠由子',
  '犬村小六',
  '红玉伊月',
  '石川博品',
  '住野夜',
  '天泽夏月',
  '竹冈叶月',
  '司',
  '石田衣良',
  '岬鹭宫',
  '逢空万太',
  '朝浦',
  '舞阪洸',
  '三木なずな',
  '谷川流',
  '鸭志田一',
  '岩井恭平',
  '冲方丁',
  '泷本龙彦',
  '松山刚',
  '水野良',
  '加纳新太',
  '三秋缒',
  '三云岳斗',
  '有泽真水',
  '辻村深月',
  '岩田洋季',
  '七乌未奏',
  '海空陆',
  '丈月城',
  '手岛史词',
  '瑞智士记',
  '月夜泪',
  '深见真',
  '柑橘ゆすら'
] as const

export const WENKU_AUTHOR_MAP = Object.fromEntries(
  WENKU_AUTHOR.map((item, index) => [item, index])
) as Record<(typeof WENKU_AUTHOR)[number], number>

export const WENKU_SORT = [
  '发行',
  '排名',
  '评分人数',
  '热度',
  '趋势',
  '更新',
  '随机',
  '名称'
] as const

export const WENKU_TAGS_NUMS_MAP = {
  科幻: 629,
  悬疑: 700,
  冒险: 1076,
  末日: 40,
  黑暗: 353,
  机战: 129,
  战争: 287,
  青春: 1596,
  恋爱: 1974,
  穿越: 613,
  奇幻: 1793,
  经营: 64,
  群像: 106,
  魔法: 482,
  战斗: 1399,
  校园: 1978,
  欢乐向: 1456,
  竞技: 42,
  女性视角: 503,
  百合: 237,
  犯罪: 145,
  异能: 274,
  旅行: 113,
  音乐: 112,
  复仇: 67,
  大逃杀: 52,
  后宫: 1869,
  猎奇: 61,
  脑洞: 36,
  人外: 694,
  妹妹: 477,
  青梅竹马: 670,
  JC: 16,
  斗智: 101,
  大小姐: 155,
  治愈: 81,
  伪娘: 90,
  惊悚: 111,
  宅文化: 18,
  JK: 49,
  耽美: 58,
  职场: 128,
  游戏: 67,
  NTR: 31,
  性转: 60,
  美食: 48,
  间谍: 9,
  女儿: 43,
  龙傲天: 303
} as const

export const WENKU_TAGS = Object.keys(WENKU_TAGS_NUMS_MAP).sort((a, b) =>
  desc(WENKU_TAGS_NUMS_MAP[a], WENKU_TAGS_NUMS_MAP[b])
) as (keyof typeof WENKU_TAGS_NUMS_MAP)[]

export const WENKU_TAGS_MAP = Object.fromEntries(
  WENKU_TAGS.map((item, index) => [item, index])
) as Record<(typeof WENKU_TAGS)[number], number>
