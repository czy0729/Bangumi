/*
 * @Author: czy0729
 * @Date: 2026-01-17 10:59:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-18 17:08:06
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Image, Squircle, Text } from '@components'
import { _, systemStore } from '@stores'
import { stl } from '@utils'
import { useObserver } from '@utils/hooks'
import { GROUP_THUMB_MAP } from '@assets/images'
import { IMAGE_CONFIG } from './ds'
import { memoStyles } from './styles'

import type { Props as IconMenuProps } from './types'

export type { IconMenuProps }

export function IconMenu({ id, icon, text, size, wrap = true }: IconMenuProps) {
  return useObserver(() => {
    const styles = memoStyles()

    const isSm = systemStore.setting.discoveryMenuNum >= 5
    const iconStyle = isSm ? styles.iconSm : styles.icon
    const { width } = iconStyle

    const baseIconSize = size || 24
    const baseTextSize = size || 16
    const iconSize = baseIconSize - (isSm ? 2 : 0)
    const textSize = baseTextSize - (isSm ? 2 : 0)

    const renderImage = () => {
      const cfg = IMAGE_CONFIG[id]
      if (!cfg) return null

      const { key, altKey, size } = cfg
      return (
        <Image
          src={wrap ? GROUP_THUMB_MAP[key] : GROUP_THUMB_MAP[_.select(altKey!, key)]}
          size={size}
          resizeMode='contain'
          placeholder={false}
          skeleton={false}
        />
      )
    }

    const renderContent = () => {
      const image = renderImage()
      if (image) return image

      if (text) {
        return (
          <Text type={wrap ? '__plain__' : 'desc'} size={textSize} bold>
            {text}
          </Text>
        )
      }

      if (Array.isArray(icon)) {
        return (
          <>
            <Iconfont
              name={icon[0]}
              size={iconSize}
              color={wrap ? _.__colorPlain__ : _.colorTitle}
            />
            <View style={styles.inner}>
              <Iconfont
                name={icon[1]}
                size={9}
                color={_.select(wrap ? _.colorDesc : _.colorPlain, _._colorDarkModeLevel1)}
              />
            </View>
          </>
        )
      }

      return <Iconfont name={icon} size={iconSize} color={wrap ? _.__colorPlain__ : _.colorTitle} />
    }

    const content = (
      <Flex style={stl(iconStyle, wrap && styles.iconBg)} justify='center'>
        {renderContent()}
      </Flex>
    )

    if (!wrap) return content

    const wrapStyle = isSm ? styles.wrapSm : styles.wrap
    return (
      <Squircle style={wrapStyle} width={width} height={width} radius={width}>
        {content}
      </Squircle>
    )
  })
}

export default IconMenu
