import { Card, CardBody, Skeleton, CardFooter } from '@nextui-org/react'

export default function SkeletonAnimeTrendCard() {
  return (
    <Card shadow="sm" className="flex-1">
      <CardBody className="overflow-visible p-0 h-[240px]">
        <Skeleton className="rounded-lg h-[240px]" />
      </CardBody>

      <CardFooter className="text-small justify-start items-start flex flex-col gap-2 h-full min-h-28">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-3 w-1/3" />
      </CardFooter>
    </Card>
  )
}