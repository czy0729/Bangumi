/*
 * @Author: czy0729
 * @Date: 2026-03-10 02:30:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-10 07:08:32
 */
import React, { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { Flex, Image } from '@components'
import { Popover } from '@_'
import { _, systemStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { MODEL_SETTING_LIVE2D_MODEL, TEXT_MENU_SPLIT_LEFT, TEXT_MENU_SPLIT_RIGHT } from '@constants'
import { GROUP_THUMB_MAP } from '@assets/images'
import { memoStyles } from './styles'

function Live2DMenu() {
  return useObserver(() => {
    const styles = memoStyles()
    const { live2D, live2DModel, live2dScale } = systemStore.setting

    const memoData = useMemo(() => {
      const data = [`live2D${TEXT_MENU_SPLIT_LEFT}${live2D ? '开' : '关'}${TEXT_MENU_SPLIT_RIGHT}`]
      if (live2D) {
        data.push(
          `模型${TEXT_MENU_SPLIT_LEFT}${MODEL_SETTING_LIVE2D_MODEL.getLabel(
            live2DModel
          )}${TEXT_MENU_SPLIT_RIGHT}`,
          `尺寸${TEXT_MENU_SPLIT_LEFT}${live2dScale}${TEXT_MENU_SPLIT_RIGHT}`
        )
      }
      return data
    }, [live2D, live2DModel, live2dScale])

    const handleSelect = useCallback(
      (label: string) => {
        if (label.includes('live2D')) {
          systemStore.switchSetting('live2D')
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
  })
}

export default Live2DMenu
