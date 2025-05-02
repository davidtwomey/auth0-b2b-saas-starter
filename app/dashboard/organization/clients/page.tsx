import {appClient, managementClient} from "@/lib/auth0"
import {PageHeader} from "@/components/page-header"

import {ApiClientsList} from "./clients-list"
import {CreateApiClientForm} from "./create-client-form"
import {redirect} from "next/navigation";

export default async function ApiClients() {
    const session = await appClient.getSession()
    if (!session) {
        // unauthenticated ⇒ go to login, 404, etc.
        redirect("/api/auth/login")
    }
    const orgId = session.user.org_id
    let rawClients;
    try {
        // TODO - explore server-side filtering: https://auth0.com/docs/api/management/v2/clients/get-clients#:~:text=of%20application%20types.-,q,-string
        rawClients = await managementClient.clients.getAll({
            include_totals: false,                      // array not object
            fields: "client_id,name,app_type,default_organization",
            include_fields: true,
        })
    } catch (error) {
        console.error("Failed to fetch API clients", error)
        // return null // TODO - handle error
    }
    const apiClients = rawClients?.data.filter?.((client) => client.app_type === "non_interactive" && client.default_organization && client.default_organization.organization_id === orgId) ?? []
    return (
        <div className="space-y-2">
            <PageHeader
                title="API Machine-to-Machine (M2M) Clients"
                description="Create and manage service-account style clients that obtain OAuth 2.0 tokens via the Client Credentials flow to call IMMIX APIs."
            />

            <ApiClientsList
                clients={apiClients.map((client) => ({
                    id: client.client_id,
                    name: client.name,
                    type: client.app_type,
                }))}
            />

            <CreateApiClientForm/>
        </div>
    )
}


