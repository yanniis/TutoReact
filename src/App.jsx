import { useState } from "react"
import { Checkbox } from "./components/forms/checkbox"
import { Input } from "./components/forms/input"
import { ProductCategoryRow } from "./components/products/productCategoryRow"
import { ProductRow } from "./components/products/productRow"
import { Range } from "./components/forms/range"


const PRODUCTS = [
  { category: "Fruits", price: "1$", stocked: true, name: "Apple"},
  { category: "Fruits", price: "1$", stocked: true, name: "Dragonfruit"},
  { category: "Fruits", price: "2$", stocked: false, name: "Passionfruit"},
  { category: "Vegetables", price: "2$", stocked: true, name: "Spinach"},
  { category: "Vegetables", price: "4$", stocked: false, name: "Pumpkin"},
  { category: "Vegetables", price: "1$", stocked: true, name: "Peas"}
]

function App() {

  const [showStockedOnly, setShowStockedOnly] = useState(false)
  const [search, setSearch] = useState('')
  const [range, setRange] = useState('')

  const visibleProduct = PRODUCTS.filter(product => {
    if (showStockedOnly && !product.stocked) {
      return false
    }

    if (search && !product.name.includes(search)) {
      return false
    }

    if (range && !product.price.includes(range)) {
      return false
    }

    return true
  })

  return <div className="container my-3">
    <SearchBar 
    search={search}
    onSearchChange={setSearch}
    showStockedOnly={showStockedOnly} 
    onStockedOnlyChange={setShowStockedOnly}
    range={range}
    onRangeChange={setRange}/>
    <ProductTable products={visibleProduct} />
  </div>

}

function SearchBar ({showStockedOnly, onStockedOnlyChange, search, onSearchChange, range, onRangeChange }) {
  return <div>
    <div className="mb-3">

      <Input 
      value={search} 
      onChange={onSearchChange} 
      placeholder="Rechercher..."/>

      <Checkbox 
      id="stocked" 
      checked={showStockedOnly} 
      onChange={onStockedOnlyChange} 
      label="N'afficher que les produits en stock"/>

      <Range
      value={range}
      onChange={onRangeChange}
      />


    </div>
  </div>
}

function ProductTable ({products}) {
const rows = []
let lastCategory = null

for (let product of products) {
  if (product.category !== lastCategory) {
    rows.push(<ProductCategoryRow key={product.category} name={product.category} />)
  }
  lastCategory = product.category
  rows.push(<ProductRow product={product} key={product.name} />)
}


  return <table>
    <thead>
      <tr>
        <th>Nom</th>
        <th>Prix</th>
      </tr>
    </thead>
    <tbody>
   {rows}
    </tbody>
  </table>
}


export default App
