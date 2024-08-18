import CommonLayout from "../common-layout"

const policyItems = [
    "The policy applies to all students of the Institute registered with the TnP Cell and any company interested in campus recruitment.",
    "The definition of “Institute” shall be understood as “Indian Institute of Information Technology (IIIT), Ranchi” throughout the policy.",
    "The contact information given below shall be used for all communications instead of the info provided in the policy document."
]
const Policy = () => {
    return (
        <CommonLayout title="Placement Policy">
            <div className="flex items-center gap-y-4 flex-col m-3 md:m-0">
                <div className="text-center">
                    <p>The placement season in Indian Institute of Information Technology Ranchi runs throughout the year, commencing from the first week of July through to May. The Training and Placement (TnP) Cell oversees the placement process, following the<span className="text-primary font-semibold">placement policy :</span></p>
                </div>

                <ul className="flex items-start mt-4 gap-y-1 w-[70%] flex-col">
                    {
                        policyItems.map((item, i) => {
                            return <li key={i} className="list-disc">{item}</li>
                        })
                    }
                </ul>
            </div>

        </CommonLayout>
    )

}
export default Policy