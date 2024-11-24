import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CategoryEntity } from "@/models/category";
import { CreateBusinessSchemaType } from "@/schemas/CreateBusinessSchema";
import { UseFormReturn } from "react-hook-form";

type AddBusinessStep3Props = {
    form: UseFormReturn<CreateBusinessSchemaType>,
    categories?: CategoryEntity[],
    selectedCategories: number[],
    toggleCategory: (categoryId: number) => void;
  };

const AddBusinessStep3 = ({ form, categories, selectedCategories, toggleCategory }: AddBusinessStep3Props) => {
  return (
    <>
    <div className="flex flex-col gap-4">
      <FormField
        control={form.control}
        name="categoriesIds"
        render={() => (
          <FormItem className="space-y-1 flex flex-col items-start">
            <FormLabel className="text-xl text-black/70 font-semibold">
              Kategorie
            </FormLabel>
            <FormControl>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    variant="outline"
                    className="w-fit px-10 py-6 md:px-20 cursor-pointer text-lg"
                  >
                    Wybierz kategorie
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel className="text-xl">
                    Wybierz kategorie
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {categories
                    ?.filter(
                      (category) =>
                        !selectedCategories.includes(category.id)
                    )
                    ?.map((category) => (
                      <DropdownMenuItem
                        key={category.id}
                        onClick={() => toggleCategory(category.id)}
                        className={cn(
                          "md:w-[300px] w-full cursor-pointer text-lg p-2 my-1",
                          selectedCategories.includes(category.id)
                            ? "bg-cyan-500 text-white"
                            : ""
                        )}
                      >
                        {category.name}
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div>
        <h2 className="text-xl font-bold">Wybrane Kategorie</h2>
        {selectedCategories.map((categoryId) => {
          const category = categories?.find(
            (cat) => cat.id === categoryId
          );
          return (
            category && (
              <div
                key={categoryId}
                className="flex items-center text-lg my-2 font-semibold"
              >
                {category.name}
                <button
                  onClick={() => toggleCategory(categoryId)}
                  className=" bg-red-500 hover:bg-red-600 text-white text-sm p-1 ml-2 cursor-pointer rounded-sm transition-colors"
                >
                  Remove
                </button>
              </div>
            )
          );
        })}
      </div>
    </div>

    <FormField
      control={form.control}
      name="city"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel className="text-xl text-black/70 font-semibold">
            Miasto
          </FormLabel>
          <FormControl>
            <Input type="text" placeholder="Miasto" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
  )
}

export default AddBusinessStep3;