import { redirect } from 'next/navigation'

export async function getAllRepos(access_token: string) {
    await verifyToken(access_token)

    const items: Array<{ id: string; name: string }> = await fetch(
        'https://api.github.com/user/repos',
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
            return data
        })

    return items
}

export async function getAllMilestones(access_token: string, name: string) {
    const repos = await getAllRepos(access_token)

    await verifyToken(access_token)

    const milestonesPromises = repos.map(async (repo) => {
        const milestones: Array<{ title: string }> = await fetch(
            `https://api.github.com/repos/${name}/${repo.name}/milestones`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    Accept: 'application/vnd.github+json',
                },
            },
        )
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                return data.map((item: { title: string }) => {
                    return item
                })
            })
        return { name: repo.name, id: repo.id, milestones: milestones }
    })
    const milestones = await Promise.all(milestonesPromises).then((data) => {
        return data.flat()
    })

    return milestones
}

async function verifyToken(access_token: string) {
    return await fetch(`https://api.github.com/user`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    }).then((response) => {
        if (response.ok) {
            return true
        } else {
            redirect('/logout')
        }
    })
}
