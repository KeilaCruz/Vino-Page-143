import { getListVinos } from "../backend/services";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
function ListVinos() {
    const [vinos, setVinos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const handleVinoClick = (id) => {
        navigate(`/preCompra/${id}`);
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getListVinos();
                setVinos(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="vinos__container">
                {loading ? (
                    <>
                        <div className="loading-center-container">
                            <p>Cosecha joven</p>
                            <div className="lds-ring">
                                <div></div><div></div><div></div><div></div>
                            </div>
                        </div>
                    </>
                ) : (
                    vinos.map((vino) =>
                        <div key={vino.info_vino.id} className="vino__card" onClick={() => handleVinoClick(vino.info_vino.id)}>
                            <img src={vino.info_vino.imagen} alt={vino.info_vino.nombre} />
                            <h2>{vino.info_vino.nombre}</h2>
                            <p>Precio: ${vino.info_vino.precio}</p>
                            <p>Mililitros: {vino.info_vino.mililitros}ml</p>
                        </div>
                    ))}
            </div>
        </>
    )
}

export default ListVinos