import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import CommonLayout from '../common-layout';

const procedureData = [
  {
    label: "Invitation",
    data: "Training and Placement (TAP) Cell, IIIT Ranchi invites companies/organizations or full-time hiring/internship hiring of the students."
  },
  {
    label: "FinalJNF/INF",
    data: "TAP Cell provides the link to download the Job Notification Form (JNF) & Internship Notification Form (INF) that needs to be filled by the company and sent through email to tpo@iiitranchi.ac.in"
  },
  {
    label: "Assign a Coordinator",
    data: "A student from the tap coordinators is assigned to every company as Point of Contact (POC) to coordinate with HRs and students for smooth conduct of hiring process"
  },
  {
    label: "PPT & OA",
    data: "On receipt of JNF/INF, TAP Cel invites the companies to visit the campus for a Pre-Placement Talk (PPT) either before the selection process or during the final recruitment process"
  },
  {
    label: "Schedule",
    data: "TAP finalizes a suitable date for the selection process and communicates to the company. Dates are allotted on the basis of students' perception of the job/internship offered viz, job profile and growth prospects, CTC/Stipend offered by company, past record recruitment."
  },
  {
    label: "Final List",
    data: "After completion of the selection process, the company is requested to furnish the final list of selected and/or wait-listed students."
  }
]
const PlacementProcedure = () => {
  return (
    <CommonLayout title='Placement Procedure'>
      <VerticalTimeline>
        {
          procedureData.map((procedure, i) => {
            return (
              <VerticalTimelineElement
                key={i}
                className="vertical-timeline-element--work"
                date={`${i + 1}.${procedure.label}`}
                contentStyle={{ background: 'rgb(255, 255, 255)', color: 'black' }}
                contentArrowStyle={{ borderRight: '7px solid  white' }}
                iconStyle={{ background: '#0928A0', color: 'black' }}
              >
                <p>
                  {procedure.data}
                </p>
              </VerticalTimelineElement>
            )
          })
        }
      </VerticalTimeline>
    </CommonLayout>
  )
}
export default PlacementProcedure