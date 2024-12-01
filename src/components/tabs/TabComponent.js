import React from "react";
import { Tabs, Tab, Container } from "react-bootstrap";

const TabsComponent = () => {
  return (
    <Container className="my-4">
      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="restoreSession" title=" Restore Session">
          <p>Content for the Home tab.</p>
        </Tab>
        <Tab eventKey="saveTabs" title="Save Tabs">
          <p>Content for the Profile tab.</p>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default TabsComponent;
