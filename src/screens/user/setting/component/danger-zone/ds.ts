/*
 * @Author: czy0729
 * @Date: 2022-07-18 14:56:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-03 16:03:09
 */
import { rc } from '@utils/dev'
import i18n from '@constants/i18n'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'DangerZone')

export const TEXTS = {
  dangerZone: {
    hd: '账户',
    information: '登出、个人设置、隐私、受限、密码、邮箱'
  },
  logout: {
    hd: i18n.logout()
  },
  settings: {
    hd: '个人设置',
    information: `需在网页端重新${i18n.login()}；昵称、签名、头像、自我介绍；网页底部提供永久删除 Bangumi 账户功能；包括本项和后面功能仅支持在网页端提交更新`
  },
  networdServices: {
    hd: '网络服务',
    information: '输入例如 Steam、GitHub、PSN 等社交信息，在个人空间展示'
  },
  showNSFWSubject: {
    hd: '受限内容',
    information: '显示受限条目内容'
  },
  privacy: {
    hd: '隐私',
    information: '消息与提醒，例如谁可以 @ 你、消息红点提醒时机设置'
  },
  password: {
    hd: '密码',
    information: '更改密码'
  },
  email: {
    hd: '邮箱',
    information: '更换邮箱'
  }
} as const
