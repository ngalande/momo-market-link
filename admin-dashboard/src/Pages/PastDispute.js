import React from "react"
import SideNav from "../Assets/Components/SideNav"
import ReslovedDisputesTable from "../Assets/Components/ReslovedDisputesTable"

export default function PastDispute(){
    return(
        <SideNav>
            <div>
                past disputes
            </div>
            <div>
                <ReslovedDisputesTable/>
            </div>
        </SideNav>
    )
}