import React, { useState } from "react";
import BasicModal from "@/components/modals/BasicModal";
import useAxios from "@/hooks/use-axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddModal = ({ showAdd, setShowAdd, refetchDrivers }) => {
  const request = useAxios();

  const [name, setName] = useState("");
  const [license_number, setLicenceNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    let res = await request({
      method: "POST",
      url: "drivers/",
      body: {
        name,
        license_number,
        phone,
        email,
      },
    });

    if (res?.error) {
      setLoading(false);
      return;
    }

    setLoading(false);
    refetchDrivers();
    setShowAdd(false);
  };

  return (
    <BasicModal
      isOpen={showAdd}
      onClose={() => setShowAdd(false)}
      title="Add A New Driver"
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-3 max-md:flex-col">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
            />
          </div>
          <div className="space-y-2">
            <Label>License Number</Label>
            <Input
              value={license_number}
              onChange={(e) => setLicenceNumber(e.target.value)}
              placeholder="Enter License Number"
            />
          </div>
        </div>
        <div className="flex gap-3 max-md:flex-col">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter driver's email"
            />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Phone Number"
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
