"use client";

import { ChangeEvent, useState } from "react";
import { Card } from "./card";

const StyledInput = ({
  placeholder,
  value,
  setValue,
}: {
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const withTrailingZero = inputValue.endsWith(".")
      ? inputValue + "0"
      : inputValue;
    const floatValue = parseFloat(withTrailingZero);
    const isValid = !isNaN(floatValue) && floatValue >= 0;
    const displayValue = isValid ? inputValue : "";
    setValue(displayValue);
  };

  return (
    <input
      className="text-slate-500 border border-gray-300 rounded-sm py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      type="number"
      pattern="[0-9]*|\.*"
    />
  );
};

const depreciationPerMile = {
  "2026": 0.35,
  "2025": 0.33,
  "2024": 0.3,
  "2023": 0.28,
  "2022": 0.26,
  "2021": 0.26,
  "2020": 0.27,
  "2019": 0.26,
  "2018": 0.25,
  "2017": 0.25,
  "2016": 0.24,
  "2015": 0.24,
  "2014": 0.22,
  "2013": 0.23,
  "2012": 0.23,
  "2011": 0.22,
  "2010": 0.23,
  "2009": 0.21,
  "2008": 0.21,
  "2007": 0.19,
  "2006": 0.17,
  "2005": 0.17,
  "2004": 0.16,
  "2003": 0.16,
};

const defaultValues = {
  carPayment: "600",
  mileage: "1000",
  mpg: "25",
  gasPrice: "3.50",
  insurance: "150",
  tolls: "40",
  parking: "30",
  maintenance: "40",
  modelYear: "2016",
  transitDays: "21",
};

