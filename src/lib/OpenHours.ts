export type WeekDays =
| "monday"
| "tuesday"
| "wednesday"
| "thursday"
| "friday"
| "saturday"
| "sunday";
export const openHours: Record<
WeekDays,
{ isOpen: boolean; open: string; close: string }
> = {
monday: {
  isOpen: true,
  open: "08:00",
  close: "16:00",
},
tuesday: {
  isOpen: true,
  open: "08:00",
  close: "16:00",
},
wednesday: {
  isOpen: true,
  open: "08:00",
  close: "16:00",
},
thursday: {
  isOpen: true,
  open: "08:00",
  close: "16:00",
},
friday: {
  isOpen: true,
  open: "08:00",
  close: "16:00",
},
saturday: {
  isOpen: false,
  open: "08:00",
  close: "16:00",
},
sunday: {
  isOpen: false,
  open: "08:00",
  close: "16:00",
},
};