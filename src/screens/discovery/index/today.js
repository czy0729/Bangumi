/*
 * @Author: czy0729
 * @Date: 2021-07-15 23:27:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-30 17:40:46
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, HorizontalList, Text } from '@components'
import { _ } from '@stores'
import { memo, obc } from '@utils/decorators'
import { initialRenderNumsXs } from './list'
import CoverToday from './cover-today'

const defaultProps = {
  styles: {},
  todayBangumi: []
}

const Today = memo(({ styles, todayBangumi }) => {
  rerender('Discovery.Today.Main')

  return (
    <HorizontalList
      contentContainerStyle={styles.contentContainerStyle}
      data={todayBangumi}
      initialRenderNums={initialRenderNumsXs}
      renderItem={(item, index) => (
        <>
          {index === 2 && (
            <Flex style={styles.split} direction='column' justify='center'>
              <View style={styles.line} />
              <Text size={10} type='sub'>
                now
              </Text>
              <View
                style={[
                  styles.line,
                  {
                    marginTop: _.xs + 2
                  }
                ]}
              />
            </Flex>
          )}
          <CoverToday key={item.id} data={item} />
        </>
      )}
    />
  )
}, defaultProps)

export default obc((props, { $ }) => {
  rerender('Discovery.Today')

  if (!$.todayBangumi.length) return null

  return <Today styles={memoStyles()} todayBangumi={$.todayBangumi} />
})

const memoStyles = _.memoStyles(() => ({
  contentContainerStyle: {
    paddingTop: _.space + 4,
    paddingRight: _.wind - _._wind,
    paddingLeft: _.wind
  },
  split: {
    marginRight: _._wind - _.sm,
    marginLeft: -_.sm
  },
  line: {
    width: 2,
    height: 2,
    marginVertical: _.xs,
    backgroundColor: _.colorIcon,
    borderRadius: 2,
    overflow: 'hidden'
  }
}))
