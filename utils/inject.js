/*
 * @Author: czy0729
 * @Date: 2019-03-27 13:18:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-28 02:10:04
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import Stores from '@stores'
import { urlStringify } from './index'

const Inject = (Store, { cache = true } = {}) => ComposedComponent =>
  observer(
    class extends React.Component {
      static navigationOptions = ComposedComponent.navigationOptions

      static childContextTypes = {
        $: PropTypes.object,
        navigation: PropTypes.object
      }

      constructor(props) {
        super(props)

        const { navigation } = props
        const { state } = navigation
        const screenKey = `${state.routeName}?${urlStringify(state.params)}`

        this.$ = Stores.get(screenKey)
        if (!this.$) {
          this.$ = new Store()
          this.$.params = {
            ...navigation.state.params
          }
        }

        if (cache) {
          Stores.add(screenKey, this.$)
        }
      }

      $

      getChildContext() {
        const { navigation } = this.props

        return {
          $: this.$,
          navigation
        }
      }

      render() {
        return <ComposedComponent {...this.props} />
      }
    }
  )

export default Inject
