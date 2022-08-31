/*
 * @Author: czy0729
 * @Date: 2019-09-15 10:54:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 00:37:07
 */
import React from 'react'
import { Flex, Text, Touchable, Iconfont } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'

function MenuItem(
  { style, index, iconStyle, pathname, config, title, icon },
  { navigation }
) {
  const styles = memoStyles()
  const num = _.portrait(2, 4)
  return (
    <Touchable
      style={[styles.container, index % num === 0 && styles.left]}
      onPress={() => {
        t('小圣杯.跳转', {
          to: pathname,
          ...config
        })

        navigation.push(pathname, config)
      }}
    >
      <Flex style={[styles.block, style]}>
        <Text type='tinygrailPlain' size={18} bold>
          {title}
        </Text>
        <Iconfont
          style={iconStyle ? [styles.icon, iconStyle] : styles.icon}
          name={icon}
          size={46}
        />
      </Flex>
    </Touchable>
  )
}

export default obc(MenuItem)

const memoStyles = _.memoStyles(() => {
  const num = _.portrait(2, 4)
  const margin = _.md
  const width = (_.window.width - _.wind * 2 - _.md * (num - 1)) / num
  return {
    container: {
      marginBottom: margin,
      marginLeft: margin,
      borderRadius: _.radiusSm,
      overflow: 'hidden'
    },
    left: {
      marginLeft: 0
    },
    block: {
      width,
      height: width * _.device(0.39, 0.34),
      paddingLeft: 20,
      backgroundColor: _.tSelect(_.colorTinygrailBorder, _.colorTinygrailBg)
    },
    icon: {
      position: 'absolute',
      top: '50%',
      right: -10,
      marginTop: -24,
      color: _.colorTinygrailIcon,
      opacity: 0.24
    }
  }
})
