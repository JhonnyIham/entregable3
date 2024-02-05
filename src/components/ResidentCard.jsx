import { useEffect } from "react"
import useFetch from "../hooks/useFetch"
import "./styles/residentCard.css"

const ResidentCard = ({resident}) => {

    const[character, getCharacter] = useFetch()

    useEffect(() => {
        const url = resident
        getCharacter(url)
    }, [])
  
  return (
    <article className="resident">
        <figure className="resident__photo">
            <img src={character?.image} alt="character image" />
            <figcaption className="resident__status">
                <div className={`resident__circle ${character?.status}`}></div>
                <p>{character?.status}</p>
            </figcaption>
        </figure>
        <h3 className="resident__name">{character?.name}</h3>
        <hr />
        <ul className="resident__list">
            <li className="resident__item"><span>Specie</span> <span>{character?.species}</span></li>
            <li className="resident__item"><span>Origin</span> <span>{character?.origin.name}</span></li>
            <li className="resident__item"><span>Eppisodes wher appear</span> <span>{character?.episode.length}</span></li>
        </ul>
    </article>
  )
}
export default ResidentCard