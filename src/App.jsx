import { useState } from "react"
// Importation de composants spécifiques
import { Checkbox } from "./components/forms/checkbox"
import { Input } from "./components/forms/input"
import { ProductCategoryRow } from "./components/products/productCategoryRow"
import { ProductRow } from "./components/products/productRow"
import { Range } from "./components/forms/range"

// Liste de produits initiale avec catégories, prix, statut de stock, et nom
const PRODUCTS = [
  { category: "Fruits", price: "1$", stocked: true, name: "Apple"},
  { category: "Fruits", price: "1$", stocked: true, name: "Dragonfruit"},
  { category: "Fruits", price: "2$", stocked: false, name: "Passionfruit"},
  { category: "Vegetables", price: "2$", stocked: true, name: "Spinach"},
  { category: "Vegetables", price: "4$", stocked: false, name: "Pumpkin"},
  { category: "Vegetables", price: "1$", stocked: true, name: "Peas"}
]

function App() {
  // Gestion des états pour les filtres de recherche et d'affichage
  const [showStockedOnly, setShowStockedOnly] = useState(false)
  const [search, setSearch] = useState('')
  const [range, setRange] = useState('')

  // Filtrer les produits en fonction des états
  const visibleProduct = PRODUCTS.filter(product => {
    // Filtrer les produits en fonction de leur disponibilité en stock si l'option est activée
    if (showStockedOnly && !product.stocked) {
      return false
    }

    // Filtrer les produits en fonction de la recherche par nom
    if (search && !product.name.includes(search)) {
      return false
    }

    // Filtrer les produits en fonction de la plage de prix
    // Si la valeur de range et product.price sont différents alors retourner faux
    // Soit ne pas montrer ce qui ne correspond pas à la valeur des deux
    if (range && !product.price.includes(range)) {
      return false
    }

    // Si aucune condition de filtre ne s'applique, retourner le produit
    return true
  })

  return (
    <div className="container my-3">
      {/* Barre de recherche et de filtres */}
      <SearchBar 
        search={search}
        onSearchChange={setSearch}
        showStockedOnly={showStockedOnly} 
        onStockedOnlyChange={setShowStockedOnly}
        range={range}
        onRangeChange={setRange}
      />
      {/* Tableau des produits filtrés */}
      <ProductTable products={visibleProduct} />
    </div>
  )
}

// Composant SearchBar : barre de recherche et filtres
function SearchBar({ showStockedOnly, onStockedOnlyChange, search, onSearchChange, range, onRangeChange }) {
  return (
    <div>
      <div className="mb-3">
        {/* Champ de recherche pour filtrer par nom */}
        <Input 
          value={search} 
          onChange={onSearchChange} 
          placeholder="Rechercher..."
        />
        {/* Checkbox pour filtrer uniquement les produits en stock */}
        <Checkbox 
          id="stocked" 
          checked={showStockedOnly} 
          onChange={onStockedOnlyChange} 
          label="N'afficher que les produits en stock"
        />
        {/* Slider pour filtrer par plage de prix */}
        <Range
          value={range}
          onChange={onRangeChange}
        />
      </div>
    </div>
  )
}

// Composant ProductTable : affiche les produits sous forme de tableau
function ProductTable({ products }) {
  const rows = []
  let lastCategory = null

  // Boucle sur les produits pour les regrouper par catégorie
  // Demander a chatgpt si on modifie product en canape cela fonctionne quand même
  for (let product of products) {
    // Ajouter une ligne de catégorie si elle change
    if (product.category !== lastCategory) {
      rows.push(<ProductCategoryRow key={product.category} name={product.category} />)
    }
    lastCategory = product.category
    // Ajouter une ligne pour chaque produit
    rows.push(<ProductRow product={product} key={product.name} />)
  }

  return (
    <table>
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
  )
}

export default App
