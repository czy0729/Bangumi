/*
 * @Author: czy0729
 * @Date: 2022-01-22 16:25:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-26 04:42:34
 */
import React from 'react'
import { Text } from '@components'
import { ItemSetting } from '@_'
import { _, systemStore } from '@stores'
import { open } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { URL_RELEASE, VERSION_GITHUB_RELEASE } from '@constants'
import { getShows } from '../../utils'
import { COMPONENT, TEXTS } from './ds'

/** 版本 */
function Version({ filter }) {
  const shows = getShows(filter, TEXTS)
  if (!shows) return null

  const { name } = systemStore.release
  let hasNewVersion: boolean
  try {
    hasNewVersion =
      name !== VERSION_GITHUB_RELEASE &&
      Number(VERSION_GITHUB_RELEASE.replace(/\./g, '')) < Number(name.replace(/\./g, ''))
  } catch (error) {}

  return (
    <ItemSetting
      hd={TEXTS.version.hd}
      arrow
      arrowStyle={[_.ml.sm, _.mr.xxs]}
      arrowIcon='md-open-in-new'
      arrowSize={17}
      highlight
      ft={
        hasNewVersion ? (
          <Text type='success' size={15}>
            {TEXTS.version.ft}
            {name}
            <Text type='sub' size={15}>
              {' '}
              / {VERSION_GITHUB_RELEASE}
            </Text>
          </Text>
        ) : (
          <Text type='sub' size={15}>
            {VERSION_GITHUB_RELEASE}
          </Text>
        )
      }
      filter={filter}
      onPress={() => {
        t('设置.跳转')

        open(URL_RELEASE)
      }}
    />
  )
}

export default ob(Version, COMPONENT)
