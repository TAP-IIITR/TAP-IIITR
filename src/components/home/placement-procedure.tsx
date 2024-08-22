import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import CommonLayout from '../common-layout';
import { procedureData } from '@/data';


const PlacementProcedure = () => {
  return (
    <CommonLayout title='Placement Procedure' >
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