import { defineBasicLoader } from 'unplugin-vue-router/data-loaders/basic'
import type Destination from '@/types/Destination'
import sourceData from '@/data.json'
import { NavigationResult } from 'unplugin-vue-router/data-loaders'

const sourceArray = sourceData.destinations as Destination[]
export const destinationDetails = defineBasicLoader('/destinations/[id]', async (to) => {
    const resultObj = sourceArray.find((obj) => to.params.id === String(obj.id))
    if (resultObj) {
        return resultObj
    } else {
        return new NavigationResult({ name: '/[...path]', params: { path: 'no-destination' } })
    }
})
