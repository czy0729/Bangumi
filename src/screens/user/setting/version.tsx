/*
 * @Author: czy0729
 * @Date: 2022-01-22 16:25:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-07 04:36:38
 */
import React from 'react'
import { Text } from '@components'
import { ItemSetting } from '@_'
import { _, systemStore } from '@stores'
import { appNavigate } from '@utils'
import { ob } from '@utils/decorators'
import { URL_RELEASE, VERSION_GITHUB_RELEASE } from '@constants'

function Version() {
  const { name } = systemStore.release
  let hasNewVersion
  try {
    hasNewVersion =
      name !== VERSION_GITHUB_RELEASE &&
      Number(VERSION_GITHUB_RELEASE.replace(/\./g, '')) <
        Number(name.replace(/\./g, ''))
  } catch (error) {}
  return (
    <ItemSetting
      hd='版本'
      arrow
      arrowStyle={[_.ml.sm, _.mr.xxs]}
      arrowIcon='md-open-in-new'
      arrowSize={18}
      highlight
      ft={
        hasNewVersion ? (
          <Text type='success' size={15}>
            有新版本{name}
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
      onPress={() =>
        appNavigate(URL_RELEASE, undefined, undefined, {
          id: '设置.跳转'
        })
      }
    />
  )
}

export default ob(Version)
