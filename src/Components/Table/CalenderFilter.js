import { DateRangePicker } from 'react-date-range'
import { Input } from 'reactstrap'
import { dateFormate } from '../../Utils/CustomFunctions/DateFormate';
import CloseDateRange from './CloseDateRange';
import useOutsideDropdown from '../../Utils/Hooks/CustomHooks/useOutsideDropdown';
import { RiCalendarLine } from 'react-icons/ri';

const CalenderFilter = ({ date, setDate }) => {
    const { ref, isComponentVisible, setIsComponentVisible } = useOutsideDropdown();
    const enableDatePicker = () => {
        setIsComponentVisible((prev) => !prev)
    }
    return (
        <div className="calender-box" ref={ref}>
            <div className='position-relative calender'>
                <Input type="text" value={date[0]?.startDate ? dateFormate(date[0]?.startDate, true) : ""} placeholder='YYYY-MM-DD' onClick={() => enableDatePicker("startDate")} readOnly />
                <RiCalendarLine/>
            </div>
            <div className='position-relative calender'>
                <Input type="text" value={date[0]?.endDate ? dateFormate(date[0]?.endDate, true) : ""} placeholder='YYYY-MM-DD' onClick={() => enableDatePicker("endDate")} readOnly />
                <RiCalendarLine/>
            </div>
            {isComponentVisible && <DateRangePicker
                onChange={item => setDate([item.selection])}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={2}
                ranges={date ? date : false}
                endDatePlaceholder="End Date"
                footerContent={<CloseDateRange setDate={setDate} setIsComponentVisible={setIsComponentVisible} />}
                startDatePlaceholder="Start Date"
                direction="horizontal"
            />}
        </div>
    )
}

export default CalenderFilter