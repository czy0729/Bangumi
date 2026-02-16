/*
 * @Author: czy0729
 * @Date: 2023-05-24 15:33:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-02 17:18:47
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'List')

export const SORT = [
  {
    key: 'top',
    title: '最受好评',
    desc: '分数超过 8分, 看过人数超过 10000 的作品'
  },
  {
    key: 'pop',
    title: '近年流行',
    desc: '近年来的流行作品，收藏数的排名在前 20%'
  },
  {
    key: 'tv',
    title: 'TV',
    desc: '通常的 tv 动画'
  },
  {
    key: 'old_tv',
    title: '老 TV',
    desc: '06 年及以前的老动画'
  },
  {
    key: 'movie',
    title: '剧场版',
    desc: '动画电影 / 剧场版'
  },
  {
    key: 'old_movie',
    title: '老剧场版',
    desc: '06 年及以前动画电影 / 剧场版'
  },
  {
    key: 'nsfw',
    title: 'NSFW',
    desc: '绝大多数是里番'
  }
] as const
