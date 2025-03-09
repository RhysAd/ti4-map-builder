import { Dashboard } from "../../dashboard/Dashboard"
import { useState } from "react"
import { GalaxyContainer } from "../../galaxy/GalaxyContainer"

function Routes() {
    const [route, setRoute] = useState("dashboard")

    switch(route) {
        case "galaxy":
            return (
                <GalaxyContainer />)
        default:
            return (
                <Dashboard onOpenGame={setRoute}/>
            )
    }
}

export { Routes }