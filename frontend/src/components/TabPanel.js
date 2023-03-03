import React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";

function TabPanel(props) {
    const { children, value, label } = props;

    return (
        <div role="tabpanel" hidden={value !== label}>
            {value === label && (
                <Box>{React.cloneElement(children, { type: label })}</Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

export default TabPanel;
