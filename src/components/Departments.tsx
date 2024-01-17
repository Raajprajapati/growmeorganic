import React, { useState } from 'react';
import departments from '../data.ts';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import './Departments.css';


const Departments: React.FC = () => {

    // type aliases for departments and subdepartements checked values
    type Subdepartment = {
        checked: boolean,
    }

    type Department = {
        checked: boolean,
        subdepartments: Subdepartment[]
    }

    // departments checked value array intialization
    let departmentChecks: Department[] = [];

    // assigning department checkbox values from departments data
    departments.forEach((item) => {
        const department: Department = {
            checked: false,
            subdepartments: []
        }

        item?.sub_departments?.forEach(() => {
            let sub: Subdepartment = {
                checked: false
            }
            department.subdepartments.push(sub);
        })
        departmentChecks.push(department);
    });

        //  state variable for checkbox check
    const [checked, setChecked] = useState<Department[]>(departmentChecks);
    // state variable for collapse check
    const [collapse, setCollapse] = useState<boolean[]>(Array(departmentChecks.length).fill(true));


    // function to change the collapse status
    const changeCollapse = (ind: number, state: boolean) => {
        setCollapse((prev) => {
            let newArr = [...prev];
            newArr[ind] = !state;
            return newArr;

        })
    }


    // function to handle the checkbox values for the departments
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, departmentIndex: number) => {

        if (event.target.checked) {
            setChecked((prev) => {
                let newArr = [...prev];
                newArr[departmentIndex].checked = true;
                changeCollapse(departmentIndex, true)
                newArr[departmentIndex].subdepartments?.forEach((val, subDepartmentIndex) => {
                    newArr[departmentIndex].subdepartments[subDepartmentIndex].checked = true;
                })
                return newArr;
            })

        } else {
            setChecked((prev) => {
                let newArr = [...prev];
                newArr[departmentIndex].checked = false;
                changeCollapse(departmentIndex, false);
                newArr[departmentIndex].subdepartments?.forEach((val, subDepartmentIndex) => {
                    newArr[departmentIndex].subdepartments[subDepartmentIndex].checked = false;
                })
                return newArr;
            })
        }
    }


    // function to handle subdepartment checkbox changes
    const changeSubdepartment = (event: React.ChangeEvent<HTMLInputElement>, departmentIndex: number, subdepartmentIndex: number) => {
        setChecked((prev) => {
            let newArr = [...prev];
            newArr[departmentIndex].subdepartments[subdepartmentIndex].checked = event.target.checked;
            newArr[departmentIndex].checked = checkAll(departmentIndex);
            return newArr;
        })
    }


    // function to check if all subdepartments are checked or not
    const checkAll = (departmentIndex: number): boolean => {
        return checked[departmentIndex].subdepartments.every((val) => val.checked === true);
    }


    return (
        <>
        <div className='department-menu'>
            <h2>Departments menu</h2>
            {departments.map((item, index1) => {

                return <div key={index1} className='department'>
                    <FormControlLabel
                        label={item.department}
                        control={<Checkbox
                            checked={checked[index1].checked}
                            onChange={(e) => handleChange(e, index1)}
                        />}

                    />

                    {collapse[index1] ? null :
                        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }} className='subdepartments'>
                            {item.sub_departments?.map((subdepartment, index2) => {
                                return (<FormControlLabel
                                            key={String(index1) + String(index2)}
                                            className='subdepartment'
                                            label={subdepartment}
                                            control={<Checkbox
                                            checked={checked[index1].subdepartments[index2].checked}
                                            onChange={(event) => { changeSubdepartment(event, index1, index2) }}
                                    />
                                    }
                                />)

                            })}
                        </Box>
                    }

                </div>

            })
            }

        </div>
        </>
    );
};

export default Departments;