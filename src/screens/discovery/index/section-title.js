/*
 * @Author: czy0729
 * @Date: 2020-11-19 11:05:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-19 11:07:12
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Touchable, Flex, Text, Iconfont } from '@components'
import { SectionTitle as CompSectionTitle } from '@screens/_'
import { _ } from '@stores'
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

SectionTitle.contextTypes = {
  navigation: PropTypes.object
}

export default observer(SectionTitle)

const styles = StyleSheet.create({
  section: {
    marginTop: _.space,
    marginHorizontal: _.wind
  }
})
