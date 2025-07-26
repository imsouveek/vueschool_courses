import type { InjectionKey } from 'vue'
import type User from './User'

export const userInjectionKey = Symbol() as InjectionKey<User>
