import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Calendar, Library, Music, Trash2 } from 'lucide-react'
import AddDialogAlbum from './AddDialogAlbum'
import { useMusicStore } from '../../../store/useMusicStore'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table'
import { Button } from '../../../components/ui/button'

export default function AlbumTabContent() {
  const {isLoading,albums,deleteAlbum}=useMusicStore()
  return (
    <Card className='bg-zinc-800/50 border-zinc-700/50'>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className='flex items-center gap-2'>
              <Library className='h-5 w-5 text-violet-500'>                
              </Library>
              Biblioteca de albumnes
            </CardTitle>
          </div>
          <AddDialogAlbum></AddDialogAlbum>          
        </div>
      </CardHeader>
      <CardContent>
        {isLoading?(
          <div className="flex items-center justify-center py-8">
            <div className='text-zinc-400'>Cargando Albums...</div>
          </div>
        ):(
          <div className="">
            <Table>
              <TableHeader>
                <TableRow className='hover:bg-zinc-800/50'>
                  <TableHead className='w-[50px]'></TableHead>
                  <TableHead>Titulo</TableHead>
                  <TableHead>Artista</TableHead>                
                  <TableHead>Realase</TableHead>
                  <TableHead>Songs</TableHead>
                  <TableHead className='text-right'>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {albums.map((a)=>(
                  <TableRow key={a._id} className='hover:bg-zinc-800/50'>
                    <TableCell className='font-medium'>
                      <img src={a.imageUrl} className='size-10 rounded object-cover' alt={a.title} />
                    </TableCell>
                    <TableCell className='font-medium'>{a.title}</TableCell>
                    <TableCell>{a.artist}</TableCell>
                    <TableCell>
                      <span className='inline-flex items-center gap-1 text-zinc-400'>
                        <Calendar className='h-4 w-4'></Calendar>
                        {a.releaseYear}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className='inline-flex items-center gap-1 text-zinc-400'>
                        <Music className='h-4 w-4'></Music>
                        {a.songs.length} canciones
                      </span>
                    </TableCell>
                     <TableCell className='text-right'>
                      <div className='flex gap-2 justify-end'>
                        <Button variant={'ghost'} size={'sm'} className='text-red-400 hover:text-red-300 hover:bg-red-400/10'
                        onClick={()=>{deleteAlbum(a._id)}}
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
