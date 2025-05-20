
import CardCarousel from '../components/CardCarousel.jsx'
import Procedimiento from '../components/Procedimiento.jsx'
function HomePage() {
    return (
        <>
            <CardCarousel title="Fermentación de la uva" description="Transformación del jugo en vino a través de levaduras naturales" image="https://imgs.search.brave.com/sjVDsN892HMWlxuapy1koljikYkUZ6RsgDXNyqPsroc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90by1ncmF0aXMv/dmFzby12aW5vLXRp/bnRvXzY1Nzg4My00/MjMuanBnP3NlbXQ9/YWlzX2h5YnJpZA" />
            <Procedimiento />
        </>
    )
}

export default HomePage