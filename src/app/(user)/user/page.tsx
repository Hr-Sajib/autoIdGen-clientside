import React from 'react';
import { UserDashboardHeader } from './_components/UserDashboardHeader';
import StudentFormPage from './_components/StudentFormPage';

import ExportPage from './_components/ExportPage';
const page = () => {
    return (
        <div>
            {/* <UserDashboardHeader/> */}
            <StudentFormPage/>

       {/* <ExportPage/> */}
        </div>
    );
};

export default page;