export const CostCalculator = () => {
  const [carPayment, setCarPayment] = useState(defaultValues.carPayment);
  const [mileage, setMileage] = useState(defaultValues.mileage);
  const [mpg, setMpg] = useState(defaultValues.mpg);
  const [gasPrice, setGasPrice] = useState(defaultValues.gasPrice);
  const [insurance, setInsurance] = useState(defaultValues.insurance);
  const [tolls, setTolls] = useState(defaultValues.tolls);
  const [parking, setParking] = useState(defaultValues.parking);
  const [maintenance, setMaintenance] = useState(defaultValues.maintenance);
  const [modelYear, setModelYear] = useState<keyof typeof depreciationPerMile>(
    defaultValues.modelYear as keyof typeof depreciationPerMile,
  );
  const [transitDays, setTransitDays] = useState(defaultValues.transitDays);

  const reset = () => {
    setCarPayment(defaultValues.carPayment);
    setMileage(defaultValues.mileage);
    setMpg(defaultValues.mpg);
    setGasPrice(defaultValues.gasPrice);
    setInsurance(defaultValues.insurance);
    setTolls(defaultValues.tolls);
    setParking(defaultValues.parking);
    setMaintenance(defaultValues.maintenance);
    setModelYear(defaultValues.modelYear as keyof typeof depreciationPerMile);
    setTransitDays(defaultValues.transitDays);
  };

  const registrationCost = 51.75 + 11.5 + 7.5 + 2.75 + 4.75;
  const depreciationCost =
    parseFloat(mileage || defaultValues.mileage) *
    depreciationPerMile[modelYear];

  const monthlyCostOfDriving =
    parseFloat(carPayment || defaultValues.carPayment) +
    (parseFloat(mileage || defaultValues.mileage) /
      parseFloat(mpg || defaultValues.mpg)) *
      parseFloat(gasPrice || defaultValues.gasPrice) +
    parseFloat(insurance || defaultValues.insurance) +
    parseFloat(tolls || defaultValues.tolls) +
    parseFloat(parking || defaultValues.parking) +
    parseFloat(maintenance || defaultValues.maintenance) +
    depreciationCost +
    registrationCost / 12;

  const monthlyCostOfTransit = Math.min(
    parseFloat(transitDays || defaultValues.transitDays) * 6,
    126,
  );

  return (
    <div className="w-full my-10 rounded-sm" id="cost-calculator">
      <div className="text-2xl font-semibold my-4 ml-2">
        Cost of Driving vs Transit
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="w-full flex flex-col items-center justify-center p-6 gap-4">
          <div className="text-lg font-semibold">Driving Costs (Monthly)</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">Car Payment</div>
            <StyledInput
              placeholder={defaultValues.carPayment}
              value={carPayment}
              setValue={(v) => setCarPayment(v)}
            />

            <div className="flex items-center">Mileage</div>
            <StyledInput
              placeholder={defaultValues.mileage}
              value={mileage}
              setValue={(v) => setMileage(v)}
            />

            <div className="flex items-center">MPG</div>
            <StyledInput
              placeholder={defaultValues.mpg}
              value={mpg}
              setValue={(v) => setMpg(v)}
            />

            <div className="flex items-center">Gas Price</div>
            <StyledInput
              placeholder={defaultValues.gasPrice}
              value={gasPrice}
              setValue={(v) => setGasPrice(v)}
            />

            <div className="flex items-center">Insurance</div>
            <StyledInput
              placeholder={defaultValues.insurance}
              value={insurance}
              setValue={(v) => setInsurance(v)}
            />

            <div className="flex items-center">Tolls</div>
            <StyledInput
              placeholder={defaultValues.tolls}
              value={tolls}
              setValue={(v) => setTolls(v)}
            />

            <div className="flex items-center">Parking</div>
            <StyledInput
              placeholder={defaultValues.parking}
              value={parking}
              setValue={(v) => setParking(v)}
            />

            <div className="flex items-center">Maintenance</div>
            <StyledInput
              placeholder={defaultValues.maintenance}
              value={maintenance}
              setValue={(v) => setMaintenance(v)}
            />

            <div className="flex items-center">Vehicle Model Year</div>
            <select
              className="text-slate-500 border border-gray-300 rounded-sm py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={modelYear}
              onChange={(e) =>
                setModelYear(e.target.value as keyof typeof depreciationPerMile)
              }
            >
              {Object.keys(depreciationPerMile)
                .sort((a, b) => parseInt(b) - parseInt(a))
                .map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
            </select>

            <div className="flex items-center">Depreciation</div>
            <div className="flex items-center h-[42px]">
              <span className="text-slate-400 text-sm">
                {mileage} miles * ${depreciationPerMile[modelYear].toFixed(2)} =
              </span>
              &nbsp;
              <span>${depreciationCost.toFixed(2)}</span>
            </div>

            <div className="flex items-center">Registration</div>
            <div className="flex items-center h-[42px]">
              <span className="text-slate-400 text-sm">
                ${registrationCost.toFixed(2)} / 12 months =
              </span>
              &nbsp;
              <span>${(registrationCost / 12).toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={reset}
            className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-black text-nowrap"
          >
            Reset
          </button>
          <div>
            <span className="text-xl font-bold">
              $
              {Intl.NumberFormat("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(monthlyCostOfDriving)}
            </span>{" "}
            a month
          </div>
        </Card>
        <Card className="w-full flex flex-col items-center justify-between p-6 gap-4">
          <div className="flex flex-col items-center gap-4">
            <div className="text-lg font-semibold">Transit Costs (Monthly)</div>
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="flex items-center">Travel days</div>
              <StyledInput
                placeholder={defaultValues.transitDays}
                value={transitDays}
                setValue={(v) => setTransitDays(v)}
              />
            </div>
          </div>
          <div>
            <span className="text-xl font-bold">
              ${monthlyCostOfTransit.toFixed(0)}
            </span>{" "}
            a month
            {monthlyCostOfDriving - monthlyCostOfTransit > 0 && (
              <>
                {" - "}
                <span className="text-green-500">
                  Save{" "}
                  <span className="font-bold text-xl">
                    +$
                    {Intl.NumberFormat("en-US", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(
                      12 * (monthlyCostOfDriving - monthlyCostOfTransit),
                    )}
                  </span>{" "}
                  a year by switching to transit
                </span>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
