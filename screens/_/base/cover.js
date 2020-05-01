/*
 * @Author: czy0729
 * @Date: 2020-01-18 17:00:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-01 18:36:16
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { Image } from '@components'
import { _, systemStore } from '@stores'
import { getCoverMedium } from '@utils/app'
import { IMG_DEFAULT } from '@constants'
import { HOST_CDN, CDN_OSS_SUBJECT } from '@constants/cdn'

function Cover({ style, src, noDefault, ...other }) {
  const { dev } = systemStore.state
  const { cdn } = systemStore.setting
  const _src =
    (cdn ? CDN_OSS_SUBJECT(getCoverMedium(src)) : getCoverMedium(src)) ||
    (noDefault ? '' : IMG_DEFAULT)
  return (
    <Image
      style={[
        style,
        dev && typeof _src === 'string' && _src.includes(HOST_CDN) && styles.dev
      ]}
      src={_src}
      {...other}
    />
  )
}

export default observer(Cover)

const styles = StyleSheet.create({
  dev: {
    borderWidth: 1,
    borderColor: _.colorDanger
  }
})
