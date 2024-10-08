import { useState } from 'react'
import KodikVideo from './KodikPlayer'
import { Tab, Tabs } from '@nextui-org/react'

interface Props {
  shikiId: string
}

function Video({ shikiId }: Props) {
  const [selected, setSelected] = useState('kodik')

  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Players"
        selectedKey={selected}
        variant="light"
        radius="sm"
        classNames={{
          cursor: 'bg-[#eb5628]',
          tabContent: 'group-data-[selected=true]:text-white'
        }}
        size="lg"
        onSelectionChange={(key) => setSelected(key as string)}
      >
        <Tab key="kodik" title="Kodik" className="flex-col flex gap-3">
          <KodikVideo id={shikiId} />
        </Tab>
        <Tab key="tenshi" title="Tenshi (скоро)" isDisabled className="flex-col flex gap-3">
          as
        </Tab>
      </Tabs>
    </div>
  )
}

export default Video
