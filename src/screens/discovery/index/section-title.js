/*
 * @Author: czy0729
 * @Date: 2020-11-19 11:05:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-05 11:17:38
 */
import React from 'react'
import { Touchable, Flex, Text, Iconfont } from '@components'
import { SectionTitle as CompSectionTitle } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'

function SectionTitle({ title, type }, { navigation }) {
  rerender('Discovery.SectionTitle')

  const styles = memoStyles()
  return (
    <CompSectionTitle
      style={styles.section}
      right={
        <Touchable
          style={styles.touch}
          onPress={() => {
            t('发现.跳转', {
              to: 'Channel',
              title
            })

            navigation.push('Channel', {
              type
            })
          }}
        >
          <Flex>
            <Text>频道</Text>
            <Iconfont name='md-navigate-next' color={_.colorTitle} />
          </Flex>
        </Touchable>
      }
    >
      {title}
    </CompSectionTitle>
  )
}

export default obc(SectionTitle)

const memoStyles = _.memoStyles(() => ({
  section: {
    marginTop: 24,
    marginHorizontal: _.windSm
  },
  touch: {
    paddingVertical: _.xs,
    paddingLeft: _.md,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
