/*
 * @Author: czy0729
 * @Date: 2020-11-19 11:05:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-21 20:33:17
 */
import React from 'react'
import { Touchable, Flex, Text, Iconfont } from '@components'
import { SectionTitle as CompSectionTitle } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'

function SectionTitle({ title, type }, { navigation }) {
  return (
    <CompSectionTitle
      style={styles.section}
      right={
        <Touchable
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
            <Iconfont style={_.ml.xs} name='right' color={_.colorTitle} />
          </Flex>
        </Touchable>
      }
    >
      {title}
    </CompSectionTitle>
  )
}

export default obc(SectionTitle)

const styles = _.create({
  section: {
    marginTop: _.space,
    marginHorizontal: _.wind
  }
})
