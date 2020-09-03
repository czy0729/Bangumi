/*
 * @Author: czy0729
 * @Date: 2019-05-17 05:06:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-09-03 20:47:25
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
  let isActive = false
  if (!_type) {
    switch (value) {
      case '动画':
      case '主角':
      case '动画化':
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

      case '想看':
      case '想读':
      case '想听':
      case '想玩':
      case '已收藏':
        isActive = true
        _type = 'mainActive'
        break

      case '看过':
      case '读过':
      case '听过':
      case '玩过':
        isActive = true
        _type = 'warningActive'
        break

      case '在看':
      case '在读':
      case '在听':
      case '在玩':
        isActive = true
        _type = 'primaryActive'
        break

      case '搁置':
      case '抛弃':
        isActive = true
        _type = 'waitActive'
        break

      default:
        _type = _.select('plain', 'title')
        break
    }
  }

  return (
    <Flex style={[styles.tag, styles[_type], style]}>
      <Text
        type={isActive ? _.select('plain', 'title') : _.select('sub', _type)}
        size={size}
      >
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
  },
  mainActive: {
    backgroundColor: _.colorMain,
    borderColor: _.colorMain
  },
  warningActive: {
    backgroundColor: _.colorWarning,
    borderColor: _.colorWarning
  },
  primaryActive: {
    backgroundColor: _.colorPrimary,
    borderColor: _.colorPrimary
  },
  waitActive: {
    backgroundColor: _.colorWait,
    borderColor: _.colorWait
  }
}))
