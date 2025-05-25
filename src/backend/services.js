import { supabase } from "./connection";
export const getListVinos = async () => {
    const { data, error } = await supabase.rpc('get_vinos');
    if (error) {
        console.error("Error al obtener vinos:", error.message);
        return;
    } else {
        return data;
    }
};

export const registrarUsuario = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });
    if (error) {
        console.error("Error al registrar usuario:", error.message);
        return;
    } else {
        return data;
    }
}
export const loginUsuario = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });
    if (error) {
        console.error("Error al iniciar sesión:", error.message);
        return;
    } else {
        return data;
    }

}
export const logoutUsuario = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error("Error al cerrar sesión:", error.message);
        return;
    } else {
        return true;
    }
}

export const getVino = async (id) => {
    const { data, error } = await supabase.rpc("get_unique_vino", { id_vino: id });
    if (error) {
        console.error("Error al obtener el vino:", error.message);
        return;
    } else {
        return data;
    }
}