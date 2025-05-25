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
export const insertVenta = async (
    p_id_cliente,
    p_nombre,
    p_rfc,
    p_nombre_empresa,
    p_direccion,
    p_apartamento,
    p_codigo_postal,
    p_ciudad,
    p_estado,
    p_numero_tarjeta,
    p_total,
    p_detalles
) => {
    const { data, error } = await supabase.rpc("insert_venta", {
        p_id_cliente: p_id_cliente,
        p_nombre: p_nombre,
        p_rfc: p_rfc,
        p_nombre_empresa: p_nombre_empresa,
        p_direccion: p_direccion,
        p_apartamento: p_apartamento,
        p_codigo_postal: p_codigo_postal,
        p_ciudad: p_ciudad,
        p_estado: p_estado,
        p_numero_tarjeta: p_numero_tarjeta,
        p_total: p_total,
        p_detalles: p_detalles
    });

    if (error) {
        console.error("Error al insertar venta (desde services.js):", error.message);
        return { data: null, error: error };
    } else {
        return { data: data, error: null };
    }
};