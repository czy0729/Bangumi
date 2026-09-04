/*
 * @Author: czy0729
 * @Date: 2022-05-25 17:20:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-25 18:54:43
 */
import { systemStore } from '@stores'
import { desc, HTMLDecode, pad } from '@utils'
import { TEXT_MENU_SPLIT_LEFT, TEXT_MENU_SPLIT_RIGHT, TEXT_MENU_TOPIC, WEB, WSA } from '@constants'

import type { Ep } from '@stores/subject/types'

/** 昨天的 23:59:59, 用于判断放送时间是否在今天以前 (原生 Date 生成, 格式与 dayjs 对齐) */
function getYesterdayEnd() {
  const date = new Date()
  date.setDate(date.getDate() - 1)

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} 23:59:59`
}

const TODAY = getYesterdayEnd()

export function getPopoverData(
  item: Ep,
  isSp: boolean,
  canPlay: boolean,
  login: boolean,
  advance: boolean,
  userProgress: { [x: string]: string },
  epStatus: string
) {
  const discuss = HTMLDecode(
    `(+${item.comment || 0}) ${item.name_cn || item.name || TEXT_MENU_TOPIC}`
  )

  // 计算放送时间是否在今天以后
  let canAddCalendar = !WEB && !WSA && !userProgress[item.id] && !isSp
  try {
    if (canAddCalendar && item?.airdate) {
      canAddCalendar = desc(String(item.airdate), TODAY) !== -1
    }
  } catch (error) {
    canAddCalendar = false
  }

  const data: string[] = []
  if (login) {
    const userProgressValue = userProgress[item.id]
    if (userProgressValue && epStatus) {
      data.push(`${userProgressValue}${TEXT_MENU_SPLIT_LEFT}${epStatus}${TEXT_MENU_SPLIT_RIGHT}`)
    }
    if (userProgressValue !== '看过') {
      data.push('看过')
      if (!isSp) data.push('看到')
    }
    if (advance) data.push('想看', '抛弃')
    if (userProgressValue) data.push('撤销')
  }

  if (canAddCalendar) data.push('添加提醒')
  data.push(discuss)

  if (systemStore.setting.showLegalSource && canPlay) data.push('正版播放')

  return data
}

export function getType(progress: string, status: Ep['status']) {
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
