/*
 * @Author: czy0729
 * @Date: 2021-10-21 08:36:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-10-23 12:44:51
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _, subjectStore, systemStore } from '@stores'
import { runAfter } from '@utils'
import { matchBgmLink, navigationReference } from '@utils/app'
import { Touchable } from '../touchable'
import { Flex } from '../flex'
import { Text } from '../text'
import { Iconfont } from '../iconfont'
import { Cover } from './cover'
import { fetchSubjectQueue } from './utils'

function A({ style, attrs = {}, children, passProps, onPress, ...other }) {
  const { href } = attrs
  const result = matchBgmLink(href)
  const route = result?.route

  if (route && route !== 'Subject') console.log(route)
  if (result?.app && route === 'Subject') {
    // AC自动机猜测条目文字
    const text = passProps?.rawChildren?.[0]?.data
    if (text) {
      const { subjectId } = result.params
      const navigation = navigationReference()
      return (
        <Text
          style={style}
          selectable
          underline
          onPress={() =>
            navigation.push('Subject', {
              subjectId,
              _cn: text
            })
          }
        >
          {text}
        </Text>
      )
    }
  } else if (route === 'Subject') {
    // 条目
    const text = passProps?.rawChildren?.[0]?.data
    if (text) {
      const { subjectId } = result.params
      const {
        images = {},
        name,
        name_cn,
        rating = {},
        _loaded
      } = subjectStore.subject(subjectId)
      if (!_loaded) {
        setTimeout(() => {
          runAfter(() => fetchSubjectQueue(subjectId))
        }, 2000)
      } else {
        const { score } = rating
        const image = images.common
        if (image) {
          const styles = memoStyles()
          const top = name_cn || name || text || ''
          const bottom = text !== top && text !== href ? text : name || name_cn || ''
          const showScore = !systemStore.setting.hideScore && score
          const showBottom = bottom && bottom !== top
          return (
            <Flex style={styles.subjectWrap}>
              <Touchable onPress={() => onPress(null, href)}>
                <Flex style={styles.subject}>
                  <Cover src={image} size={48} radius textOnly={false} />
                  <View style={_.ml.sm}>
                    <Text size={12} bold numberOfLines={2} selectable>
                      {top}
                    </Text>
                    {(showScore || showBottom) && (
                      <Flex style={_.mt.xs}>
                        {showScore && (
                          <Flex style={_.mr.xs}>
                            <Iconfont name='md-star' size={10} color={_.colorWarning} />
                            <Text style={_.ml.xxs} type='sub' size={10} bold>
                              {score}
                            </Text>
                          </Flex>
                        )}
                        {showBottom && (
                          <Text
                            style={styles.bottom}
                            type='sub'
                            size={10}
                            bold
                            numberOfLines={1}
                            selectable
                          >
                            {bottom}
                          </Text>
                        )}
                      </Flex>
                    )}
                  </View>
                </Flex>
              </Touchable>
            </Flex>
          )
        }
      }
    }
  } else if (route === 'Topic') {
    const text = passProps?.rawChildren?.[0]?.data
    if (text) {
    }
  }

  return (
    <Text style={style} selectable {...other} onPress={() => onPress(null, href)}>
      {children}
    </Text>
  )
}

export default observer(A)

const memoStyles = _.memoStyles(_ => ({
  subjectWrap: {
    paddingTop: 8,
    paddingRight: 4,
    paddingBottom: 2
  },
  subject: {
    overflow: 'hidden',
    padding: 6,
    paddingRight: 10,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: _.radiusSm
  },
  bottom: {
    maxWidth: _.window.contentWidth / 2
  }
}))
