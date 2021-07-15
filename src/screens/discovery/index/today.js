/*
 * @Author: czy0729
 * @Date: 2021-07-15 23:27:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-16 01:41:10
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, HorizontalList, Iconfont } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { initialRenderNumsXs } from './list'
import CoverToday from './cover-today'

function Today(props, { $ }) {
  if (!$.todayBangumi.length) return null
  return (
    <HorizontalList
      contentContainerStyle={styles.contentContainerStyle}
      data={$.todayBangumi}
      initialRenderNums={initialRenderNumsXs}
      renderItem={(item, index) => (
        <>
          {index === 2 && (
            <Flex style={styles.split} direction='column' justify='center'>
              <View style={styles.line} />
              <Iconfont name='md-access-time' color={_.colorIcon} size={16} />
              <View style={styles.line} />
            </Flex>
          )}
          <CoverToday key={item.id} data={item} />
        </>
      )}
    />
  )
}

export default obc(Today)

const styles = _.create({
  contentContainerStyle: {
    paddingVertical: _.space + 4,
    paddingRight: _.wind - _._wind,
    paddingLeft: _.wind
  },
  split: {
    marginRight: _._wind - _.xs,
    marginLeft: -_.xs,
    opacity: 0.8
  },
  line: {
    width: 1,
    height: _.md,
    marginVertical: _.sm,
    backgroundColor: _.colorIcon
  }
})
