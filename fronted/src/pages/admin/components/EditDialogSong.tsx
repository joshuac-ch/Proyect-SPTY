import { Button } from '@/components/ui/button'


import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { axiosInstance } from '@/lib/axios'
import { useMusicStore } from '@/store/useMusicStore'
import { Upload } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

export default function EditDialogSong() {
    const {id}=useParams()
    const {song,fecthShowSong,albums}=useMusicStore()
    useEffect(()=>{
        fecthShowSong(id)
    },[])
    const [imagen, setimagen] = useState("")     
    const [openDialog, setopenDialog] = useState(false)
    const [isloading, setisloading] = useState(false)
    const [editSong, seteditSong] = useState({
        title:"",
        artist:"",
        duration:"",
        albumID:"",
        genero:"",
        releaseYear:"",
        tags:"",
        mood:"",
        imagen:"",
        audio:"",
        videoURL:""
        
    })
    
    useEffect(()=>{
        if(song){
        seteditSong({
        title:song?.title||"",
        artist:song?.artist||"",
        duration:song?.duration||"",
        albumID:song?.albumID||"",
        genero:song?.genero||"",
        releaseYear:song?.releaseYear||"",
        tags:song?.tags||"",
        mood:song?.mood||"",
        imagen:song?.imageURL||"",
        audio:song?.audioURL||"",
        videoURL:song?.videoURL||""       
    })
    //console.log(editSong)
        
        }
        
       
    },[song])    

    
    
    const [files, setfiles] = useState<{audio:File|null,image:File|null,video:File|null}>({
        audio:null,
        image:null,
        video:null
      })
    const audioInputRef=useRef<HTMLInputElement>(null)
    const imageInputRef=useRef<HTMLInputElement>(null)  
    const videorInputRef=useRef<HTMLInputElement>(null)
    const handleSubmit=async()=>{
        //console.log(song)
        setisloading(true)
        try{
            if(!editSong.audio&&!editSong.imagen){
            return toast.error("Por favor suba la cancion y el audio")
        }
            const formData=new FormData()
            formData.append("title",editSong.title)
            formData.append("artist",editSong.artist)
            formData.append("duration",String(editSong.duration))
            if(editSong.albumID && editSong.albumID!=="none"){
                formData.append("albumID",editSong.albumID)
            }
            formData.append("imageFile",files.image)
            formData.append("audioFile",files.audio)
            formData.append("videoFile",files.video)
            formData.append("releaseYear",editSong.releaseYear)
            formData.append("genero",editSong.genero)
            formData.append("tags",editSong.tags)
            formData.append("mood",editSong.mood)
            console.log([...formData.entries()])
            await axiosInstance.put(`/song/u/${id}`,formData,{
                headers:{
                "Content-Type":"multipart/form-data"
            }})
            toast.success("Se actualizo la nueva cancion")
        }catch(err){
            console.error(err.message)
        }finally{
            setisloading(false)
        }

    }
  return (
  <>  
  
    <div className=" bg-zinc-900 rounded-2xl overflow-hidden ">
     <ScrollArea  className='p-4 h-[calc(100vh-110px)]'>
    <div className='space-y-4 py-4'>
       
        <input type="file" accept='audio/*'
                 ref={audioInputRef}
                 hidden 
                 onChange={(e)=>setfiles((prev)=>({...prev,audio:e.target.files![0]}))} />
                <input type="file" accept='video/*'
                        ref={videorInputRef} 
                        hidden
                        onChange={(e)=>setfiles((prev)=>({...prev,video:e.target.files![0]}))}
                />    
                <input type="file" accept='image/*'
                 ref={imageInputRef} 
                 hidden
                 onChange={(e)=>setfiles((prev)=>({...prev,image:e.target.files![0]}))}
                />
        <div className="flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer"
             onClick={()=>imageInputRef.current?.click()}>
                <div className="text-center">
                    {files.image ? (
                    // Si el usuario seleccionó un archivo nuevo
                    <div className="space-y-2 justify-center items-center flex flex-col">
                        <div className="text-sm text-emerald-500">Imagen Seleccionada:</div>
                        <div className="text-xs text-zinc-400">{files.image.name}</div>
                        <img src={URL.createObjectURL(files.image)} className="mt-2 w-24 h-24 object-cover rounded" />
                    </div>
                    ) : editSong.imagen ? (
                    // Si no hay archivo nuevo, pero existe la imagen del song
                    <div className="space-y-2 justify-center items-center flex flex-col">
                        <div className="text-sm text-zinc-500">Imagen actual:</div>
                        <img src={editSong.imagen} className="mt-2 w-24 h-24 object-cover rounded" />
                    </div>
                    ) : (
                    // Si no hay nada
                    <>
                        <div className="p-3 bg-zinc-800 rounded-full inline-block mb-2">
                        <Upload className="w-6 h-6 text-zinc-400" />
                        </div>
                        <div className="text-sm text-zinc-400 mb-2">Actualizar Imagen</div>
                        <Button variant="outline" size="sm" className="text-xs">
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
                        {files.audio
                        ?files.audio.name.slice(0,20)
                        :editSong.audio
                        ? "Audio Existente"
                        :"Seleccionar Audio"}
                    </Button>
                </div>
            </div>
            {/*Diseño de video */}
             <div className="space-y-2">
                <label htmlFor="" className='text-sm font-medium'>Video File</label>
                <div className="flex items-center gap-2">
                    <Button variant={'outline'} onClick={()=>videorInputRef.current?.click()} className='w-full'>
                        {files.video
                        ?files.video.name.slice(0,20)
                        :editSong.videoURL
                        ? "Video existente"
                        :"Seleccionar Video de Fondo"}
                    </Button>
                </div>
            </div>
             <div className="space-y-2">
                    <label className='text-sm font-medium'>Titulo</label>
                    <Input value={editSong.title} onChange={(e)=>seteditSong({...editSong,title:e.target.value})}
                     className='bg-zinc-800 border-zinc-700'    
                    ></Input>
             </div>
             <div className="space-y-2">
                    <label  className='text-sm font-medium'>Artista</label>
                    <Input value={editSong.artist} onChange={(e)=>seteditSong({...editSong,artist:e.target.value})}
                     className='bg-zinc-800 border-zinc-700'    
                    ></Input>
             </div>         
            <div className="space-y-2">
                    <label className='text-sm font-medium'>Duration</label>
                    <Input className='bg-zinc-800 border-zinc-700' value={editSong.duration}
                    onChange={(e)=>seteditSong({...editSong,duration:e.target.value})}></Input>
                </div>
            <div className="space-y-2">
                    <label className='text-sm font-medium'>Genero</label>
                    <Input className='bg-zinc-800 border-zinc-700' value={editSong.genero}
                    onChange={(e)=>seteditSong({...editSong,genero:e.target.value})}></Input>
                </div> 
            <div className="space-y-2">
                    <label className='text-sm font-medium'>Año</label>
                    <Input className='bg-zinc-800 border-zinc-700' value={editSong.releaseYear}
                    onChange={(e)=>seteditSong({...editSong,releaseYear:e.target.value})}></Input>
                </div> 
            <div className="space-y-2">
                    <label className='text-sm font-medium'>Etiquetas</label>
                    <Input className='bg-zinc-800 border-zinc-700' value={editSong.tags}
                    onChange={(e)=>seteditSong({...editSong,tags:e.target.value})}></Input>
                </div>
                
            <div className="space-y-2">
                    <label className='text-sm font-medium'>Mood</label>
                    <Input className='bg-zinc-800 border-zinc-700' value={editSong.mood}
                    onChange={(e)=>seteditSong({...editSong,mood:e.target.value})}></Input>
                </div>
            <div className="space-y-2">
                    <label className='text-sm font-medium'>Album ID</label>
                    <Select
                     value={editSong.albumID}
                     onValueChange={(v)=>seteditSong({...editSong,albumID:v})}>
                        <SelectTrigger className='bg-zinc-800  border-zinc-700'>
                            <SelectValue placeholder='Seleccionar Album'></SelectValue>
                        </SelectTrigger>
                        <SelectContent className='bg-zinc-800 h-100  border-zinc-700'>                            
                            <SelectItem value='none'>No album</SelectItem>
                            {albums.map((a)=>(
                                <SelectItem key={a._id} value={a._id}>
                                    <div className="flex flex-row gap-2 items-center">
                                        <img src={a.imageUrl} className='w-8 h-8 rounded-full object-cover' alt="" />
                                        <p>{a.title}</p>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select> 
                   
                </div>                              
        <Button variant={'outline'} onClick={()=>setopenDialog(false)} disabled={isloading}>Cancelar</Button>
        <Button onClick={handleSubmit} disabled={isloading}>
            {isloading?"Actualizando cancion...":"Actualizar cancion"}
        </Button>        
    </div>
    </ScrollArea>
    </div>
   
  </>
  )
}
