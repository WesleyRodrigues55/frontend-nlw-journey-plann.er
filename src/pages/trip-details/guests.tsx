import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";

interface Participant {
    id: string
    name: string | null
    email: string | null
    is_confirmed: boolean
}

interface GuestsProps {
    openEditGuestModal: () => void
    setCreateNewGuest: (isTrue: boolean) => void
    createNewGuest: boolean
}

export function Guests({
    openEditGuestModal,
    setCreateNewGuest,
    createNewGuest
} : GuestsProps) {
    const { tripId } = useParams()
    const [participants, setParticipants] = useState<Participant[]>([])

    useEffect(() => {

        api.get(`/trips/${tripId}/participants`)
            .then(
                response => setParticipants(response.data.participants)
            )
        
            setCreateNewGuest(false)
    }, [tripId, createNewGuest, setCreateNewGuest])
    
    return (
        <div className="space-y-6 overflow-hidden">
            <h2 className="text-xl font-semibold">
                Convidados
            </h2>
            
            <div className="space-y-5 overflow-y-scroll max-h-[320px] scroll-m-0 px-4">
                {participants.map((participant, index) => {
                    return (
                        <div key={participant.id} className="flex items-center justify-between gap-4">
                            <div className="space-y-1.5">
                                <span className="block font-medium text-zinc-100">
                                    {participant.name ?? `Convidado ${index}`}
                                </span>
                                <span className="block text-sm text-zinc-400 truncate">
                                    {participant.email}
                                </span>
                            </div>
                            {participant.is_confirmed ? (
                                <CheckCircle2 className="text-green-400 size-5 flex-shrink-0"/>
                            ) : (
                                <CircleDashed className="text-zinc-400 size-5 flex-shrink-0"/>
                            )}
                            
                        </div>
                    )
                })}
            </div>

            <Button 
                onClick={openEditGuestModal}
                variant="secondary" 
                size="full"
            >
                <UserCog className='size-5' />
                Gerenciar convidados
            </Button>
        </div>
    )
}