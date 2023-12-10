import { getAllMilestones } from '@/lib/github'
import React from 'react'
import AddTaskForm from './AddTaskForm'
import { getAllTaskLists } from '@/lib/googleTasks'

export default async function Milestones({
    google,
    github,
}: {
    google: { accessToken: string }
    github: { githubAccessToken: string; githubName: string }
}) {
    const taskLists = await getAllTaskLists(google.accessToken)

    return (
        <ul>
            {(
                await getAllMilestones(
                    github.githubAccessToken,
                    github.githubName,
                )
            ).map((repo) => {
                return (
                    <li key={repo.id} className="py-2">
                        <div className="rounded-md bg-neutral-300 p-2 dark:bg-neutral-700">
                            <h3 className="inline px-2 font-bold">
                                {repo.name}
                            </h3>
                            {'(' + repo.milestones.length + ')'}
                        </div>
                        {repo.milestones.length !== 0 && (
                            <ul className="indent-4">
                                {repo.milestones.map((milestone, index) => {
                                    return (
                                        <li
                                            key={repo.name + '-' + index}
                                            className="my-1 flex items-center justify-between rounded-md bg-neutral-100 p-2 dark:bg-neutral-900"
                                        >
                                            {milestone.title}
                                            <AddTaskForm
                                                google={{
                                                    accessToken:
                                                        google.accessToken,
                                                }}
                                                name={milestone.title}
                                                taskLists={taskLists}
                                            />
                                        </li>
                                    )
                                })}
                            </ul>
                        )}
                    </li>
                )
            })}
        </ul>
    )
}
