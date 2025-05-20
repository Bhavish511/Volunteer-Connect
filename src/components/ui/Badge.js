import "./Badge.css"

const Badge = ({ children, variant = "default", size = "medium", className = "", ...props }) => {
  const badgeClasses = `
    badge 
    badge-${variant} 
    badge-${size} 
    ${className}
  `

  return (
    <span className={badgeClasses} {...props}>
      {children}
    </span>
  )
}

export default Badge
