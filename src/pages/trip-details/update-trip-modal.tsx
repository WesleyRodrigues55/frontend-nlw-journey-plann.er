import { Calendar, MapPin, X } from "lucide-react"
import { Button } from "../../components/button"
import { DateRange, DayPicker } from "react-day-picker"
import { ptBR } from "date-fns/locale";
import { format, setDefaultOptions  } from "date-fns"
import { FormEvent, useEffect, useState } from "react"
import { api } from "../../lib/axios"
import { useParams } from "react-router-dom"
import { toast } from "sonner"

interface UpdateTripModalProps {
    closeUpdateTripModal: () => void
    setIsUpdateTrip: (isTrue: boolean) => void
    setUpdatesTheListOfActivities: (isTrue: boolean) => void
}

export function UpdateTripModal({
    closeUpdateTripModal,
    setIsUpdateTrip,
    setUpdatesTheListOfActivities
}: UpdateTripModalProps) {
   
    const { tripId } = useParams()
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
    const [destination, setDestination] = useState('')
    const [displayedDateCurrent, setDisplayedDateCurrent] = useState('')
    const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()

    setDefaultOptions({ locale: ptBR })

    const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to 
    ? format(eventStartAndEndDates.from, "d' de 'LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d' de ' LLL "))
    : null

    useEffect(() => {
        api.get(`/trips/${tripId}`)
            .then(response => {
                const trip = response.data.trip
                setDestination(trip.destination)
                setDisplayedDateCurrent(format(trip.starts_at, "d' de ' LLL").concat(' até ').concat(format(trip.ends_at, "d' de ' LLL")))
            })
    }, [tripId])

    async function updateDestinationAndDatesTrip(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!destination) {
            return toast.warning('Os campos precisam ser preenchidos')
        }

        if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
            return toast.warning('Os campos precisam ser preenchidos') 
        }

        await api.put(`/trips/${tripId}`, {
            destination: destination,
            starts_at: eventStartAndEndDates.from,
            ends_at: eventStartAndEndDates.to,
        })
            .then(response => {
                if (response.status != 200) {
                    toast.error('Ocorreu um erro ao editar o local/data da viagem.')
                }

                closeUpdateTripModal()
                setIsUpdateTrip(true)
                setUpdatesTheListOfActivities(true)
                toast.success('Local/data alterado com sucesso!')
            })
            .catch(error => {
                console.error('Error: ', error)
            })
    }
    
    function openDatePicker() {
        setIsDatePickerOpen(true)
    }

    function closeDatePicker() {
        setIsDatePickerOpen(false)
    }

    return (
        <div>
            <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
                <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5 overflow-hidden'>
                <div className='space-y-2'>
                    <div className='flex itemc-center justify-between'>
                    <h2 className='text-lg font-semibold'>Alterar local/data da viagem</h2>
                    <button onClick={closeUpdateTripModal}>
                        <X />
                    </button>
                    </div>
    
                    <p className='text-sm text-zinc-400'>
                        Atividades que estiverem fora da nova data início/fim serão apagadas.
                    </p>
                </div>
    
                <div className='w-full h-px bg-zinc-800'></div>
    
                    <form onSubmit={updateDestinationAndDatesTrip} className="space-y-5">
                        <div className='p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                            <div className='flex items-center gap-2 flex-1'>
                                <MapPin className='size-5 text-zinc-400' />
                                <input 
                                    value={destination}
                                    onChange={event => setDestination(event.target.value)}
                                    // disabled={isGuestsInputOpen} 
                                    type="text" 
                                    placeholder="Para onde você vai?" 
                                    className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" 
                                    />
                            </div>

                            <button 
                                type="button"
                                onClick={openDatePicker}
                                // disabled={isGuestsInputOpen} 
                                className='flex items-center gap-2 text-left w-[240px]'
                            >
                                <Calendar className='size-5 text-zinc-400' />
                                <span className="text-lg text-zinc-400 w-40 flex-1" >
                                    {displayedDate || displayedDateCurrent}
                                </span>
                            </button>
                        </div>

                        <Button
                            size="full"
                            variant="primary"
                        >
                            Editar local/data
                        </Button>
                    </form>
    
                </div>
            </div>

            {isDatePickerOpen && (
                <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
                    <div className='rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
                        <div className='space-y-2'>
                            <div className='flex itemc-center justify-between'>
                                <h2 className='text-lg font-semibold'>Selecione a data</h2>
                                <button onClick={closeDatePicker}>
                                    <X />
                                </button>
                            </div>
                        </div>

                        <DayPicker
                            lang="pt-BR"
                            locale={ptBR} 
                            mode="range" 
                            selected={eventStartAndEndDates} 
                            onSelect={setEventStartAndEndDates}
                        />

                    </div>
                </div>
            )}
        </div>
    )
}