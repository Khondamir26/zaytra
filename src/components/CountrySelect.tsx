// components/CountrySelect.tsx

import React, { useEffect, useState } from 'react';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

countries.registerLocale(enLocale);

type CountrySelectProps = {
    value: string;
    onChange: (value: string) => void;
};

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
    const [options, setOptions] = useState<{ label: string; value: string }[]>([]);

    useEffect(() => {
        const countryObj = countries.getNames('en', { select: 'official' });
        const countryList = Object.entries(countryObj).map(([, name]) => ({
            value: name,
            label: name,
        }));
        setOptions(countryList);
    }, []);

    return (
        <div className="">
            <Label className="text-sm font-medium mb-1">
                Country of Registration *
            </Label>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className=" rounded-2xl w-full">
                    <SelectValue placeholder="Choose Country" />
                </SelectTrigger>
                <SelectContent>
                    {options.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                            {country.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>

    );
};

export default CountrySelect;
