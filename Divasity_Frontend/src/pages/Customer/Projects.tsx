import { TabHeader } from '../../components/Header/TabHeader'
import { Bell } from 'lucide-react'

export function Projects() {
  return (
    <div>
        <TabHeader
        name='My Projects'
        containerStyle='flex-row-reverse bg-white'
        icon={<Bell/>}
        />
        <div className='bg-white h-screen'>

        </div>
    </div>
  )
}
