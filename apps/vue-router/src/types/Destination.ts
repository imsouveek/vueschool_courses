import type Experience from './Experience'

export default interface Destination extends Experience {
    id: number
    experiences: Experience[]
}
