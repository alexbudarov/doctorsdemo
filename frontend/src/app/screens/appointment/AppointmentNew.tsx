import {Card} from "antd";
import {AppointmentRequest} from "./AppointmentRequest";

export function AppointmentNew() {
  return (
    <>
      <Card className="narrow-layout" title="Request a new appointment">
        <AppointmentRequest/>
      </Card>
    </>
  );
}
