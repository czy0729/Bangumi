/*
 * @Author: czy0729
 * @Date: 2023-03-14 20:29:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-25 05:04:27
 */
import React, { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import { ActionSheet, Heatmap, Text, Touchable } from '@components'
import { ItemSetting } from '@_'
import { _, userStore } from '@stores'
import { confirm, desc, feedback, stl, TZ } from '@utils'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { useBoolean, useObserver } from '@utils/hooks'
import { TIMEZONE } from '@constants'
import { getShows } from '../../utils'
import { COMPONENT, TEXTS } from './ds'
import { memoStyles } from './styles'

/** 时区 */
function Timezone({ filter }) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(false)
  const [setting, setSetting] = useState({
    formhash: '',
    nickname: '',
    sign_input: '',
    newbio: '',
    timeoffsetnew: ''
  })

  const getTimezone = useCallback(async () => {
    const data = await userStore.fetchUserSetting()
    if (data._loaded && data.formhash) {
      setSetting({
        formhash: data.formhash,
        nickname: data.nickname,
        sign_input: data.sign_input,
        newbio: data.sign,
        timeoffsetnew: data.timeoffsetnew
      })
    }
  }, [])
  const updateTimezone = useCallback(
    value => {
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

  useEffect(() => {
    if (state) getTimezone()
  }, [state, getTimezone])

  const shows = getShows(filter, TEXTS)
  return useObserver(() => {
    if (!shows || !userStore.isLogin) return null

    const styles = memoStyles()
    const tz = TIMEZONE.find(item => item.value == setting.timeoffsetnew)?.label
    const TZ_AREA = TZ.split('/')?.[1] || ''
    return (
      <>
        <ItemSetting hd='时区' arrow highlight filter={filter} onPress={setTrue} />
        <ActionSheet show={state} height={filter ? 440 : 640} title='时区' onClose={setFalse}>
          {/* 设置时区 */}
          <ItemSetting show={shows.timezone} filter={filter} {...TEXTS.timezone}>
            <Heatmap id='设置.切换' title='设置时区' />
          </ItemSetting>
          <View style={_.container.wind}>
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
        </ActionSheet>
      </>
    )
  })
}

export default Timezone
