import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Calendar, Music, Trash2 } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { useMusicStore } from '../../../store/useMusicStore'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table'
import AddDialogSongs from './AddDialogSongs'

export default function SongTabContent() {
  const {songs,isLoading,deleteSong}=useMusicStore()
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='flex items-center gap-2'>
              <Music className='h-5 w-5 text-emerald-500'></Music>
              SongsLibrary
            </CardTitle>
            <CardDescription >Manage your music Tracks</CardDescription>
          </div>
          <AddDialogSongs></AddDialogSongs>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading?(
          <div className='flex items-center justify-center py-8'>
            <div className="text-zinc-400">Loading Songs..</div>
          </div>
        ):(
         <div>
          <Table>
            <TableHeader>
              <TableRow className='hover:bg-zinc-800/50'>
                <TableHead className='w-[50px]'></TableHead>
                <TableHead >Titulo</TableHead>
                <TableHead >Artista</TableHead>
                <TableHead >Dia de estreno</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                {songs.map((s)=>(
                  <TableRow key={s._id} className='hover:bg-zinc-800/50'>
                    <TableCell className='font-medium'>
                      <img src={s.imageURL} className='size-10 rounded object-cover' alt={s.title} />
                    </TableCell>
                    <TableCell className='font-medium'>{s.title}</TableCell>
                    <TableCell >{s.artist}</TableCell>
                    <TableCell className=''>
                      <span className='inline-flex items-center gap-1 text-zinc-400'>
                        <Calendar className='h-4 w-4'></Calendar>
                        {s.createdAt.split("T")[0]}
                      </span>
                    </TableCell>
                    <TableCell className='text-right'>
                      <div className='flex gap-2 justify-end'>
                        <Button variant={'ghost'} size={'sm'} className='text-red-400 hover:text-red-300 hover:bg-red-400/10'
                        onClick={()=>{deleteSong(s._id)}}
                        >
                          <Trash2 className='h-4 w-4'></Trash2>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
         </div>
        )}
      </CardContent>
    </Card>
  )
}
