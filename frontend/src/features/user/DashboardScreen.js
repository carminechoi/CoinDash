import React from "react";
import { useSelector } from "react-redux";

function DashboardScreen() {
    const { userInfo } = useSelector((state) => state.user);

    return (
        <div>
            <span>
                Welcome <strong>{userInfo?.email}!</strong> You can view this
                page because you're logged in
            </span>
        </div>
    );
}

export default DashboardScreen;
