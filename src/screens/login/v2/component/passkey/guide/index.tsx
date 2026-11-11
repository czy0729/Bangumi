/*
 * @Date: 2026-11-01
 *
 * 独立说明入口: 图片未补齐时展示三个占位, 补齐后打开与主题相同的图集
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Modal, Text, Touchable } from '@components'
import { _ } from '@stores'
import { showImageViewer } from '@utils'
import { useBackHandler, useBoolean } from '@utils/hooks'
import { GUIDE_IMAGES } from './ds'
import { memoStyles } from './styles'
import { getGuideThumbs } from './utils'

import type { Props } from './types'

function Guide({ disabled }: Props) {
  const { state, setTrue, setFalse } = useBoolean(false)
  const styles = memoStyles()
  useBackHandler(() => {
    if (!state) return false
    setFalse()
    return true
  })

  return (
    <>
      <Touchable
        style={styles.icon}
        accessibilityLabel='Passkey登录说明'
        accessibilityRole='button'
        disabled={disabled}
        onPress={
          disabled
            ? undefined
            : () => {
                const thumbs = getGuideThumbs(GUIDE_IMAGES)
                if (thumbs.length === GUIDE_IMAGES.length) {
                  showImageViewer(thumbs, 0, true, true)
                  return
                }
                setTrue()
              }
        }
      >
        <Iconfont name='md-info-outline' size={14} />
      </Touchable>
      <Modal visible={state} title='Passkey登录说明' onClose={setFalse}>
        <Text size={12} lineHeight={18} type='sub'>
          使用已在 bgm.tv 绑定的 Passkey。首次使用前，请在凭据提供方中信任本应用。
        </Text>
        <Flex style={styles.images} align='start'>
          {GUIDE_IMAGES.map((image, index) => (
            <View
              key={image.id}
              style={[styles.slot, index < GUIDE_IMAGES.length - 1 && styles.gap]}
            >
              <Text size={13} type='sub'>
                图片 {image.id}
              </Text>
              <Text style={_.mt.xs} size={11} type='sub'>
                待补充
              </Text>
            </View>
          ))}
        </Flex>
      </Modal>
    </>
  )
}

export default observer(Guide)
