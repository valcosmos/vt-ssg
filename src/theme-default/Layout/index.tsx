import React, { useState } from 'react'

export function Layout() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Layout component</h1>

      <div>
        {count}
        <button type="button" onClick={() => setCount(count + 1)}>Add Count</button>
      </div>
    </div>
  )
}
