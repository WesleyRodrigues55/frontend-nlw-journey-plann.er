import { Link2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface ImportantLinks {
    title: string
    url: string
}

interface ImportantLinksProps {
    setUpdatesTheListOfLinks: (isTrue: boolean) => void
    updatesTheListOfLinks: boolean
}

export function ImportantLinks({
    setUpdatesTheListOfLinks,
    updatesTheListOfLinks
} : ImportantLinksProps) {

    const { tripId } = useParams()
    const [links, setLinks] = useState<ImportantLinks[]>([])

    useEffect(() => {

        api.get(`/trips/${tripId}/links`)
            .then( response => setLinks(response.data.links) )
        
        setUpdatesTheListOfLinks(false)

    }, [setUpdatesTheListOfLinks, tripId, updatesTheListOfLinks])

    return (
        <div className="space-y-6">
            <h2 className="text-xl  font-semibold">
                Links importantes
            </h2>
            
            <div className="space-y-5 overflow-y-scroll max-h-[320px] scroll-m-0 px-4">
                {links.map((link, index) => {
                    return (
                        <div key={index} className="flex items-center justify-between gap-4">
                            <div className="space-y-1.5">
                                <span className="block font-medium text-zinc-100">
                                    {link.title}
                                </span>
                                <a 
                                    href={`${link.url}`} 
                                    target="_blank"
                                    className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
                                >
                                    {link.url}
                                </a>
                            </div>
                            <Link2 className="text-zinc-400 size-5 flex-shrink-0"/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}