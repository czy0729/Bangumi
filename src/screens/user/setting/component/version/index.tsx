/*
 * @Author: czy0729
 * @Date: 2022-01-22 16:25:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-13 22:51:44
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { IconTouchable, ItemSetting } from '@_'
import { _, systemStore } from '@stores'
import { open } from '@utils'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { GITHUB_RELEASE, URL_RELEASE, VERSION_GITHUB_RELEASE } from '@constants'
import { getShows } from '../../utils'
import { COMPONENT, TEXTS } from './ds'

import type { WithFilterProps } from '../../types'

/** 版本 */
function Version({ filter }: WithFilterProps) {
  r(COMPONENT)

  const shows = getShows(filter, TEXTS)
  if (!shows) return null

  const { name } = systemStore.release
  let hasNewVersion: boolean
  try {
    hasNewVersion =
      name !== VERSION_GITHUB_RELEASE &&
      Number(VERSION_GITHUB_RELEASE.replace(/\./g, '')) < Number(name.replace(/\./g, ''))
  } catch {}

  return (
    <ItemSetting
      hd={TEXTS.version.hd}
      arrow
      arrowStyle={[_.ml.sm, _.mr.xxs]}
      arrowIcon='yuque'
      arrowSize={17}
      highlight
      ft={
        hasNewVersion ? (
          <Text type='success' bold>
            {`${TEXTS.version.ft}${name}`}
            <Text type='sub' bold>
              {' '}
              / {VERSION_GITHUB_RELEASE}
            </Text>
          </Text>
        ) : (
          <Text type='sub' bold>
            {VERSION_GITHUB_RELEASE}
          </Text>
        )
      }
      filter={filter}
      extra={
        <IconTouchable
          style={{
            marginRight: 9
          }}
          name='github'
          size={17}
          onPress={() => {
            open(GITHUB_RELEASE)

            t('设置.跳转', { to: 'Github' })
          }}
        />
      }
      onPress={() => {
        open(URL_RELEASE)

        t('设置.跳转')
      }}
    />
  )
}

export default observer(Version)
