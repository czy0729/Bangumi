/*
 * @Author: czy0729
 * @Date: 2022-06-14 22:58:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-14 05:16:49
 */
import type { AnyObject, Fn, Id, TopicId, UserId, ViewStyle, WithEvent } from '@types'

export type Props = WithEvent<{
  /** 懒渲染 y 轴 */
  inViewY?: number

  /** 项索引 */
  index?: number

  /** 容器样式 */
  contentStyle?: ViewStyle

  /** 右侧菜单按钮样式 */
  extraStyle?: ViewStyle

  /** 头像地址 */
  avatar?: string

  /** 用户 ID */
  userId?: UserId

  /** 用户昵称 */
  userName?: string

  /** 存放 bgm 特有的子回复配置字符串 */
  replySub?: string

  /** 回复内容 */
  message?: string

  /** 子回复数据 */
  sub?: any[]

  /** 楼层 ID */
  id?: Id

  /** 作者 ID */
  authorId?: UserId

  /** 楼层 ID, 存在就跳转到对应楼层 */
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
  directFloor?: boolean

  /** 是否允许渲染 (用于优化) */
  rendered?: boolean

  /** 是否自动检测媒体块 */
  matchLink?: boolean

  /** 楼层自动折叠子回复数 */
  expandNums?: number

  /** 传递显示回复弹窗的函数 */
  showFixedTextarea?: Fn

  /** 跳转到当前楼层项回调 */
  onJumpTo?: Fn
}>

export type Ctx = {
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
}
