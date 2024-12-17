import './index.css';
function FilterItem(props) {
    const { employmentTypesList, salaryRangesList ,onChangeEmployment,onChangeSalary} = props;
    const employment=event=>{
        onChangeEmployment(event.target.value)
    }
    const salary=event=>{
        onChangeSalary(event.target.value)
    }
    const renderEmploymentType = () => {
        return (
            <div className="employment">
                <h3 className="filter-heading">Type of Employment</h3>
                <ul className="filter-list">
                    {employmentTypesList.map(item => (
                        <li className='employment-item' key={item.employmentTypeId}>
                            <input 
                                type='checkbox' onChange={employment}
                                value={item.label}
                                id={item.employmentTypeId} 
                            />
                            <label htmlFor={item.employmentTypeId}>{item.label}</label>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    const renderSalaryRange = () => {
        return (
            <div className='salary'>
                <h3 className="filter-heading">Salary Range</h3>
                <ul className="filter-list">
                    {salaryRangesList.map(item => (
                        <li className='salary-item' key={item.salaryRangeId}>
                            <input 
                                type='checkbox' 
                                value={item.label}
                                id={item.salaryRangeId} onChange={salary}
                            />
                            <label htmlFor={item.salaryRangeId}>{item.label}</label>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div className='filter-container'>
            {renderEmploymentType()}
            {renderSalaryRange()}
        </div>
    );
}
export default FilterItem;
