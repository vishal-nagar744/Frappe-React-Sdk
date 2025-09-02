import { useFrappeAuth, useFrappeGetDocList } from "../lib"

function UserList() {
    const { currentUser } = useFrappeAuth()
    const { data, error, isLoading } = useFrappeGetDocList(
        "User",
        {
            fields: ["name", "email", "full_name"],
            limit: 10,
            orderBy: { field: "modified", order: "desc" }
        },
        // Pause fetching until user is logged in
        currentUser ? undefined : null
    )

        if (!currentUser) return <p className="text-sm text-gray-600 dark:text-gray-400">Please login to view users.</p>
        if (isLoading) return <p className="text-sm text-gray-600 dark:text-gray-400">Loading users…</p>
        if (error) return <p className="text-sm text-red-600">{error.message}</p>

    return (
            <div className="mt-6">
                <h2 className="text-lg font-semibold mb-3">User List</h2>
                <ul className="divide-y divide-gray-200 dark:divide-gray-800 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
                    {data?.map((user: any) => (
                        <li key={user.name} className="px-4 py-3 text-sm flex items-center justify-between">
                            <span className="font-medium">{user.full_name || user.name}</span>
                            <span className="text-gray-600 dark:text-gray-400">{user.email || "No email"}</span>
                        </li>
                    ))}
                </ul>
            </div>
    )
}

export default UserList
