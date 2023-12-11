'use server'

import { newEnforcer } from 'casbin'

export async function pdp(s, o, a) {
    const enforcer = await newEnforcer(
        './basic_model.conf',
        './basic_policy.csv',
    )
    const r = await enforcer.enforce(s, o, a)
    return { res: r, sub: s, obj: o, act: a }
}
