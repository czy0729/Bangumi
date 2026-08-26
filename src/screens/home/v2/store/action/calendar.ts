/*
 * @Author: czy0729
 * @Date: 2026-08-27 02:45:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-27 03:52:45
 */
import {
  cnjp,
  confirm,
  feedback,
  genICSCalenderEventDate,
  getCalenderEventTitle,
  info,
  loading,
  open,
  queue,
  saveCalenderEvent,
  sleep
} from '@utils'
import { calendarEventsRequestPermissions, calendarGetEventsAsync } from '@utils/calendar'
import { t } from '@utils/fetch'
import { download, temp } from '@utils/kv'
import { applyProxy } from '@utils/proxy'
import { HOST, IOS } from '@constants'
import Progress from './progress'

import type { Ep } from '@stores/subject/types'
import type { SubjectId } from '@types'

export default class Calendar extends Progress {
  /** 添加日历 */
  doSaveCalenderEvent = (item: Ep, subjectId: SubjectId) => {
    const subject = this.subject(subjectId)
    saveCalenderEvent(item, cnjp(subject.name_cn, subject.name), this.onAirCustom(subjectId))

    t('其他.添加日历', {
      subjectId,
      sort: item?.sort || 0,
      from: 'Home'
    })
    return
  }

  /** 批量添加提醒 */
  doBatchSaveCalenderEvent = async (subjectId: SubjectId) => {
    const eps = this.epsNoSp(subjectId)
    if (eps.length) {
      const subject = this.subject(subjectId)
      const naEps = subject.eps.filter(item => item.status === 'NA')
      if (!naEps.length) {
        info('已没有未放送的章节')
        return
      }

      const data = await calendarEventsRequestPermissions()
      if (data !== 'authorized') {
        info('权限不足')
        return
      }

      const title = cnjp(subject.name_cn, subject.name)
      confirm(
        `「${title}」\n是否一键添加 ${naEps.length} 个章节的提醒?`,
        async () => {
          const onAir = this.onAirCustom(subjectId)
          const fns: (() => Promise<boolean>)[] = []
          const hide = loading()
          const calendarTitles = await calendarGetEventsAsync()
          naEps.forEach(item => {
            // 日历中相同的标题不再添加日程
            if (!calendarTitles.includes(getCalenderEventTitle(item, title))) {
              fns.push(async () => {
                await sleep(IOS ? 80 : 480)
                saveCalenderEvent(item, title, onAir, false)
                return true
              })
            }
          })

          await queue(fns, 1)
          hide()
          info('已完成')
          feedback()

          t('其他.批量添加日历', {
            subjectId,
            length: fns.length
          })
        },
        '一键添加放送提醒'
      )
    }
  }

  /** 导出放送日程 ics */
  doExportCalenderEventICS = async (subjectId: SubjectId) => {
    const eps = this.epsNoSp(subjectId)
    if (eps.length) {
      const subject = this.subject(subjectId)
      const eps =
        subject.eps.length >= 100 ? subject.eps.filter(item => item.status === 'NA') : subject.eps
      if (!eps.length) {
        info('没有数据')
        return
      }

      const onAir = this.onAirCustom(subjectId)
      const ics = [
        'BEGIN:VCALENDAR',
        'PRODID:-//Bangumi//Anime Calendar//CN',
        'VERSION:2.0',
        'METHOD:PUBLISH',
        'CALSCALE:GREGORIAN',
        'X-WR-CALNAME:Bangumi放送日程',
        'X-APPLE-CALENDAR-COLOR:#FE8A95'
      ]
      eps.forEach(item => {
        const { DTSTART, DTEND } = genICSCalenderEventDate(item, onAir)

        let desc = applyProxy(`${HOST}/ep/${item.id}`).url
        if (item.name_cn || item.name) desc += ` (${item.name_cn || item.name})`

        ics.push(
          'BEGIN:VEVENT',
          `UID:${subjectId}-${item.id}`,
          'TZID:Asia/Shanghai',
          `DTSTART:${DTSTART}`,
          `DTEND:${DTEND}`,
          `SUMMARY:${cnjp(subject.name_cn, subject.name)} ep.${item.sort}`,
          `DESCRIPTION:${desc}`,
          'TRANSP:OPAQUE',
          'END:VEVENT'
        )
      })
      ics.push('END:VCALENDAR')

      const { data } = await temp(`${this.userId}_${subjectId}.ics`, ics.join('\n'), -1)
      if (!data?.downloadKey) {
        info('未知错误，生成ics失败，重试或联系作者')
        return false
      }

      t('首页.导出日程', {
        subjectId,
        userId: this.userId
      })

      const url = await download(data.downloadKey)
      open(url)
    }
  }
}
