/*
 * @Author: czy0729
 * @Date: 2023-04-28 04:08:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 15:06:23
 */
import { rc } from '@utils/dev'
import { HOST } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'LinkModal')

export const LINKS = [
  {
    key: '条目',
    value: `${HOST}/subject/`,
    text: `${HOST}/subject/{ID}`
  },
  {
    key: '帖子',
    value: `${HOST}/group/topic/`,
    text: `${HOST}/group/topic/{ID}`
  },
  {
    key: '小组',
    value: `${HOST}/group/`,
    text: `${HOST}/group/{ID}`
  },
  {
    key: '虚拟人物',
    value: `${HOST}/character/`,
    text: `${HOST}/character/{ID}`
  },
  {
    key: '现实人物',
    value: `${HOST}/person/`,
    text: `${HOST}/person/{ID}`
  },
  {
    key: '用户空间',
    value: `${HOST}/user/`,
    text: `${HOST}/user/{ID}`
  },
  {
    key: '标签',
    value: `${HOST}/tag/`,
    text: `${HOST}/tag/{ID}`
  },
  {
    key: '目录',
    value: `${HOST}/index/`,
    text: `${HOST}/index/{ID}`
  },
  {
    key: '日志',
    value: `${HOST}/blog/`,
    text: `${HOST}/blog/{ID}`
  },
  {
    key: '用户目录',
    value: `${HOST}/user/替换ID/index`,
    text: `${HOST}/user/{ID}/index`
  },
  {
    key: '用户日志',
    value: `${HOST}/user/替换ID/blog`,
    text: `${HOST}/user/{ID}/blog`
  },
  {
    key: '用户人物',
    value: `${HOST}/user/替换ID/mono`,
    text: `${HOST}/user/{ID}/mono`
  },
  {
    key: '用户好友',
    value: `${HOST}/user/替换ID/friends`,
    text: `${HOST}/user/{ID}/friends`
  }
] as const
