import type { Ref, InjectionKey } from 'vue'

export const DarkModeInjectionKey = Symbol() as InjectionKey<Ref<boolean>>
