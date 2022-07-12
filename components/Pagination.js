import styles from "@/styles/Pagination.module.css"

export default function Pagination({ indexState, pagesState }) {
  const [index, setIndex] = indexState
  const [pages, setPages] = pagesState
  console.log(pages);
  if(!pages) return null

  const pagesList = getPagesList(pages, index)

  return (
    <div className={styles.pages}>
      <button
        onClick={() => setIndex(index => index-1)}
        disabled={index === 1}
        style={{marginRight: ".25rem"}}
        >prev
      </button>

      {pagesList.map((page, key) => {
        if(page != null) {
          return <button key={key} onClick={() => setIndex(page)} className={page === index ? styles.active: ""}>{page}</button>
        }

        return <button key={key}>...</button>
      })}

      <button
        onClick={() => setIndex(index => index+1)}
        disabled={index === pagesList.slice(-1)[0]}
        style={{marginLeft: ".25rem"}}
        >next
      </button>
    </div>
  )
}

function getPagesList(pages, selectedPage) {
  const pagesList = []

  if(pages <= 7) {
    for(let i=1; i<=pages; i++) {
      pagesList.push(i)
    }
  } else {
    pagesList.push(1)

    if(selectedPage < 3) {
      pagesList.push(2)
      pagesList.push(3)
      pagesList.push(4)
      pagesList.push(5)
      pagesList.push(null)
    } else if (selectedPage > pages - 3) {
      pagesList.push(null)
      for(let i=pages-4; i<pages; i++) pagesList.push(i)
    } else {
      pagesList.push(null)
      for(let i=selectedPage-1; i<=selectedPage+1; i++) pagesList.push(i)
      pagesList.push(null)
    }
    
    pagesList.push(pages)
  }

  return pagesList
}
