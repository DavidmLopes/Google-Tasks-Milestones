import React from 'react'
import { cookies } from 'next/headers'
import Link from 'next/link'
import Tasks from '@components/Tasks'
import Milestones from '../components/Milestones'
import { pdp } from '@/lib/casbin'
import { getUser } from '@/lib/users'

export default async function Home() {
    const cookieStore = cookies()
    const userToken = cookieStore.get('userToken')?.value ?? ''
    const user = await getUser(userToken)

    const pMilestones = await pdp(user.email, 'milestones', 'read')

    return (
        <div>
            <div>
                <h2 className="my-4 rounded-md bg-highlights p-2 text-2xl font-bold text-black">
                    Tasks
                </h2>
                <Tasks google={{ accessToken: user.accessToken }} />
            </div>
            <hr className="my-8"></hr>
            {pMilestones.res && (
                <div>
                    <h2 className="my-4 rounded-md bg-highlights p-2 text-2xl font-bold text-black">
                        Github Milestones
                    </h2>
                    {user.github_accessToken === undefined ||
                    user.github_username === undefined ? (
                        <div>
                            <span className="font-bold">Note:</span> You need to
                            authorize to view github milestones
                            <div className="flex">
                                <Link href={'/home/authorize'}>
                                    <div className="my-4 w-max rounded-lg bg-green-600 px-6 py-2 text-center font-medium hover:bg-green-700">
                                        Authorize Github
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <Milestones
                            google={{
                                email: user.email,
                                accessToken: user.accessToken,
                            }}
                            github={{
                                githubAccessToken: user.github_accessToken,
                                githubName: user.github_username,
                            }}
                        />
                    )}
                </div>
            )}
        </div>
    )
}
