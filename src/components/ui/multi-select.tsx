import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Check } from "lucide-react"


export function MultiSelect({
    selected,
    onChange,
    options
}: {
    selected: string[],
    onChange: (val: string[]) => void,
    options: { label: string, value: string }[]
}) {
    const toggleValue = (val: string) => {
        if (selected.includes(val)) {
            onChange(selected.filter(v => v !== val))
        } else {
            onChange([...selected, val])
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full justify-between rounded-2xl truncate"
                >
                    {selected.length > 0 ? selected.join(", ") : "Select options"}
                    <Check className="ml-2 h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start">
                <div className="flex flex-col gap-2">
                    {options.map((opt) => (
                        <label
                            key={opt.value}
                            className="flex items-center space-x-2 cursor-pointer"
                        >
                            <Checkbox
                                checked={selected.includes(opt.value)}
                                onCheckedChange={() => toggleValue(opt.value)}
                                className="cursor-pointer"
                            />
                            <span className="text-sm">{opt.label}</span>
                        </label>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}
