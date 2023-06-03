/*
 * @Author: czy0729
 * @Date: 2021-07-09 23:45:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-03 22:08:34
 */
import React from 'react'
import { Header } from '@components'
import { _ } from '@stores'
import {
  cnjp,
  copy,
  getCoverLarge,
  getCoverMedium,
  getSPAParams,
  loading,
  open
} from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import axios from '@utils/thirdParty/axios'
import { HOST, HOST_CDN, CDN_OSS_SUBJECT, STORYBOOK, URL_SPA } from '@constants'
import { Override } from '@types'
import { Ctx } from '../types'

const TEXT_POST_SHARE = '海报分享'
const TEXT_WEB_SHARE = 'APP 网页版分享'
const DATA = [TEXT_POST_SHARE, TEXT_WEB_SHARE] as const

function IconShare({
  $,
  navigation,
  color
}: Override<
  Ctx,
  {
    color?: any
  }
>) {
  if (STORYBOOK) return null

  return (
    <Header.Popover
      style={_.mr.xs}
      data={DATA}
      name='md-ios-share'
      color={color}
      size={19}
      onSelect={key => {
        setTimeout(async () => {
          switch (key) {
            case TEXT_POST_SHARE:
              if (!navigation) return

              const { images } = $.subject
              let src = CDN_OSS_SUBJECT(getCoverMedium(images?.common))
              if (!src.includes(HOST_CDN)) src = getCoverLarge(images?.common)

              const hide = loading('下载封面中...')

              // @ts-expect-error
              axios.defaults.withCredentials = false

              // @ts-expect-error
              const { request } = await axios({
                method: 'get',
                url: src.replace('http://', 'https://'),
                responseType: 'arraybuffer'
              })
              hide()

              navigation.push('Share', {
                _subjectId: $.subjectId,
                _type: $.type,
                _url: `${HOST}/subject/${$.subjectId}`,
                _cover: `data:image/jpg;base64,${request._response}`,
                _title: cnjp($.cn, $.jp),
                _content: $.summary.replace(/\r\n\r\n/g, '\r\n'),
                _detail: $.tags
                  .filter((item, index) => index <= 4)
                  .map(item => item.name)
                  .join(' · ')
              })

              t('条目.拼图分享', {
                subjectId: $.subjectId,
                spa: false
              })
              break

            case TEXT_WEB_SHARE:
              const url = `${URL_SPA}/${getSPAParams('Subject', {
                subjectId: $.subjectId
              })}`
              copy(
                `【链接】${cnjp($.cn, $.jp)} | Bangumi番组计划\n${url}`,
                '已复制 APP 网页版地址'
              )
              setTimeout(() => {
                open(url)
              }, 1600)

              t('条目.拼图分享', {
                subjectId: $.subjectId,
                spa: true
              })
              break

            default:
              break
          }
        }, 0)
      }}
    />
  )
}

export default ob(IconShare)
