import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react";
import ActiveOrdersPage from "./ActiveOrdersPage";
import CompletedOrdersPage from "./CompletedOrdersPage";

function SalesOrdersPage() {
  return (
    <Box p={4}>
      <Tabs>
        <TabList>
          <Tab>Active Sales Orders</Tab>
          <Tab>Completed Sales Orders</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ActiveOrdersPage />
          </TabPanel>
          <TabPanel>
            <CompletedOrdersPage />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default SalesOrdersPage;
