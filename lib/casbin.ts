'use server'

import { newEnforcer } from 'casbin'

export async function pdp(s: string, o: string, a: string) {
    const enforcer = await newEnforcer(
        './basic_model.conf',
        './basic_policy.csv',
    )
    const r = await enforcer.enforce(s, o, a)
    return { res: r, sub: s, obj: o, act: a }
}

export async function createUser(email: string) {
    const enforcer = await newEnforcer(
        './basic_model.conf',
        './basic_policy.csv',
    )
    const roles = await enforcer.getRolesForUser(email)

    if (roles.length == 0) {
        await enforcer.addRoleForUser(email, 'free')
        await enforcer.savePolicy()
    }
}

export async function addPremium(email: string) {
    const enforcer = await newEnforcer(
        './basic_model.conf',
        './basic_policy.csv',
    )

    await enforcer.deleteRoleForUser(email, 'free')
    await enforcer.addRoleForUser(email, 'premium')
    await enforcer.savePolicy()
}
