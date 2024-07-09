'use client';

import { Amenities, Locations } from '@prisma/client';
import { CheckCheck, Loader2 } from 'lucide-react';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

import { BoardroomSchema } from '@/schemas';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import ImageUpload from '@/components/image-upload';
import { Input } from '@/components/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/textarea';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type BoardroomFormValues = z.infer<typeof BoardroomSchema>;

const amenities = Object.keys(Amenities)
    .filter((value) => isNaN(Number(value))) // Filter out numeric keys from the enum
    .map((value) => ({
        id: value.toLowerCase(),
        label: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
    }));

//

const BoardroomForm = () => {
    const [loading, setIsLoading] = useState(false);

    const form = useForm<BoardroomFormValues>({
        resolver: zodResolver(BoardroomSchema),
        defaultValues: {
            name: '',
            description: '',
            location: '',
            capacity: undefined,
            images: [],
            amenities: [],
            availability: [],
        },
    });

    const onSubmit = async (values: BoardroomFormValues) => {
        console.log(values);
    };

    return (
        <div className="bg-white-bg/65 p-5 rounded-md">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="col-span-3 md:col-span-2">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={loading}
                                                    {...field}
                                                    placeholder="Main boardroom"
                                                    className="focus-visible:ring-primary-500 py-5"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="col-span-3 sm:col-span-1">
                                <FormField
                                    control={form.control}
                                    name="capacity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Capacity</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="32"
                                                    disabled={loading}
                                                    {...field}
                                                    className="focus-visible:ring-primary-500 py-5"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="col-span-3">
                                <FormField
                                    control={form.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Location</FormLabel>
                                            <Select
                                                disabled={loading}
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="py-5">
                                                        <SelectValue
                                                            defaultValue={field.value}
                                                            placeholder="Select location"
                                                        />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {Object.keys(Locations).map((value, index) => (
                                                        <SelectItem key={index} value={value}>
                                                            {value}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="col-span-3 md:col-span-2">
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    disabled={loading}
                                                    {...field}
                                                    className="focus-visible:ring-primary-500 py-5"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="col-span-3">
                                <FormField
                                    control={form.control}
                                    name="amenities"
                                    render={() => (
                                        <FormItem>
                                            <div className="mb-4">
                                                <FormLabel className="text-base">
                                                    Amenities
                                                </FormLabel>
                                                <FormDescription className="text-xs">
                                                    Select the amenities available for this
                                                    boardroom
                                                </FormDescription>
                                            </div>
                                            {amenities.map((item) => (
                                                <FormField
                                                    key={item.id}
                                                    control={form.control}
                                                    name="amenities"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem
                                                                key={item.id}
                                                                className="flex flex-row items-start space-x-3 space-y-0"
                                                            >
                                                                <FormControl>
                                                                    <Checkbox
                                                                        checked={field.value?.includes(
                                                                            item.id
                                                                        )}
                                                                        onCheckedChange={(
                                                                            checked
                                                                        ) => {
                                                                            return checked
                                                                                ? field.onChange([
                                                                                      ...field.value,
                                                                                      item.id,
                                                                                  ])
                                                                                : field.onChange(
                                                                                      field.value?.filter(
                                                                                          (value) =>
                                                                                              value !==
                                                                                              item.id
                                                                                      )
                                                                                  );
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <FormLabel className="font-normal !text-sm">
                                                                    {item.label}
                                                                </FormLabel>
                                                            </FormItem>
                                                        );
                                                    }}
                                                />
                                            ))}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div>
                            <FormField
                                control={form.control}
                                name="availability"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Availability</FormLabel>
                                        <FormControl>
                                            <ToggleGroup
                                                size="sm"
                                                variant="outline"
                                                className="justify-start flex items-center w-full"
                                                {...field}
                                                onValueChange={(selectedValues) =>
                                                    field.onChange(selectedValues)
                                                }
                                                type="multiple"
                                            >
                                                {[
                                                    'Monday',
                                                    'Tuesday',
                                                    'Wednesday',
                                                    'Thursday',
                                                    'Friday',
                                                ].map((day) => (
                                                    <ToggleGroupItem key={day} value={day}>
                                                        {day}
                                                    </ToggleGroupItem>
                                                ))}
                                            </ToggleGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="mt-10">
                                <FormField
                                    control={form.control}
                                    name="images"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Images</FormLabel>
                                            <FormDescription>
                                                Upload a maximum of 3 images
                                            </FormDescription>
                                            <FormControl>
                                                <ImageUpload
                                                    value={field.value.map((image) => image.url)}
                                                    disabled={loading}
                                                    onChange={(url) =>
                                                        field.onChange([...field.value, { url }])
                                                    }
                                                    onRemove={(url) =>
                                                        field.onChange([
                                                            ...field.value.filter(
                                                                (current) => current.url !== url
                                                            ),
                                                        ])
                                                    }
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    <Button
                        size="lg"
                        disabled={loading}
                        className="ml-auto rounded-sm mt-10"
                        type="submit"
                    >
                        {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                        {!loading && <CheckCheck className="h-4 w-4 mr-2" />}Create boardroom
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default BoardroomForm;
