import { ReactNode } from "react";
import { PowerCategory } from "./types";

export const POWER_CATEGORIES: { [key: string]: PowerCategory } = Object.freeze(
  {
    powerMeasurements: {
      title: "Power (Psum)",
      description:
        "Refers to the power readings of the machine and are measured in kilowatts (kW). High or abnormal readings might indicate overloading or inefficiency. The readings are taken from the three-phase system.",
      key: "Psum",
      unit: "kilowatts (kW)",
      keyMetrics: ["Operating Load", "Min/Max", "Median", "Standard Deviation"],
      items: ["P1", "P2", "P3", "Psum"],
    },
    apparentPower: {
      title: "Apparent Power (Ssum)",
      description:
      "Apparent power is the product of the voltage and current of the circuit and is measured in volt-amperes (VA). It is the power that the power company must deliver to the customer.",
      key: "Ssum",
      unit: "Volt-amperes (VA)",
      keyMetrics: ["Operating Load", "Min/Max", "Median", "Standard Deviation"],
      items: ["S1", "S2", "S3", "Ssum"],
    },
    powerFactor: {
      title: "Power Factor (PFavg)",
      description:
      "The power factor is a measure of how effectively electrical power is being used. The higher the power factor, the more effectively electrical power is being used. A low power factor may suggest that the machine is not using power efficiently and may incur extra costs due to wasted energy.",
      key: "PFavg",
      unit: "Power Factor",
      keyMetrics: ["Min/Max", "Median"],
      items: ["PF1", "PF2", "PF3", "PFavg"],
    },
    current: {
      title: "Current (Iavg)",
      description:
      "Refers to the current readings of the machine and are measured in amperes (A). Unusual currents could signal issues with the electrical components of the machine.",
      key: "Iavg",
      unit: "Amperes (A)",
      keyMetrics: ["Operating Load", "Min/Max", "Median", "Standard Deviation"],
      items: ["I1", "I2", "I3", "Iavg"],
    },
    lineVoltage: {
      title: "Line to Line Voltage (Vll)",
      description:
      "Refers to the voltage readings of the machine and are measured in volts (V). Unusual voltages could signal issues with the electrical components of the machine.",
      key: "Vllavg",
      unit: "Volts (V)",
      keyMetrics: ["Min/Max", "Median"],
      items: ["Vll1", "Vll2", "Vll3", "Vllavg"],
    },
    neutralVoltage: {
      title: "Line to Neutral Voltage (Vln)",
      description:
        "Refers to the voltage readings of the machine and are measured in volts (V). Unusual voltages could signal issues with the electrical components of the machine.",
      key: "Vlnavg",
      unit: "Volts (V)",
      keyMetrics: ["Min/Max", "Median"],
      items: ["Vln1", "Vln2", "Vln3", "Vlnavg"],
    },
    frequency: {
      title: "Frequency (F)",
      description:
        "Refers to the frequency readings of the machine and are measured in hertz (Hz). The frequency of the power supply is an important parameter for the proper operation of the machine.",
      key: "F",
      unit: "Hertz (Hz)",
      keyMetrics: ["Min/Max", "Median"],
      items: ["F"],
    },
    energy: {
      title: "Energy (engy)",
      description:
        "Overall energy consumption readings of the machine. Tracking energy consumption is key to understanding the machine's operating costs and can identify opportunities for energy savings. Energy reading of the machine measured in kilowatt-hours (kWh).",
      key: "engy",
      unit: "kilowatt-hours (kWh)",
      keyMetrics: [],
      items: ["engy"],
    },
    apparentEnergy: {
      title: "Apparent Energy",
      description:
      "Apparent energy is the product of the voltage and current of the circuit and is measured in volt-amperes-hours (VAh). It is the energy that the power company must deliver to the customer.",
      key: "apparentEngy",
      unit: "Volt-amperes-hours (VAh)",
      keyMetrics: [],
      items: ["apparentEngy"],
    },
  },
);

export const STATES: { [key: string]: { title: string; color: string } } =
  Object.freeze({
    "On - loaded": {
      title: "On - loaded",
      color: "#90ee9020",
    },
    "On - idle": {
      title: "On - idle",
      color: "#fffd0120",
    },
    "On - unloaded": {
      title: "On - unloaded",
      color: "#3399cc20",
    },
    Off: {
      title: "Off",
      color: "#ff000060",
    },
  });

  export const STATE_INDICATORS: { [key: string]: ReactNode } = Object.freeze({
    "On - loaded": "🟢",
    "On - idle": "🟡",
    "On - unloaded": "🔵",
    Off: "🔴",
  });