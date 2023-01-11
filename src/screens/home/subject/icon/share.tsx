/*
 * @Author: czy0729
 * @Date: 2021-07-09 23:45:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-11 10:02:31
 */
import React from 'react'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { getCoverMedium, getCoverLarge, cnjp } from '@utils/app'
import { t } from '@utils/fetch'
import { loading } from '@utils/ui'
import axios from '@utils/thirdParty/axios'
import { HOST, HOST_CDN, CDN_OSS_SUBJECT } from '@constants'
import { Override } from '@types'
import { Ctx } from '../types'

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
  return (
    <IconTouchable
      style={_.mr.xs}
      name='md-ios-share'
      color={color}
      size={19}
      onPress={async () => {
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
          subjectId: $.subjectId
        })
      }}
    />
  )
}

export default ob(IconShare)
