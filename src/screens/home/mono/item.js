/*
 * @Author: czy0729
 * @Date: 2022-03-15 02:19:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-15 02:22:08
 */
import React from 'react'
import { ItemPost } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

const event = {
  id: '人物.跳转',
  data: {
    from: '吐槽'
  }
}

function Item({ item, index }, { navigation }) {
  const styles = memoStyles()
  return (
    <ItemPost
      navigation={navigation}
      contentStyle={styles.contentStyle}
      index={index}
      event={event}
      matchLink={false}
      {...item}
    />
  )
}

export default obc(Item)

const memoStyles = _.memoStyles(() => ({
  contentStyle: {
    paddingRight: _.wind - _.sm
  }
}))
