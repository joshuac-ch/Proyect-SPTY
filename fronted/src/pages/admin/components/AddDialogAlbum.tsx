import { useRef, useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '../../../components/ui/dialog'
import { Plus, Upload } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import toast from 'react-hot-toast'
import { axiosInstance } from '../../../lib/axios'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { Input } from '../../../components/ui/input'

export default function AddDialogAlbum() {
  const [albumDialogState, setalbumDialogState] = useState(false)
  const [isLoadding, setisLoadding] = useState(false)
  const [newAlbum, setnewAlbum] = useState({
    title:"",
    artist:"",   
    releaseYear:new Date().getFullYear()
  })
  const imageFileRef=useRef<HTMLInputElement>(null) 
  const [imagefile, setimagefile] = useState<File|null>(null)
  const handleImageSelect=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const file=e.target.files?.[0]
    if(file){
        setimagefile(file)
    }
  }
  const handleSubmit=async()=>{
    setisLoadding(true)
    try{
        if(!imagefile){
            return toast.error("Por favor subir imagen")
        }
        const formData = new FormData()
        formData.append("title",newAlbum.title)
        formData.append("artist",newAlbum.artist)
        formData.append("releaseYear",String(newAlbum.releaseYear))
        formData.append("imageFile",imagefile)
        console.log([...formData.entries()]);
        await axiosInstance.post(`/admin/c/album`,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
        setnewAlbum({
            title:"",
            artist:"",
            releaseYear:new Date().getFullYear()
        })    
        setimagefile(null)
         toast.success("Se agrego el nuevo album")
    }catch(err){
        throw new Error(err.message)
    }finally{
        setisLoadding(false)
    }
  }
  return (
   <>
    <Dialog open={albumDialogState} onOpenChange={setalbumDialogState}>
        <DialogTrigger asChild>
            <Button className='bg-violet-500 hover:bg-violet-600 text-whit'>
                <Plus className='md-2 h-4 w-4'>
                </Plus>
                Add Album
            </Button>
        </DialogTrigger>
        <DialogContent className='bg-zinc-900 border-zinc-700 max-h-[80vh] overflow-auto'>
            <DialogHeader>
                <DialogTitle>Agregar nuevo album</DialogTitle>
                <DialogDescription>Agregar un nuevo album para tu biblioteca</DialogDescription>
            </DialogHeader>
        <div className="space-y-4 py-4">
            <input type="file" accept='image/*'
                 ref={imageFileRef}
                 className='hidden'
                 onChange={handleImageSelect} />
            <div className="flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer"
            onClick={()=>imageFileRef.current?.click()}>
                <div className="text-center">
                    <div className="p-3 bg-zinc-800 rounded-full inline-block mb-2">
                        <Upload className='h-6 w-6 text-zinc-400'></Upload>
                    </div>
                    <div className="text-sm text-zinc-400 mb-2">
                        {imagefile?imagefile.name:"Upload album"}
                    </div>
                    <Button variant={'outline'} size={'sm'} className='text-xs'> Cambiar Archivo</Button>
                </div>
            </div>
            <div className="space-y-2">
                <label htmlFor="" className='text-sm font-medium'>Titulo Album</label>
                <Input type='text' value={newAlbum.title} onChange={(e)=>setnewAlbum({...newAlbum,title:e.target.value})}
                className='bg-zinc-800 border-zinc-700'
                placeholder='ingresa el titulo del album'>                    
                </Input>               
            </div>

             <div className="space-y-2">
                <label htmlFor="" className='text-sm font-medium'>Artista</label>
                <Input type='text' value={newAlbum.artist} onChange={(e)=>setnewAlbum({...newAlbum,artist:e.target.value})}
                className='bg-zinc-800 border-zinc-700'
                placeholder='ingresa nombre del artista'>                    
                </Input>               
            </div>

            <div className="space-y-2">
                <label htmlFor="" className='text-sm font-medium'>Año del Album (optional)</label>
                <Input type='number' value={newAlbum.releaseYear} onChange={(e)=>setnewAlbum({...newAlbum,releaseYear: parseInt(e.target.value)})}
                className='bg-zinc-800 border-zinc-700'
                min={1900}
                max={new Date().getFullYear()}
                placeholder='Ingrese el año'>                    
                </Input>               
            </div>          
        </div>
        <DialogFooter>
            <Button variant={'outline'} onClick={()=>{setalbumDialogState(false)}} disabled={isLoadding}>
                Cancelar
            </Button>
            <Button onClick={handleSubmit} disabled={isLoadding||!imagefile||!newAlbum.title||!newAlbum.artist}
             className='bg-violet-500 hover:bg-violet-600'
            >
                {isLoadding?"Subiendo":"Agregar Album"}
            </Button>
        </DialogFooter>
        </DialogContent>
    </Dialog>
   </>
  )
}
