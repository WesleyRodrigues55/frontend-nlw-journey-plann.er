import { AtSign, Plus, X } from "lucide-react"
// import { FormEvent } from "react"
import { Button } from "../../components/button"
import { useParams } from "react-router-dom"
import { FormEvent, useEffect, useState } from "react"
import { api } from "../../lib/axios"
import { toast } from "sonner"

interface EditGuestsModal {
    id: string
    name: string | null
    email: string
    is_confirmed: boolean
}

interface EditGuestsModalProps {
    closeEditGuestModal: () => void
    setCreateNewGuest: (isTrue: boolean) => void
}

export function EditGuestsModal({
    closeEditGuestModal, 
    setCreateNewGuest
}: EditGuestsModalProps) {

    const { tripId } = useParams()
    const [listParticipants, setListParticipants] = useState<EditGuestsModal[]>([])

    useEffect(() => {

        api.get(`/trips/${tripId}/participants`)
            .then( response => setListParticipants(response.data.participants) )

    }, [listParticipants])

    async function addNewEmailToInvate(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const data = new FormData(e.currentTarget)
        const email = data.get('email')?.toString()

        if (!email) {
            return toast.warning('O campo email deve ser preenchido.')
        }

        const response = await api.post(`/trips/${tripId}/invites`, {
            email
        })
        
        if (response.status != 200) {
            return toast.error('ocorreu um erro ao salvar o link.') 
        } 
        
        setCreateNewGuest(true)
        toast.success('Participant convidado com sucesso!')
    }


    return (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
            <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5 overflow-hidden'>
              <div className='space-y-2'>
                <div className='flex itemc-center justify-between'>
                  <h2 className='text-lg font-semibold'>Selecionar convidados</h2>
                  <button onClick={closeEditGuestModal}>
                    <X />
                  </button>
                </div>
  
                <p className='text-sm text-zinc-400'>
                  Os convidados irão receber e-mails para confirmar a participação na viagem.
                </p>
              </div>
  
              {/* emails  */}
              <div className='flex flex-wrap gap-2 overflow-y-scroll max-h-[240px]'>
                {listParticipants.length == 0 && (
                  <span className='text-zinc-700'>Nenhum convidado adicionado</span>
                )}
                
                {listParticipants.map((participant, index) => {
                    return (
                      <div 
                        key={index} 
                        className='py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2'
                      >
                        <span className='text-zinc-300'>{participant.email}</span>
                      </div>
                    )
                })}
              </div>
  
              <div className='w-full h-px bg-zinc-800'></div>
  
                <form 
                    onSubmit={addNewEmailToInvate}
                    className='p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'
                >
                    <div className='px-2 flex items-center flex-1 gap-2'>
                        <AtSign className='text-zinc-900 size-5' />
        
                        <input 
                            type="email" 
                            name='email'
                            placeholder="Digite o email do convidado" 
                            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" 
                        />
                    </div>
  
                    <Button type="submit" variant="primary">
                        Convidar
                        <Plus className='size-5' />
                    </Button>
                </form>
  
            </div>
        </div>
    )
}