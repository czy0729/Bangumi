/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-26 10:08:52
 */
import { systemStore } from '@stores'
import {
  cnjp,
  confirm,
  copy,
  feedback,
  genICSCalenderEventDate,
  getCoverLarge,
  getCoverMedium,
  getSPAParams,
  info,
  loading,
  open,
  postTask,
  saveCalenderEvent,
  showActionSheet
} from '@utils'
import { calendarEventsSaveGameReleaseDate } from '@utils/calendar'
import { baiduTranslate, t } from '@utils/fetch'
import { download, lx, lxCache, temp } from '@utils/kv'
import { applyLainProxy, applyProxy } from '@utils/proxy'
import { axios } from '@utils/thirdParty'
import { CDN_OSS_SUBJECT, HOST, HOST_CDN, URL_SPA } from '@constants'
import Menus from './menus'

import type { EpsItem } from '../../types'
import type { Navigation, TranslateResult } from '@types'

/** 分享与日历导出 */
export default class Share extends Menus {
  onPostShare = async (navigation: Navigation) => {
    if (!navigation) return

    const { images } = this.subject
    let src = CDN_OSS_SUBJECT(getCoverMedium(images?.common))
    if (!src.includes?.(HOST_CDN)) src = getCoverLarge(images?.common)

    const hide = loading('下载封面中...')

    let cover: `data:image/jpg;base64,${string}`
    try {
      const { request } = await axios({
        method: 'get',
        url: applyLainProxy(src.replace('http://', 'https://')),
        responseType: 'arraybuffer'
      })
      cover = `data:image/jpg;base64,${request._response}`
    } catch (error) {
      hide()
      info('封面下载失败, 请重试')
      return
    }
    hide()

    navigation.push('Share', {
      _subjectId: this.subjectId,
      _type: this.type,
      _url: `${HOST}/subject/${this.subjectId}`,
      _cover: cover,
      _title: cnjp(this.cn, this.jp),
      _content: this.summary.replace(/\r\n\r\n/g, '\r\n'),
      _detail: this.tags
        .filter((_item, index) => index <= 4)
        .map(item => item.name)
        .join(' · ')
    })

    t('条目.拼图分享', {
      subjectId: this.subjectId,
      spa: false
    })
  }

  /** APP 网页分享 */
  onWebShare = () => {
    const url = `${URL_SPA}/${getSPAParams('Subject', {
      subjectId: this.subjectId
    })}`
    copy(`【链接】${cnjp(this.cn, this.jp)} | Bangumi番组计划\n${url}`, '已复制 APP 网页版地址')
    postTask(() => {
      open(url)
    }, 1600)

    t('条目.拼图分享', {
      subjectId: this.subjectId,
      spa: true
    })
  }

  /** 添加日历 */
  doSaveCalenderEvent = (item: EpsItem) => {
    saveCalenderEvent(item, cnjp(this.cn, this.jp), this.onAirCustom)

    t('其他.添加日历', {
      subjectId: this.subjectId,
      sort: item?.sort || 0,
      from: 'Subject'
    })
  }

  /** 导出放送日程 ics */
  doExportCalenderEventICS = async () => {
    const eps = (this.subject.eps || []).filter(item => item.type === 0)
    if (!eps.length) {
      info('没有数据')
      return
    }

    // 大条目只导出未放送的章节, 避免生成过大的 ics
    const targetEps =
      this.subject.eps.length >= 100 ? eps.filter(item => item.status === 'NA') : eps
    if (!targetEps.length) {
      info('没有数据')
      return
    }

    try {
      const onAir = this.onAirCustom
      const ics = [
        'BEGIN:VCALENDAR',
        'PRODID:-//Bangumi//Anime Calendar//CN',
        'VERSION:2.0',
        'METHOD:PUBLISH',
        'CALSCALE:GREGORIAN',
        'X-WR-CALNAME:Bangumi放送日程',
        'X-APPLE-CALENDAR-COLOR:#FE8A95'
      ]
      targetEps.forEach(item => {
        const { DTSTART, DTEND } = genICSCalenderEventDate(item, onAir)

        let desc = `${applyProxy(`${HOST}/ep/${item.id}`).url}`
        if (item.name_cn || item.name) desc += ` (${item.name_cn || item.name})`

        ics.push(
          'BEGIN:VEVENT',
          `UID:${this.subjectId}-${item.id}`,
          'TZID:Asia/Shanghai',
          `DTSTART:${DTSTART}`,
          `DTEND:${DTEND}`,
          `SUMMARY:${cnjp(this.subject.name_cn, this.subject.name)} ep.${item.sort}`,
          `DESCRIPTION:${desc}`,
          'TRANSP:OPAQUE',
          'END:VEVENT'
        )
      })
      ics.push('END:VCALENDAR')

      const { data } = await temp(`${this.userId}_${this.subjectId}.ics`, ics.join('\n'), -1)
      if (!data?.downloadKey) {
        info('未知错误，生成ics失败，重试或联系作者')
        return false
      }

      t('条目.导出日程', {
        subjectId: this.subjectId,
        userId: this.userId
      })

      const url = await download(data.downloadKey)
      open(url)
    } catch (error) {
      info('导出失败，请重试')
    }
  }

