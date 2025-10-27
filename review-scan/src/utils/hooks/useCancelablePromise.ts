/*
 * @Repo: https://github.com/rajeshnaroth/react-cancelable-promise-hook
 * @Author: czy0729
 * @Date: 2023-02-04 18:11:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-04 18:17:02
 */
import { useRef, useEffect } from 'react'

export function makeCancelable(promise) {
  let isCanceled = false

  const wrappedPromise = new Promise((resolve, reject) => {
    promise
      .then(val => (isCanceled ? reject(new Error('isCanceled')) : resolve(val)))
      .catch(error => (isCanceled ? reject(new Error('isCanceled')) : reject(error)))
  })

  return {
    promise: wrappedPromise,
    cancel() {
      isCanceled = true
    }
  }
}

export default function useCancelablePromise(cancelable = makeCancelable) {
  const emptyPromise = Promise.resolve(true)

  // test if the input argument is a cancelable promise generator
  if (cancelable(emptyPromise).cancel === undefined) {
    throw new Error('promise wrapper argument must provide a cancel() function')
  }

  const promises = useRef<any>()

  useEffect(() => {
    promises.current = promises.current || []
    return function cancel() {
      promises.current.forEach(p => p.cancel())
      promises.current = []
    }
  }, [])

  function cancellablePromise(p) {
    const cPromise = cancelable(p)
    promises.current.push(cPromise)
    return cPromise.promise
  }

  return { cancellablePromise }
}
