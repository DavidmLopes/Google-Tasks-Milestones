import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Tasks from '@components/Tasks'
import Milestones from '../components/Milestones'
import { pdp } from '@/lib/casbin'

export default async function Home() {
    const cookieStore = cookies()
    const accessToken = cookieStore.get('access_token')?.value ?? redirect('/')
    const githubAccessToken =
        cookieStore.get('github_access_token')?.value ?? ''
    const githubName = cookieStore.get('github_name')?.value ?? ''

    const permission = await pdp('alice', 'data1', 'read')
    if (permission.res) {
        console.log('Permission granted')
    } else {
        console.log('Permission denied')
    }

    return (
        <div>
            <div>
                <h2 className="my-4 rounded-md bg-highlights p-2 text-2xl font-bold text-black">
                    Tasks
                </h2>
                <Tasks google={{ accessToken: accessToken }} />
            </div>
            <hr className="my-8"></hr>
            <div>
                <h2 className="my-4 rounded-md bg-highlights p-2 text-2xl font-bold text-black">
                    Github Milestones
                </h2>
                {githubAccessToken === '' || githubName === '' ? (
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
                        google={{ accessToken: accessToken }}
                        github={{ githubAccessToken, githubName }}
                    />
                )}
            </div>
            <div>Hello</div>
        </div>
    )
}
