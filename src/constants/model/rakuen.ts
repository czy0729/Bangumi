/*
 * @Author: czy0729
 * @Date: 2026-09-03 23:14:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 23:14:09
 *
 * 字典 - 超展开
 */
import { Model } from './utils'

export const RAKUEN_SCOPE = [
  {
    label: '全局聚合',
    value: 'topiclist'
  },
  {
    label: '新番乐园',
    value: 'new_bangumi'
  },
  {
    label: 'etokei 绘时计',
    value: 'tokei'
  },
  {
    label: '经典动画',
    value: 'classical_bangumi'
  },
  {
    label: '天窗联盟',
    value: 'doujin'
  },
  {
    label: '1/8位面',
    value: 'pvc'
  }
] as const

/** 超展开板块 */
export const MODEL_RAKUEN_SCOPE = new Model(RAKUEN_SCOPE, 'RAKUEN_SCOPE')

/** 超展开全局聚合类型 */
export const RAKUEN_TYPE = [
  {
    label: '全部',
    value: ''
  },
  {
    label: '小组',
    value: 'group'
  },
  {
    label: '条目',
    value: 'subject'
  },
  {
    label: '热门',
    value: 'hot'
  },
  {
    label: '章节',
    value: 'ep'
  },
  {
    label: '人物',
    value: 'mono'
  }
] as const

/** 超展开全局聚合类型 */
export const MODEL_RAKUEN_TYPE = new Model(RAKUEN_TYPE, 'RAKUEN_TYPE')

/** 小组范围 */

export const RAKUEN_TYPE_GROUP = [
  {
    label: '全部',
    value: 'group'
  },
  {
    label: '已加入',
    value: 'my_group'
  },
  {
    label: '我发表',
    value: 'my_group&filter=topic'
  },
  {
    label: '我回复',
    value: 'my_group&filter=reply'
  }
] as const

/** 小组范围 */
export const MODEL_RAKUEN_TYPE_GROUP = new Model(RAKUEN_TYPE_GROUP, 'RAKUEN_TYPE_GROUP')

/** 人物类型 */

export const RAKUEN_TYPE_MONO = [
  {
    label: '全部',
    value: 'mono'
  },
  {
    label: '虚拟',
    value: 'mono&filter=character'
  },
  {
    label: '现实',
    value: 'mono&filter=person'
  }
] as const

/** 人物类型 */
export const MODEL_RAKUEN_TYPE_MONO = new Model(RAKUEN_TYPE_MONO, 'RAKUEN_TYPE_MONO')

/** 人物排序 */

export const RAKUEN_SCROLL_DIRECTION = [
  {
    label: '隐藏',
    value: 'none'
  },
  {
    label: '左侧',
    value: 'left'
  },
  {
    label: '底部',
    value: 'bottom'
  },
  {
    label: '右侧',
    value: 'right'
  }
] as const

/** [设置] 楼层导航条方向 */
export const MODEL_RAKUEN_SCROLL_DIRECTION = new Model(
  RAKUEN_SCROLL_DIRECTION,
  'RAKUEN_SCROLL_DIRECTION'
)

/** [设置] 楼层中图片自动加载 */

export const RAKUEN_AUTO_LOAD_IMAGE = [
  {
    label: '不加载',
    value: '0'
  },
  {
    label: '0.2m',
    value: '200'
  },
  {
    label: '2m',
    value: '2000'
  },
  {
    label: '自动',
    value: '10000'
  }
] as const

/** [设置] 楼层中图片自动加载 */
export const MODEL_RAKUEN_AUTO_LOAD_IMAGE = new Model(
  RAKUEN_AUTO_LOAD_IMAGE,
  'RAKUEN_AUTO_LOAD_IMAGE'
)

/** [设置] 子楼层折叠 */

export const RAKUEN_SUB_EXPAND = [
  {
    label: '0',
    value: '0'
  },
  {
    label: '2',
    value: '2'
  },
  {
    label: '4',
    value: '4'
  },
  {
    label: '8',
    value: '8'
  }
] as const

/** [设置] 子楼层折叠 */
export const MODEL_RAKUEN_SUB_EXPAND = new Model(RAKUEN_SUB_EXPAND, 'RAKUEN_SUB_EXPAND')

/** [设置] 帖子新楼层样式 */

export const RAKUEN_NEW_FLOOR_STYLE = [
  {
    label: '角标',
    value: 'A'
  },
  {
    label: '红点',
    value: 'B'
  },
  {
    label: '背景',
    value: 'C'
  },
  {
    label: '不设置',
    value: 'D'
  }
] as const

/** [设置] 帖子新楼层样式 */
export const MODEL_RAKUEN_NEW_FLOOR_STYLE = new Model(
  RAKUEN_NEW_FLOOR_STYLE,
  'RAKUEN_NEW_FLOOR_STYLE'
)

/** [设置] 大表情尺寸 */

export const BIG_EMOJI_SIZE = [
  {
    label: '小',
    value: '28'
  },
  {
    label: '中',
    value: '36'
  },
  {
    label: '大',
    value: '48'
  }
] as const

/** [设置] 帖子新楼层样式 */
export const MODEL_BIG_EMOJI_SIZE = new Model(BIG_EMOJI_SIZE, 'BIG_EMOJI_SIZE')

/** 收藏排序 */
