import { Content } from '@runtime'
import 'uno.css'

export function Layout() {
  // const [count, setCount] = useState(0)

  return (
    <div>
      <h1 p="2" m="2" className="text-purple-500">Layout component</h1>
      <Content />
    </div>
  )
}
