import React, { useRef, useState } from 'react'
import { useMusicStore } from '../../../store/useMusicStore'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../../components/ui/dialog'
import { Button } from '../../../components/ui/button'
import { Plus, Upload } from 'lucide-react'
import { Input } from '../../../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { axiosInstance } from '../../../lib/axios'
import toast from 'react-hot-toast'


export default function AddDialogSongs() {
  const {albums}=useMusicStore()
  const [dialogOpen, setdialogOpen] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const [newSong, setnewSong] = useState({
    title:"",
    artist:"",
    duration:0,
    albumid:""
  })
  const [files, setfiles] = useState<{audio:File|null,image:File|null}>({
    audio:null,
    image:null
  }) 
  const audioInputRef=useRef<HTMLInputElement>(null)
  const imageInputRef=useRef<HTMLInputElement>(null)
  const handleSubmit=async()=>{
    setisLoading(true)
    try {
        if(!files.audio&&!files.image){
            return toast.error("Por favor suba la cancion y el audio")
        }
        const formData=new FormData()
        formData.append("title",newSong.title)
        formData.append("artist",newSong.artist)
        formData.append("duration",newSong.duration)
        if(newSong.albumid && newSong.albumid!=="none"){
             formData.append("albumID",newSong.albumid)
        }
        formData.append("audioFile", files.audio)
        formData.append("imageFile", files.image)
        console.log([...formData.entries()]);
        await axiosInstance.post("/admin/c/song",formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
        setnewSong({
            title:"",
            albumid:"",
            artist:"",
            duration:0
        })
        setfiles({
            audio:null,
            image:null
        })
        toast.success("Se agrego la nueva cancion")
    } catch (error) {
         throw new Error(`Hubo un error ${error}`)   
    }finally{
        setisLoading(false)
    }
  }
  return(
   <>
   <Dialog open={dialogOpen} onOpenChange={setdialogOpen}>
        <DialogTrigger asChild>
            <Button className='bg-emerald-500 hover:bg-emerald-600 text-black'>
                <Plus className='md-2 h-4 w-4'>
                    Add Song
                </Plus>
            </Button>
        </DialogTrigger>
        <DialogContent className='bg-zinc-900 border-zinc-700 max-h-[80vh] overflow-auto'>
            <DialogHeader>
                <DialogTitle>Agregar nueva cancion</DialogTitle>
                <DialogDescription>Agregar una nueva cancion para tu biblioteca</DialogDescription>
            </DialogHeader>
            <div className='space-y-4 py-4'>
                <input type="file" accept='audio/*'
                 ref={audioInputRef}
                 hidden 
                 onChange={(e)=>setfiles((prev)=>({...prev,audio:e.target.files![0]}))} />
            
                <input type="file" accept='image/*'
                 ref={imageInputRef} 
                 hidden
                 onChange={(e)=>setfiles((prev)=>({...prev,image:e.target.files![0]}))}
                />
                {/*Diseño de imagen */}
                <div 
                className="flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer"
                onClick={()=>imageInputRef.current?.click()}>
                    <div className="text-center">
                        {files.image?(
                            <div className="space-y-2">
                                <div className="text-sm text-emerald-500">Imagen Seleccionada: </div>
                                <div className="text-xs text-zinc-400">{files.image.name.slice(0,20)}</div>
                            </div>
                        ):(
                           <>
                             <div className="p-3 bg-zinc-800 rounded-full inline-block mb-2">
                                 <Upload className='w-6 h-6 text-zinc-400'></Upload>
                             </div>
                             <div className='text-sm text-zinc-400 mb-2'>Actualizar Imagen</div>
                             <Button variant={'outline'} size={'sm'} className='text-xs'>
                                Seleccionar Archivo
                             </Button>
                           </>
                        )}
                    </div>
                </div>
                {/*Diseño de audio */}
                <div className="space-y-2">
                    <label htmlFor="" className='text-sm font-medium'>Audio File</label>
                    <div className="flex items-center gap-2">
                        <Button variant={'outline'} onClick={()=>audioInputRef.current?.click()} className='w-full'>
                            {files.audio?(files.audio.name.slice(0,20)):("Seleccionar Audio")}
                        </Button>
                    </div>
                </div>
                <div className="space-y-2">
                    <label htmlFor="" className='text-sm font-medium'>Titulo</label>
                    <Input value={newSong.title} onChange={(e)=>setnewSong({...newSong,title:e.target.value})}
                     className='bg-zinc-800 border-zinc-700'    
                    ></Input>
                </div>
                 <div className="space-y-2">
                    <label htmlFor="" className='text-sm font-medium'>Artista</label>
                    <Input value={newSong.artist} onChange={(e)=>setnewSong({...newSong,artist:e.target.value})}
                     className='bg-zinc-800 border-zinc-700'    
                    ></Input>
                </div>
                <div className="space-y-2">
                    <label htmlFor="" className='text-sm font-medium'>Duracion</label>
                    <Input type='number' min={0} value={newSong.duration} onChange={(e)=>setnewSong({...newSong,duration: parseInt(e.target.value)||0})}
                     className='bg-zinc-800 border-zinc-700'    
                    ></Input>
                </div>
                 <div className="space-y-2">
                    <label htmlFor="" className='text-sm font-medium'>Album ID (opcional)</label>
                    <Select
                     value={newSong.albumid}
                     onValueChange={(v)=>setnewSong({...newSong,albumid:v})}>
                        <SelectTrigger className='bg-zinc-800 border-zinc-700'>
                            <SelectValue placeholder='Seleccionar Album'></SelectValue>
                        </SelectTrigger>
                        <SelectContent className='bg-zinc-800 border-zinc-700'>                            
                            <SelectItem value='none'>No album</SelectItem>
                            {albums.map((a)=>(
                                <SelectItem key={a._id} value={a._id}>{a.title}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>                    
                </div>
            </div>
            <DialogFooter>
                <Button variant={'outline'} onClick={()=>setdialogOpen(false)} disabled={isLoading}>
                    Cancelar
                </Button>
                <Button onClick={handleSubmit} disabled={isLoading}>
                    {isLoading?"Subiendo...":"Agregar cancion"}
                </Button>
            </DialogFooter>
        </DialogContent>

   </Dialog>
   </>
  )
}
