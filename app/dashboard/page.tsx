import Link from "next/link"
import { ArrowRightIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"

import { ActionsPanel } from "./actions-panel" // <-- import our new client component
import { UserPanel } from "./user-panel"

export default async function DashboardHome() {
  // (Optional) server-side logic here
  // e.g., session checks or data fetching can still run on the server

  return (
    <div className="flex flex-1 flex-grow flex-col gap-4 lg:gap-6">
      <div className="flex flex-1 items-center justify-center rounded-3xl border bg-field shadow-sm">
        <div className="flex max-w-[500px] flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            Explore the SaaS Starter
          </h3>
          <p className="mt-3 text-muted-foreground">
            This reference app demonstrates how to build a multi-tenant B2B SaaS
            application powered by Auth0 by Okta.
          </p>

          {/* Existing content ... */}
          <div className="mt-8">
            <Link href="/dashboard/organization/general" className="w-full">
              <Button className="w-full">
                Navigate to Settings
                <ArrowRightIcon className="ml-2 size-4" />
              </Button>
            </Link>
          </div>
          <p className="mt-3 text-muted-foreground">
            (You must be logged in with an &quot;admin&quot; role in your
            organization.)
          </p>

          {/* Embed the new ActionsPanel client component */}
          <ActionsPanel />
        </div>
      </div>
    </div>
  )
}
