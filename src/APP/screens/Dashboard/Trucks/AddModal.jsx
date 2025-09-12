import React, { useState } from "react";
import BasicModal from "@/components/modals/BasicModal";
import useAxios from "@/hooks/use-axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddModal = ({ showAdd, setShowAdd, refetchTrucks }) => {
  const request = useAxios();

  const [plate_number, setPlateNumber] = useState("");
  const [vin, setVin] = useState("");
  const [make_model, setMakeModel] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    let res = await request({
      method: "POST",
      url: "trucks/",
      body: {
        plate_number,
        vin,
        make_model,
        year,
      },
    });

    if (res?.error) {
      setLoading(false);
      return;
    }

    setLoading(false);
    refetchTrucks();
    setShowAdd(false);
  };

  return (
    <BasicModal
      isOpen={showAdd}
      onClose={() => setShowAdd(false)}
      title="Add A New Truck"
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-3 max-md:flex-col">
          <div className="space-y-2">
            <Label>Vehicle Plate Number</Label>
            <Input
              value={plate_number}
              onChange={(e) => setPlateNumber(e.target.value)}
              placeholder="Enter plate number e.g KBC 154Y"
            />
          </div>
          <div className="space-y-2">
            <Label>Vehicle VIN</Label>
            <Input
              value={vin}
              onChange={(e) => setVin(e.target.value)}
              placeholder="Enter VIN"
            />
          </div>
        </div>
        <div className="flex gap-3 max-md:flex-col">
          <div className="space-y-2">
            <Label>Vehicle Make(Model)</Label>
            <Input
              value={make_model}
              onChange={(e) => setMakeModel(e.target.value)}
              placeholder="Enter model e.g Volvo XC90"
            />
          </div>
          <div className="space-y-2">
            <Label>Year of Manufacture(YoM)</Label>
            <Input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Enter YoM"
            />
          </div>
        </div>

        <div className="my-2 flex gap-2">
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
          <Button variant="outline" onClick={() => setShowAdd(false)}>
            Cancel
          </Button>
        </div>
      </div>
    </BasicModal>
  );
};

export default AddModal;
