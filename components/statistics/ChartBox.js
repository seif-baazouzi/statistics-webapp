import { useEffect, useRef, useState } from "react"

export default function ChartBox({ childComponent, props }) {
  const ref = useRef(null)
  const [width, setWidth] = useState(ref?.current?.offsetWidth)

  useEffect(() => {
    const handleResize = () => setWidth(ref?.current?.offsetWidth)
    
    handleResize()
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  })

  const height = width * .40;

  return(
    <div className="chart-box-container">
      <div ref={ref}>
        {childComponent({
          width,
          height,
          ...props
        })}
      </div>
    </div>
  )
}
