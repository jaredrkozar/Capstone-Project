export function CustomDropdown({items, getter, setter}) {
    const handleDropdown = (e) => {
        setter(e.target.value)
    }    
    return (
<select className="rounded-lg bg-gray-200" value={getter} onChange={handleDropdown} required>

{
    items.map( (item) => 
      <option key={item} className="focus:bg-green-400">{item}</option> )
  }
    </select>     
    )
}