import React from 'react'

export default function RecomendaiconesSong({s}:{s:[]}) {
  return (
    <>
    <div className="mt-4 flex flex-row flex-wrap gap-5">
       {s.map((s,i)=>{
        return(
            <div key={i} className=''>
                <img src={s.imageURL} className='w-40 h-40 rounded-md' alt="" />
                <p className='w-40' >{s.title}</p>
                <p className='w-40' >{s.artist}</p>
            </div>
        )
       })}
    </div>
    </>
  )
}
