import React from 'react'
import { cookies } from 'next/headers'
import { getAllTasks } from '@lib/googleTasks'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getAllMilestones } from '@/lib/github'

export default async function Home() {
    const cookieStore = cookies()
    const accessToken = cookieStore.get('access_token')?.value ?? redirect('/')
    const githubAccessToken =
        cookieStore.get('github_access_token')?.value ?? ''
    const githubName = cookieStore.get('github_name')?.value ?? ''

    const tasks = await getAllTasks(accessToken)

    return (
        <div>
            <div>
                <h2 className="my-4 rounded-md bg-highlights p-2 text-2xl font-bold text-black">
                    Tasks
                </h2>
                <ul>
                    {tasks.map((item) => {
                        return (
                            <li key={item.id}>
                                <h3 className="font-bold">{item.title}</h3>
                                <ul className="indent-4">
                                    {item.tasks.map((task) => {
                                        return (
                                            <li key={task.id}>{task.title}</li>
                                        )
                                    })}
                                </ul>
                            </li>
                        )
                    })}
                </ul>
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
                    <ul>
                        {(
                            await getAllMilestones(
                                githubAccessToken,
                                githubName,
                            )
                        ).map((repo) => {
                            return (
                                <li key={repo.id}>
                                    <h3 className="font-bold">{repo.name}</h3>
                                    <ul className="indent-4">
                                        {repo.milestones.length === 0 ? (
                                            <li>Empty</li>
                                        ) : (
                                            repo.milestones.map((milestone) => {
                                                return (
                                                    <li key={milestone.title}>
                                                        {milestone.title}
                                                    </li>
                                                )
                                            })
                                        )}
                                    </ul>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
        </div>
    )
}
