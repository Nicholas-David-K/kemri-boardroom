'use client';

import { Amenities, Boardroom, Image as ImageType, Locations } from '@prisma/client';
import { CheckCheck, Loader } from 'lucide-react';
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

import { BoardroomSchema } from '@/schemas';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import ImageUpload from '@/components/image-upload';
import { Input } from '@/components/input';
import { Textarea } from '@/components/textarea';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface BoardroomFormProps {
    initialData?:
        | (Boardroom & {
              images: ImageType[];
          })
        | null;
}

type BoardroomFormValues = z.infer<typeof BoardroomSchema>;

const amenities = Object.keys(Amenities)
    .filter((value) => isNaN(Number(value)))
    .map((value) => ({
        id: value.toLowerCase(),
        label: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
    }));

const BoardroomForm = ({ initialData }: BoardroomFormProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const toastMessage = initialData ? 'Boardroom updated' : 'Boardroom created';
    const action = initialData ? 'Save changes' : 'Create boardroom';

    const form = useForm<BoardroomFormValues>({
        resolver: zodResolver(BoardroomSchema),
        defaultValues: initialData
            ? {
                  ...initialData,
                  amenities: initialData.amenities.map((amenity) => amenity.toLowerCase()),
                  images: initialData.images.map((image) => ({ url: image.url })),
              }
            : {
                  name: '',
                  description: '',
                  location: '',
                  capacity: undefined,
                  images: [],
                  amenities: [],
              },
    });

    const { isValid, isSubmitting } = form.formState;

    const onSubmit = async (values: BoardroomFormValues) => {
        console.log(values);
        setIsLoading(true);
        try {
            if (initialData) {
                console.log(values);
                await axios.patch(`/api/boardrooms/${initialData.id}`, values);
            } else {
                await axios.post('/api/boardrooms/add-boardroom', values);
            }
            router.refresh();
            toast.success(toastMessage);
            router.push('/manage');
            router.refresh();
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
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
                                                    disabled={isLoading}
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
                                                    disabled={isLoading}
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
                                                disabled={isLoading}
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
                                                    disabled={isLoading}
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
                                                disabled={isLoading}
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

                    <Button
                        size="lg"
                        disabled={isLoading || isSubmitting || !isValid}
                        className="ml-auto rounded-sm mt-10"
                        type="submit"
                    >
                        {isLoading && <Loader className="h-4 w-4 mr-2 animate-spin" />}
                        {!isLoading && <CheckCheck className="h-4 w-4 mr-2" />} {action}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default BoardroomForm;
