import { Link2, Tag, X } from "lucide-react"
import { Button } from "../../components/button"
import { FormEvent } from "react"
import { api } from "../../lib/axios"
import { useParams } from "react-router-dom"
import { toast } from "sonner"

interface CreateLinkModalProps {
    closeCreateLinkModal: () => void
    setUpdatesTheListOfLinks: (isTrue: boolean) => void
}

export function CreateLinkModal({
    closeCreateLinkModal,
    setUpdatesTheListOfLinks
} : CreateLinkModalProps) {

    const { tripId } = useParams()

    async function CreateLinkModal(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const data = new FormData(e.currentTarget)
        const title = data.get('title')?.toString()
        const url = data.get('link-url')?.toString()

        if (!title || !url) {
            return toast.warning('Os campos precisam ser preenchidos')
        }

        const response = await api.post(`/trips/${tripId}/links`, {
            title,
            url
        })

        if (response.status != 200) {
            return toast.error('ocorreu um erro ao salvar o link.') 
        }

        toast.success('Link cadastrado com sucesso!')
        closeCreateLinkModal()
        setUpdatesTheListOfLinks(true)
    }

    return (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
            <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
            <div className='space-y-2'>
                <div className='flex itemc-center justify-between'>
                <h2 className='text-lg font-semibold'>Cadastrar link</h2>
                <button onClick={closeCreateLinkModal}>
                    <X />
                </button>
                </div>

                <p className='text-sm text-zinc-400'>
                    Todos convidados podem visualizar os links importantes.
                </p>
            </div>

            <form 
                onSubmit={CreateLinkModal}
                className='space-y-3'
            >
                <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                    <Tag className='text-zinc-400 size-4' />
    
                    <input 
                        type="text" 
                        name='title'
                        placeholder="Título do link" 
                        className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" 
                    />
                </div>

                <div className="flex items-center gap-2">
                    <div className='flex-1 h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                        <Link2 className='text-zinc-400 size-4' />
        
                        <input 
                            type="text" 
                            name='link-url'
                            placeholder="URL" 
                            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" 
                        />
                    </div> 
                </div>

                <Button variant="primary" size="full">
                    Salvar link
                </Button>
            </form>

            </div>
        </div>
    )
}