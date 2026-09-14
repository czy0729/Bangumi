/*
 * @Author: czy0729
 * @Date: 2023-03-14 20:29:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-14 12:00:00
 */
import React, { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Heatmap, Text, Touchable } from '@components'
import { ItemSetting } from '@_'
import { _, userStore } from '@stores'
import { confirm, desc, feedback, stl, TZ } from '@utils'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { TIMEZONE } from '@constants'
import { IconGlobe } from '../icons'
import { getShows } from '../../utils'
import { COMPONENT, TEXTS } from './ds'
import { memoStyles } from './styles'

import type { WithFilterProps } from '../../types'

/** 时区 (渲染在「高级」面板内) */
function Timezone({ filter }: WithFilterProps) {
  r(COMPONENT)

  const [setting, setSetting] = useState({
    formhash: '',
    nickname: '',
    sign_input: '',
    newbio: '',
    timeoffsetnew: '',
    show_nsfw_subject: false as boolean | number
  })

  const getTimezone = useCallback(async () => {
    const data = await userStore.fetchUserSetting()
    if (data._loaded && data.formhash) {
      setSetting({
        formhash: data.formhash,
        nickname: data.nickname,
        sign_input: data.sign_input,
        newbio: data.sign,
        timeoffsetnew: data.timeoffsetnew,
        show_nsfw_subject: data.show_nsfw_subject
      })
    }
  }, [])
  const updateTimezone = useCallback(
    (value: string) => {
      userStore.doUpdateUserSetting(
        {
          ...setting,
          timeoffsetnew: value
        },
        async () => {
          await getTimezone()
          feedback()
        }
      )
    },
    [getTimezone, setting]
  )

  // 挂载即拉取当前账户时区 (原为打开面板时拉取)
  useEffect(() => {
    getTimezone()
  }, [getTimezone])

  const shows = getShows(filter, TEXTS)

  if (!shows || !userStore.isLogin) return null

  const styles = memoStyles()

  const tz = TIMEZONE.find(item => item.value == setting.timeoffsetnew)?.label
  const TZ_AREA = TZ.split('/')?.[1] || ''

  return (
    <>
      {/* 设置时区 */}
      <ItemSetting icon={<IconGlobe />} show={shows.timezone} filter={filter} {...TEXTS.timezone}>
        <Heatmap id='设置.切换' title='设置时区' />
      </ItemSetting>
      <View style={styles.container}>
        <Text style={_.mt.sm} size={13} bold>
          当前账户设置的时区为：
          <Text type='warning' size={13} bold>
            {tz}
          </Text>
        </Text>
        {TIMEZONE.slice()
          .sort((a, b) =>
            desc(
              a.label === '默认时区' ? 2 : a.label.includes(TZ_AREA) ? 1 : 0,
              b.label === '默认时区' ? 2 : b.label.includes(TZ_AREA) ? 1 : 0
            )
          )
          .map(item => {
            const isActive = item.value == setting.timeoffsetnew
            return (
              <Touchable
                key={item.value}
                style={stl(styles.item, isActive && styles.itemActive)}
                animate
                onPress={() => {
                  if (isActive) return

                  confirm(
                    `提交时区设置 ${item.label} 到服务器, 会影响到所有设备的显示, 确定?`,
                    () => {
                      updateTimezone(item.value)

                      t('设置.切换', {
                        title: '设置时区',
                        timezone: item.value
                      })
                    }
                  )
                }}
              >
                <Text>{item.label}</Text>
              </Touchable>
            )
          })}
      </View>
    </>
  )
}

export default observer(Timezone)
