import useAPI from "@/hook/useAPI";
import { CategoriesList, type Laptops } from "@/types/Product";
import { RxHamburgerMenu } from "react-icons/rx";

const Home = () => {
  const [laptops, laptopLoading, laptopError] = useAPI<Laptops>("laptops");
  if (laptopLoading) return <div>Loading...</div>;
  if (laptopError) return <div>{laptopError}</div>;
  if (laptops.length === 0) return <div>No laptops available</div>;

  const topLaptop = laptops.reduce((prev, curr) =>
    curr.rating > prev.rating ? curr : prev
  );

  return (
    <div>
      {/* Top Row */}
      <section className="flex">
        <article>
          <div className="flex items-center space-x-2">
            <RxHamburgerMenu />
            <h2>Categories</h2>
          </div>
          <ul>
            {CategoriesList.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        </article>
        <main>
          <div className="w-40 h-52 overflow-hidden">
            <img
              src={topLaptop.thumbnail}
              alt={topLaptop.name}
              className="w-full h-full object-contain"
            />
          </div>
        </main>
        <aside>
          <div>
            <img src="" alt="" className="w-full h-full cover-contain" />
          </div>
          <div>
            <img src="" alt="" className="w-full h-full cover-contain" />
          </div>
        </aside>
      </section>

      {/* Bottom Row */}
      <section>
        <div></div>
        <div></div>
        <div></div>
      </section>
    </div>
  );
};

export default Home;
