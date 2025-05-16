import { CategoriesList } from "@/types/Product";
import { RxHamburgerMenu } from "react-icons/rx";

const Home = () => {
  return (
    <div>
      {/* Top Row */}
      <section>
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
          <ul>
            {}
          </ul>
        </main>
        <aside>Col Grid</aside>
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
