import { createContext, useContext, useState, useEffect } from "react"
import { supabase } from "../backend/connection";
const AuthContext = createContext(null)
export function useAuth() {
    return useContext(AuthContext);
}
function AuthProvider({ children }) {
    const [session, setSession] = useState(null)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setUser(session?.user)
            setLoading(false)
        });
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user || null); // Asegúrate de que user sea null si no hay sesión
            setLoading(false); // Resetea loading después de cada cambio de estado
        });
        return () => {
            subscription.unsubscribe();
        };
    }, [])
    return (
        <>
            <AuthContext.Provider value={{ session, user, loading }}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

export default AuthProvider