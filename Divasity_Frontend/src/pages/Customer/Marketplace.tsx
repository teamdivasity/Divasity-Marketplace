import { TabHeader } from '../../components/Header/TabHeader'
import { Ellipsis } from 'lucide-react'

export function Marketplace() {
  return (
    <div>
        <TabHeader
        name='Marketplace'
        containerStyle='flex-row-reverse bg-white'
        icon={<Ellipsis />}
        />
        <div className='bg-white h-screen'>

        </div>
    </div>
  )
}
