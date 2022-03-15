/*
 * @Author: czy0729
 * @Date: 2020-01-09 16:41:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 05:42:07
 */
import React from 'react'
import { Flex, Text, Touchable, Iconfont } from '@components'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { ob } from '@utils/decorators'

const sectionWidth = parseInt((_.window.width - _.wind * 2 - _._wind) / 2)
const sectionHeight = Math.min(sectionWidth / 2.6, _.device(88, 112))

function MenuItem({ navigation, style, pathname, config, title, icon }) {
  const styles = memoStyles()
  return (
    <Touchable
      style={styles.container}
      onPress={() => {
        t('高级分析.跳转', {
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
        <Iconfont style={styles.icon} name={icon} size={46} />
      </Flex>
    </Touchable>
  )
}

export default ob(MenuItem)

const memoStyles = _.memoStyles(() => ({
  container: {
    marginRight: _._wind,
    marginBottom: _.md,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  block: {
    width: sectionWidth,
    height: sectionHeight,
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
}))
