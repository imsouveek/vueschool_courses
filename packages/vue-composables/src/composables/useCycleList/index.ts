import { computed, ref, toRef, toValue, type MaybeRef, type MaybeRefOrGetter, type Ref } from 'vue'

export interface useCycleListOptions<T> {
    initialValue?: MaybeRef<T>
    fallbackIndex?: number
    getIndexOf?: (value: T, list: T[]) => number
}

export const useCycleList = <T>(list: MaybeRefOrGetter<T[]>, config?: useCycleListOptions<T>) => {
    const useCycleListDefaults = {
        fallbackIndex: 0,
        getIndexOf: <T>(value: T, list: T[]) => {
            return list.indexOf(value)
        }
    }

    const mergedConfig = {
        ...useCycleListDefaults,
        ...config
    }

    const activeIndex = ref(0)
    const _list = toRef(list) as Ref<T[]>

    const state = computed({
        get: () => _list.value[activeIndex.value],
        set: (value: T) => (_list.value[activeIndex.value] = value)
    })

    const index = computed({
        get: () => activeIndex.value,
        set: (v) => go(v)
    })

    const prev = (value?: MaybeRef<T> | null, steps: number = 1) => {
        if (value) {
            find(toValue(value), -1)
        } else {
            go(-steps)
        }
    }

    const next = (value?: MaybeRef<T> | null, steps: number = 1) => {
        if (value) {
            return find(toValue(value))
        } else {
            go(steps)
        }
    }

    const go = (i: number) => {
        activeIndex.value += i + _list.value.length
        activeIndex.value %= _list.value.length
    }

    const find = (value: T, dir: number = 1): void => {
        let idx: number = -1
        let targetList: T[]
        const currPos = activeIndex.value

        // Search items left after activeIndex in search direction
        if (dir > 0) {
            targetList = _list.value.slice(currPos + 1)
        } else {
            targetList = _list.value.slice(0, currPos).reverse()
        }
        idx = mergedConfig.getIndexOf(value, targetList)

        if (idx >= 0) {
            return dir > 0 ? go(idx + 1) : go(-1 - idx)
        }

        // Wrap around and search in search direction
        if (dir > 0) {
            targetList = _list.value.slice(0, currPos + 1)
        } else {
            targetList = _list.value.slice(currPos).reverse()
        }
        idx = mergedConfig.getIndexOf(value, targetList)

        // Not found
        if (idx < 0) {
            return go(mergedConfig.fallbackIndex - currPos)
        }

        return dir > 0 ? go(idx - currPos) : go(_list.value.length - idx - currPos - 1)
    }

    if (config?.initialValue) {
        find(toValue(config.initialValue))
    }

    return {
        state,
        index,
        prev,
        next
    }
}
