export function Range ({value, onChange}) {
    return <div className="form-check">
        <input 
        type="range" 
        min={0} 
        max={10}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        />
    </div>
}