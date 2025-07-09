import { Ellipsis } from 'lucide-react'
import { TabHeader } from '../../components/Header/TabHeader'

export function Posts() {
  return (
    <div>
        <TabHeader
        name='Posts'
        containerStyle='flex-row-reverse bg-white'
        icon={<Ellipsis />}
        />
        <div className='bg-white h-screen'>

        </div>
    </div>

  )
}
