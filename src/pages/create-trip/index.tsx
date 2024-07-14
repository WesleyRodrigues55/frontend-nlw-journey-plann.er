import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InviteGuestsModal } from './index-guests-modal'
import { ConfirmTripModal } from './confirm-trip-modal'
import { DestinationAndDateStep } from './steps/destination-and-date-step'
import { InviteGuestsSteps } from './steps/invite-guests-steps'
  
export function CreateTripPage() {
    const navigate = useNavigate()
    const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
    const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
    const [emailsToInvate, setEmailsToInvate] = useState<string[]>([])
    const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)

    function openGuestsInput() {
        setIsGuestsInputOpen(true)
    }

    function closeGuestsInput() {
        setIsGuestsInputOpen(false)
    }

    function openGuestsModal() {
        setIsGuestsModalOpen(true)
    }

    function closeGuestsModal() {
        setIsGuestsModalOpen(false)
    }

    function openConfirmTripModal() {
        setIsConfirmTripModalOpen(true)
    }

    function closeConfirmTripModal() {
        setIsConfirmTripModalOpen(false)
    }

    function addNewEmailToInvate(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        
        const data = new FormData(e.currentTarget)
        const email = data.get('email')?.toString()

        if (!email) return

        if (emailsToInvate.includes(email)) return

        setEmailsToInvate([
        ...emailsToInvate, email
        ])

        e.currentTarget.reset()
    }

    function removeEmailFromInvites(emailToRemove: string) {
        const newEmailList = emailsToInvate.filter(invited => invited !== emailToRemove)
        setEmailsToInvate(newEmailList)
    }

    function createTrip(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        navigate('/trips/123')
    }

    return (
        <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
            <div className="max-w-3xl w-full px-6 text-center space-y-10">
                <div className='flex flex-col items-center gap-3'>
                    <img src="/logo.svg" alt="logo plann.er" />
                    <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
                </div>

                <div className='space-y-4'>
                    <DestinationAndDateStep 
                        closeGuestsInput={closeGuestsInput}
                        isGuestsInputOpen={isGuestsInputOpen}
                        openGuestsInput={openGuestsInput}
                    />

                    {isGuestsInputOpen && (
                        <InviteGuestsSteps 
                            emailsToInvate={emailsToInvate}
                            openConfirmTripModal={openConfirmTripModal}
                            openGuestsModal={openGuestsModal}
                        />
                    )}
                </div>

                <p className="text-zinc-500 text-sm">
                    Ao planejar sua viagem pela plann.er você automaticamente concorda
                    <br></br>
                    com nossos <a className="text-zinc-300 underline" href="">termos de uso</a> e <a className="text-zinc-300 underline" href="">políticas de privacidade</a>.
                </p>
            </div>

            {isGuestsModalOpen && (
                <InviteGuestsModal
                addNewEmailToInvate={addNewEmailToInvate}
                closeGuestsModal={closeGuestsModal}
                emailsToInvate={emailsToInvate}
                removeEmailFromInvites={removeEmailFromInvites}
                />
            )}

            {isConfirmTripModalOpen && (
                <ConfirmTripModal 
                    closeConfirmTripModal={closeConfirmTripModal}
                    createTrip={createTrip}
                />
            )} 
        </div>
    )
}
  