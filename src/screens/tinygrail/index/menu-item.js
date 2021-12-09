/*
 * @Author: czy0729
 * @Date: 2019-09-15 10:54:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-09 18:12:35
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
      style={[styles.container, _.isLandscape && index % num === 0 && styles.left]}
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
  const { width, marginLeft } = _.grid(num)
  return {
    container: {
      marginLeft,
      marginBottom: marginLeft,
      borderRadius: _.radiusSm,
      overflow: 'hidden'
    },
    block: {
      width,
      height: width * 0.4,
      paddingLeft: 20,
      backgroundColor: _.tSelect(_.colorTinygrailBorder, _.colorTinygrailBg)
    },
    left: {
      marginLeft: 0
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
