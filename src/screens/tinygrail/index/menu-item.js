/*
 * @Author: czy0729
 * @Date: 2019-09-15 10:54:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:15:41
 */
import React from 'react'
import { Flex, Text, Touchable, Iconfont } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'

const sectionWidth = parseInt((_.window.width - _.wind * 2 - _._wind) / 2)
const sectionHeight = Math.min(sectionWidth / 2.68, 88)

function MenuItem({ style, pathname, config, title, icon }, { navigation }) {
  const styles = memoStyles()
  return (
    <Touchable
      style={styles.container}
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
        <Iconfont style={styles.icon} name={icon} size={46} />
      </Flex>
    </Touchable>
  )
}

export default obc(MenuItem)

const memoStyles = _.memoStyles(_ => ({
  container: {
    marginRight: _._wind,
    marginBottom: _.isPad ? 16 : _.space,
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
    opacity: 0.16
  }
}))
