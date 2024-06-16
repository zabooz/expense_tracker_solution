
import categories from "../categories"


interface Props{
    onSelectCategory:(category:string) => void
}

function Filter({onSelectCategory}:Props) {
  
  return (
    <select className="form-select mb-3" onChange={(e) => onSelectCategory(e.target.value) }>
        <option value=''>All categories</option>
        {categories.map(item => {
          return <option key={item} value={item}>{item}</option>
        })}
    </select>
  )
}

export default Filter