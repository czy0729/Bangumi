/*
 * @Author: czy0729
 * @Date: 2024-01-22 01:34:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-16 06:52:17
 */
import { rc } from '@utils/dev'
import { withSplit } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Form')

export const FIELDS = [
  { label: '昵称', key: 'nickname', placeholder: '请填入昵称' },
  { label: '签名', key: 'sign_input', placeholder: '请填入签名' },
  {
    label: '头像',
    key: 'avatar',
    placeholder: '请填入网络地址',
    tip: `此头像非网页版头像，仅在客户端${withSplit('时光机')}和${withSplit(
      '用户空间'
    )}中显示。需要输入图片网络地址，是否前往免费图床？`
  },
  {
    label: '背景',
    key: 'bg',
    placeholder: '请填入网络地址',
    tip: `网页版没有背景概念，仅在客户端${withSplit('时光机')}和${withSplit(
      '用户空间'
    )}中显示。需要输入图片网络地址，是否前往免费图床？`
  }
] as const
