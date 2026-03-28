/*
 * @Author: czy0729
 * @Date: 2026-03-10 02:30:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-25 16:38:22
 */
import React, { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Image } from '@components'
import { Popover } from '@_'
import { _, systemStore } from '@stores'
import { MODEL_SETTING_LIVE2D_MODEL, withSplit } from '@constants'
import { GROUP_THUMB_MAP } from '@assets/images'
import { memoStyles } from './styles'

function Live2DMenu() {
  const styles = memoStyles()
  const { live2DV2, live2DModel, live2dScale } = systemStore.setting

  const memoData = useMemo(() => {
    const data = [`live2D${withSplit(live2DV2 ? '开' : '关')}`]
    if (live2DV2) {
      data.push(
        `模型${withSplit(MODEL_SETTING_LIVE2D_MODEL.getLabel(live2DModel))}`,
        `尺寸${withSplit(live2dScale)}`
      )
    }
    return data
  }, [live2DV2, live2DModel, live2dScale])

  const handleSelect = useCallback(
    (label: string) => {
      if (label.includes('live2D')) {
        systemStore.switchSetting('live2DV2')
        return
      }

      if (label.includes('模型')) {
        systemStore.setSetting(
          'live2DModel',
          live2DModel === 'auto_riff'
            ? 'musume_riff'
            : live2DModel === 'musume_riff'
            ? 'black_riff'
            : live2DModel === 'black_riff'
            ? 'musume_classic'
            : 'auto_riff'
        )
        return
      }

      if (label.includes('尺寸')) {
        systemStore.setSetting(
          'live2dScale',
          live2dScale === '大' ? '中' : live2dScale === '中' ? '小' : '大'
        )
        return
      }
    },
    [live2DModel, live2dScale]
  )

  const elContent = useMemo(
    () => (
      <View style={styles.badge}>
        <Flex style={styles.icon} align='start' justify='center'>
          <Image
            src={GROUP_THUMB_MAP[_.select('mesume_0', 'mesume')]}
            size={18}
            resizeMode='contain'
            placeholder={false}
            skeleton={false}
          />
        </Flex>
      </View>
    ),
    [styles]
  )

  return (
    <Popover data={memoData} onSelect={handleSelect}>
      {elContent}
    </Popover>
  )
}

export default observer(Live2DMenu)
