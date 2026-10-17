import { useState } from "react"
import './Login.css'
import { supabase } from "../lib/supabase"

type props = {
    setPage: (page: "home") => void;
};

export default function Login({setPage} : props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    async function logIn(e: React.FormEvent) {
        e.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return setError(error.message);
        setPage("home");
    }

    return (
        <form className="login" onSubmit={logIn}>
            <h2>Log in</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            {error && <p className="login_error">{error}</p>}
            <button type="submit">Log in</button>
            <button type="button" onClick={() => setPage("home")}>Back</button>
        </form>
    )
}
