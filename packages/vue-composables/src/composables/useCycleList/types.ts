import type { MaybeRef } from 'vue'

export interface useCycleListOptions<T> {
    initialValue?: MaybeRef<T>
    fallbackIndex?: number
    getIndexOf?: (value: T, list: T[]) => number
}
