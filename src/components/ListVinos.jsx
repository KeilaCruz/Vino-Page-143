import { getListVinos } from "../backend/services";
import React, { useEffect, useState } from 'react';
function ListVinos() {
    const [vinos, setVinos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getListVinos();
            setVinos(data);
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="vinos__container">
                {vinos.map((vino) =>
                    <div key={vino.info_vino.id} className="vino__card">
                        <img src={vino.info_vino.imagen} alt={vino.info_vino.nombre} />
                        <h2>{vino.info_vino.nombre}</h2>
                        <p>Precio: ${vino.info_vino.precio}</p>
                        <p>Mililitros: {vino.info_vino.mililitros}ml</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default ListVinos