/*
 * @Author: czy0729
 * @Date: 2022-03-23 00:51:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-19 17:24:33
 */
import { observer } from 'mobx-react'
import { systemStore } from '@stores'
import { stl } from '@utils'
import { useInsets } from '@utils/hooks'
import { s2t } from '@utils/thirdParty/open-cc'
import { Flex } from '../../flex'
import { Text } from '../../text'
import Back from '../back'
import Background from '../background'
import { styles } from './styles'

import type { Props } from './types'

function Header({
  style,
  transparent,
  title,
  color,
  onBackPress,
  headerTitleAlign,
  headerTitleStyle,
  headerTitleSize = 16,
  headerTitleAppend,
  headerTitleTextStyle,
  headerRight
}: Props) {
  const { headerHeight, statusBarHeight } = useInsets()

  const titleText = systemStore.setting.s2t && title ? s2t(title) : title

  return (
    <Flex
      style={stl(styles.header, {
        height: headerHeight,
        paddingTop: statusBarHeight
      })}
    >
      <Background style={stl(style, transparent && styles.transparent)} />
      {!transparent && (
        <Flex
          style={stl(styles.title, headerTitleStyle, {
            top: statusBarHeight
          })}
          justify={headerTitleAlign === 'left' ? 'start' : 'center'}
        >
          <Text
            style={stl(headerTitleTextStyle)}
            size={headerTitleSize}
            numberOfLines={1}
            ellipsizeMode='middle'
          >
            {titleText}
          </Text>
          {!!headerTitleAppend && headerTitleAppend}
        </Flex>
      )}
      <Back color={color} onPress={onBackPress} />
      <Flex.Item />
      {!!headerRight && headerRight()}
    </Flex>
  )
}

export default observer(Header)
