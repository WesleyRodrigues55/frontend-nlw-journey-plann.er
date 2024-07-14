import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2, X, AtSign, Plus } from 'lucide-react'
import { FormEvent, useState } from 'react'

export function App() {
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [emailsToInvate, setEmailsToInvate] = useState<string[]>([])

  console.log(emailsToInvate)

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

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className='flex flex-col items-center gap-3'>
          <img src="/logo.svg" alt="logo plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className='space-y-4'>
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className='flex items-center gap-2 flex-1'>
              <MapPin className='size-5 text-zinc-400' />
              <input 
                disabled={isGuestsInputOpen} 
                type="text" 
                placeholder="Para onde você vai?" 
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" 
                />
            </div>

            <div className='flex items-center'>
              <Calendar className='size-5 text-zinc-400' />
              <input 
                disabled={isGuestsInputOpen} 
                type="text" 
                placeholder="Quando" 
                className="bg-transparent text-lg placeholder-zinc-400 outline-none w-40" 
              />
            </div>

            <div className='w-px h-6 bg-zinc-800'></div>

            {isGuestsInputOpen ? (
              <button
                onClick={closeGuestsInput}
                className='bg-zinc-800 text-zinc-200 rounded-lg py-2 px-5 font-medium flex items-center gap-2 hover:bg-zinc-700'
              >
                Alter local e data
                <Settings2 className='size-5' />
              </button>
            ): (
              <button 
                onClick={openGuestsInput}
                className='bg-lime-300 text-lime-950 rounded-lg py-2 px-5 font-medium flex items-center gap-2 hover:bg-lime-400'
              >
                Continuar
                <ArrowRight className='size-5' />
              </button>
            )}
            
          </div>

          {isGuestsInputOpen && (
            <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
              <button 
                type='button' 
                onClick={openGuestsModal} 
                className='flex items-center gap-2 flex-1 text-left'
              >
                <UserRoundPlus className='size-5 text-zinc-400' />
                <span className='text-zinc-400  text-lg flex-1'>Quem estará na viagem?</span>
              </button>

              <div className='w-px h-6 bg-zinc-800'></div>

              <button 
                className='bg-lime-300 text-lime-950 rounded-lg py-2 px-5 font-medium flex items-center gap-2 hover:bg-lime-400'
              >
                Confirmar viagem
                <ArrowRight className='size-5' />
              </button>
            </div>
          )}
        </div>

        <p className="text-zinc-500 text-sm">
          Ao planejar sua viagem pela plann.er você automaticamente concorda
          <br></br>
          com nossos <a className="text-zinc-300 underline" href="">termos de uso</a> e <a className="text-zinc-300 underline" href="">políticas de privacidade</a>.
        </p>
      </div>

      {isGuestsModalOpen && (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
          <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
            <div className='space-y-2'>
              <div className='flex itemc-center justify-between'>
                <h2 className='text-lg font-semibold'>Selecionar convidados</h2>
                <button onClick={closeGuestsModal}>
                  <X />
                </button>
              </div>

              <p className='text-sm text-zinc-400'>
                Os convidados irão receber e-mails para confirmar a participação na viagem.
              </p>
            </div>

            {/* emails  */}
            <div className='flex flex-wrap gap-2'>
              {emailsToInvate.length == 0 && (
                <span className='text-zinc-700'>Nenhum convidado adicionado</span>
              )}
              
              {emailsToInvate.map((email, index) => {
                  return (
                    <div 
                      key={index} 
                      className='py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2'
                    >
                      <span className='text-zinc-300'>{email}</span>
                      <button type='button'>
                        <X 
                          onClick={() => removeEmailFromInvites(email)}
                          className='size-4 text-zinc-400'
                        />
                      </button>
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

              <button 
                type='submit'
                className='bg-lime-300 text-lime-950 rounded-lg py-2 px-5 font-medium flex items-center gap-2 hover:bg-lime-400'
              >
                Convidar
                <Plus className='size-5' />
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  )
}
