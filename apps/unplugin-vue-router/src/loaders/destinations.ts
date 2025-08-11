import { defineBasicLoader } from 'unplugin-vue-router/data-loaders/basic'
import type Destination from '@/types/Destination'
import sourceData from '@/data.json'

const sourceArray = sourceData.destinations as Destination[]
export const destinationsList = defineBasicLoader(
    '/destinations',
    async (to) =>
        await sourceArray.map((obj) => {
            return {
                id: obj.id,
                name: obj.name,
                image: obj.image
            }
        })
)
