import { supabase } from "./connection";
export const getListVinos = async () => {
    const { data, error } = await supabase.from("Vinos").select("*");
    console.log("data:", data);
    console.log("error:", error);
    if (error) {
        console.error("Error fetching data:", error.message);
        return [];
    } else {
        return data;
    }
};

