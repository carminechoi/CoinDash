import React from "react";
import Container from "@mui/material/Container";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "./TabPanel";

function TabsGroup({ tabs, children }) {
    const [value, setValue] = React.useState(tabs[0]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container sx={{ mt: 0 }}>
            <Tabs value={value} onChange={handleChange} centered>
                {tabs.map((tab) => (
                    <Tab
                        key={tab}
                        value={tab}
                        label={tab}
                        sx={{ textTransform: "none" }}
                    />
                ))}
            </Tabs>

            {tabs.map((tab) => (
                <TabPanel key={tab} value={value} label={tab}>
                    {children}
                </TabPanel>
            ))}
        </Container>
    );
}

export default TabsGroup;
