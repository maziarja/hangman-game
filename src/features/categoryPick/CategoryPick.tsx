import { NavLink } from "react-router";
import CategoryItem from "../../UI/CategoryItem";
import Header from "../../UI/Header";
import PageContainer from "../../UI/PageContainer";

// eslint-disable-next-line react-refresh/only-export-components
export const categories = [
  "movies",
  "tv_shows",
  "countries",
  "capital_cities",
  "animals",
  "sports",
] as const;

export type Categories = (typeof categories)[number];

function CategoryPick() {
  return (
    <PageContainer>
      <Header> Pick a Category</Header>
      <div className="mt-25 grid gap-4 md:mt-28.5 md:grid-cols-2 md:gap-8 lg:mt-40 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12.5">
        {categories.map((category, i) => (
          <NavLink key={i} to={`/difficulty?category=${category}`}>
            <CategoryItem>{category.replace("_", " ")}</CategoryItem>
          </NavLink>
        ))}
      </div>
    </PageContainer>
  );
}

export default CategoryPick;