  /** 添加游戏发售日期到日历 */
  doSaveGameReleaseDate = () => {
    const dates = this.gameReleaseDates
    if (!dates.length) {
      info('没有可解析的发售日期')
      return
    }

    const sheetData = [...dates.map(item => item.fullText), '取消'] as const
    showActionSheet(sheetData, index => {
      if (index < dates.length) {
        const item = dates[index]
        setTimeout(async () => {
          try {
            const title = cnjp(this.cn, this.jp)
            const url = applyProxy(`${HOST}/subject/${this.subjectId}`).url

            const cb = async () => {
              const calendarId = await calendarEventsSaveGameReleaseDate(
                title,
                item.date,
                item.region,
                url
              )
              if (!calendarId) {
                info('添加可能失败了，请检查')
              } else {
                feedback()
                info('添加成功')
              }
            }

            confirm(`${title}\n${item.fullText}\n确定添加到日历中吗？`, cb, '发售提醒')
          } catch (error) {
            info('功能出错，请联系开发者')
          }
        }, 80)
      }
    })
  }

  /** 百度翻译兜底: loading 包裹 → 翻译 → 解析 trans_result 写入指定状态 */
  runBaiduTranslate = async (
    text: string,
    stateKey: 'translateResult' | 'discTranslateResult',
    errorInfo: string
  ) => {
    let hide: () => void
    try {
      hide = loading()
      const response = await baiduTranslate(text)
      hide()

      const { trans_result: result } = JSON.parse(response) as {
        trans_result: TranslateResult
      }
      if (Array.isArray(result)) {
        this.setState(
          stateKey === 'translateResult'
            ? { translateResult: result }
            : { discTranslateResult: result }
        )
        return true
      }

      info(errorInfo)
      return false
    } catch (error) {
      if (hide) hide()

      info(errorInfo)
      return false
    }
  }

  /** 翻译简介 */
  doTranslate = async () => {
    if (this.state.translateResult.length) return

    t('条目.翻译简介', {
      subjectId: this.subjectId
    })

    const isGemini = systemStore.translateEngine === 'gemini'
    const errorInfo = `翻译${isGemini ? '超时' : '失败'}, 请重试`
    let hide: () => void
    try {
      hide = loading()

      // 不管翻译引擎, 先尝试获取云缓存
      const cache = await lxCache(this.summary)
      if (cache) {
        hide()
        this.setState({
          translateResult: cache
        })
        return
      }

      if (isGemini) {
        const response = await lx(this.summary, systemStore.advance)
        hide()

        if (response) {
          this.setState({
            translateResult: response
          })
          return
        }

        hide = loading()
      }

      const response = await baiduTranslate(this.summary)
      hide()

      const { trans_result: translateResult } = JSON.parse(response) as {
        trans_result: TranslateResult
      }
      if (Array.isArray(translateResult)) {
        this.setState({
          translateResult
        })
        return
      }

      info(errorInfo)
    } catch (error) {
      if (hide) hide()

      info(errorInfo)
    }
  }

  /** 翻译曲目 */
  doDiscTranslate = async () => {
    if (this.state.discTranslateResult.length) return

    t('条目.翻译曲目', {
      subjectId: this.subjectId
    })

    const discTitle = []
    this.disc.forEach(item => {
      item.disc.forEach((i, index) => {
        discTitle.push(i.title.replace(`${index + 1} `, ''))
      })
    })

    // 曲目翻译使用 DeepLX 效果不好, 暂不进行接入
    await this.runBaiduTranslate(discTitle.join('\n'), 'discTranslateResult', '翻译失败, 请重试')
  }
}
