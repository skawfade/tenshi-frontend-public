import { Card } from '@nextui-org/react'
import { StatisticType } from '../../types/statistics'
import TomiIcon from '../../assets/icons/tomi.svg?react'

interface Props {
  statistic: StatisticType
}

const Statistic = ({ statistic }: Props): JSX.Element => {
  return (
    <div className="py-4 px-4 md:w-[60%]">
      <h2 className="text-3xl font-bold mb-8">Статистика</h2>

      {/* Общий контейнер для двух топов */}
      <Card className="p-6 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <h3 className="text-lg">Количество аниме:</h3>
          <p className="text-lg font-semibold text-[#eb5628]">
            {statistic.animeCount}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-lg flex gap-1 items-center">
            Общее количество <TomiIcon className="w-[18px] h-[18px]" />:
          </div>
          <p className="text-lg font-semibold text-[#eb5628]">
            {statistic.totalPoints}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <h3 className="text-lg">Количество пользователей:</h3>
          <p className="text-lg font-semibold text-[#eb5628]">
            {statistic.userCount}
          </p>
        </div>
      </Card>
    </div>
  )
}

export default Statistic
