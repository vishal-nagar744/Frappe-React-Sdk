import { useFrappeAuth } from "../lib"
import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

function Login() {
    const { login, logout, currentUser, error: userStateError } = useFrappeAuth()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitError(null)
        setSubmitting(true)
        try { 
            await login({ username, password })
        } catch (err: any) {
            setSubmitError(err?.message || "Login failed")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="w-full flex justify-center p-4">
            {!currentUser ? (
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle>Login to your account</CardTitle>

                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username / Email</Label>
                                <Input id="username" placeholder="you@example.com or Administrator" value={username} onChange={(e) => setUsername(e.target.value)} required />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">Forgot your password?</a>
                                </div>
                                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            {(submitError || userStateError) && (
                                <p className="text-sm text-red-600">{submitError || userStateError?.message}</p>
                            )}
                            <Button type="submit" className="w-full" disabled={submitting}>
                                {submitting ? "Logging in…" : "Login"}
                            </Button>
                        </form>
                    </CardContent>

                </Card>
            ) : (
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle>Session</CardTitle>
                        <CardDescription>You are logged in</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">Logged in as: <span className="font-medium">{currentUser}</span></p>
                    </CardContent>
                    <CardFooter className="justify-end gap-2">
                        <Button variant="outline" type="button" onClick={() => window.location.reload()}>Refresh</Button>
                        <Button type="button" onClick={() => { setSubmitError(null); logout() }}>Logout</Button>
                    </CardFooter>
                </Card>
            )}
        </div>
    )
}

export default Login
