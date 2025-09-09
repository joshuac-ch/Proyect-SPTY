import React from 'react'
import { useMusicStore } from '../../../store/useMusicStore'
import { Library, ListMusic, PlayCircle, Users2 } from 'lucide-react'
import StatsCard from './StatsCard'

export default function DashboradStast() {
  const {stats}=useMusicStore()
  const statsData=[
    {
      icon:ListMusic,
      label:"Total Songs",
      value:stats.totalSonsg.toString(),
      bgcolor:"bg-emerald-500/10",
      iconColor:"text-emerald-500"      
    },
     {
      icon:Library,
      label:"Total Albums",
      value:stats.totalAlbums.toString(),
      bgcolor:"bg-violet-500/10",
      iconColor:"text-violet-500"      
    },
     {
      icon:Users2,
      label:"Total Artists",
      value:stats.totalArtist.toString(),
      bgcolor:"bg-orange-500/10",
      iconColor:"text-orange-500"      
    },
     {
      icon:PlayCircle,
      label:"Total Users",
      value:stats.totalUsers.toString(),
      bgcolor:"bg-sky-500/10",
      iconColor:"text-sky-500"      
    },
  ]
  return (
   <>
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statsData.map((s,i)=>(
        <StatsCard
        key={i}
        icon={s.icon}
        label={s.label}
        value={s.value}
        bgColor={s.bgcolor}
        iconColor={s.iconColor}
        ></StatsCard>
      ))}
   </div>
   </>
  )
}
