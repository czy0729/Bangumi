/*
 * @Author: czy0729
 * @Date: 2021-10-21 08:36:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-10-22 06:57:54
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _, subjectStore } from '@stores'
import { matchBgmLink } from '@utils/app'
import { IMG_WIDTH, IMG_HEIGHT } from '@constants'
import { Touchable } from '../touchable'
import { Flex } from '../flex'
import { Text } from '../text'
import { Cover } from './cover'

function A({ style, attrs = {}, children, passProps, onPress, ...other }) {
  const { href } = attrs
  const result = matchBgmLink(href)
  if (result?.route === 'Subject') {
    const { subjectId } = result.params
    const image = subjectStore.image(subjectId)
    const text = passProps?.rawChildren?.[0]?.data
    if (image && text) {
      const styles = memoStyles()
      const cn = subjectStore.cn(subjectId)
      return (
        <Flex style={styles.subjectWrap}>
          <Touchable onPress={() => onPress(null, href)}>
            <Flex style={styles.subject}>
              <Cover src={image} size={40} radius textOnly={false} />
              <View style={_.ml.sm}>
                <Text size={12} bold>
                  {cn || text}
                </Text>
                {cn && cn !== text && (
                  <Text style={_.mt.xs} size={10} bold type='sub'>
                    {text}
                  </Text>
                )}
              </View>
            </Flex>
          </Touchable>
        </Flex>
      )
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
    paddingVertical: 6
  },
  subject: {
    padding: 6,
    paddingRight: 8,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: _.radiusSm
  }
}))
