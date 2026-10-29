/*
 * @Author: czy0729
 * @Date: 2026-10-30 00:00:00
 * @Last Modified time: 2026-10-30 06:11:03
 */
import {
  TEXT_MENU_BLOCK,
  TEXT_MENU_BROWSER,
  TEXT_MENU_CANCEL_TRACK_COLLECTIONS_TIMELINE,
  TEXT_MENU_CONNECT,
  TEXT_MENU_COPY_LINK,
  TEXT_MENU_COPY_SHARE,
  TEXT_MENU_DISCONNECT,
  TEXT_MENU_DISCONNECT_REV,
  TEXT_MENU_FAVOR,
  TEXT_MENU_IGNORE,
  TEXT_MENU_PM,
  TEXT_MENU_POST_SHARE,
  TEXT_MENU_SPA
} from './text'

import type { TextType } from '@components/text/types'
import type { IconfontNames } from '@types'

/**
 * 操作型菜单自动图标开关
 *  - false 时派生菜单项不再按文案查表, 菜单回到纯文本 (调用方显式传入的 item.icon 不受影响)
 *  - 映射表 MENU_ICONS 保留, 改为 true 即可恢复
 */
export const MENU_ICONS_ENABLED = false

/**
 * 通用「菜单动作文案 → 右侧图标」映射
 *  - Popover 操作型菜单 (未传 value) 派生菜单项时按原始文案查表, 命中即自动渲染右侧图标
 *  - key 优先引用 TEXT_MENU_* 标准常量保证文案不漂移, 固定文案用字面量
 *  - 图标值必须存在于精简版图标字库 (MaterialIcons.json / Ionicons.json / AppIcons), 未收录的文案先不映射
 */
export const MENU_ICONS: Record<string, IconfontNames> = {
  // 查看
  [TEXT_MENU_BROWSER]: 'md-open-in-new',
  [TEXT_MENU_SPA]: 'md-open-in-new',
  预览: 'md-remove-red-eye',

  // 链接与分享
  [TEXT_MENU_COPY_LINK]: 'md-link',
  [TEXT_MENU_COPY_SHARE]: 'md-ios-share',
  [TEXT_MENU_POST_SHARE]: 'md-ios-share',

  // 用户关系
  [TEXT_MENU_PM]: 'md-chat-bubble-outline',
  [TEXT_MENU_CONNECT]: 'md-add',
  [TEXT_MENU_DISCONNECT]: 'md-remove-circle-outline',
  [TEXT_MENU_BLOCK]: 'md-do-not-disturb-alt',
  [TEXT_MENU_IGNORE]: 'md-visibility-off',

  // 收藏与书签
  [TEXT_MENU_FAVOR]: 'md-favorite',
  收藏: 'md-favorite',
  加入书签: 'md-bookmark-outline',
  移出书签: 'md-bookmark-outline',

  // 常规操作
  删除: 'md-delete-outline',
  编辑: 'md-edit',
  置顶: 'md-vertical-align-top',
  重置: 'md-refresh',
  回复: 'md-subdirectory-arrow-right',
  翻译: 'md-g-translate',
  添加提醒: 'md-calendar-today',

  // 小圣杯
  K线: 'md-waterfall-chart',
  买入: 'md-attach-money',
  卖出: 'md-money',
  资产重组: 'md-compare-arrows'
}

/**
 * 危险动作「菜单文案 → 文字颜色类型」映射
 *  - Popover 操作型菜单 (未传 value) 派生菜单项时按原始文案查表, 命中即渲染为对应颜色 (当前为 danger 红色)
 *  - 调用方显式传入的 item.type 优先; 选择型菜单 (传 value) 不查表
 */
export const MENU_TYPES: Record<string, TextType> = {
  // 用户关系
  [TEXT_MENU_BLOCK]: 'danger',
  [TEXT_MENU_DISCONNECT]: 'danger',
  [TEXT_MENU_DISCONNECT_REV]: 'danger',
  [TEXT_MENU_IGNORE]: 'danger',
  屏蔽小组: 'danger',
  屏蔽条目: 'danger',
  屏蔽人物: 'danger',
  // '1天不看TA': 'danger',
  // '3天不看TA': 'danger',
  // '7天不看TA': 'danger',

  // 追踪
  [TEXT_MENU_CANCEL_TRACK_COLLECTIONS_TIMELINE]: 'danger',
  取消追踪TA: 'danger',
  取消动画追踪: 'danger',
  取消书籍追踪: 'danger',
  取消游戏追踪: 'danger',
  取消音乐追踪: 'danger',
  取消三次元追踪: 'danger',

  // 破坏性操作
  删除: 'danger',
  移出: 'danger',
  移出书签: 'danger',
  停用: 'danger',
  清空: 'danger',
  清空点赞: 'danger',
  // 批量献祭: 'danger',
  隐藏: 'danger'
  // 抛弃: 'danger',
  // 撤销: 'danger'
}
