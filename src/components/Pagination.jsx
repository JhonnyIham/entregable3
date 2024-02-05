import { useState } from 'react'
import './styles/pagination.css'

const Pagination = ({currentPage, setCurrentPage, totalPage}) => {
  
    const btnForPage = 5
    const [currentBtn, setCurrentBtn] = useState(0)


    const btnGenerator = () => {
        const btns = []
        const start = currentBtn * btnForPage + 1
        const end = Math.min(start + btnForPage - 1, totalPage)

        for (let i = start; i <= end ; i++) {
            btns.push(<button className='pagination__page' onClick={() => setCurrentPage(i)} key={i}>{i}</button>)
        }
        return btns
    }

    const handlePrev = () => {
        if (currentBtn > 0) {
            setCurrentBtn(currentBtn - 1)
        }
    }
    const handleNext = () => {
        if (currentBtn < Math.ceil(totalPage / btnForPage) - 1) {
            setCurrentBtn(currentBtn + 1)
        }
    }

  return (
    <div className="pagination">
        <button className='pagination__button' onClick={handlePrev}>&lt;</button>
            {btnGenerator()}
        <button className='pagination__button' onClick={handleNext}>&gt;</button>
    </div>

  )
}
export default Pagination