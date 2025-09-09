import React from 'react'
import { Card, CardContent } from '../../../components/ui/card'
type StartPromps={
    icon:React.ElementType,
    label:string,
    value:string,
    bgColor:string,
    iconColor:string
}

export default function StatsCard({icon:Icon,label,value,bgColor,iconColor}:StartPromps) {
  return (
   <>
   <Card className='bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800/80 transition-colors'>
        <CardContent className='p-6 '>
            <div className="flex items-center gap-2">
                <div className={`p-3 rounded-lg ${bgColor}`}>
                    <Icon className={`size-6 ${iconColor}`}></Icon>
                </div>
                <div>
                    <p className='text-sm text-zinc-400'>{label}</p>
                    <p className='text-2xl font-bold'>{value}</p>
                </div>
            </div>
        </CardContent>
   </Card>
   </>
  )
}
