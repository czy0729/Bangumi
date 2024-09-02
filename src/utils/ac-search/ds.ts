/*
 * @Author: czy0729
 * @Date: 2024-01-23 21:15:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-01 17:51:50
 */
/** 忽略匹配的词 */
export const IGNORE_ITEMS = ['PP', 'el', '人生', '平衡', '日常', '音乐'] as const

/** 特殊符号 */
export const REG_SPEC = / |-|，|。|！|？|：|；|、|～|・|《|〈|（|「|&|~|:|“|!|;|,|·|'|\*|\?|\.|\+/

/** 分片初始化时间间隔 */
export const TRIE_INIT_DISTANCE = 2000
