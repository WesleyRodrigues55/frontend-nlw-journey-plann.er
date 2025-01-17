import { Mail, User, X } from "lucide-react"
import { FormEvent } from "react"
import { Button } from "../../components/button"
import { DateRange } from "react-day-picker"
import { format } from "date-fns"

interface ConfirmTripModalProps {
    closeConfirmTripModal: () => void
    createTrip: (e: FormEvent<HTMLFormElement>) => void
    setOwnerName: (ownerName: string) => void
    setOwnerEmail: (ownerEmail: string) => void
    destination: string
    eventStartAndEndDates: DateRange | undefined
}

export function ConfirmTripModal({
    closeConfirmTripModal,
    createTrip,
    setOwnerName,
    setOwnerEmail,
    destination,
    eventStartAndEndDates
} : ConfirmTripModalProps) {

  const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to 
  ? format(eventStartAndEndDates.from, "d' de 'LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d' de ' LLL "))
  : null
  
  return (
      <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
          <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
            <div className='space-y-2'>
              <div className='flex itemc-center justify-between'>
                <h2 className='text-lg font-semibold'>Confirmar criação de viagem</h2>
                <button onClick={closeConfirmTripModal}>
                  <X />
                </button>
              </div>

              <p className='text-sm text-zinc-400'>
                Para concluir a criação da viagem para <span className='text-zinc-100 font-semibold'>{destination}</span>, nas datas de <span className='text-zinc-100 font-semibold'>{displayedDate}</span> preencha seus dados abaixo:
              </p>
            </div>

            <form 
              onSubmit={createTrip}
              className='space-y-3'
            >
              <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                <User className='text-zinc-400 size-4' />

                <input 
                  onChange={event => setOwnerName(event.target.value)}
                  type="text" 
                  name='name'
                  placeholder="Seu nome completo" 
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" 
                />
              </div>
              
              <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                <Mail className='text-zinc-400 size-4' />

                <input 
                  onChange={event => setOwnerEmail(event.target.value)}
                  type="email" 
                  name='email'
                  placeholder="Seu e-mail pessoal" 
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" 
                />
              </div>

              <Button variant="primary" size="full">
                Confirmar criação da viagem
              </Button>
            </form>

          </div>
      </div>
  )
}