/*
 * @Repo: https://github.com/rajeshnaroth/react-cancelable-promise-hook
 * @Author: czy0729
 * @Date: 2023-02-04 18:11:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-04 18:17:02
 */
import { useRef, useEffect } from 'react'

/** 可取消的 Promise 包装对象 */
type CancelablePromise<T> = {
  /** 取消后 reject(new Error('isCanceled')), 否则与传入 Promise 同结果 */
  promise: Promise<T>
  cancel: () => void
}

/** Promise 包装工厂签名 */
type CancelableFactory = <T>(promise: Promise<T>) => CancelablePromise<T>

/** 包装 Promise 使其支持取消 */
export function makeCancelable<T>(promise: Promise<T>): CancelablePromise<T> {
  let isCanceled = false

  const wrappedPromise = new Promise<T>((resolve, reject) => {
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

/**
 * 组件卸载时自动取消内部未完成的 Promise, 防止卸载后继续 setState
 *
 * @param cancelable Promise 包装工厂, 默认 `makeCancelable`
 * @returns cancellablePromise 用于包装需要在卸载时自动取消的 Promise
 */
export default function useCancelablePromise(cancelable: CancelableFactory = makeCancelable) {
  const emptyPromise = Promise.resolve(true)

  // test if the input argument is a cancelable promise generator
  if (cancelable(emptyPromise).cancel === undefined) {
    throw new Error('promise wrapper argument must provide a cancel() function')
  }

  const promises = useRef<CancelablePromise<unknown>[]>()

  useEffect(() => {
    promises.current = promises.current || []
    return function cancel() {
      promises.current.forEach(p => p.cancel())
      promises.current = []
    }
  }, [])

  function cancellablePromise<T>(promise: Promise<T>): Promise<T> {
    const cPromise = cancelable(promise)
    promises.current.push(cPromise)
    return cPromise.promise
  }

  return {
    /** 包装需在卸载时自动取消的 Promise */
    cancellablePromise
  }
}
