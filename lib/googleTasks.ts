import { redirect } from 'next/navigation'

export async function getUserInfo(access_token: string) {
    return await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            return {
                fullName: data.name,
                name: data.given_name,
                image: data.picture,
            }
        })
}

export async function getAllTaskLists(access_token: string) {
    await verifyToken(access_token)

    const items: Array<{ title: string; id: string }> = await fetch(
        'https://tasks.googleapis.com/tasks/v1/users/@me/lists',
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        },
    )
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            return data.items.map((item: { title: string; id: string }) => {
                return item
            })
        })

    return items
}

export async function getAllTasks(access_token: string) {
    const tasksLists = await getAllTaskLists(access_token)

    await verifyToken(access_token)

    const tasksPromises = tasksLists.map(async (item) => {
        const tasks: Array<{ title: string; id: string }> = await fetch(
            `https://tasks.googleapis.com/tasks/v1/lists/${item.id}/tasks`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            },
        )
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                return data.items.map((item: { title: string; id: string }) => {
                    return item
                })
            })
        return { title: item.title, id: item.id, tasks: tasks }
    })
    const tasks = await Promise.all(tasksPromises).then((data) => {
        return data.flat()
    })

    return tasks
}

export async function insertTask(
    access_token: string,
    taskList: string,
    name: string,
) {
    await verifyToken(access_token)

    await fetch(
        `https://tasks.googleapis.com/tasks/v1/lists/${taskList}/tasks`,
        {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + access_token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: name,
            }),
        },
    )
}

async function verifyToken(token: string) {
    return await fetch(
        `https://oauth2.googleapis.com/tokeninfo?access_token=${token}`,
    )
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            if (data.expires_in !== undefined && data.expires_in > 0) {
                return true
            } else {
                redirect('/logout')
            }
        })
}
