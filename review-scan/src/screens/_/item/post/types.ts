/*
 * @Author: czy0729
 * @Date: 2022-06-14 22:58:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-21 22:33:09
 */
import { AnyObject, DeepPartial, EventType, Fn, Id, TopicId, UserId, ViewStyle } from '@types'

export type Props = {
  inViewY?: number
  index?: number

  /** 容器样式 */
  contentStyle?: ViewStyle

  /** 右侧菜单按钮样式 */
  extraStyle?: ViewStyle

  /** 头像地址 */
  avatar?: string

  /** 用户 Id */
  userId?: UserId

  /** 用户昵称 */
  userName?: string

  /** 存放 bgm 特有的子回复配置字符串 */
  replySub?: string

  /** 回复内容 */
  message?: string

  /** 子回复数据 */
  sub?: any[]

  /** 楼层 Id */
  id?: Id

  /** 作者 Id */
  authorId?: UserId

  /** 楼层 Id, 存在就跳转到对应楼层 */
  postId?: Id

  /** 发帖时间 */
  time?: string

  /** 楼层 */
  floor?: string

  /** 用户签名 */
  userSign?: string

  /** 删除楼层的请求地址 */
  erase?: string

  /** 高亮标记楼层 */
  directFloor?: string

  /** 是否允许渲染 (用于优化) */
  rendered?: boolean

  /** 是否自动检测媒体块 */
  matchLink?: boolean

  /** 楼层自动折叠子回复数 */
  expandNums?: number

  /** 传递显示回复弹窗的函数 */
  showFixedTextare?: Fn

  onJumpTo?: Fn

  /** 埋点 */
  event?: EventType
}

export type Ctx = DeepPartial<{
  $: {
    params: {
      _url: string
    }
    state: {
      directFloor: string
      expands: any[]
      translateResultFloor: AnyObject
    }
    topicId: TopicId
    blogId: TopicId
    topic: {
      formhash: string
      likeType: string
    }
    readed: {
      _time: string
    }
    myFriendsMap: Record<UserId, true>
    toggleExpand: Fn
  }
}>
