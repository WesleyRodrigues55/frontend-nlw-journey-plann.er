import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { ImportantLinks } from "./important-links";
import { Guests } from "./guests";
import { Activities } from "./activities";
import { DestinationAndDateHeader } from "./destination-and-date-header";
import { Button } from "../../components/button";
import { CreateLinkModal } from "./create-link-modal";

export function TripDetailsPage() {
    const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false)
    const [updatesTheListOfActivities, setUpdatesTheListOfActivities] = useState(false)
    const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false)
    const [updatesTheListOfLinks, setUpdatesTheListOfLinks] = useState(false)

    function openCreateActivityModal() {
        setIsCreateActivityModalOpen(true)
    }

    function closeCreateActivityModal() {
        setIsCreateActivityModalOpen(false)
    }

    function openCreateLinkModal() {
        setIsCreateLinkModalOpen(true)
    }

    function closeCreateLinkModal() {
        setIsCreateLinkModalOpen(false)
    }

    return (
        <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">

            <DestinationAndDateHeader />

            <main className="flex gap-16 px-4">
                
                <div className="flex-1 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-semibold">
                            Atividades
                        </h2>

                        <Button 
                            onClick={openCreateActivityModal}
                            variant="primary" 
                        >
                            <Plus className='size-5' />
                            Cadastrar atividade
                        </Button>
                    </div>

                    <Activities 
                        setUpdatesTheListOfActivities={setUpdatesTheListOfActivities}
                        updatesTheListOfActivities={updatesTheListOfActivities}
                    />

                </div>

                <div className="w-80 space-y-6">
                    <ImportantLinks 
                        setUpdatesTheListOfLinks={setUpdatesTheListOfLinks}
                        updatesTheListOfLinks={updatesTheListOfLinks}
                    />

                    <Button 
                        onClick={openCreateLinkModal}
                        variant="secondary" 
                        size="full"
                    >
                        <Plus className='size-5' />
                        Cadastrar novo link
                    </Button>

                    <div className='w-full h-px bg-zinc-800'></div>

                    <Guests />
                </div>

            </main>


            {isCreateActivityModalOpen && (
                <CreateActivityModal
                    setUpdatesTheListOfActivities={setUpdatesTheListOfActivities}
                    closeCreateActivityModal={closeCreateActivityModal}
                />
            )}

            {isCreateLinkModalOpen && (
                <CreateLinkModal
                    setUpdatesTheListOfLinks={setUpdatesTheListOfLinks}
                    closeCreateLinkModal={closeCreateLinkModal}
                />
            )}

        </div>
    )
}