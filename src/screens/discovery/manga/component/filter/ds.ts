/*
 * @Author: czy0729
 * @Date: 2026-10-04 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-04 00:00:00
 */
import { rc } from '@utils/dev'
import { TEXT_TOTAL, TEXT_UPDATE_MANGA } from '@constants'
import { ADVANCE_LIMIT } from '../../ds'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Filter')

export const TEXT_INFORMATION = [
  `数据最后快照于 ${TEXT_UPDATE_MANGA}，在版本更新前数据不会有任何变化。`,
  `本页数据整理自 bgm.tv 快照，仅收录收藏人数大于 10 的漫画条目，系列内的单行本卷不收录。`,
  `标签筛选为全量漫画条目出现次数前 100 的标签。`,
  `目前本功能仅对正常登录用户开放，非高级会员在一个条件下会有最多只显示前 ${ADVANCE_LIMIT} 条数据的限制。`,
  `整理不易，若觉得有用可以通过各种方式给与鼓励支持!`,
  `【数据是怎么生成的】`,
  `bgm.tv 快照全部书籍条目中的漫画（318,269 条，排除小说 / 文库 / 画集）`,
  `　　↓ 脚本扫描提取`,
  `评分 / 排名 / 评分人数 / 日期 / 标签等字段`,
  `　　↓ 收录规则筛选（收藏数 > 10 且排除系列内单行本卷，共 ${TEXT_TOTAL.漫画} 条）`,
  `编码为 bin 内置于 App —— 搜索 / 筛选 / 排序全部在本地完成，瞬时响应`,
  `条目详情含作者 / 作画 / 原作等富数据，逐条加密上传自建 CDN —— 翻到对应页才按需加载，不占安装包体积`
].join('\n')
