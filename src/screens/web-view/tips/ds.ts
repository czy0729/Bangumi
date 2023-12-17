/*
 * @Author: czy0729
 * @Date: 2023-06-23 14:19:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 11:49:12
 */
import { Loaded } from '@types'

export const NAMESPACE = 'ScreenTips'

export const STATE = {
  page: 0,
  _loaded: false as Loaded
}

export const TABS = [
  {
    title: '封面加速',
    key: 'mhhaa6ufuev051vu'
  },
  {
    title: '源头和跳转',
    key: 'qcgrso5g70d6gusf'
  },
  {
    title: '番剧推荐',
    key: 'hyrzz32whgurgg6t'
  },
  {
    title: '网页版本',
    key: 'uozzzg8i16z0s609'
  },
  {
    title: '看板娘 Live2D',
    key: 'acauisbz0gn28vpg'
  },
  {
    title: '屏蔽用户',
    key: 'hxpoxhwfy9o08thw'
  },
  {
    title: '番剧放送时间',
    key: 'umhqt99g5083yoso'
  },
  {
    title: '桌面组件配合日程提示放送',
    key: 'mknm9hacu9gdvws8'
  },
  {
    title: '放送日程导出 ICS',
    key: 'xfm0tw669wnlp7ve'
  },
  {
    title: '条目取景地标',
    key: 'kwhvltwwdrn1e18l'
  },
  {
    title: '本地 SMB 条目信息整理',
    key: 'cq5vqctm7iohgldl'
  },
  {
    title: 'Dollars',
    key: 'dlel341dipce8k1c'
  },
  {
    title: 'Webhook 文档',
    key: 'kfpfze0u7old4en1'
  }
] as const
