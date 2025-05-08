/*
 * @Author: czy0729
 * @Date: 2022-05-25 17:20:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 04:07:32
 */
import dayjs from 'dayjs'
import { systemStore } from '@stores'
import { desc, HTMLDecode } from '@utils'
import { WEB, WSA } from '@constants'
import { DEFAULT_PROPS } from './ds'

const today = dayjs().subtract(1, 'day').format('YYYY-MM-DD 23:59:59')

export function getPopoverData(
  item: { comment: any; name_cn: any; name: any; id: string | number; airdate: string },
  isSp: boolean,
  canPlay: boolean,
  login: boolean,
  advance: boolean,
  userProgress: { [x: string]: string }
) {
  const discuss = HTMLDecode(`(+${item.comment}) ${item.name_cn || item.name || '本集讨论'}`)

  // 计算放送时间是否在今天以后
  let canAddCalendar = !WEB && !WSA && !userProgress[item.id] && !isSp
  try {
    if (canAddCalendar && item?.airdate) {
      canAddCalendar = desc(String(item.airdate), today) !== -1
    }
  } catch (error) {
    canAddCalendar = false
  }

  const data: string[] = []
  if (login) {
    if (userProgress[item.id] !== '看过') data.push('看过')
    if (!isSp) data.push('看到')
    if (advance) {
      data.push('想看', '抛弃')
    }
    if (userProgress[item.id]) data.push('撤销')
  }

  if (canAddCalendar) data.push('添加提醒')
  data.push(discuss)

  if (systemStore.setting.showLegalSource && canPlay) data.push('正版播放')

  return data
}

export function getType(progress: any, status: any) {
  switch (progress) {
    case '想看':
      return 'main'

    case '看过':
      return 'primary'

    case '抛弃':
      return 'dropped'

    default:
      break
  }

  switch (status) {
    case 'Air':
      return 'ghostPlain'

    case 'Today':
      return 'ghostSuccess'

    default:
      return 'disabled'
  }
}

export function getComment(eps: any[] | readonly any[]) {
  return {
    min: Math.min(...eps.map(item => item.comment || 1).filter(item => !!item)),
    max: Math.max(...eps.map(item => item.comment || 1))
  }
}

/** @deprecated */
export function customCompare({ props, item, eps, isSp, num }: typeof DEFAULT_PROPS) {
  const { userProgress, flip, ...otherProps } = props
  return {
    props: otherProps,
    userProgress: userProgress[item?.id],
    item,
    eps: eps?.length,
    isSp,
    num,
    flip
  }
}
