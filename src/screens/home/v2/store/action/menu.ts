/*
 * @Author: czy0729
 * @Date: 2026-08-27 02:45:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-27 03:53:00
 */
import { getCoverSrc } from '@components/cover/utils'
import { appNavigate, confirm, copy, HTMLDecode, open } from '@utils'
import { logger } from '@utils/dev'
import { t } from '@utils/fetch'
import { IMG_WIDTH, MODEL_EP_STATUS, SITE_AGEFANS, TEXT_MENU_TOPIC } from '@constants'
import {
  NAMESPACE,
  TEXT_ADD_REMINDER,
  TEXT_COLLAPSE_ALL,
  TEXT_EXPAND_ALL,
  TEXT_EXPORT_SCHEDULE,
  TEXT_PIN,
  TEXT_UNPIN
} from '../ds'
import { replaceOriginUrl } from '../../../../user/origin-setting/utils'
import Calendar from './calendar'

import type { Ep } from '@stores/subject/types'
import type { EpStatus, Navigation, SubjectId } from '@types'
import type { OriginItem } from '../../../../user/origin-setting/utils'

export default class Menu extends Calendar {
  /** 在线源头选择 */
  onlinePlaySelected = (label: string, subjectId: SubjectId) => {
    const { name_cn, name, type, air_date } = this.subject(subjectId)

    try {
      let url: string

      // 匹配用户自定义源头
      if (!url) {
        const find = this.onlineOrigins(subjectId).find(item =>
          typeof item === 'object' ? item.name === label : false
        ) as OriginItem
        if (find) {
          if (label === '萌番组' && find.id) {
            copy(HTMLDecode(name_cn || name))
            setTimeout(() => {
              open(find.url)
            }, 1600)
            return
          }

          url = replaceOriginUrl(find.url, {
            CN: HTMLDecode(name_cn || name),
            JP: HTMLDecode(name || name_cn),
            ID: subjectId,
            YEAR: String(air_date || '').match(/(\d{4})/)?.[0] || ''
          })
        }
      }

      if (!url) {
        const cn = HTMLDecode(name_cn || name)
        if (label === 'AGE动漫') {
          url = `${SITE_AGEFANS()}/search?query=${encodeURIComponent(cn)}&page=1`
        }
      }

      if (url) open(url)
      t('首页.搜索源', {
        type: label,
        subjectId,
        subjectType: type
      })
    } catch (error) {
      logger.error(NAMESPACE, 'onlinePlaySelected', error)
    }
  }

  /** 菜单点击 */
  onPopover = (label: string, subjectId: SubjectId) => {
    const actions = this.actions(subjectId)
    if (actions.length) {
      const find = actions.find(item => item.name === label)
      if (find) {
        open(find.url, true)

        t('其他.自定义跳转', {
          from: 'HomeTab',
          key: `${subjectId}|${find.name}|${find.url}`
        })
        return
      }
    }

    switch (label) {
      case TEXT_PIN:
        this.itemToggleTop(subjectId, true)
        break

      case TEXT_UNPIN:
        this.itemToggleTop(subjectId, false)
        break

      case TEXT_EXPAND_ALL:
        this.expandAll()
        break

      case TEXT_COLLAPSE_ALL:
        this.closeAll()
        break

      case TEXT_ADD_REMINDER:
        this.doBatchSaveCalenderEvent(subjectId)
        break

      case TEXT_EXPORT_SCHEDULE:
        this.doExportCalenderEventICS(subjectId)
        break

      default:
        this.onlinePlaySelected(label, subjectId)
        break
    }
  }

  /** 章节菜单操作 */
  doEpsSelect = async (value: string, item: Ep, subjectId: SubjectId, navigation: Navigation) => {
    const status = MODEL_EP_STATUS.getValue<EpStatus>(value)
    if (status) {
      this.doUpdateEpStatus(value, item, subjectId)
      return
    }

    if (value === '看到') {
      if (item?.sort > 24) {
        confirm(`确认看到${item.sort}集?`, () => {
          this.doUpdateSubjectWatched(item, subjectId)
        })
        return
      }

      this.doUpdateSubjectWatched(item, subjectId)
      return
    }

    // iOS 是本集讨论, 安卓是 (+N)...
    if (value.includes(TEXT_MENU_TOPIC) || value.includes('(+')) {
      this.toEp(item, subjectId, navigation)
      return
    }

    if (value === '添加提醒') {
      this.doSaveCalenderEvent(item, subjectId)
      return
    }
  }

  /** 本集讨论 */
  toEp = (item: Ep, subjectId: SubjectId, navigation: Navigation) => {
    // 数据占位
    const subject = this.subject(subjectId)
    appNavigate(
      item.url || `/ep/${item.id}`,
      navigation,
      {
        _title: `ep${item.sort}.${item.name || item.name_cn}`,
        _group: subject.name || subject.name_cn,
        _groupThumb: getCoverSrc((subject.images || {})?.medium, IMG_WIDTH),
        _desc: `时长:${item.duration} / 首播:${item.airdate}<br />${(item.desc || '').replace(
          /\r\n/g,
          '<br />'
        )}`
      },
      {
        id: '首页.跳转'
      }
    )

    t('首页.章节菜单操作', {
      title: TEXT_MENU_TOPIC,
      subjectId
    })
  }
}
