from procedure_server import ProcedureServer


class ExampleProcedure(ProcedureServer):
    def define(self):
        self.name = "Example Procedure"

        step = self.step("Enter datasheet information")
        step.info("Enter the datasheet details")
        step.field("Part number", type="text")
        step.field("Serial number", type="text")
        step.field("Operator", type="text")
        step.field("Date", type="date", default="now")

        step = self.step("Power Up")
        step.field("Set the power switch to on")
        step.field("Enable the contactor")

if __name__ == "__main__":
    print "Starting"
    procedure = ExampleProcedure()
    procedure.start()
