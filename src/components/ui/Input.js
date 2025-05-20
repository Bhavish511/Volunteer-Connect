import "./Input.css"

const Input = ({ type = "text", label, error, id, className = "", fullWidth = false, size = "medium", ...props }) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

  const inputClasses = `
    input 
    input-${size} 
    ${error ? "input-error" : ""} 
    ${fullWidth ? "input-full-width" : ""} 
    ${className}
  `

  return (
    <div className={`input-container ${fullWidth ? "input-container-full-width" : ""}`}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}
      <input type={type} id={inputId} className={inputClasses} {...props} />
      {error && <p className="input-error-message">{error}</p>}
    </div>
  )
}

export default Input
