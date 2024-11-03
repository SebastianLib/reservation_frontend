"use client";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

interface OpeningHoursFormProps {
  initialHours: Record<string, { isOpen: boolean; open: string; close: string }>;
  onHoursChange: (updatedHours: Record<string, { isOpen: boolean; open: string; close: string }>) => void;
  hoursOptions: { time: string }[];
}

const OpeningHours = ({ initialHours, onHoursChange, hoursOptions }: OpeningHoursFormProps) => {
  const [openHoursState, setOpenHoursState] = useState(initialHours);

  const polishDaysOfWeek = {
    monday: "Poniedziałek",
    tuesday: "Wtorek",
    wednesday: "Środa",
    thursday: "Czwartek",
    friday: "Piątek",
    saturday: "Sobota",
    sunday: "Niedziela",
  };

  const handleOpenHoursChange = (day: string, isOpen: boolean) => {
    const updatedHours = {
      ...openHoursState,
      [day]: {
        ...openHoursState[day],
        isOpen,
      },
    };
    setOpenHoursState(updatedHours);
    onHoursChange(updatedHours);
  };

  const handleTimeChange = (day: string, type: "open" | "close", value: string) => {
    const updatedHours = {
      ...openHoursState,
      [day]: {
        ...openHoursState[day],
        [type]: value,
      },
    };
    setOpenHoursState(updatedHours);
    onHoursChange(updatedHours);
  };

  return (
    <div>
      {Object.keys(openHoursState).map((day) => (
        <div key={day} className="flex items-center justify-between py-2">
          <div className="flex gap-2 items-center">
            <Switch
              checked={openHoursState[day].isOpen}
              onCheckedChange={(isOpen) => handleOpenHoursChange(day, isOpen)}
            />
            <p className="text-xl font-semibold">{polishDaysOfWeek[day]}</p>
          </div>
          <div>
            {openHoursState[day].isOpen ? (
              <div className="flex gap-4">
                <Select
                  defaultValue={openHoursState[day].open}
                  onValueChange={(value) => handleTimeChange(day, "open", value)}
                >
                  <SelectTrigger className="md:w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Godziny</SelectLabel>
                      {hoursOptions.map((hour, i) => (
                        <SelectItem key={i} value={hour.time}>
                          {hour.time}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select
                  defaultValue={openHoursState[day].close}
                  onValueChange={(value) => handleTimeChange(day, "close", value)}
                >
                  <SelectTrigger className="md:w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Godziny</SelectLabel>
                      {hoursOptions.map((hour, i) => (
                        <SelectItem key={i} value={hour.time}>
                          {hour.time}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <p className="text-lg font-semibold">Zamknięte</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OpeningHours;
