/*
 * @Author: czy0729
 * @Date: 2019-05-17 05:06:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-27 02:31:19
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { _ } from '@stores'

function Tag({ style, type, value, size }) {
  if (!value) {
    return null
  }

  const styles = memoStyles()
  let _type = type
  if (!_type) {
    switch (value) {
      case '动画':
      case '主角':
        _type = 'main'
        break
      case '书籍':
      case '配角':
        _type = 'primary'
        break
      case '游戏':
        _type = 'success'
        break
      case '音乐':
      case '客串':
      case 'H':
        _type = 'warning'
        break
      case '三次元':
        _type = _.select('plain', 'title')
        break
      default:
        _type = _.select('plain', 'title')
        break
    }
  }

  return (
    <Flex style={[styles.tag, styles[_type], style]}>
      <Text type={_.select('sub', _type)} size={size}>
        {value}
      </Text>
    </Flex>
  )
}

Tag.defaultProps = {
  size: 10
}

export default observer(Tag)

const memoStyles = _.memoStyles(_ => ({
  tag: {
    paddingVertical: 1,
    paddingHorizontal: _.xs,
    borderWidth: _.hairlineWidth,
    borderRadius: _.radiusXs
  },
  main: {
    backgroundColor: _.select(_.colorMainLight, _._colorDarkModeLevel1),
    borderColor: _.select(_.colorMainBorder, _._colorDarkModeLevel1)
  },
  primary: {
    backgroundColor: _.select(_.colorPrimaryLight, _._colorDarkModeLevel1),
    borderColor: _.select(_.colorPrimaryBorder, _._colorDarkModeLevel1)
  },
  success: {
    backgroundColor: _.select(_.colorSuccessLight, _._colorDarkModeLevel1),
    borderColor: _.select(_.colorSuccessBorder, _._colorDarkModeLevel1)
  },
  warning: {
    backgroundColor: _.select(_.colorWarningLight, _._colorDarkModeLevel1),
    borderColor: _.select(_.colorWarningBorder, _._colorDarkModeLevel1)
  },
  plain: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderColor: _.select(_.colorBorder, _._colorDarkModeLevel1)
  },
  title: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderColor: _.select(_.colorBorder, _._colorDarkModeLevel1)
  }
}))
