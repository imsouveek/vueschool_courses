import { defineBasicLoader } from 'unplugin-vue-router/data-loaders/basic'
import type Destination from '@/types/Destination'
import type Experience from '@/types/Experience'
import sourceData from '@/data.json'
import { NavigationResult } from 'unplugin-vue-router/data-loaders'

const sourceArray = sourceData.destinations as Destination[]
export const experienceDetails = defineBasicLoader(
    '/destinations/[id]/experience/[slug]',
    async (to) => {
        console.log(`HERE ${JSON.stringify(to.params)}`)
        const destinationObj = sourceArray.find((obj) => to.params.id === String(obj.id))
        if (!destinationObj) {
            new NavigationResult({ name: '/[...path]', params: { path: 'no-destination' } })
        }
        const experiencesArray = destinationObj?.experiences as Experience[]
        const experienceObj = experiencesArray.find((obj) => to.params.slug === obj.slug)
        if (experienceObj) {
            return experienceObj
        } else {
            return new NavigationResult({ name: '/[...path]', params: { path: 'no-experience' } })
        }
    }
)
