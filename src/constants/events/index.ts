/*
 * 友盟手动埋点配置
 *
 * @Author: czy0729
 * @Date: 2019-12-17 10:27:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-09 21:28:53
 */
import Discovery from './discovery'
import Home from './home'
import Other from './other'
import Rakuen from './rakuen'
import Timeline from './timeline'
import Tinygrail from './tinygrail'
import User from './user'

/**
 * 埋点事件数据
 *
 * @eg 跳转: { to: 'Subject', from: 'block', ...other }
 */
const events = {
  ...Discovery,
  ...Timeline,
  ...Home,
  ...Rakuen,
  ...User,
  ...Tinygrail,
  ...Other
} as const

export default events

type PageKeys =
  | '人物'
  | '制作人员'
  | '发现'
  | '吐槽'
  | '好友'
  | '小组'
  | '帖子'
  | '年鉴'
  | '我的'
  | '授权登陆'
  | '新番'
  | '日志'
  | '时间胶囊'
  | '更多角色'
  | '条目'
  | '条目目录'
  | '用户日志'
  | '用户目录'
  | '用户评分'
  | '登陆'
  | '短信'
  | '空间'
  | '章节'
  | '超展开'
  | '首页'

/** 埋点事件唯一键值 */
export type EventKeys = keyof typeof events | PageKeys | ''
